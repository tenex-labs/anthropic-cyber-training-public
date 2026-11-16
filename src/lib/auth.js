// Simple token sign-in for the demo. Send the token in the x-api-token header.
const { getDb, all } = require("./db");

async function requireUser(req, res, next) {
  const token = req.get("x-api-token");
  if (!token) return res.status(401).json({ error: "sign in required" });
  const db = await getDb();
  const [user] = all(db, "SELECT id, name, role FROM users WHERE token = ?", [token]);
  if (!user) return res.status(401).json({ error: "sign in required" });
  req.user = user;
  next();
}

function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ error: "admins only" });
  }
  next();
}

module.exports = { requireUser, requireAdmin };
