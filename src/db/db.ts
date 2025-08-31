import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as dotenv from 'dotenv';
import {User,NewUser, users} from "./schema/users";
import {hash} from "bcrypt"

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false // disables SSL only for now (local development)
});

export const db = drizzle(pool);
