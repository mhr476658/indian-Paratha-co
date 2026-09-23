import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;
const ADMIN_KEY = process.env.ADMIN_KEY || "change-this-admin-key";
const DB_FILE = path.join(__dirname, "data", "inquiries.json");

fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
if (!fs.existsSync(DB_FILE)) fs.writeFileSync(DB_FILE, "[]");

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

function readDb() {
  return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
}
function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "Indian Paratha Company API" });
});

app.post("/api/inquiries", (req, res) => {
  const { name, phone, email, model, message } = req.body || {};

  if (!name || !phone || !message) {
    return res.status(400).json({ message: "Name, phone and message are required." });
  }

  const inquiries = readDb();
  const inquiry = {
    id: `IPC-${Date.now()}`,
    name: String(name).trim(),
    phone: String(phone).trim(),
    email: String(email || "").trim(),
    model: String(model || "Not specified").trim(),
    message: String(message).trim(),
    createdAt: new Date().toISOString()
  };

  inquiries.unshift(inquiry);
  writeDb(inquiries);

  res.status(201).json({
    success: true,
    message: "Inquiry received.",
    inquiryId: inquiry.id
  });
});

app.get("/api/inquiries", (req, res) => {
  if (req.header("x-admin-key") !== ADMIN_KEY) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  res.json(readDb());
});

app.delete("/api/inquiries/:id", (req, res) => {
  if (req.header("x-admin-key") !== ADMIN_KEY) {
    return res.status(401).json({ message: "Unauthorized." });
  }

  const before = readDb();
  const after = before.filter((item) => item.id !== req.params.id);
  writeDb(after);
  res.json({ success: true, deleted: before.length !== after.length });
});

app.listen(PORT, () => {
  console.log(`IPC API running on http://localhost:${PORT}`);
});
