# Blog Platform: The Master Guide

**👋 Welcome to the Blog Platform project!**
Please read this document from start to finish. It is your central hub for understanding how to set up the project, how we collaborate, and where you need to go to start coding.

## Prerequisites & Setup

This project strictly uses **pnpm** as our package manager. Do not use `npm install` or `yarn`.

**To install pnpm:**

```bash
npm install -g pnpm
```

**To setup the project:**

```bash
# 1. Install dependencies
pnpm install

# 2. Start the development server
pnpm run dev
```

Once the server is running, open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the site live! If you make any changes to the code, the browser will automatically refresh.

### Wait, why pnpm?

It solves a lot of problems with npm.
_What problems?_
Trust me, you probably don't wanna know. But if you're curious, [you can read about why pnpm is superior here](https://pnpm.io/motivation).

## 📜 The Golden Standard: PRD.md

To ensure everyone stays in sync with what exactly we are building, we maintain a Product Requirements Document at [`docs/PRD.md`](./docs/PRD.md). This file is our **golden standard**.

Whenever we have a meeting, discuss new features, or change any functionality, the Documentation team will update this file. Always refer to the PRD if you are unsure about how a feature should work or what the current requirements are.

---

## Environment Variables (.env)

You will notice a file called `.env.example` in the root of the project. Environment variables are secret configurations (like database passwords or API keys) that our app needs to run, but that we **never** want to upload to GitHub.
[Read more about what Environment Variables are here](https://www.freecodecamp.org/news/how-to-use-node-environment-variables-with-a-dotenv-file-for-node-js-and-npm/).

**Your Action Item:**

1. Copy the `.env.example` file and rename the copy to `.env`.
2. Ask the Team Lead for the actual values (like the `DATABASE_URL`) to put inside your `.env` file.
3. _Note: The `.env` file is intentionally ignored by Git so your secrets stay safe!_

---

## How to Contribute

We follow a strict Git workflow. If you are new to open source or team collaboration, [read this guide on the GitHub contribution flow first](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project).

### 1. The Workflow

1. **Fork** this repository to your own GitHub account.
2. **Clone** your forked repository to your local machine.
3. **Create a branch** for your specific feature or fix: `git checkout -b feat/add-login-button`
4. Make your changes and **Commit** them (see rules below).
5. **Push** to your fork: `git push origin feat/add-login-button`
6. Open a **Pull Request (PR)** against the main repository.

### 2. Commit Message Conventions (STRICT RULE)

We use Conventional Commits. **Your pull request will NOT be accepted if you do not follow these conventions.** This keeps our Git history readable.

Format: `<type>: <short description>`

**Types you can use:**

- `feat`: A new feature (e.g., `feat: add user authentication`)
- `fix`: A bug fix (e.g., `fix: resolve crash on login page`)
- `docs`: Documentation changes only (e.g., `docs: update README with new API endpoints`)
- `style`: Formatting, missing semi-colons, etc. (no code changes) (e.g., `style: format user components`)
- `refactor`: Rewriting code without changing behavior (e.g., `refactor: simplify database query`)
- `test`: Adding missing tests or correcting existing ones (e.g., `test: add unit tests for posts`)
- `chore`: Updating build tasks, package manager configs, etc. (e.g., `chore: update pnpm dependencies`)

### 3. Syncing Your Fork (CRITICAL STEP)

Before creating a Pull Request (or even starting new work), you **must** ensure your code is up-to-date with the main project. If you don't do this, you may run into "Merge Conflicts", which are a headache to solve.

**Why is this important? (An Example):**
Imagine you and your teammate, Sarah, are both working on the project. Sarah finishes a feature that updates the `Header` component, and her code gets merged into the main project. Meanwhile, you've been working on your own fork for three days. Your fork is now *out of date*. If you also made changes to the `Header` and try to open a PR, GitHub will complain because it doesn't know whose code to keep (yours or Sarah's). 

To prevent this:
1. Go to your forked repository on GitHub.
2. Click the **"Sync fork"** button right below the green "Code" button. Click "Update branch". This pulls Sarah's new code into *your* GitHub fork.
3. In your terminal on your computer, run:
   ```bash
   git pull origin main
   ```
   This downloads Sarah's code to your local machine so you are working with the absolute newest version of the app.

*Always Sync and Pull before you push your final code or open a PR!*

### 4. Code Formatting (Prettier)

We use [Prettier](https://prettier.io/) to automatically format our code. This ensures everyone's code looks exactly the same, preventing arguments over spaces vs. tabs and making the codebase much easier to read. [Read more about why formatting is important here.](https://prettier.io/docs/en/why-prettier.html)

**When to format:**
You should always format your code **before** opening a Pull Request.

**How to format:**
Run the following command in your terminal:

```bash
pnpm run format
```

This will automatically fix all formatting issues across the entire project.

---

## 🧭 Team Guides: Choose Your Path

Now that you've read the basics, it's time to dive into your specific domain. Find your team below and click the link to read your domain-specific guide:

- 🎨 [**Frontend Team Docs**](./src/components/README.md) -> Go here if you are building the UI, buttons, and pages!
- ⚙️ [**Backend Team Docs**](./src/app/api/README.md) -> Go here if you are building API endpoints and talking to the database!
- 🕵️ [**Docs & QA Team Docs**](./docs/README.md) -> Go here if you are testing PRs and ensuring everything is bug-free!
