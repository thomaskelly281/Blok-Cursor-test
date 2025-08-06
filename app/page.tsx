"use client"

import { mdiArrowLeft, mdiDownload, mdiPencil, mdiUpload, mdiShare, mdiComment, mdiDotsVertical, mdiRefresh, mdiBell, mdiCog, mdiAccount, mdiPlus, mdiChevronDown, mdiChevronRight, mdiHistory } from "@mdi/js"
import Icon from "@mdi/react"

import { TopBar } from "@/registry/new-york/ui/topbar"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/registry/new-york/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york/ui/card"
import { Button } from "@/registry/new-york/ui/button"
import { Badge } from "@/registry/new-york/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/new-york/ui/tabs"
import { Separator } from "@/registry/new-york/ui/separator"

export default function Page() {
  return (
    <div className="flex h-screen flex-col">
      {/* TopBar */}
      <TopBar 
        className="border-b" 
        logoImageSrc="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-content_hub"
        navigationItems={[
          { label: "Campaigns", href: "#" },
          { label: "Products", href: "#" },
          { label: "Contents", href: "#" },
          { label: "Assets", href: "#", isActive: true },
          { label: "Collections", href: "#" },
          { label: "Projects", href: "#" },
          { label: "Print", href: "#" },
          { label: "Create", href: "#" },
          { label: "Review", href: "#" },
          { label: "DRM", href: "#" }
        ]}
        actionButtons={
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
              <span>4 of 11 required actions completed</span>
              <span className="font-semibold">Direct Publish</span>
              <Icon path={mdiChevronDown} size={0.8} />
            </div>
            <Button variant="outline" size="sm">
              <Icon path={mdiDownload} size={1} />
              Download
            </Button>
            <Button variant="outline" size="sm">
              <Icon path={mdiPencil} size={1} />
              Edit
            </Button>
            <Button variant="outline" size="icon-sm">
              <Icon path={mdiUpload} size={1} />
            </Button>
            <Button variant="outline" size="icon-sm">
              <Icon path={mdiShare} size={1} />
            </Button>
            <Button variant="outline" size="icon-sm">
              <Icon path={mdiComment} size={1} />
            </Button>
            <Button variant="outline" size="icon-sm">
              <Icon path={mdiDotsVertical} size={1} />
            </Button>
            <Button variant="outline" size="icon-sm">
              <Icon path={mdiRefresh} size={1} />
            </Button>
            <Button variant="outline" size="icon-sm">
              <Icon path={mdiBell} size={1} />
            </Button>
            <Button variant="outline" size="icon-sm">
              <Icon path={mdiCog} size={1} />
            </Button>
            <Button variant="outline" size="icon-sm">
              <Icon path={mdiAccount} size={1} />
            </Button>
          </div>
        }
      />

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel - Asset Display and File Management */}
        <div className="w-1/2 bg-white border-r">
          <div className="p-6">
            {/* Asset Title */}
            <div className="flex items-center gap-2 mb-6">
              <Button variant="ghost" size="icon-sm">
                <Icon path={mdiArrowLeft} size={1} />
              </Button>
              <h1 className="text-xl font-semibold">Blue Scooter</h1>
            </div>

            {/* Main Image Preview */}
            <div className="mb-6">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Icon path={mdiAccount} size={2} className="text-blue-500" />
                  </div>
                  <p className="text-sm">Blue Scooter Image Preview</p>
                  <p className="text-xs text-gray-400">A cheerful couple rides a vintage blue scooter with a sidecar</p>
                </div>
              </div>
            </div>

            {/* All files section */}
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">All files</CardTitle>
                  <Button variant="ghost" size="icon-sm">
                    <Icon path={mdiChevronRight} size={1} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">BlueScooter_v2.jpg</p>
                      <p className="text-xs text-gray-500">Dec 6, 2024, 2:23 PM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50">
                    <div className="w-12 h-12 bg-gray-200 rounded"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">BlueScooter.jpg</p>
                      <p className="text-xs text-gray-500">Nov 26, 2024, 9:42 AM</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Rendition section */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-sm font-medium">Rendition</CardTitle>
                    <Badge variant="default" size="sm">5 items</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon-sm">
                      <Icon path={mdiRefresh} size={1} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon path={mdiPlus} size={1} />
                      Rendition
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">Original</p>
                      <p className="text-xs text-gray-500">1100 x 733 JPG - 665.39 KB</p>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <Icon path={mdiDownload} size={1} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">Alternative</p>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <Icon path={mdiDownload} size={1} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">Metadata</p>
                      <p className="text-xs text-gray-500">JSON - 901 Bytes</p>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <Icon path={mdiDownload} size={1} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50">
                    <div>
                      <p className="text-sm font-medium">Medium</p>
                      <p className="text-xs text-gray-500">1100 x 733 JPEG - 673.52 KB</p>
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <Icon path={mdiDownload} size={1} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Panel - Asset Information */}
        <div className="w-1/2 bg-gray-50">
          <div className="p-6">
            <div className="space-y-6">
              {/* Overview section */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Overview</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm">
                        <Icon path={mdiPencil} size={1} />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Icon path={mdiHistory} size={1} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Filename</label>
                      <p className="text-sm">Blue_scooter_version 232.jpg</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Title</label>
                      <p className="text-sm">Blue scooter</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Image analysis section */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Image analysis</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm">
                        <Icon path={mdiPencil} size={1} />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Icon path={mdiHistory} size={1} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">Tags</label>
                      <div className="flex flex-wrap gap-2">
                        <Badge colorScheme="neutral">vintage scooter</Badge>
                        <Badge colorScheme="neutral">sidecar</Badge>
                        <Badge colorScheme="neutral">retro vibes</Badge>
                        <Badge colorScheme="neutral">European architecture</Badge>
                        <Badge colorScheme="neutral">urban exploration</Badge>
                        <Badge colorScheme="neutral">fun</Badge>
                        <Badge colorScheme="neutral">joyful ride</Badge>
                        <Badge colorScheme="neutral">romantic escape</Badge>
                        <Badge colorScheme="neutral">helmet safety</Badge>
                        <Badge colorScheme="neutral">couple</Badge>
                        <Badge colorScheme="neutral">city adventure</Badge>
                        <Badge colorScheme="neutral">+11</Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">Description</label>
                      <p className="text-sm text-gray-700">
                        A cheerful couple rides a vintage blue scooter with a sidecar through a charming European street, radiating joy and freedom. Dressed in summer attire and helmets, they embody the spirit of carefree travel and retro romance.
                      </p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-2 block">Colors</label>
                      <div className="flex gap-2">
                        <Badge colorScheme="blue">Blue</Badge>
                        <Badge colorScheme="cyan">Light blue</Badge>
                        <Badge colorScheme="yellow">Orange</Badge>
                        <Badge colorScheme="neutral">Gray</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Production section */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Production</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm">
                        <Icon path={mdiPencil} size={1} />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Icon path={mdiHistory} size={1} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div>
                    <label className="text-xs text-gray-500">Production</label>
                    <p className="text-sm">Inhouse</p>
                  </div>
                </CardContent>
              </Card>

              {/* Product details section */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">Product details</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon-sm">
                        <Icon path={mdiPencil} size={1} />
                      </Button>
                      <Button variant="ghost" size="icon-sm">
                        <Icon path={mdiHistory} size={1} />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-500">Brands</label>
                      <p className="text-sm">Fruitful, New brand.</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Product families</label>
                      <p className="text-sm">&lt;&gt; Powerful Snack Bars.</p>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Catalogs</label>
                      <p className="text-sm">Fruitful Catalog 2024.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Top Right Panel - Tabbed Information */}
        <div className="w-80 bg-white border-l">
          <div className="p-6">
            <Tabs defaultValue="rights" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="system">System</TabsTrigger>
                <TabsTrigger value="project">Project</TabsTrigger>
                <TabsTrigger value="rights">Rights</TabsTrigger>
                <TabsTrigger value="comments">Comments</TabsTrigger>
              </TabsList>
              <TabsContent value="rights" className="mt-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium">DRM</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Restricted</span>
                        <span className="text-sm font-medium">Yes</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm">Has complex rights profiles</span>
                        <span className="text-sm font-medium">X</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-sm">Linked rights profiles</span>
                        <span className="text-sm text-gray-500">No results</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}