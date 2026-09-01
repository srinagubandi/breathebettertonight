const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const LEAD_STATUSES = ['New', 'Contacted', 'Scheduled', 'Closed'];
const MAX_LENGTHS = {
  name: 120,
  phone: 40,
  email: 254,
  inquiryType: 80,
  contactMethod: 30,
};

function getLeadStorePath() {
  const configuredPath = process.env.LEADS_FILE;
  return path.resolve(configuredPath || path.join(__dirname, '../../data/leads.json'));
}

function getStorageState() {
  return {
    path: getLeadStorePath(),
    persistent: Boolean(process.env.LEADS_FILE),
  };
}

function ensureLeadStore() {
  const storePath = getLeadStorePath();
  fs.mkdirSync(path.dirname(storePath), { recursive: true });
  if (!fs.existsSync(storePath)) {
    fs.writeFileSync(storePath, '[]\n', { mode: 0o600 });
  }
  return storePath;
}

function readLeads() {
  const storePath = ensureLeadStore();
  try {
    const contents = fs.readFileSync(storePath, 'utf8').trim();
    const leads = contents ? JSON.parse(contents) : [];
    return Array.isArray(leads) ? leads : [];
  } catch (error) {
    throw new Error('The lead store could not be read.');
  }
}

function writeLeads(leads) {
  const storePath = ensureLeadStore();
  const temporaryPath = `${storePath}.${process.pid}.${Date.now()}.tmp`;
  fs.writeFileSync(temporaryPath, `${JSON.stringify(leads, null, 2)}\n`, { mode: 0o600 });
  fs.renameSync(temporaryPath, storePath);
}

function cleanText(value, maxLength) {
  return String(value || '').trim().replace(/\s+/g, ' ').slice(0, maxLength);
}

function validateLead(input) {
  const lead = {
    name: cleanText(input.name, MAX_LENGTHS.name),
    phone: cleanText(input.phone, MAX_LENGTHS.phone),
    email: cleanText(input.email, MAX_LENGTHS.email).toLowerCase(),
    inquiryType: cleanText(input.inquiryType, MAX_LENGTHS.inquiryType),
    contactMethod: cleanText(input.contactMethod, MAX_LENGTHS.contactMethod),
    consent: input.consent === 'on',
  };

  const errors = {};
  if (!lead.name) errors.name = 'Please enter your name.';
  if (lead.phone.replace(/\D/g, '').length < 7) errors.phone = 'Please enter a valid phone number.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.email = 'Please enter a valid email address.';
  if (!['Appointment request', 'Sleep symptom consultation', 'General information'].includes(lead.inquiryType)) {
    errors.inquiryType = 'Please select a reason for your inquiry.';
  }
  if (!['Phone', 'Email'].includes(lead.contactMethod)) errors.contactMethod = 'Please select a contact method.';
  if (!lead.consent) errors.consent = 'Consent is required before submitting your request.';

  return { lead, errors, valid: Object.keys(errors).length === 0 };
}

function createLead(input) {
  const { lead, errors, valid } = validateLead(input);
  if (!valid) return { errors, lead: input, created: null };

  const created = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: 'New',
    ...lead,
  };
  const leads = readLeads();
  leads.unshift(created);
  writeLeads(leads);
  return { errors: {}, lead: created, created };
}

function listLeads() {
  return readLeads().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function updateLeadStatus(id, status) {
  if (!LEAD_STATUSES.includes(status)) return false;
  const leads = readLeads();
  const lead = leads.find((entry) => entry.id === id);
  if (!lead) return false;
  lead.status = status;
  lead.updatedAt = new Date().toISOString();
  writeLeads(leads);
  return true;
}

function getLeadSummary(leads) {
  return LEAD_STATUSES.reduce((summary, status) => {
    summary[status] = leads.filter((lead) => lead.status === status).length;
    return summary;
  }, { total: leads.length });
}

module.exports = {
  LEAD_STATUSES,
  createLead,
  getLeadStorePath,
  getLeadSummary,
  getStorageState,
  listLeads,
  updateLeadStatus,
};
