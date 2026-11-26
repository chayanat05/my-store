import { Elysia } from "elysia";

import { db } from "@/db";
import { products } from "@/db/schema";

// เลือกเฉพาะคอลัมน์ที่หน้าร้านใช้ ให้ JSON หน้าตาตรงกับ type Product ใน lib/types.ts
const productColumns = {
  id: products.id,
  name: products.name,
  description: products.description,
  price: products.price,
  salePrice: products.salePrice,
  imageUrl: products.imageUrl,
  stock: products.stock,
};

export const productRoutes = new Elysia({ prefix: "/products" }).get("/", () =>
  db.select(productColumns).from(products).orderBy(products.id),
);