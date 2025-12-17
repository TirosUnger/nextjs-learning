import { db } from '@/lib/db.js';
import { users } from '@/lib/schema';

export async function POST() {
  try {
    // 生成 UUID 的简单方法
    const generateId = () => crypto.randomUUID();

    const testUsers = [
      {
        id: generateId(),
        username: 'john_doe',
        email: 'john@example.com',
        image: 'https://avatar.example.com/john.jpg',
        intro: 'Hello, I am John Doe',
      },
      {
        id: generateId(),
        username: 'jane_smith',
        email: 'jane@example.com',
        image: 'https://avatar.example.com/jane.jpg',
        intro: 'Hi, I am Jane Smith',
      },
    ];

    // 插入测试数据
    const result = await db.insert(users).values(testUsers).returning();

    return Response.json({
      success: true,
      message: '成功插入 2 条用户数据',
      data: result,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        success: false,
        message: '插入用户数据失败',
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
