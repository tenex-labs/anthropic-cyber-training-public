const { test } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");

process.env.UPLOAD_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "qh-uploads-"));
const request = require("supertest");
const app = require("../src/app");

const dispatcher = { "x-api-token": "demo-dispatcher-token" };
const admin = { "x-api-token": "demo-admin-token" };

test("health check works", async () => {
  const res = await request(app).get("/health");
  assert.strictEqual(res.status, 200);
});

test("search finds shipments by city", async () => {
  const res = await request(app).get("/api/shipments/search?q=Oakland").set(dispatcher);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.results.length, 2);
});

test("search needs sign in", async () => {
  const res = await request(app).get("/api/shipments/search?q=Oakland");
  assert.strictEqual(res.status, 401);
});

test("one shipment can be looked up", async () => {
  const res = await request(app).get("/api/shipments/3").set(dispatcher);
  assert.strictEqual(res.body.reference, "QH-10023");
});

test("admin stats are for admins only", async () => {
  const asDispatcher = await request(app).get("/api/admin/stats").set(dispatcher);
  assert.strictEqual(asDispatcher.status, 403);
  const asAdmin = await request(app).get("/api/admin/stats").set(admin);
  assert.strictEqual(asAdmin.status, 200);
});

test("admins can export customers", async () => {
  const res = await request(app).get("/api/admin/customers").set(admin);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.body.customers.length, 4);
});

test("a delivery document can be attached", async () => {
  const res = await request(app)
    .post("/api/shipments/1/documents")
    .set(dispatcher)
    .send({ filename: "pod.pdf", content: Buffer.from("%PDF-1.4 demo").toString("base64") });
  assert.strictEqual(res.status, 201);
});

test("settings can be saved", async () => {
  const res = await request(app).patch("/api/settings").set(dispatcher).send({ units: "metric" });
  assert.strictEqual(res.body.units, "metric");
});
