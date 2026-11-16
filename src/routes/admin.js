const express = require("express");
const { getDb, all } = require("../lib/db");
const { requireUser, requireAdmin } = require("../lib/auth");

const router = express.Router();

// Dashboard numbers for the ops team.
router.get("/stats", requireUser, requireAdmin, async (req, res) => {
  const db = await getDb();
  const [counts] = all(db, "SELECT COUNT(*) AS shipments FROM shipments");
  res.json(counts);
});

// Customer export for the finance team.
router.get("/customers", async (req, res) => {
  const db = await getDb();
  res.json({ customers: all(db, "SELECT id, name, email, phone, credit_limit FROM customers") });
});

module.exports = router;
