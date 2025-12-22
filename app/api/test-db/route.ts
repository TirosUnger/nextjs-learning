import { db } from '@/lib/db.js';
import { sql } from 'drizzle-orm';
import * as schema from '@/lib/schema';

export async function GET() {
  try {
    const result = await db.execute(
      sql`SELECT NOW() as current_time, version() as postgres_version`
    );

    // 查询用户
    const users = await db.select().from(schema.user).limit(5);

    return Response.json({
      success: true,
      message: '数据库连接成功',
      data: {
        current_time: result.rows[0]?.current_time,
        postgres_version: result.rows[0]?.postgres_version,
        users: users,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        success: false,
        message: '数据库连接失败',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
