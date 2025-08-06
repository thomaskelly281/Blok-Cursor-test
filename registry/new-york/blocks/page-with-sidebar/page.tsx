import { mdiHome, mdiAccount, mdiCog } from "@mdi/js"
import Icon from "@mdi/react"

import { TopBar } from "@/registry/new-york/ui/topbar"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/registry/new-york/ui/sidebar"

export default function PageWithSidebar() {
  return (
    <div className="flex h-screen flex-col">
      {/* Topbar - Full width */}
      <TopBar 
        className="" 
        logoImageSrc="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore"
        navigationItems={[
          { label: "item-1", href: "#", isActive: true  },
          { label: "item-2", href: "#" },
          { label: "item-3", href: "#" },
          { label: "item-4", href: "#" },
          { label: "item-5", href: "#" }
        ]}
      />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Left side, full height */}
        <SidebarProvider className="w-64 bg-subtle-bg">
          <Sidebar className="w-64 bg-subtle-bg">
            <SidebarHeader className="px-4 pt-4">
              <div className="py-1.5 text-sm font-semibold uppercase text-subtle-text">Section</div>
            </SidebarHeader>
            <SidebarContent className="px-2 pb-4">
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

        {/* Main content area - Right side */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
        <div className="mx-6 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Welcome to your page</h1>
            {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
                <p className="text-gray-600">View your important metrics and statistics here.</p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
                <p className="text-gray-600">See your latest activities and updates.</p>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
                <p className="text-gray-600">Access frequently used features and tools.</p>
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  )
} 