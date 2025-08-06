import { mdiKey, mdiPlus, mdiHelpCircleOutline, mdiDotsVertical } from "@mdi/js"
import Icon from "@mdi/react"

import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/registry/new-york/ui/sidebar"
import { TopBar } from "@/registry/new-york/ui/topbar"
import { Button } from "@/registry/new-york/ui/button"
import { Card, CardContent } from "@/registry/new-york/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york/ui/table"
import { Avatar, AvatarFallback } from "@/registry/new-york/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/registry/new-york/ui/dropdown-menu"

export default function Page() {
  return (
    <div className="flex h-screen flex-col">
      {/* Topbar - Full width */}
      <TopBar 
        className="" 
        navigationItems={[
          { label: "My day", href: "#" },
          { label: "Projects", href: "#" },
          { label: "Chat", href: "#" },
          { label: "Brand Kits", href: "#" },
          { label: "Admin", href: "#", isActive: true }
        ]}
        actionButtons={
          <Button size="sm">
            <Icon path={mdiPlus} size={0.8} />
            Create
          </Button>
        }
        showHelpButton={true}
        showAvatar={true}
        avatarFallback="U"
      />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Left side, full height */}
        <SidebarProvider className="w-64 bg-subtle-bg">
          <Sidebar className="w-64 bg-subtle-bg">
            <SidebarHeader className="px-4 pt-4">
              <div className="py-1.5 text-sm font-semibold uppercase text-subtle-text">CREDENTIALS</div>
            </SidebarHeader>
            <SidebarContent className="px-2 pb-4">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Icon path={mdiKey} />
                    <span>XP/XM keys</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon path={mdiKey} />
                    <span>Partner keys</span>
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
                <h1 className="text-3xl font-bold mb-2">XP/XM keys</h1>
                <p className="text-subtle-text">Create credentials to access your Stream API</p>
              </div>
            </div>
            <Card className="flex-1 shadow-none px-5 py-5 rounded-md">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-subtle-text">Label</TableHead>
                      <TableHead className="text-subtle-text">Description</TableHead>
                      <TableHead className="text-subtle-text">Client ID</TableHead>
                      <TableHead className="text-subtle-text">Date created</TableHead>
                      <TableHead className="text-subtle-text w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Cred Name</TableCell>
                      <TableCell>Cred Desc</TableCell>
                      <TableCell className="font-mono text-sm">Uasdfkjapssfaksnlhaer</TableCell>
                      <TableCell>Feb 21, 2025</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon path={mdiDotsVertical} size={0.8} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cred Name</TableCell>
                      <TableCell>Cred Desc</TableCell>
                      <TableCell className="font-mono text-sm">alhjsbvoafpabo98yq</TableCell>
                      <TableCell>Feb 15, 2025</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon path={mdiDotsVertical} size={0.8} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cred Name</TableCell>
                      <TableCell>Cred Desc</TableCell>
                      <TableCell className="font-mono text-sm">kjahsdfkjhaskjdfh</TableCell>
                      <TableCell>Feb 10, 2025</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon path={mdiDotsVertical} size={0.8} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cred Name</TableCell>
                      <TableCell>Cred Desc</TableCell>
                      <TableCell className="font-mono text-sm">qwerasdfzxcvtyui</TableCell>
                      <TableCell>Feb 5, 2025</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon path={mdiDotsVertical} size={0.8} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cred Name</TableCell>
                      <TableCell>Cred Desc</TableCell>
                      <TableCell className="font-mono text-sm">mnbvcxzlkjhgfdsa</TableCell>
                      <TableCell>Feb 2, 2025</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon path={mdiDotsVertical} size={0.8} />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
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