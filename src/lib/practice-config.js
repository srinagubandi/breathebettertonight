const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const MAX_TEXT = 6000;
const MAX_LABEL = 160;
const MAX_PROFILE_NOTE = 420;
const MAX_HISTORY = 180;
const DESIGN_SYSTEMS = ['morning-signal', 'clarity-signal', 'shared-sleep-signal', 'night-breathing-signal', 'night-to-clarity', 'clinical-confidence', 'family-comfort', 'local-care-calm-direction', 'soft-utility', 'humanist-morning', 'quiet-signal', 'sleep-check', 'provider-match', 'consultation-handoff', 'partner-path', 'treatment-questions', 'request-received'];
const CAMPAIGN_KEYS = ['night-to-clarity', 'clinical-confidence', 'family-comfort', 'local-care-calm-direction', 'soft-utility', 'humanist-morning', 'quiet-signal', 'sleep-check', 'provider-match', 'consultation-handoff', 'partner-path', 'treatment-questions', 'request-received', 'tired-mornings', 'focus-and-brain-fog', 'partner-noticed-snoring', 'partner-disrupted-sleep', 'waking-unrefreshed-video', 'daytime-brain-fog-video', 'nighttime-breathing-sounds'];
const PORTRAIT_STATUSES = ['Placeholder', 'Pending approval', 'Approved for publication'];
const BULK_DISPLAY_FIELDS = ['showPracticeName', 'showPhone', 'showText', 'showDentistProfile', 'showDentistPhoto'];

function emptyStore() {
  return { version: 2, practices: {}, drafts: {}, history: [] };
}

function storePath() {
  return path.resolve(process.env.PRACTICE_CONFIG_FILE || path.join(__dirname, '../../data/practice-config.json'));
}

function ensureStore() {
  const target = storePath();
  fs.mkdirSync(path.dirname(target), { recursive: true });
  if (!fs.existsSync(target)) fs.writeFileSync(target, `${JSON.stringify(emptyStore())}\n`, { mode: 0o600 });
  return target;
}

function readStore() {
  const target = ensureStore();
  try {
    const parsed = JSON.parse(fs.readFileSync(target, 'utf8'));
    if (!parsed || typeof parsed !== 'object' || !parsed.practices || typeof parsed.practices !== 'object') return emptyStore();
    return {
      ...emptyStore(),
      ...parsed,
      version: 2,
      practices: parsed.practices,
      drafts: parsed.drafts && typeof parsed.drafts === 'object' ? parsed.drafts : {},
      history: Array.isArray(parsed.history) ? parsed.history.slice(-MAX_HISTORY) : [],
    };
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

function cleanProfileNote(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, MAX_PROFILE_NOTE);
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

function normalizePortraitPath(value) {
  const candidate = cleanText(value, 260);
  if (!candidate) return '';
  return /^\/assets\/images\/[A-Za-z0-9_./-]+\.(?:png|jpe?g|webp)$/i.test(candidate) ? candidate : null;
}

function fieldsThatChanged(previous = {}, next = {}) {
  const keys = new Set([...Object.keys(previous), ...Object.keys(next)]);
  return [...keys].filter((key) => JSON.stringify(previous[key]) !== JSON.stringify(next[key])).sort();
}

function appendHistory(store, { action, practiceKey, previous = {}, snapshot = {}, changedFields = [] }) {
  store.history.push({
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    action,
    practiceKey,
    changedFields: [...new Set(changedFields)].sort(),
    previous,
    snapshot,
  });
  store.history = store.history.slice(-MAX_HISTORY);
}

function buildOverride(input, defaults) {
  const errors = {};
  const phoneRaw = normalizePhone(input.phoneRaw || defaults.phoneRaw);
  const textRaw = normalizePhone(input.textRaw || defaults.textRaw);
  const surveyId = cleanText(input.surveyId || defaults.surveyId, 80);
  const portraitUrl = normalizePortraitPath(input.portraitUrl);
  const portraitStatus = cleanText(input.portraitStatus || defaults.portraitStatus || 'Placeholder', 40);
  const designAssignments = {};

  if (phoneRaw.length < 7) errors.phoneRaw = 'Enter a valid Call number.';
  if (textRaw.length < 7) errors.textRaw = 'Enter a valid Text number.';
  if (!/^[A-Za-z0-9_-]{12,80}$/.test(surveyId)) errors.surveyId = 'Enter a valid GoHighLevel survey ID.';
  if (portraitUrl === null) errors.portraitUrl = 'Use an approved local image path beginning with /assets/images/.';
  if (!PORTRAIT_STATUSES.includes(portraitStatus)) errors.portraitStatus = 'Choose a valid portrait approval status.';

  for (const campaignKey of CAMPAIGN_KEYS) {
    const field = `design_${campaignKey}`;
    const value = cleanText(input[field] || defaults.designAssignments?.[campaignKey] || '', 80);
    if (value && !DESIGN_SYSTEMS.includes(value)) errors[field] = 'Choose a supported design concept.';
    else if (value) designAssignments[campaignKey] = value;
  }

  if (Object.keys(errors).length) return { errors, override: null };
  return {
    errors,
    override: {
      publicName: cleanText(input.publicName || defaults.publicName),
      campaignDestination: cleanText(input.campaignDestination || defaults.campaignDestination),
      doctorName: cleanText(input.doctorName || defaults.doctorName),
      credentials: cleanText(input.credentials || defaults.credentials),
      serviceLabel: cleanText(input.serviceLabel || defaults.serviceLabel),
      doctorBio: cleanProfileNote(input.doctorBio || defaults.doctorBio || ''),
      portraitUrl: portraitUrl || '',
      portraitAlt: cleanText(input.portraitAlt || defaults.portraitAlt || ''),
      portraitStatus,
      showPracticeName: normalizeBoolean(input.showPracticeName, defaults.showPracticeName),
      showPhone: normalizeBoolean(input.showPhone, defaults.showPhone),
      showText: normalizeBoolean(input.showText, defaults.showText),
      showDentistProfile: normalizeBoolean(input.showDentistProfile, defaults.showDentistProfile),
      showDentistPhoto: normalizeBoolean(input.showDentistPhoto, defaults.showDentistPhoto),
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
    },
  };
}

function getPracticeOverrides() {
  return readStore().practices;
}

function getPracticeDrafts() {
  return readStore().drafts;
}

function getPracticeHistory(practiceKey = '') {
  return readStore().history
    .filter((entry) => !practiceKey || entry.practiceKey === practiceKey)
    .sort((a, b) => new Date(b.occurredAt) - new Date(a.occurredAt));
}

function getPracticeConfigStorage() {
  return { path: storePath(), persistent: Boolean(process.env.PRACTICE_CONFIG_FILE) };
}

function updatePracticeOverride(key, input, defaults) {
  const current = readStore();
  const { errors, override } = buildOverride(input, defaults);
  if (Object.keys(errors).length) return { updated: false, errors };
  const previous = current.practices[key] || {};
  current.practices[key] = override;
  delete current.drafts[key];
  appendHistory(current, {
    action: 'Published configuration',
    practiceKey: key,
    previous,
    snapshot: override,
    changedFields: fieldsThatChanged(previous, override),
  });
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return { updated: true, errors: {} };
}

function savePracticeDraft(key, input, defaults) {
  const current = readStore();
  const { errors, override } = buildOverride(input, defaults);
  if (Object.keys(errors).length) return { updated: false, errors };
  current.drafts[key] = { ...override, draftedAt: new Date().toISOString() };
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return { updated: true, errors: {} };
}

function discardPracticeDraft(key) {
  const current = readStore();
  if (!current.drafts[key]) return false;
  delete current.drafts[key];
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return true;
}

function publishPracticeDraft(key) {
  const current = readStore();
  const draft = current.drafts[key];
  if (!draft) return { updated: false, reason: 'No draft is ready to publish.' };
  const previous = current.practices[key] || {};
  const { draftedAt, ...snapshot } = draft;
  current.practices[key] = { ...snapshot, updatedAt: new Date().toISOString() };
  delete current.drafts[key];
  appendHistory(current, {
    action: 'Published draft',
    practiceKey: key,
    previous,
    snapshot: current.practices[key],
    changedFields: fieldsThatChanged(previous, current.practices[key]),
  });
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return { updated: true };
}

function restorePracticeHistory(key, historyId) {
  const current = readStore();
  const source = current.history.find((entry) => entry.id === historyId && entry.practiceKey === key && entry.snapshot);
  if (!source) return { updated: false, reason: 'That saved configuration version is unavailable.' };
  const previous = current.practices[key] || {};
  current.practices[key] = { ...source.snapshot, updatedAt: new Date().toISOString() };
  appendHistory(current, {
    action: 'Restored saved version',
    practiceKey: key,
    previous,
    snapshot: current.practices[key],
    changedFields: fieldsThatChanged(previous, current.practices[key]),
  });
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return { updated: true };
}

function applyBulkDisplayUpdate(keys, field, value) {
  if (!BULK_DISPLAY_FIELDS.includes(field) || !Array.isArray(keys) || !keys.length) return { updated: false, reason: 'Choose at least one practice and a supported display control.' };
  const current = readStore();
  const targets = [...new Set(keys.map((key) => cleanText(key, 80)).filter(Boolean))];
  const visible = normalizeBoolean(value, true);
  targets.forEach((key) => {
    const previous = current.practices[key] || {};
    const snapshot = { ...previous, [field]: visible, updatedAt: new Date().toISOString() };
    current.practices[key] = snapshot;
    appendHistory(current, {
      action: `Bulk display update: ${field}`,
      practiceKey: key,
      previous,
      snapshot,
      changedFields: [field],
    });
  });
  current.updatedAt = new Date().toISOString();
  writeStore(current);
  return { updated: true, targetCount: targets.length };
}

module.exports = {
  CAMPAIGN_KEYS,
  DESIGN_SYSTEMS,
  PORTRAIT_STATUSES,
  BULK_DISPLAY_FIELDS,
  getPracticeConfigStorage,
  getPracticeOverrides,
  getPracticeDrafts,
  getPracticeHistory,
  updatePracticeOverride,
  savePracticeDraft,
  discardPracticeDraft,
  publishPracticeDraft,
  restorePracticeHistory,
  applyBulkDisplayUpdate,
};
