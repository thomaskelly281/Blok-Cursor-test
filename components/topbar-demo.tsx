import { TopBar } from "@/registry/new-york/ui/topbar"
import { Badge } from "@/registry/new-york/ui/badge"

export function TopBarDemo() {
  return (
    <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-1">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="bold" colorScheme="primary" size="sm">
          Custom recipe
        </Badge>
      </div>
      <div className="h-40 rounded-lg border p-4">
        <p className="text-muted-foreground mb-4 text-sm">
          A navigation bar with dropdown menus, user profile, and logo
        </p>
        <TopBar />
      </div>
    </div>
  )
} 