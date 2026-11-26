import { Elysia } from "elysia";
import { productRoutes } from "./products";

// API ทั้งหมดของร้านอยู่ใน instance นี้ตัวเดียว
// prefix ต้องตรงกับโฟลเดอร์ app/api/ ที่ Next ส่ง request เข้ามา
export const app = new Elysia({ prefix: "/api" })
    .get("/health", () => 
        ({ ok: true,
            message: "Server is running",
           
        }))

    .get("/home", () =>
        ({ ok: true,
            message: "Welcome to my store API",
           
        }))

        .use(productRoutes);