const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  const result = await pool.query('SELECT * FROM "ProjectMedia" ORDER BY "createdAt" DESC LIMIT 5');
  console.log(JSON.stringify(result.rows, null, 2));
}

main().finally(() => pool.end());
