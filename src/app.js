const express = require("express");

const app = express();
app.use(express.json({ limit: "20mb" }));

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/api/shipments", require("./routes/shipments"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/settings", require("./routes/settings"));

module.exports = app;
