const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

/**
 * @param {fs.PathOrFileDescriptor} filePath
 */
async function runMigration(filePath) {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT || "5432"),
  });

  await client.connect();
  const sql = fs.readFileSync(filePath, "utf-8");
  await client.query(sql);
  await client.end();
}

const migrationsDir = path.join(__dirname, "down");
const migrationFiles = fs.readdirSync(migrationsDir);

(async () => {
  for (const file of migrationFiles) {
    console.log(file);
    const filePath = path.join(migrationsDir, file);
    console.log(`Running migration: ${file}`);
    await runMigration(filePath);
  }
  console.log("All migrations applied.");
})();
