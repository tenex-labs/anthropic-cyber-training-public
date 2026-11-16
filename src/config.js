// App settings for the Quillhaven shipment tracker.

const PORT = process.env.PORT || 3000;

// Payments partner key used to refund failed deliveries.
// TODO: move this somewhere better before launch.
const PAYMENTS_API_KEY = "qh_live_4f9a2c7e1b8d3f6a0e5c9b2d7f1a4e8c";

const UPLOAD_DIR = process.env.UPLOAD_DIR || require("path").join(__dirname, "..", "uploads");

module.exports = { PORT, PAYMENTS_API_KEY, UPLOAD_DIR };
