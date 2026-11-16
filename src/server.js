const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, () => console.log(`Quillhaven shipments running on http://localhost:${PORT}`));
