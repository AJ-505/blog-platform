import { db } from "@/db";
import { posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export type SearchResult = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  badge: string | null;
  author: string;
  likes: number;
  comments: number;
  createdAt: Date;
};

type SearchCandidate = SearchResult & {
  content: string;
};

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/<[^>]*>/g, " ")
    .replace(/[#*_`~[\](){}>"'.,!?;:/\\|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function uniqueTokens(value: string) {
  return Array.from(
    new Set(
      normalizeSearchText(value)
        .split(" ")
        .filter((token) => token.length >= 2),
    ),
  );
}

function editDistanceWithin(left: string, right: string, maxDistance: number) {
  if (Math.abs(left.length - right.length) > maxDistance) return false;

  let previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let i = 1; i <= left.length; i++) {
    const current = [i];
    let rowBest = current[0];

    for (let j = 1; j <= right.length; j++) {
      const cost = left[i - 1] === right[j - 1] ? 0 : 1;
      const next = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + cost,
      );

      current[j] = next;
      rowBest = Math.min(rowBest, next);
    }

    if (rowBest > maxDistance) return false;
    previous = current;
  }

  return previous[right.length] <= maxDistance;
}

function fuzzyTokenMatch(queryToken: string, haystackTokens: string[]) {
  return haystackTokens.some((token) => {
    if (token.includes(queryToken) || queryToken.includes(token)) return true;

    const maxDistance = queryToken.length >= 6 ? 2 : 1;
    return editDistanceWithin(queryToken, token, maxDistance);
  });
}

function scoreCandidate(query: string, candidate: SearchCandidate) {
  const normalizedQuery = normalizeSearchText(query);
  const queryTokens = uniqueTokens(query);
  if (!normalizedQuery || queryTokens.length === 0) return 0;

  const title = normalizeSearchText(candidate.title);
  const excerpt = normalizeSearchText(candidate.excerpt);
  const content = normalizeSearchText(candidate.content);
  const badge = normalizeSearchText(candidate.badge ?? "");
  const author = normalizeSearchText(candidate.author);
  const fullText = [title, excerpt, content, badge, author].join(" ");
  const fullTokens = uniqueTokens(fullText);

  let score = 0;

  if (title.includes(normalizedQuery)) score += 90;
  if (excerpt.includes(normalizedQuery)) score += 60;
  if (content.includes(normalizedQuery)) score += 45;
  if (badge.includes(normalizedQuery)) score += 35;
  if (author.includes(normalizedQuery)) score += 30;

  for (const token of queryTokens) {
    if (title.includes(token)) score += 26;
    else if (excerpt.includes(token)) score += 18;
    else if (content.includes(token)) score += 12;
    else if (badge.includes(token) || author.includes(token)) score += 10;
    else if (fuzzyTokenMatch(token, fullTokens)) score += 8;
  }

  const matchedTokens = queryTokens.filter((token) =>
    fuzzyTokenMatch(token, fullTokens),
  ).length;
  const coverage = matchedTokens / queryTokens.length;

  if (coverage === 1) score += 25;
  else if (queryTokens.length > 1 && coverage >= 0.5) score += 10;

  return score;
}

// Full-text-ish search over published posts. It ranks title/excerpt/category/
// author matches highly, also scans the body content, and allows small typos by
// comparing query tokens with post tokens using a bounded edit distance.
export async function searchPosts(query: string): Promise<SearchResult[]> {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) return [];

  const candidates = await db
    .select({
      id: posts.id,
      slug: posts.slug,
      title: posts.title,
      excerpt: posts.excerpt,
      content: posts.content,
      badge: posts.badge,
      author: users.name,
      likes: posts.likes,
      comments: posts.commentCount,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .innerJoin(users, eq(posts.authorId, users.username))
    .where(eq(posts.status, "published"))
    .orderBy(desc(posts.createdAt))
    .limit(250);

  return candidates
    .map((candidate) => ({
      candidate,
      score: scoreCandidate(trimmedQuery, candidate),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) return right.score - left.score;
      return right.candidate.createdAt.getTime() - left.candidate.createdAt.getTime();
    })
    .slice(0, 50)
    .map(({ candidate }) => {
      return {
        id: candidate.id,
        slug: candidate.slug,
        title: candidate.title,
        excerpt: candidate.excerpt,
        badge: candidate.badge,
        author: candidate.author,
        likes: candidate.likes,
        comments: candidate.comments,
        createdAt: candidate.createdAt,
      };
    });
}
