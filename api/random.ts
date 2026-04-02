import type { VercelRequest, VercelResponse } from "@vercel/node"

import { createRandomNumberResponse } from "../shared/random"

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader("Cache-Control", "no-store")
  res.status(200).json(createRandomNumberResponse())
}
