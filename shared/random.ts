import { z } from "zod"

export const randomNumberResponseSchema = z.object({
  value: z.number().int().min(0).max(999_999),
  generatedAt: z.string().datetime(),
})

export type RandomNumberResponse = z.infer<typeof randomNumberResponseSchema>

export function createRandomNumberResponse(): RandomNumberResponse {
  return {
    value: Math.floor(Math.random() * 1_000_000),
    generatedAt: new Date().toISOString(),
  }
}
