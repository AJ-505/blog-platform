import {
  sqliteTable,
  text,
  integer,
  primaryKey,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  username: text("username").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export const posts = sqliteTable("posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  authorId: text("author_id")
    .notNull()
    .references(() => users.username, { onDelete: "cascade" }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  badge: text("badge"),
  imageKey: text("image_key"),
  likes: integer("likes").default(0).notNull(),
  commentCount: integer("comment_count").default(0).notNull(),
  isDiscover: integer("is_discover").default(0).notNull(),
  status: text("status", { enum: ["draft", "published"] })
    .default("published")
    .notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export const comments = sqliteTable("comments", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  authorId: text("author_id")
    .notNull()
    .references(() => users.username, { onDelete: "cascade" }),
  content: text("content").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

// Tracks which user liked which post. The composite primary key makes a like
// idempotent (a user can like a post at most once) and lets us show whether the
// current viewer has already liked a post. The denormalised `posts.likes`
// counter is kept in sync alongside writes to this table.
export const postLikes = sqliteTable(
  "post_likes",
  {
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.username, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.postId, table.userId] })],
);

export const follows = sqliteTable(
  "follows",
  {
    followerId: text("follower_id")
      .notNull()
      .references(() => users.username, { onDelete: "cascade" }),
    followingId: text("following_id")
      .notNull()
      .references(() => users.username, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.followerId, table.followingId] })],
);

// Live polls on the feed. A poll is a question with a fixed set of options;
// students vote in real time. Vote counts are denormalised onto each option
// (`pollOptions.votes`) and kept in sync with the `pollVotes` ledger inside a
// transaction, mirroring the postLikes pattern.
export const polls = sqliteTable("polls", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  authorId: text("author_id")
    .notNull()
    .references(() => users.username, { onDelete: "cascade" }),
  question: text("question").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
});

export const pollOptions = sqliteTable("poll_options", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  pollId: integer("poll_id")
    .notNull()
    .references(() => polls.id, { onDelete: "cascade" }),
  label: text("label").notNull(),
  votes: integer("votes").default(0).notNull(),
});

// One row per (poll, user): a person votes at most once per poll, but may move
// their vote to a different option. `optionId` records their current choice so
// the UI can highlight it and the denormalised counters can be rebalanced.
export const pollVotes = sqliteTable(
  "poll_votes",
  {
    pollId: integer("poll_id")
      .notNull()
      .references(() => polls.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => users.username, { onDelete: "cascade" }),
    optionId: integer("option_id")
      .notNull()
      .references(() => pollOptions.id, { onDelete: "cascade" }),
    createdAt: integer("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
  },
  (table) => [primaryKey({ columns: [table.pollId, table.userId] })],
);
