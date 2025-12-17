import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

// 从 .env 文件获取数据库连接字符串
const connectionString = process.env.DB_URL;

if (!connectionString) {
  throw new Error("DB_URL environment variable is not set");
}

// 创建连接池
const pool = new Pool({
  connectionString: connectionString,
});

// 创建 drizzle 实例
export const db = drizzle(pool);
export { pool };
