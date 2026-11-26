import { sql } from "drizzle-orm";
import { check, integer, numeric, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

// ตารางชุดเดียวกับ db/lab1.sql ทุกคอลัมน์ — ต่างกันแค่ตอนนี้เขียนเป็นโค้ด TypeScript
// ชื่อฝั่งซ้าย (salePrice) คือชื่อที่ใช้ในโค้ด ชื่อในวงเล็บ ("sale_price") คือชื่อคอลัมน์จริงใน database
// ชื่อ check ตั้งให้ตรงกับที่ Postgres ตั้งให้เองตอนรัน lab1.sql — db:push จะได้ไม่ลบแล้วสร้างใหม่

export const products = pgTable(
  "products",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar("name", { length: 200 }).notNull(),
    description: text("description"),
    // numeric ส่งค่าออกมาเป็นข้อความ "190.00" ทศนิยมจะได้ไม่เพี้ยนระหว่างทาง
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    salePrice: numeric("sale_price", { precision: 10, scale: 2 }),
    imageUrl: varchar("image_url", { length: 500 }),
    stock: integer("stock").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [
    check("products_price_check", sql`${table.price} > 0`),
    check("products_sale_price_check", sql`${table.salePrice} > 0`),
    check("sale_price_below_price", sql`${table.salePrice} < ${table.price}`),
  ],
);

export const orders = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  customerName: varchar("customer_name", { length: 200 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  paidAt: timestamp("paid_at", { withTimezone: true }),
});

export const orderItems = pgTable(
  "order_items",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    orderId: integer("order_id")
      .notNull()
      .references(() => orders.id, { onDelete: "cascade" }),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id),
    quantity: integer("quantity").notNull(),
    unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  },
  (table) => [check("order_items_quantity_check", sql`${table.quantity} > 0`)],
);