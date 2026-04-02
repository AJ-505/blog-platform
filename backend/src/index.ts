import express from "express"

import { createRandomNumberResponse } from "../../shared/random"

const app = express()

app.get("/", (_req, res) => {
  res.send("Hello Express!")
})

app.get("/api/random", (_req, res) => {
  res.setHeader("Cache-Control", "no-store")
  res.json(createRandomNumberResponse())
})

app.get("/api/users/:id", (_req, res) => {
  res.json({ id: _req.params.id })
})

app.get("/api/posts/:postId/comments/:commentId", (_req, res) => {
  res.json({ postId: _req.params.postId, commentId: _req.params.commentId })
})

app.listen(8000, () => console.log("Server is running at port 8000"))

export default app
