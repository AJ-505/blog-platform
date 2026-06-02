import "dotenv/config";
import { createClient } from "@libsql/client";

// Authors behind the public `/feed` posts. Upserted by username so re-running
// this script is safe and never touches existing accounts' passwords.
const authors = [
  { username: "akunna", name: "Akunna", email: "akunna@example.edu" },
  {
    username: "saffron-collins",
    name: "Saffron Collins",
    email: "saffron.collins@example.edu",
  },
  { username: "ikweji-man", name: "Ikweji Man", email: "ikweji@example.edu" },
  {
    username: "dr-lena-park",
    name: "Dr. Lena Park",
    email: "l.park@example.edu",
  },
  {
    username: "anonymous-senior",
    name: "Anonymous Senior",
    email: "anonymous.senior@example.edu",
  },
];

// The five feed posts from the design. Retro Oversized Vibes already lives in
// the DB via seed-discover.mjs, so it is intentionally not duplicated here — we
// only bump its counters below so the feed matches the mockup.
const posts = [
  {
    authorId: "akunna",
    slug: "still-a-writer-even-when-i-wasnt-writing",
    title: "Still a Writer, Even When I Wasn't Writing",
    badge: "CAMPUS LIFE",
    imageKey: null,
    likes: 32,
    commentCount: 10,
    createdAt: "2026-06-02T08:30:00.000Z",
    excerpt:
      "If I had been told that somewhere along the line I would not only stop writing every day, but would also begin to dread putting my thoughts down — or worse, feel indifferent about sharing them — I would have laughed at the person who said it.",
    content: `# Still a Writer, Even When I Wasn't Writing

If I had been told that somewhere along the line I would not only stop writing every day, but would also begin to dread putting my thoughts down — or worse, feel indifferent about sharing them — I would have laughed at the person who said it.

Writing used to be the first thing I reached for. Before lectures, after arguments, in the strange quiet of a dorm room at 2 a.m. It was how I figured out what I actually thought. Then one semester it just stopped.

## The slow disappearing

It did not leave all at once. First the daily pages became weekly. Then the weekly pages became a note I kept meaning to expand. Then even opening the document felt like lifting something heavy.

I told myself I was busy. That was partly true. But busyness is rarely the whole story. The deeper thing was that writing had started to feel like a performance, and I was tired of auditioning for my own attention.

## Mistaking the silence for the end

For a long stretch I believed I had simply stopped being a writer. I watched other people post, publish, and share, and I felt like someone standing outside a room I used to live in.

What I did not understand then is that a habit going quiet is not the same as a part of you dying. I was still noticing things. I was still rearranging sentences in my head on the walk to class. I was still collecting the small details that I now realize are the raw material of everything I have ever written.

## Coming back without ceremony

The return was unimpressive. No grand decision, no fresh notebook, no motivational quote taped to the wall. One night I wrote three bad sentences about how the dining hall smelled, and I let them be bad.

That was the whole trick, it turned out. Letting it be bad. Letting it be small. Letting it be mine before it was anyone else's.

## What I know now

I was a writer the entire time I was not writing. The identity was never stored in the output. It lived in the way I pay attention, and attention does not take a semester off.

So if you are in your own quiet stretch — the unfinished draft, the abandoned blog, the project you keep apologizing for — you have not lost it. You are just between pages. Write three bad sentences. Let them be yours.`,
  },
  {
    authorId: "saffron-collins",
    slug: "campus-conversations-roommate-drama",
    title: "Campus Conversations: roommate drama is an extreme sport",
    badge: "ROOMMATE DRAMA",
    imageKey: null,
    likes: 1000,
    commentCount: 450,
    createdAt: "2026-06-02T07:15:00.000Z",
    excerpt:
      "Let me dish you a mix of trending news + peppered entertainment tea from around campus.",
    content: `# Campus Conversations: roommate drama is an extreme sport

Let me dish you a mix of trending news + peppered entertainment tea from around campus. Pull up a chair, because this week the dorms have been more dramatic than any series the streaming services could write.

## The thermostat cold war

It started, as these things do, over one degree. South Hall room 214 has reportedly entered its third week of what residents are calling "The Thermostat Cold War." One roommate runs hot. One roommate runs cold. Neither will blink.

Sources close to the situation say there is now a padlock involved. I will let that sit with you.

## The mystery of the vanishing leftovers

Over in the east block, a labeled container of jollof rice — clearly marked, clearly loved — disappeared from a shared fridge. The owner posted a flyer. An actual flyer. With a reward.

No suspect has been named, but three separate people have publicly declared their innocence, which, if you ask me, is at least one declaration too many.

## The group chat that became a courtroom

Every flat has a group chat. Some of them are wholesome. This one became a tribunal. Screenshots were submitted as evidence. A timeline was constructed. Someone used the phrase "for the record."

The dispute? Whose turn it was to buy bin bags. The casualties? Two friendships and one very dramatic exit from the chat, complete with a farewell paragraph.

## Why we can't look away

Here is the thing about roommate drama: it is low stakes and enormous at the same time. Nobody's career is ending over the dishes. And yet living with people teaches you more about yourself than most lectures do — how you handle small injustices, whether you can apologize first, what you are like when you are tired and someone ate your rice.

It really is an extreme sport. No padding, no referees, just you and three other people learning to share a fridge.

## This week's verdict

Label your food. Buy the bin bags. And for the love of peace, agree on a thermostat number before September ends. That is the tea. Keep it cute, keep it clean, and I will see you next week.`,
  },
  {
    authorId: "ikweji-man",
    slug: "the-3am-library-vending-machine-manifesto",
    title: "The 3 AM Library Vending Machine Manifesto",
    badge: "STUDY",
    imageKey: null,
    likes: 88,
    commentCount: 12,
    createdAt: "2026-06-01T23:45:00.000Z",
    excerpt:
      "If the library vending machine swallows my last $5 for a Red Bull during finals one more time, I'm officially starting a revolution. Who's with me? #ExamSurvival",
    content: `# The 3 AM Library Vending Machine Manifesto

If the library vending machine swallows my last $5 for a Red Bull during finals one more time, I'm officially starting a revolution. Who's with me? #ExamSurvival

I am writing this from the third floor, fueled by spite and a granola bar I found in my bag from what I believe was October. The machine has my money. The machine always has my money.

## Article one: the right to caffeine

It is 3 a.m. The exam is in seven hours. The chapters remaining are eleven. In this state, a cold energy drink is not a luxury. It is infrastructure.

And yet the machine — glowing, humming, smug — accepts the bill, makes the encouraging little whirring sound, and then does nothing. The coil turns three-quarters of the way and stops. We have all watched a drink dangle on the edge of release and choose violence.

## Article two: an end to the dangling can

No can shall be left suspended. If the coil turns, the product falls. This is not negotiable. We have suffered enough watching our purchases hang there like a metaphor for our GPA.

## Article three: exact change is a myth

The sign says "exact change preferred." Preferred by whom? Not by the student who has one crumpled five and a dream. The machine should make change, or it should accept its fate as decoration.

## Article four: the snack-to-survival ratio

During finals week, the machine must be restocked daily. There is nothing more demoralizing than walking up at 3 a.m. to find every row of anything edible sold out, leaving only the lone bag of plain rice cakes that has been there since first year.

## Our demands, in summary

- Coffee that costs less than the textbook it helps you read.
- A refund button that actually refunds.
- One machine, somewhere, that simply works.

This is not really about the vending machine. It is about dignity at 3 a.m. It is about all of us, hunched over our notes, asking the universe for one small thing to go right.

Stay strong, fellow night crawlers. Hydrate where you can. The exam will end. The machine, probably, will keep my five dollars. But we will remember. #ExamSurvival`,
  },
  {
    authorId: "dr-lena-park",
    slug: "office-hours-underused-cheat-code",
    title: "Office Hours Are the Most Underused Cheat Code",
    badge: "ACADEMICS",
    imageKey: null,
    likes: 174,
    commentCount: 26,
    createdAt: "2026-06-01T14:00:00.000Z",
    excerpt:
      "Half the questions I answer on exam day were already answered in an empty office three weeks earlier. Here's how to actually use the time your tuition already paid for.",
    content: `# Office Hours Are the Most Underused Cheat Code

Half the questions I answer on exam day were already answered in an empty office three weeks earlier. Here's how to actually use the time your tuition already paid for.

I have taught long enough to know the pattern. The week before an exam, my inbox fills with panic. The week before that, my office sits empty with the door open and a kettle on. The help was always there. The timing is what students get wrong.

## Office hours are not just for emergencies

Most students think of office hours as a confession booth — somewhere you go only when something has gone badly wrong. That framing keeps you away until it is almost too late.

The truth is duller and more useful. Office hours are unstructured time with the person who writes and grades your exam. You do not need a crisis to use them. You just need a question, or even a half-formed thought.

## What to actually bring

You do not have to arrive with something impressive. You have to arrive with something specific. "I don't understand chapter four" is hard to help with. These are not:

- "I followed the proof until this line — why does this step hold?"
- "I got a different answer on this problem. Can you see where I went wrong?"
- "I understand the definition but not when I'd ever use it."

Specific questions get specific answers. Vague questions get a reading recommendation you already had.

## The thing nobody tells you

Coming to office hours early and often does something that has nothing to do with the material: it makes you a person to me, not a row in a spreadsheet. When you later email me confused or ask for a small extension, I know you have been doing the work. That goodwill is real, and you earn it in the quiet weeks.

## A simple plan

Go once in the first month with any honest question. Go again after the first assignment to ask what you missed. Go a third time before the exam, but by then you will not be panicking, because you will already know the way to the office and the person inside it.

The cheat code is not secret. It is sitting behind an open door, with a kettle on, three weeks before you think you need it.`,
  },
  {
    authorId: "anonymous-senior",
    slug: "notes-i-left-in-the-margins",
    title: "Notes I Left in the Margins",
    badge: "SCRIBBLED ORIGINAL",
    imageKey: null,
    likes: 256,
    commentCount: 33,
    createdAt: "2026-06-01T09:20:00.000Z",
    excerpt:
      "A short original piece on the small, scribbled things we leave behind in borrowed textbooks — and the strangers who find them semesters later.",
    content: `# Notes I Left in the Margins

A short original piece on the small, scribbled things we leave behind in borrowed textbooks — and the strangers who find them semesters later.

I bought my philosophy text secondhand, and someone had been there before me.

In the margin beside a paragraph on memory, in faded pencil, they had written: *this is the part that kept me up.* No name. No date. Just a stranger admitting, quietly, that they had lain awake over the same page that was about to keep me up too.

## The conversation across time

A used textbook is a haunted house in the gentlest way. Previous readers leave themselves everywhere. A star here. A frustrated *?!* there. Once, an entire small argument with the author, written sideways up the edge of the page, ending in a triumphant *no — see p.114.*

I started reading for them as much as for the course. I would reach a difficult passage and check the margin first, the way you might glance at a friend to see if they are also lost. Sometimes they had given up exactly where I wanted to. There is a strange comfort in that.

## What we leave without meaning to

We think of ourselves as leaving nothing behind in a building we pass through for a few years. But we underline. We dog-ear. We write *important!!* next to things that turned out not to be, and we leave a faint pencil trail of who we were when we did not yet know how the story ended.

Some other student will buy this book after me. They will find my notes layered over the stranger's. *This is the part that kept me up,* in pencil. And beneath it, in pen, my own small reply that I left without thinking: *me too.*

## To whoever finds this

You do not know me and you never will. But we read the same difficult page in the same small hours, probably years apart, in the same borrowed light.

I left you a note in the margin. Leave one for the next person. That is the whole tradition. It is how a book remembers everyone it has kept awake.`,
  },
];

if (!process.env.TURSO_DATABASE_URL) {
  throw new Error("TURSO_DATABASE_URL is not set");
}

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const unixSeconds = (isoDate) => Math.floor(new Date(isoDate).getTime() / 1000);

for (const author of authors) {
  await client.execute({
    sql: `
        INSERT INTO users (username, name, email, password_hash)
        VALUES (?, ?, ?, ?)
        ON CONFLICT (username) DO UPDATE
        SET name = EXCLUDED.name,
            email = EXCLUDED.email
      `,
    args: [author.username, author.name, author.email, "seeded-feed-user"],
  });
}

for (const post of posts) {
  await client.execute({
    sql: `
        INSERT INTO posts (
          author_id,
          slug,
          title,
          excerpt,
          content,
          badge,
          image_key,
          likes,
          comment_count,
          is_discover,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?)
        ON CONFLICT (slug) DO UPDATE
        SET author_id = EXCLUDED.author_id,
            title = EXCLUDED.title,
            excerpt = EXCLUDED.excerpt,
            content = EXCLUDED.content,
            badge = EXCLUDED.badge,
            image_key = EXCLUDED.image_key,
            likes = EXCLUDED.likes,
            comment_count = EXCLUDED.comment_count,
            created_at = EXCLUDED.created_at,
            updated_at = unixepoch()
      `,
    args: [
      post.authorId,
      post.slug,
      post.title,
      post.excerpt,
      post.content,
      post.badge,
      post.imageKey,
      post.likes,
      post.commentCount,
      unixSeconds(post.createdAt),
      unixSeconds(post.createdAt),
    ],
  });
}

// Retro Oversized Vibes is already seeded by seed-discover.mjs. Bump its
// counters so the shared feed/discover card matches the design mockup, without
// duplicating or overwriting the article content.
await client.execute({
  sql: `UPDATE posts SET likes = 1200, comment_count = 48 WHERE slug = 'retro-oversized-vibes'`,
});

console.log(
  `Seeded ${authors.length} feed authors and ${posts.length} feed posts (+ bumped retro-oversized-vibes).`,
);
