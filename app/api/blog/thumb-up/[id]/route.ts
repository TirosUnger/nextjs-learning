import { db } from '@/lib/db.js';
import { blogs } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 获取当前博客的点赞数
    const blog = await db
      .select({ thumbup: blogs.thumbup })
      .from(blogs)
      .where(eq(blogs.id, id))
      .limit(1);

    if (!blog || blog.length === 0) {
      return Response.json(
        {
          errno: -1,
          message: '博客不存在',
        },
        { status: 404 }
      );
    }

    // 更新 thumbup 数，增加 1
    const newThumbup = (blog[0].thumbup || 0) + 1;
    const result = await db
      .update(blogs)
      .set({ thumbup: newThumbup })
      .where(eq(blogs.id, id))
      .returning();

    return Response.json({
      errno: 0,
      data: {
        id,
        thumbup: result[0].thumbup,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        errno: -1,
        message: `点赞失败: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
