import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/registry/new-york/ui/sidebar"
import { Badge } from "@/registry/new-york/ui/badge"
import { mdiHome, mdiAccount, mdiCog } from "@mdi/js"
import Icon from "@mdi/react"

export function SidebarDemo() {
  return (
    <div className="flex flex-col h-[350px] w-full">
      <div className="flex items-center gap-2 mb-2">
        <Badge variant="bold" colorScheme="primary" size="sm">
          Custom recipe
        </Badge>
      </div>
      <div className="flex h-[350px] w-full">
      <SidebarProvider>
        <Sidebar className="w-64 px-2 py-6">
          <SidebarHeader>
            <div className="py-1.5 text-sm font-semibold uppercase text-subtle-text">Navigation</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <Icon path={mdiHome} />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icon path={mdiAccount} />
                  <span>Profile</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Icon path={mdiCog} />
                  <span>Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
      </div>
    </div>
  )
} 