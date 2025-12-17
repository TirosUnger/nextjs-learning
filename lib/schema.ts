import { pgTable, text, integer, timestamp, varchar } from 'drizzle-orm/pg-core';

// 用户表
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey().unique(),
  username: varchar('username', { length: 255 }).unique().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  image: text('image'),
  intro: text('intro'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 博客表
export const blogs = pgTable('blogs', {
  id: varchar('id', { length: 255 }).primaryKey().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  content: text('content').notNull(),
  thumbup: integer('thumbup').default(0).notNull(),
  userId: varchar('user_id', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
