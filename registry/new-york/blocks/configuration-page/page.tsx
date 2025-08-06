import {mdiHome, mdiAccount, mdiCog } from "@mdi/js"
import Icon from "@mdi/react"

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/registry/new-york/ui/sidebar"
import { TopBar } from "@/registry/new-york/ui/topbar"
import { Button } from "@/registry/new-york/ui/button"
import { Card, CardContent } from "@/registry/new-york/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/registry/new-york/ui/toggle-group"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table"

export default function ConfigurationPage() {
  return (
    <div className="flex h-screen flex-col">
      {/* Topbar - Full width */}
      <TopBar 
        className="" 
        logoImageSrc="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore"
        navigationItems={[
          { label: "item-1", href: "#", isActive: true },
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
          <div className="mx-6 flex flex-col h-full">
            <div className="flex flex-row justify-between items-end mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Configuration</h1>
                <p className="text-subtle-text">Configure your thing</p>
              </div>
              <Button size="sm">Action</Button>
            </div>
            <Card className="flex-1 shadow-none px-5 py-5 rounded-md">
              <CardContent>
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Settings</h2>
                  <p className="text-muted-foreground mb-4">Toggle the settings below to configure your preferences.</p>
                  <ToggleGroup type="single" defaultValue="setting1" className="flex gap-2 border rounded-md p-1">
                    <ToggleGroupItem value="setting1" aria-label="Toggle setting 1">
                      Setting 1
                    </ToggleGroupItem>
                    <ToggleGroupItem value="setting2" aria-label="Toggle setting 2">
                      Setting 2
                    </ToggleGroupItem>
                    <ToggleGroupItem value="setting3" aria-label="Toggle setting 3">
                      Setting 3
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-subtle-text">Name</TableHead>
                      <TableHead className="text-subtle-text">Status</TableHead>
                      <TableHead className="text-subtle-text">Type</TableHead>
                      <TableHead className="text-subtle-text">Last Updated</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Configuration Item 1</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>System</TableCell>
                      <TableCell>2024-01-15</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Configuration Item 2</TableCell>
                      <TableCell>Inactive</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>2024-01-10</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Configuration Item 3</TableCell>
                      <TableCell>Active</TableCell>
                      <TableCell>System</TableCell>
                      <TableCell>2024-01-12</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
} 