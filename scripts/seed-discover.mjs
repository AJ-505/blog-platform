import "dotenv/config";
import pg from "pg";

const { Client } = pg;

const authors = [
  {
    username: "prof-whittaker",
    name: "Professor H. Whittaker",
    email: "h.whittaker@example.edu",
  },
  { username: "maya-rivers", name: "Maya Rivers", email: "maya@example.edu" },
  {
    username: "roommate-drama",
    name: "Roommate Drama",
    email: "drama@example.edu",
  },
  {
    username: "jordan-chen",
    name: "Jordan Chen",
    email: "jordan@example.edu",
  },
  { username: "elena-m", name: "Elena M.", email: "elena@example.edu" },
  {
    username: "campus-chronicle",
    name: "Campus Chronicle",
    email: "chronicle@example.edu",
  },
  {
    username: "late-night-lab",
    name: "Late Night Lab",
    email: "lab@example.edu",
  },
  {
    username: "campus-reader",
    name: "Campus Reader",
    email: "campus-reader@comments.local",
  },
];

const posts = [
  {
    authorId: "prof-whittaker",
    slug: "secret-history-of-the-quad",
    title:
      "The Secret History of the Quad: Underground Tunnels & Midnight Myths",
    badge: "SCRIBBLED ORIGINAL",
    imageKey: "discover",
    likes: 1400,
    commentCount: 86,
    createdAt: "2026-05-31T11:00:00.000Z",
    excerpt:
      "Discover the hidden world beneath our feet. For decades, students have whispered about a labyrinth of tunnels connecting the oldest halls of residence.",
    content: `# The Secret History of the Quad: Underground Tunnels & Midnight Myths

Every campus has a map for visitors and another map that students build for themselves. The visitor map points to lecture halls, libraries, and statues with bronze plaques. The student map points to the bench with the best shade, the vending machine that still takes coins, and the locked door under Waverly Hall that everyone swears leads somewhere important.

The quad sits at the center of both maps. During the day it is all shortcuts and sunlight. At night it becomes a rumor machine.

## The tunnel story

The oldest version of the story says the tunnels were built for steam pipes. That part is true enough. Many older campuses used underground utility corridors to move heat between buildings, and our maintenance staff still works in a few of them.

The part students care about is different. They say the tunnels connect the old library, North Residence, the chapel basement, and the administrative building. They say one passage has initials carved into the brick from a class that graduated before the science wing existed. They say a professor once used the tunnels to reach a lecture during a storm and arrived completely dry.

The problem with myths is that they do not need to be fully false to survive. They only need one locked grate, one old floor plan, and one senior who tells the story with confidence.

## What is actually under the quad

Under the quad there are utility lines, drainage paths, storage rooms, and the sort of practical infrastructure that never appears in admissions photos. The campus was built in phases, so the underground layout is less like a grand secret network and more like several generations of engineers solving problems one decade at a time.

That does not make it boring. If anything, it makes it better. The real underground campus is a record of changing priorities: heating systems, electrical upgrades, emergency planning, and forgotten service entrances that became invisible as new buildings rose around them.

## Why midnight changes everything

At midnight the quad gets quieter, but it never becomes empty. A few students cross it with headphones on. Someone leaves the library carrying three books and a paper cup. A group returning from a late rehearsal walks too loudly and then suddenly whispers for no reason.

That is when the myths feel most believable. The campus lights flatten the grass into silver patches. The oldest buildings look less like classrooms and more like witnesses. Even the normal sounds, pipes knocking and doors settling, start to feel intentional.

## The lesson hidden in the rumor

The tunnel myth lasts because students want the campus to be more than a schedule. They want it to have layers. They want to feel that someone before them left clues, and that belonging here means learning how to read them.

Maybe there is no student-accessible passage from the chapel to the library. Maybe the famous locked door only leads to a storage room with folding chairs.

Still, the quad has a secret history. It is written in shortcuts, late walks, borrowed stories, and the strange feeling that a place becomes yours only after you have wondered what it is hiding.`,
  },
  {
    authorId: "maya-rivers",
    slug: "retro-oversized-vibes",
    title: "Retro Oversized Vibes: Why the 90s are Back on Campus",
    badge: "CAMPUS FASHION",
    imageKey: "retro",
    likes: 312,
    commentCount: 14,
    createdAt: "2026-05-29T13:00:00.000Z",
    excerpt:
      "Ditch the tight fit. We are exploring the rise of comfort-first campus aesthetics this fall, from oversized cable knits to baggy corduroy.",
    content: `# Retro Oversized Vibes: Why the 90s are Back on Campus

The most reliable fashion forecast on campus is not a runway recap. It is the 8:50 a.m. lecture hall. This semester, the room is full of oversized denim, loose sweaters, chunky sneakers, corduroy, and tote bags that look like they have carried both groceries and existential dread.

The 90s are back, but the return is not about costume dressing. It is about comfort with a point of view.

## Why oversized works here

Campus style has to survive real life. You may leave your room at 7:30 a.m., sit through classes, work a shift, eat in a crowded dining hall, stop by a club meeting, and end the day on the library floor because every table is taken.

Tight, delicate outfits can look great for ten minutes. Oversized layers last all day.

A roomy cable knit over a plain tee gives structure without stiffness. Baggy jeans or corduroy trousers make movement easy. A big jacket turns a basic outfit into something intentional. The best part is that none of it needs to feel precious.

## The pieces showing up most

The campus version of the trend has a few clear staples:

- faded straight-leg jeans
- oversized rugby shirts
- cable knit sweaters
- thrifted leather or denim jackets
- corduroy trousers
- white socks with chunky sneakers
- canvas totes with too many pins

The trick is balance. If everything is oversized, the outfit can swallow you. Try one large top with a cleaner trouser shape, or wide pants with a fitted tee under an open jacket.

## Thrift culture changed the trend

Part of the appeal is that 90s-inspired dressing rewards patience more than money. The best pieces often come from thrift racks, older siblings, parent closets, or campus clothing swaps.

That gives the style a lived-in feeling. A sweater with a tiny repair or a jacket with softened cuffs has more personality than something designed to look vintage yesterday.

## The mood behind the clothes

This trend is not only about nostalgia. It is about rejecting the idea that students have to look polished every second to be taken seriously. Oversized style says you can be comfortable, practical, and visually interesting at the same time.

It is a quiet kind of confidence. The clothes do not beg for attention. They just look like they belong to someone who has places to be and knows how they want to feel while getting there.`,
  },
  {
    authorId: "roommate-drama",
    slug: "shared-router-incident",
    title: "The Shared Router Incident: A Tragedy in 3 Parts",
    badge: "ROOMMATE DRAMA",
    imageKey: null,
    likes: 1200,
    commentCount: 58,
    createdAt: "2026-05-28T15:00:00.000Z",
    excerpt:
      "Why setting the WiFi password to LaundryIsYourJob was a bad idea and led to a three-week internet blackout.",
    content: `# The Shared Router Incident: A Tragedy in 3 Parts

There are many ways to ruin a living arrangement. You can leave dishes in the sink until they develop legal personhood. You can set alarms you do not wake up for. You can invite people over during finals week and call it a small hang.

Or you can change the WiFi password to LaundryIsYourJob.

## Part one: the password

The apartment had four roommates and one router. The router sat on a shoebox beside the window because everyone believed the signal was stronger there. Nobody knew if that was true, but moving it felt dangerous.

The conflict began with laundry. One roommate kept moving wet clothes out of the machine and placing them on top of the dryer. Another claimed this was a reasonable response to abandoned loads. A third roommate started a passive-aggressive sticky note campaign.

Then the password changed.

At first it seemed funny. Then the group chat became a courtroom.

## Part two: the outage

The router owner refused to share the new password until people respected shared chores. The others responded by unplugging the router whenever they left the apartment. Someone reset it. Someone else hid the reset pin. A fifth person, who did not live there but visited often, asked if this meant movie night was canceled.

By week two, everyone had burned through mobile data. Assignments were submitted from the lobby. One roommate attended a Zoom class from the stairwell because it had campus WiFi if you stood near the third-floor window.

The laundry remained unfinished.

## Part three: the treaty

Peace arrived through exhaustion. The roommates made a chore calendar, taped it to the fridge, and agreed that internet access was not a negotiation tool. The password changed again, this time to something boring.

The lesson is simple. Shared utilities require shared trust. If you turn the router into a weapon, everyone loses, including you when your own laptop forgets the network five minutes before a deadline.

Also, move your laundry.`,
  },
  {
    authorId: "jordan-chen",
    slug: "midnight-coffee-runs",
    title: "Midnight Coffee Runs: The Unofficial Campus Tradition",
    badge: "CAMPUS LIFE",
    imageKey: "art",
    likes: 780,
    commentCount: 33,
    createdAt: "2026-05-25T22:00:00.000Z",
    excerpt:
      "Some things only happen after 11 PM: group chats, deep talks, and the mission to find the only cafe still open.",
    content: `# Midnight Coffee Runs: The Unofficial Campus Tradition

Every campus has official traditions with banners, speeches, and alumni photos. Then there are the traditions that happen because students are tired, hungry, and unwilling to call the night over.

The midnight coffee run belongs to the second category.

## How it starts

Nobody plans it well. Someone says they need caffeine. Someone else says they should probably walk around before their brain stops working. A third person asks if the cafe near the bus stop is still open.

Ten minutes later, a small group is crossing campus in hoodies, carrying phones at 12 percent battery, acting like the mission has historical importance.

## Why it matters

The coffee is rarely the point. Sometimes it is not even good coffee. The point is leaving the room where the work has become impossible and stepping into a different version of campus.

At night, people talk differently. The day has fewer roles left in it. Nobody is trying to sound impressive in a seminar. Nobody is rushing to the next building. Conversations drift from exam stress to family, money, crushes, music, faith, fear, and whether everyone is secretly pretending to be more organized than they are.

The walk creates just enough privacy for honesty.

## The route

The classic route starts at the library, cuts past the quad, follows the lit path by the arts building, and ends at whichever counter still serves hot drinks. People argue about whether iced coffee at midnight is a red flag. Someone buys fries. Someone says they are only coming along for moral support and then orders the largest drink available.

On the walk back, the campus feels temporarily manageable.

## A tradition without permission

No office created the midnight coffee run. No one needs to protect it with a committee. It survives because students keep needing small ways to reset themselves.

That is what makes it feel real. It is ordinary, repeatable, and a little ridiculous. It is also one of the places where campus friendship quietly becomes serious.`,
  },
  {
    authorId: "elena-m",
    slug: "study-when-i-do-not-feel-like-studying",
    title: "How I Study When I Don’t Feel Like Studying",
    badge: "STUDY",
    imageKey: "book",
    likes: 2100,
    commentCount: 104,
    createdAt: "2026-05-24T12:00:00.000Z",
    excerpt:
      "A realistic system for low-motivation days: micro-tasks, ambient noise, and the 20-minute promise that actually works.",
    content: `# How I Study When I Don’t Feel Like Studying

Some study advice assumes the problem is ignorance. It tells you to make a schedule, remove distractions, and believe in your goals. That advice is not wrong, but it does not help much on the days when opening the document feels like lifting furniture.

On those days I use a smaller system.

## Start with the tiniest visible task

I do not begin by writing "study chemistry" on a list. That is too vague and too large. I write something I can finish quickly:

- open lecture slides
- copy the five exam topics
- solve one practice question
- make three flashcards
- reread one paragraph and summarize it

The goal is to create motion. Motivation often arrives after I start, not before.

## Use the 20-minute promise

I set a timer for 20 minutes and promise myself I can stop when it ends. This works because the task no longer feels endless. I am not committing to a heroic study session. I am committing to one short block.

Most of the time, I keep going. Sometimes I stop. Both outcomes are useful because 20 honest minutes is better than two hours of guilt-scrolling beside an unopened notebook.

## Make the environment boring

I do not need a perfect desk setup. I need fewer decisions. I put my phone across the room, open only the tabs I need, and play the same ambient playlist every time. The repetition tells my brain what mode we are in.

If my room feels too loud, I go to the library. If the library feels too serious, I sit in a common area. The best study spot is the one where I can begin.

## Track evidence, not feelings

Low motivation lies. It says nothing is working because the work feels bad. So I track evidence instead:

- pages reviewed
- questions attempted
- terms remembered
- paragraphs drafted

A small record makes progress visible. It also helps me start the next session because I know exactly where I left off.

## Keep the restart easy

Before I stop, I write the next tiny task at the top of the page. Future me should not have to rediscover the whole plan.

Studying when you do not feel like studying is not about becoming a machine. It is about lowering the starting cost until the first step is too small to argue with.`,
  },
  {
    authorId: "campus-chronicle",
    slug: "dorm-room-decor-on-a-budget",
    title: "Dorm Room Decor on a Budget: The 5-Item Rule",
    badge: "CAMPUS LIFE",
    imageKey: "art",
    likes: 540,
    commentCount: 22,
    createdAt: "2026-05-23T10:00:00.000Z",
    excerpt:
      "A quick guide to making your space feel like you without spending a fortune: lighting, texture, and one bold statement piece.",
    content: `# Dorm Room Decor on a Budget: The 5-Item Rule

A dorm room starts as a box with rules. You probably cannot paint the walls, replace the furniture, or drill into anything important. You may also be sharing the space with someone whose design philosophy is "laundry chair."

The good news is that a room does not need much to feel personal. It needs the right five items.

## 1. One better light source

Overhead dorm lighting is usually too harsh. A small lamp, clip light, or warm LED strip changes the room faster than any poster. Warm light makes late-night reading easier and makes the space feel less temporary.

## 2. One soft texture

Add a throw blanket, small rug, cushion, or fabric wall hanging. Dorm furniture is hard and practical. Texture makes it feel lived in.

Choose something easy to clean. Beauty matters, but so does surviving spilled tea.

## 3. One wall moment

Do not cover every inch at once. Pick one area and make it intentional. Use removable hooks or putty for a small gallery of prints, postcards, photos, or ticket stubs.

The goal is not to impress visitors. The goal is to look up from your desk and remember that your life exists outside assignments.

## 4. One storage upgrade

Clutter makes small rooms feel smaller. A rolling cart, under-bed bin, door organizer, or simple crate can save the space. Storage is decor when it keeps your floor visible.

## 5. One bold piece

This is the fun item: a bright pillow, a weird lamp, a framed print, a patterned blanket, or a thrifted chair if your room has space. Let one thing have personality so the rest can stay simple.

## Why five works

A tight limit keeps you from buying random things because your room feels unfinished. It also helps you spend where it matters.

Start with light, texture, wall, storage, and one bold piece. After that, live in the room for a few weeks. The best decor usually comes from noticing what your daily life actually needs.`,
  },
  {
    authorId: "late-night-lab",
    slug: "group-projects-survival-manual",
    title: "Group Projects: The Survival Manual",
    badge: "ACADEMICS",
    imageKey: "book",
    likes: 1900,
    commentCount: 97,
    createdAt: "2026-05-17T09:00:00.000Z",
    excerpt:
      "How to assign roles, set deadlines, and avoid the classic seen-at-2:13-AM teammate situation.",
    content: `# Group Projects: The Survival Manual

Group projects are not automatically terrible. They become terrible when everyone is polite for too long and specific too late.

The fix is structure. Not corporate structure. Just enough agreement that nobody has to guess what everyone else is doing.

## Have the awkward first meeting

Use the first meeting to answer practical questions:

- What exactly are we submitting?
- When is it due?
- What does a good version look like?
- Who is doing which part?
- Where will files live?
- When do we check progress?

Write the answers down. A plan that only exists in memory will become five different plans by next week.

## Assign owners, not vibes

"I can help with research" is not a role. "Amina will find three academic sources by Thursday and add notes to the shared doc" is a role.

Every task needs an owner and a date. If two people own the same task, nobody owns it.

## Create an early deadline

Set an internal deadline at least two days before the real one. This is not because everyone is secretly irresponsible. It is because formatting breaks, citations vanish, slides look strange on a different laptop, and someone always realizes the prompt had a second page.

Early deadlines create room for normal problems.

## Keep receipts kindly

Use shared docs, task lists, and chat summaries. After a meeting, send a short message with decisions and next steps. This prevents confusion without turning the group chat into a courtroom.

If someone is falling behind, ask early and plainly: "Can you still finish the methods slide by Thursday night?" That question is more useful than silent resentment.

## Finish as one project

The final step is integration. Someone needs to read the whole thing for flow, repeated points, missing transitions, and inconsistent formatting. A group project should not feel like five separate essays stapled together.

The survival rule is simple: be clear before you are annoyed. Most group project disasters begin in the gap between what people assumed and what they actually said.`,
  },
];

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

await client.connect();

try {
  await client.query("BEGIN");

  for (const author of authors) {
    await client.query(
      `
        INSERT INTO users (username, name, email, password_hash)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO UPDATE
        SET name = EXCLUDED.name,
            email = EXCLUDED.email
      `,
      [author.username, author.name, author.email, "seeded-discover-user"],
    );
  }

  for (const post of posts) {
    await client.query(
      `
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
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 1, $10, $10)
        ON CONFLICT (slug) DO UPDATE
        SET author_id = EXCLUDED.author_id,
            title = EXCLUDED.title,
            excerpt = EXCLUDED.excerpt,
            content = EXCLUDED.content,
            badge = EXCLUDED.badge,
            image_key = EXCLUDED.image_key,
            likes = EXCLUDED.likes,
            comment_count = EXCLUDED.comment_count,
            is_discover = EXCLUDED.is_discover,
            created_at = EXCLUDED.created_at,
            updated_at = NOW()
      `,
      [
        post.authorId,
        post.slug,
        post.title,
        post.excerpt,
        post.content,
        post.badge,
        post.imageKey,
        post.likes,
        post.commentCount,
        post.createdAt,
      ],
    );
  }

  await client.query("COMMIT");
  console.log(
    `Seeded ${authors.length} authors and ${posts.length} discover posts.`,
  );
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  await client.end();
}
