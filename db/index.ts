import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

// เช็คตั้งแต่ตอนเริ่ม จะได้เห็นข้อความที่บอกวิธีแก้ แทน error ยาว ๆ จาก pg ตอนต่อ database ไม่ติด
if (!connectionString) {
  throw new Error(
    "ไม่พบ DATABASE_URL — copy .env.example เป็น .env แล้วใส่ connection string จาก Neon (ดูคู่มือติดตั้งข้อ 5)",
  );
}

export const db = drizzle(new Pool({ connectionString }), { schema });