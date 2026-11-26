import { db } from "./index";
import { orderItems, orders, products } from "./schema";

// ชุดเดียวกับที่ใส่ใน Neon ตอนแล็บครั้งที่ 1 — ราคาเขียนเป็นข้อความ เพราะคอลัมน์ numeric รับส่งเป็นข้อความ
const seedProducts = [
  { name: "แก้วเซรามิก", description: "แก้วกาแฟขนาด 350 ml", price: "190.00", salePrice: "159.00", stock: 24 },
  { name: "เสื้อยืด Hello World", description: "ผ้าคอตตอน 100%", price: "350.00", stock: 10 },
  { name: "สติกเกอร์ชุด Dev", description: "สติกเกอร์ 12 ลาย", price: "99.00", stock: 100 },
  { name: "สมุดโน้ตจุด", description: "กระดาษ 120 แกรม 96 แผ่น", price: "159.00", stock: 0 },
  { name: "ถุงผ้า MY STORE", description: "ถุงผ้าแคนวาส", price: "220.00", stock: 15 },
  { name: "แผ่นรองเมาส์", description: "ขนาด 30 × 25 cm", price: "259.00", stock: 8 },
];

export async function seed() {
  // ลบลูกก่อนแม่ เพราะ order_items ชี้ไปหา orders และ products อยู่
  await db.delete(orderItems);
  await db.delete(orders);
  await db.delete(products);

  return db.insert(products).values(seedProducts).returning({ id: products.id, name: products.name });
}

// รันตรง ๆ ด้วย `bun run db:seed` เท่านั้น ถ้าไฟล์อื่น import ไปใช้จะไม่ทำงานเอง
if (import.meta.main) {
  const inserted = await seed();
  console.log(`ใส่สินค้า ${inserted.length} ชิ้นแล้ว`);
  await db.$client.end();
}