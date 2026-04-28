# Documentation & QA Team Guide

Welcome to the Docs and QA guide! Your job is to ensure the platform is well-documented, bug-free, and that features actually work before we merge them into the main project.

## 📝 The Product Requirements Document (PRD)

As the documentation team, you are responsible for creating and continuously updating the `PRD.md` file in this folder. This file is the single source of truth for what exactly we are building.

Whenever we have a meeting, discuss new features, or change any functionality, it is your duty to immediately reflect those changes in the PRD so the rest of the team stays on track.

## Pull Request Duty: Deployment Previews

Every time a developer opens a Pull Request (PR) to add a new feature, a system called Vercel will automatically build the project and create a **Deployment Preview**.

### What is a Deployment Preview?

It is simply a way to see how the app will look or behave if the new changes were added, running on a temporary, live URL just for that specific PR.

### Your Job on Every PR:

1. Go to the active Pull Request on GitHub.
2. Scroll down through the comments.
3. Look for a comment from the **`vercel [Bot]`**.
4. Click the link that says **Preview**.
5. Manually test the feature described in the PR. Does it work? Does it break anything else?
6. Approve the PR if it works, or request changes if it's broken.

Here is an example of what the Vercel Bot comment looks like:

> **vercel** `bot` commented
>
> The latest updates on your projects.
>
> | Project       | Deployment   | Actions              |
> | :------------ | :----------- | :------------------- |
> | blog-platform | 🟢 **Ready** | **Preview**, Comment |
>
> _(Click the "Preview" link located in the Actions column of the bot's comment to view the live build)._

## Testing Frameworks

Any End-to-End (E2E) or unit tests you write will live in the root `/tests` folder. Ensure you coordinate with the developers on what critical user flows need automated testing!
