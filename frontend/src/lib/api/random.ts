import {
  randomNumberResponseSchema,
  type RandomNumberResponse,
} from "@shared/random"

const apiBasePath = import.meta.env.DEV ? "" : "/_/backend"

export async function fetchRandomNumber(): Promise<RandomNumberResponse> {
  const response = await fetch(`${apiBasePath}/api/random`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error(`Random number request failed with ${response.status}`)
  }

  const json: unknown = await response.json()

  return randomNumberResponseSchema.parse(json)
}
