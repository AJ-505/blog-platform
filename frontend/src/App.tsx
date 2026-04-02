import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { fetchRandomNumber } from "@/lib/api/random"

const randomNumberQueryKey = ["random-number"] as const

export function App() {
  const queryClient = useQueryClient()
  const randomNumberQuery = useQuery({
    queryKey: randomNumberQueryKey,
    queryFn: fetchRandomNumber,
  })

  const refreshRandomNumber = useMutation({
    mutationFn: fetchRandomNumber,
    onSuccess: (nextRandomNumber) => {
      queryClient.setQueryData(randomNumberQueryKey, nextRandomNumber)
    },
  })

  const value = refreshRandomNumber.data ?? randomNumberQuery.data
  const isPending = randomNumberQuery.isPending || refreshRandomNumber.isPending
  const error = randomNumberQuery.error ?? refreshRandomNumber.error

  return (
    <main className="min-h-svh bg-background px-6 py-8 text-foreground">
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-2xl flex-col">
        <div className="flex justify-end">
          <ModeToggle />
        </div>

        <div className="flex flex-1 flex-col items-start justify-center gap-8">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Click this button to get a new random number from the database.
            </p>
            <div className="text-6xl font-medium tracking-[-0.05em] sm:text-7xl">
              {value ? value.value.toLocaleString() : "…"}
            </div>
            {error ? (
              <p className="text-sm text-destructive">{error.message}</p>
            ) : null}
          </div>

          <Button
            size="lg"
            disabled={isPending}
            onClick={() => refreshRandomNumber.mutate()}
          >
            {isPending ? "Loading..." : "Get random number"}
          </Button>
        </div>
      </div>
    </main>
  )
}

export default App
