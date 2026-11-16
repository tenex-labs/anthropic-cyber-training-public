const express = require("express");
const _ = require("lodash");
const { requireUser } = require("../lib/auth");

const router = express.Router();

const settingsByUser = {};

// Save display settings, such as time zone and units.
router.patch("/", requireUser, (req, res) => {
  const current = settingsByUser[req.user.id] || { timezone: "America/Los_Angeles", units: "imperial" };
  settingsByUser[req.user.id] = _.merge(current, req.body);
  res.json(settingsByUser[req.user.id]);
});

module.exports = router;
