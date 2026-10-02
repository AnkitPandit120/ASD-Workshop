const fs = require("fs/promises");
const path = require("path");

const location = path.join(__dirname, "db.json");

async function readProducts() {
  const data = await fs.readFile(location, "utf8");
  return JSON.parse(data);
}

module.exports = { readProducts };