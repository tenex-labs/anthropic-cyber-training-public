const express = require("express");
const fs = require("fs");
const path = require("path");
const { getDb, all } = require("../lib/db");
const { requireUser } = require("../lib/auth");
const { UPLOAD_DIR } = require("../config");

const router = express.Router();

// Search shipments by reference, origin or destination.
router.get("/search", requireUser, async (req, res) => {
  const q = req.query.q || "";
  const db = await getDb();
  const rows = all(
    db,
    `SELECT id, reference, origin, destination, status FROM shipments
     WHERE reference LIKE '%${q}%' OR origin LIKE '%${q}%' OR destination LIKE '%${q}%'`
  );
  res.json({ results: rows });
});

// Customers asked for a faster way to track by code. Quick version for the demo on Friday.
router.get("/track/:code", requireUser, async (req, res) => {
  const db = await getDb();
  const rows = all(db, "SELECT id, reference, status FROM shipments WHERE reference = '" + req.params.code + "'");
  if (!rows.length) return res.status(404).json({ error: "not found" });
  res.json(rows[0]);
});

// Look up one shipment.
router.get("/:id", requireUser, async (req, res) => {
  const db = await getDb();
  const [row] = all(db, "SELECT id, reference, origin, destination, status FROM shipments WHERE id = ?", [
    Number(req.params.id),
  ]);
  if (!row) return res.status(404).json({ error: "not found" });
  res.json(row);
});

// Attach a delivery document (proof of delivery, bill of lading) to a shipment.
// Body: { "filename": "pod.pdf", "content": "<base64>" }
router.post("/:id/documents", requireUser, async (req, res) => {
  const { filename, content } = req.body || {};
  if (!filename || !content) return res.status(400).json({ error: "filename and content are required" });
  const dir = path.join(UPLOAD_DIR, String(req.params.id));
  fs.mkdirSync(dir, { recursive: true });
  const target = path.join(dir, filename);
  fs.writeFileSync(target, Buffer.from(content, "base64"));
  res.status(201).json({ saved: path.relative(UPLOAD_DIR, target) });
});

module.exports = router;
