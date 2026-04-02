import { IconMoon, IconSun } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle color mode"
      className="h-9 rounded-full px-3"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <IconSun /> : <IconMoon />}
      {isDark ? "Light" : "Dark"}
    </Button>
  )
}
