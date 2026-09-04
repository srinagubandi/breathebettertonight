const fs = require('fs');
const path = require('path');

const MAX_TEXT = 6000;
const MAX_LABEL = 160;
const DESIGN_SYSTEMS = ['morning-signal', 'clarity-signal', 'shared-sleep-signal', 'night-breathing-signal', 'night-to-clarity', 'clinical-confidence', 'family-comfort', 'local-care-calm-direction', 'soft-utility', 'humanist-morning', 'quiet-signal', 'sleep-check', 'provider-match', 'consultation-handoff', 'partner-path', 'treatment-questions', 'request-received'];
const CAMPAIGN_KEYS = ['night-to-clarity', 'clinical-confidence', 'family-comfort', 'local-care-calm-direction', 'soft-utility', 'humanist-morning', 'quiet-signal', 'sleep-check', 'provider-match', 'consultation-handoff', 'partner-path', 'treatment-questions', 'request-received', 'tired-mornings', 'focus-and-brain-fog', 'partner-noticed-snoring', 'partner-disrupted-sleep', 'waking-unrefreshed-video', 'daytime-brain-fog-video', 'nighttime-breathing-sounds'];

function storePath() {
  return path.resolve(process.env.PRACTICE_CONFIG_FILE || path.join(__dirname, '../../data/practice-config.json'));
}

function ensureStore() {
  const target = storePath();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (!fs.existsSync(target)) fs.writeFileSync(target, '{"version":1,"practices":{}}\n', { mode: 0o600 });
  return target;
}

function readStore() {
  const target = ensureStore();
  try {
    const parsed = JSON.parse(fs.readFileSync(target, 'utf8'));
    return parsed && typeof parsed === 'object' && parsed.practices && typeof parsed.practices === 'object'
      ? parsed
      : { version: 1, practices: {} };
  } catch (_) {
    throw new Error('The practice configuration store could not be read.');
  }
}

function writeStore(store) {
  const target = ensureStore();
  const temporary = `${target}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(store, null, 2)}\n`, { mode: 0o600 });
  fs.renameSync(temporary, target);
}

function cleanText(value, maxLength = MAX_LABEL) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function cleanPolicy(value) {
  return String(value || '').trim().slice(0, MAX_TEXT);
}

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '').slice(0, 15);
}

function formatPhone(raw, fallback) {
  if (raw.length === 10) return `(${raw.slice(0, 3)}) ${raw.slice(3, 6)}-${raw.slice(6)}`;
  return fallback || raw;
}

function normalizeBoolean(value, fallback = true) {
  const normalized = Array.isArray(value) ? value[value.length - 1] : value;
  if (normalized === undefined || normalized === null || normalized === '') return Boolean(fallback);
  return ['1', 'true', 'on', 'yes'].includes(String(normalized).toLowerCase());
}

function getPracticeOverrides() {
  return readStore().practices;
}

function getPracticeConfigStorage() {
  return { path: storePath(), persistent: Boolean(process.env.PRACTICE_CONFIG_FILE) };
}

function updatePracticeOverride(key, input, defaults) {
  const current = readStore();
  const errors = {};
  const phoneRaw = normalizePhone(input.phoneRaw || defaults.phoneRaw);
  const textRaw = normalizePhone(input.textRaw || defaults.textRaw);
  const surveyId = cleanText(input.surveyId || defaults.surveyId, 80);
  const designAssignments = {};

  if (phoneRaw.length < 7) errors.phoneRaw = 'Enter a valid Call number.';
  if (textRaw.length < 7) errors.textRaw = 'Enter a valid Text number.';
  if (!/^[A-Za-z0-9_-]{12,80}$/.test(surveyId)) errors.surveyId = 'Enter a valid GoHighLevel survey ID.';

  for (const campaignKey of CAMPAIGN_KEYS) {
    const field = `design_${campaignKey}`;
    const value = cleanText(input[field] || defaults.designAssignments?.[campaignKey] || '', 80);
    if (value && !DESIGN_SYSTEMS.includes(value)) errors[field] = 'Choose a supported design concept.';
    else if (value) designAssignments[campaignKey] = value;
  }

  if (Object.keys(errors).length) return { updated: false, errors };

  current.practices[key] = {
    publicName: cleanText(input.publicName || defaults.publicName),
    campaignDestination: cleanText(input.campaignDestination || defaults.campaignDestination),
    showPracticeName: normalizeBoolean(input.showPracticeName, defaults.showPracticeName),
    showPhone: normalizeBoolean(input.showPhone, defaults.showPhone),
    showText: normalizeBoolean(input.showText, defaults.showText),
    showDentistProfile: normalizeBoolean(input.showDentistProfile, defaults.showDentistProfile),
    phoneDisplay: formatPhone(phoneRaw, cleanText(input.phoneDisplay || defaults.phoneDisplay)),
    phoneRaw,
    textRaw,
    surveyId,
    policyOverrides: {
      privacy: cleanPolicy(input.privacyPolicy),
      terms: cleanPolicy(input.termsPolicy),
      accessibility: cleanPolicy(input.accessibilityPolicy),
    },
    designAssignments,
    updatedAt: new Date().toISOString(),
  };
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return { updated: true, errors: {} };
}

module.exports = {
  CAMPAIGN_KEYS,
  DESIGN_SYSTEMS,
  getPracticeConfigStorage,
  getPracticeOverrides,
  updatePracticeOverride,
};
