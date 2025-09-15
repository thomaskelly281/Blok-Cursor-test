"use client"

import { mdiHome, mdiAccount, mdiCog, mdiChartLine, mdiFileDocument, mdiImage } from "@mdi/js"
import Icon from "@mdi/react"

import { TopBar } from "@/registry/new-york/ui/topbar"
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/registry/new-york/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/registry/new-york/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/registry/new-york/ui/carousel"

// Sample image data with titles
const imageData = [
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Mountain landscape",
    alt: "Beautiful mountain landscape with snow-capped peaks"
  },
  {
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    title: "Forest path",
    alt: "Serene forest path winding through tall trees"
  },
  {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    title: "Ocean waves",
    alt: "Powerful ocean waves crashing against rocky shore"
  },
  {
    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
    title: "City skyline",
    alt: "Modern city skyline at sunset with tall buildings"
  }
]

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col">
      {/* Topbar - Full width */}
      <TopBar 
        className="" 
        logoImageSrc="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore"
        navigationItems={[
          { label: "Dashboard", href: "#", isActive: true },
          { label: "Analytics", href: "#" },
          { label: "Reports", href: "#" },
          { label: "Settings", href: "#" }
        ]}
      />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <SidebarProvider>
          <Sidebar>
            <SidebarHeader>
              <div className="flex items-center gap-2 px-2">
                <Icon path={mdiHome} size={1} />
                <span className="font-semibold">Navigation</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <Icon path={mdiHome} size={1} />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon path={mdiChartLine} size={1} />
                    <span>Analytics</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon path={mdiFileDocument} size={1} />
                    <span>Reports</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon path={mdiImage} size={1} />
                    <span>Media</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon path={mdiAccount} size={1} />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icon path={mdiCog} size={1} />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>

          {/* Main content area */}
          <main className="flex-1 overflow-auto p-6">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">Welcome to your dashboard with image carousel</p>
              </div>

              {/* Image Carousel Card */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Image gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <Carousel className="w-full">
                    <CarouselContent>
                      {imageData.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="space-y-4">
                            <div className="aspect-video overflow-hidden rounded-lg">
                              <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="text-center">
                              <h3 className="text-lg font-semibold">{image.title}</h3>
                            </div>
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </CardContent>
              </Card>
            </div>
          </main>
        </SidebarProvider>
      </div>
    </div>
  )
}
