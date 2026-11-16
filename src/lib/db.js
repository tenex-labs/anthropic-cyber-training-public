// In-memory database with made-up seed data. Nothing here is real.
const initSqlJs = require("sql.js");

let db;

async function getDb() {
  if (db) return db;
  const SQL = await initSqlJs();
  db = new SQL.Database();
  db.run(`
    CREATE TABLE customers (id INTEGER PRIMARY KEY, name TEXT, email TEXT, phone TEXT, credit_limit INTEGER);
    CREATE TABLE shipments (id INTEGER PRIMARY KEY, reference TEXT, customer_id INTEGER, origin TEXT, destination TEXT, status TEXT);
    CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, role TEXT, token TEXT);
  `);
  const customers = [
    [1, "Harbor Lane Grocers", "ops@harborlane.example", "555-0101", 50000],
    [2, "Northpine Hardware", "shipping@northpine.example", "555-0102", 25000],
    [3, "Cobalt Medical Supply", "logistics@cobaltmed.example", "555-0103", 120000],
    [4, "Juniper Street Books", "orders@juniperbooks.example", "555-0104", 8000],
  ];
  for (const c of customers) db.run("INSERT INTO customers VALUES (?, ?, ?, ?, ?)", c);
  const shipments = [
    [1, "QH-10021", 1, "Oakland, CA", "Reno, NV", "in_transit"],
    [2, "QH-10022", 2, "Tacoma, WA", "Boise, ID", "delivered"],
    [3, "QH-10023", 3, "Fresno, CA", "Phoenix, AZ", "in_transit"],
    [4, "QH-10024", 1, "Oakland, CA", "Sacramento, CA", "pending"],
    [5, "QH-10025", 4, "Portland, OR", "Eugene, OR", "delivered"],
  ];
  for (const s of shipments) db.run("INSERT INTO shipments VALUES (?, ?, ?, ?, ?, ?)", s);
  db.run("INSERT INTO users VALUES (1, 'Dana Dispatcher', 'dispatcher', 'demo-dispatcher-token')");
  db.run("INSERT INTO users VALUES (2, 'Avery Admin', 'admin', 'demo-admin-token')");
  return db;
}

function all(database, sql, params = []) {
  const stmt = database.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) rows.push(stmt.getAsObject());
  stmt.free();
  return rows;
}

module.exports = { getDb, all };
