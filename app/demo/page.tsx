'use client'

import { useState, useEffect } from 'react'
import { Snippet } from '@/lib/types'
import { Button } from '@/registry/new-york/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/registry/new-york/ui/card'
import { Badge } from '@/registry/new-york/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york/ui/tabs'
import { Code, ExternalLink, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { TopBar } from '@/registry/new-york/ui/topbar'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from '@/registry/new-york/ui/sidebar'
import { mdiHome, mdiCodeBraces, mdiCog } from '@mdi/js'
import Icon from '@mdi/react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function DemoPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null)
  const [embedCode, setEmbedCode] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    fetchSnippets()
  }, [])

  const fetchSnippets = async () => {
    try {
      const response = await fetch('/api/snippets')
      const data = await response.json()
      setSnippets(data.filter((s: Snippet) => s.status === 'active'))
    } catch (error) {
      console.error('Error fetching snippets:', error)
    }
  }

  const generateEmbedCode = async (snippet: Snippet) => {
    try {
      const response = await fetch(`/api/snippets/${snippet.id}/embed`)
      const data = await response.json()
      setEmbedCode(data.embedCode)
      setSelectedSnippet(snippet)
    } catch (error) {
      console.error('Error generating embed code:', error)
      toast.error('Failed to generate embed code')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('Copied to clipboard')
  }

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      cta: 'bg-blue-100 text-blue-800',
      banner: 'bg-yellow-100 text-yellow-800',
      notice: 'bg-gray-100 text-gray-800',
      form: 'bg-purple-100 text-purple-800',
      promo: 'bg-green-100 text-green-800'
    }
    return colors[type] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="flex h-screen flex-col">
      {/* TopBar - Full width */}
      <TopBar 
        className="" 
        logoImageSrc="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-sitecore"
        navigationItems={[
          { label: "Dashboard", href: "/", isActive: pathname === "/" },
          { label: "Demo", href: "/demo", isActive: pathname === "/demo" },
          { label: "Settings", href: "#" }
        ]}
        customLogo={
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-xl text-gray-900">Snippet Manager</span>
          </div>
        }
      />

      {/* Main content area with sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Left side, full height */}
        <SidebarProvider className="w-64 bg-subtle-bg">
          <Sidebar className="w-64 bg-subtle-bg">
            <SidebarHeader className="px-4 pt-4">
              <div className="py-1.5 text-sm font-semibold uppercase text-subtle-text">Snippet Manager</div>
            </SidebarHeader>
            <SidebarContent className="px-2 pb-4">
              <SidebarMenu>
                                 <SidebarMenuItem>
                   <Link href="/">
                     <SidebarMenuButton isActive={pathname === "/"}>
                       <Icon path={mdiHome} size={1} />
                       <span>Dashboard</span>
                     </SidebarMenuButton>
                   </Link>
                 </SidebarMenuItem>
                 <SidebarMenuItem>
                   <Link href="/demo">
                     <SidebarMenuButton isActive={pathname === "/demo"}>
                       <Icon path={mdiCodeBraces} size={1} />
                       <span>Demo & Embed</span>
                     </SidebarMenuButton>
                   </Link>
                 </SidebarMenuItem>
                 <SidebarMenuItem>
                   <Link href="#">
                     <SidebarMenuButton>
                       <Icon path={mdiCog} size={1} />
                       <span>Settings</span>
                     </SidebarMenuButton>
                   </Link>
                 </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>

        {/* Main content area - Right side */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="mx-6 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Snippet Embed Demo</h1>
              <p className="text-gray-600">See how your snippets look when embedded and get the code to use them</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Available Snippets */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Available Snippets</h2>
                <div className="space-y-4">
                  {snippets.map((snippet) => (
                    <Card key={snippet.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2">{snippet.title}</CardTitle>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={getTypeColor(snippet.type)}>{snippet.type}</Badge>
                              <span className="text-sm text-gray-500">v{snippet.version}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {snippet.tags.map((tag, index) => (
                                <Badge key={index} className="text-xs bg-gray-100 text-gray-700">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => generateEmbedCode(snippet)}
                          >
                            <Code className="h-4 w-4 mr-1" />
                            Embed
                          </Button>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Embed Preview */}
              <div>
                <h2 className="text-2xl font-semibold mb-4">Embed Preview & Code</h2>
                
                {selectedSnippet ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{selectedSnippet.title}</CardTitle>
                      <p className="text-sm text-gray-600">Preview and embed code for this snippet</p>
                    </CardHeader>
                    <CardContent>
                      <Tabs defaultValue="preview" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="preview">Preview</TabsTrigger>
                          <TabsTrigger value="code">Embed Code</TabsTrigger>
                          <TabsTrigger value="test">Test Page</TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="preview" className="mt-4">
                          <div className="border rounded-lg p-4 bg-white">
                            <div dangerouslySetInnerHTML={{ __html: selectedSnippet.content }} />
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="code" className="mt-4">
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">JavaScript Embed</h4>
                              <div className="relative">
                                <textarea
                                  value={embedCode}
                                  readOnly
                                  rows={4}
                                  className="w-full p-3 bg-gray-50 border rounded font-mono text-sm"
                                />
                                <Button
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => copyToClipboard(embedCode)}
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Direct URL</h4>
                              <div className="relative">
                                <textarea
                                  value={`/api/snippets/${selectedSnippet.id}/embed.js`}
                                  readOnly
                                  rows={2}
                                  className="w-full p-3 bg-gray-50 border rounded font-mono text-sm"
                                />
                                <Button
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => copyToClipboard(`/api/snippets/${selectedSnippet.id}/embed.js`)}
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy
                                </Button>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Iframe Embed</h4>
                              <div className="relative">
                                <textarea
                                  value={`<iframe src="/api/snippets/${selectedSnippet.id}/embed" width="100%" height="auto" frameborder="0"></iframe>`}
                                  readOnly
                                  rows={2}
                                  className="w-full p-3 bg-gray-50 border rounded font-mono text-sm"
                                />
                                <Button
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => copyToClipboard(`<iframe src="/api/snippets/${selectedSnippet.id}/embed" width="100%" height="auto" frameborder="0"></iframe>`)}
                                >
                                  <Copy className="h-4 w-4 mr-1" />
                                  Copy
                                </Button>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="test" className="mt-4">
                          <div className="space-y-4">
                            <p className="text-sm text-gray-600">
                              Test this snippet on a demo page to see how it behaves in a real website context.
                            </p>
                            
                            <div className="border rounded-lg p-4 bg-gray-50">
                              <h4 className="font-medium mb-2">Demo Website</h4>
                              <p className="text-sm text-gray-600 mb-3">
                                This is a simulated website where you can see how the snippet would appear:
                              </p>
                              
                              <div className="bg-white border rounded p-4 mb-4">
                                <h1 className="text-2xl font-bold mb-4">Welcome to Demo Website</h1>
                                <p className="mb-4">This is a sample page content. Below you'll see the embedded snippet:</p>
                                
                                {/* Snippet will be embedded here */}
                                <div id={`sitecore-snippet-${selectedSnippet.id}`} className="my-4">
                                  <div dangerouslySetInnerHTML={{ __html: selectedSnippet.content }} />
                                </div>
                                
                                <p className="mt-4">This is more page content after the snippet.</p>
                              </div>
                              
                              <div className="text-xs text-gray-500">
                                <p>💡 The snippet above is embedded directly in this demo. In a real website, it would be loaded dynamically.</p>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center text-gray-500">
                        <Code className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Select a snippet to see its embed preview and code</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Integration Guide */}
            <div className="mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Guide</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-3">How to Use Snippets</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">1. JavaScript Embed (Recommended)</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Add the script tag to your HTML head or before the closing body tag. The snippet will automatically appear on your page.
                        </p>
                        <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                          &lt;script src="/api/snippets/[ID]/embed.js"&gt;&lt;/script&gt;
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">2. Iframe Embed</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Use an iframe for more control over positioning and styling. Good for isolated content areas.
                        </p>
                        <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                          &lt;iframe src="/api/snippets/[ID]/embed"&gt;&lt;/iframe&gt;
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Targeting Specific Elements</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        To place a snippet in a specific location, add a data attribute to your HTML:
                      </p>
                      <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                        &lt;div data-sitecore-snippet="[ID]"&gt;&lt;/div&gt;
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Event Handling</h4>
                      <p className="text-sm text-gray-600 mb-2">
                        Listen for snippet load events to customize behavior:
                      </p>
                      <div className="bg-gray-50 p-3 rounded text-xs font-mono">
                        {`document.addEventListener('sitecore-snippet-loaded', (event) => {
  console.log('Snippet loaded:', event.detail);
});`}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
} 