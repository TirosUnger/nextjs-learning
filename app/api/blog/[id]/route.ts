import { db } from '@/lib/db.js';
import { blogs } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 获取博客
    const blog = await db
      .select()
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

    return Response.json({
      errno: 0,
      data: blog[0],
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        errno: -1,
        message: `获取博客失败: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { title, content } = body;

    // 验证必填字段
    if (!title || !content) {
      return Response.json(
        {
          errno: -1,
          message: '缺少必填字段：title, content',
        },
        { status: 400 }
      );
    }

    // 检查博客是否存在
    const blog = await db
      .select()
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

    // 更新博客
    const result = await db
      .update(blogs)
      .set({ title, content, updatedAt: new Date() })
      .where(eq(blogs.id, id))
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
        message: `更新博客失败: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 检查博客是否存在
    const blog = await db
      .select()
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

    // 删除博客
    await db.delete(blogs).where(eq(blogs.id, id));

    return Response.json({
      errno: 0,
      message: '博客删除成功',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        errno: -1,
        message: `删除博客失败: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
