// const { Pool } = require('pg');
import { Pool } from "pg";
// Create a new pool instance
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    getClient: () => pool.connect(),
};