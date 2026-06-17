import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join('/tmp', 'db_submissions.json');

// In-memory fallback if file system is read-only or errors out
let inMemoryDB = {
  services: [],
  testDrives: [],
  finance: [],
  insurance: [],
  contacts: [],
  valuations: []
};

// Middleware
app.use(cors());
app.use(express.json());

// Helper to load submissions
const getSubmissions = () => {
  if (!fs.existsSync(DB_FILE)) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(inMemoryDB, null, 2));
    } catch (e) {
      console.warn('Unable to write initial DB file in /tmp. Defaulting to in-memory.', e);
      return inMemoryDB;
    }
  }
  try {
    const data = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading database file, using in-memory backup:', err);
    return inMemoryDB;
  }
};

// Helper to save submissions
const saveSubmissions = (data) => {
  inMemoryDB = data; // Keep in-memory in sync
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (err) {
    console.warn('Error writing to db_submissions.json in /tmp:', err);
  }
};

// Routes
app.post('/api/book-service', (req, res) => {
  const { name, email, phone, model, serviceType, workshop, message } = req.body;
  
  if (!name || !phone || !model || !serviceType || !workshop) {
    return res.status(400).json({ error: 'Missing required fields: name, phone, model, serviceType, workshop' });
  }

  const submissions = getSubmissions();
  const newSubmission = {
    id: Date.now().toString(),
    name, email, phone, model, serviceType, workshop, message,
    timestamp: new Date().toISOString()
  };

  submissions.services.push(newSubmission);
  saveSubmissions(submissions);

  console.log(`[Service Booking] Received:`, newSubmission);
  return res.status(201).json({ success: true, message: 'Service booked successfully!', data: newSubmission });
});

app.post('/api/book-test-drive', (req, res) => {
  const { name, email, phone, model, location, preferredDate } = req.body;

  if (!name || !phone || !model || !location) {
    return res.status(400).json({ error: 'Missing required fields: name, phone, model, location' });
  }

  const submissions = getSubmissions();
  const newSubmission = {
    id: Date.now().toString(),
    name, email, phone, model, location, preferredDate,
    timestamp: new Date().toISOString()
  };

  submissions.testDrives.push(newSubmission);
  saveSubmissions(submissions);

  console.log(`[Test Drive Booking] Received:`, newSubmission);
  return res.status(201).json({ success: true, message: 'Test drive scheduled successfully!', data: newSubmission });
});

app.post('/api/finance-enquiry', (req, res) => {
  const { name, email, phone, model, location, message } = req.body;

  if (!name || !phone || !model || !location) {
    return res.status(400).json({ error: 'Missing required fields: name, phone, model, location' });
  }

  const submissions = getSubmissions();
  const newSubmission = {
    id: Date.now().toString(),
    name, email, phone, model, location, message,
    timestamp: new Date().toISOString()
  };

  submissions.finance.push(newSubmission);
  saveSubmissions(submissions);

  console.log(`[Finance Enquiry] Received:`, newSubmission);
  return res.status(201).json({ success: true, message: 'Finance query submitted successfully!', data: newSubmission });
});

app.post('/api/insurance-enquiry', (req, res) => {
  const { name, email, phone, model, regNo, purchaseYear, message } = req.body;

  if (!name || !phone || !model) {
    return res.status(400).json({ error: 'Missing required fields: name, phone, model' });
  }

  const submissions = getSubmissions();
  const newSubmission = {
    id: Date.now().toString(),
    name, email, phone, model, regNo, purchaseYear, message,
    timestamp: new Date().toISOString()
  };

  submissions.insurance.push(newSubmission);
  saveSubmissions(submissions);

  console.log(`[Insurance Enquiry] Received:`, newSubmission);
  return res.status(201).json({ success: true, message: 'Insurance renewal enquiry submitted successfully!', data: newSubmission });
});

app.post('/api/contact', (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !phone || !message) {
    return res.status(400).json({ error: 'Missing required fields: name, phone, message' });
  }

  const submissions = getSubmissions();
  const newSubmission = {
    id: Date.now().toString(),
    name, email, phone, subject, message,
    timestamp: new Date().toISOString()
  };

  submissions.contacts.push(newSubmission);
  saveSubmissions(submissions);

  console.log(`[Contact Submission] Received:`, newSubmission);
  return res.status(201).json({ success: true, message: 'Contact message received successfully!', data: newSubmission });
});

app.post('/api/exchange-valuation', (req, res) => {
  const { name, phone, email, currentCarBrand, currentCarModel, currentCarYear, currentCarMileage, targetCarModel } = req.body;

  if (!name || !phone || !currentCarBrand || !currentCarModel || !currentCarYear) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const submissions = getSubmissions();
  const newSubmission = {
    id: Date.now().toString(),
    name, phone, email, currentCarBrand, currentCarModel, currentCarYear, currentCarMileage, targetCarModel,
    timestamp: new Date().toISOString()
  };

  submissions.valuations.push(newSubmission);
  saveSubmissions(submissions);

  console.log(`[Valuation Request] Received:`, newSubmission);
  return res.status(201).json({ success: true, message: 'Exchange valuation query logged!', data: newSubmission });
});

// GET endpoint to see submissions
app.get('/api/submissions', (req, res) => {
  return res.json(getSubmissions());
});

app.get('/api', (req, res) => {
  res.send('Honda Dealership Serverless API is online.');
});

export default app;
