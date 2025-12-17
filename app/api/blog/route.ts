import { db } from '@/lib/db.js';
import { blogs } from '@/lib/schema';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, userId } = body;

    // 验证必填字段
    if (!title || !content || !userId) {
      return Response.json(
        {
          errno: -1,
          message: '缺少必填字段：title, content, userId',
        },
        { status: 400 }
      );
    }

    // 生成唯一 ID
    const id = crypto.randomUUID();

    // 插入数据库
    const result = await db
      .insert(blogs)
      .values({
        id,
        title,
        content,
        userId,
        thumbup: 0,
      })
      .returning();

    return Response.json({
      errno: 0,
      data: result[0],
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        errno: -1,
        message: `创建博客失败: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}