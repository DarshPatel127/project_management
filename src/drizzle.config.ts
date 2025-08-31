import { defineConfig } from "drizzle-kit";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema/*',
  out: './drizzle',
  dbCredentials: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'drizzle_orm_learn',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    ssl: false // disables SSL only for now (local development)
  }
})