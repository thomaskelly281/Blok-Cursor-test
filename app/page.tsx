'use client'

import { useState, useEffect } from 'react'
import { Snippet } from '@/lib/types'
import { Button } from '@/registry/new-york/ui/button'
import { Input } from '@/registry/new-york/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/registry/new-york/ui/card'
import { Badge } from '@/registry/new-york/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/registry/new-york/ui/select'
import { Plus, Search, Filter, Copy, Eye, Edit, Trash2, Code, History } from 'lucide-react'
import { mdiHome, mdiCodeBraces, mdiCog } from '@mdi/js'
import Icon from '@mdi/react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/registry/new-york/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/registry/new-york/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/registry/new-york/ui/tabs'
import { Textarea } from '@/registry/new-york/ui/textarea'
import { Label } from '@/registry/new-york/ui/label'
import { toast } from 'sonner'
import { TopBar } from '@/registry/new-york/ui/topbar'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from '@/registry/new-york/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Page() {
  const [snippets, setSnippets] = useState<Snippet[]>([])
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedSnippet, setSelectedSnippet] = useState<Snippet | null>(null)
  const [snippetToDelete, setSnippetToDelete] = useState<Snippet | null>(null)
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    content: '',
    type: 'cta' as Snippet['type'],
    tags: '',
    createdBy: 'marketing@company.com'
  })

  const pathname = usePathname()

  useEffect(() => {
    fetchSnippets()
  }, [])

  useEffect(() => {
    filterSnippets()
  }, [snippets, searchTerm, typeFilter, statusFilter])

  const fetchSnippets = async () => {
    try {
      const response = await fetch('/api/snippets')
      const data = await response.json()
      setSnippets(data)
    } catch (error) {
      console.error('Error fetching snippets:', error)
      toast.error('Failed to fetch snippets')
    }
  }

  const filterSnippets = () => {
    let filtered = [...snippets]

    if (searchTerm) {
      filtered = filtered.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (typeFilter && typeFilter !== 'all') {
      filtered = filtered.filter(snippet => snippet.type === typeFilter)
    }

    if (statusFilter && statusFilter !== 'all') {
      filtered = filtered.filter(snippet => snippet.status === statusFilter)
    }

    setFilteredSnippets(filtered)
  }

  const handleCreateSnippet = async () => {
    try {
      const response = await fetch('/api/snippets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newSnippet,
          tags: newSnippet.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        })
      })

      if (response.ok) {
        toast.success('Snippet created successfully')
        setIsCreateDialogOpen(false)
        setNewSnippet({ title: '', content: '', type: 'cta', tags: '', createdBy: 'marketing@company.com' })
        fetchSnippets()
      } else {
        toast.error('Failed to create snippet')
      }
    } catch (error) {
      console.error('Error creating snippet:', error)
      toast.error('Failed to create snippet')
    }
  }

  const handleDeleteSnippet = async (snippet: Snippet) => {
    setSnippetToDelete(snippet)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!snippetToDelete) return

    try {
      const response = await fetch(`/api/snippets/${snippetToDelete.id}`, { method: 'DELETE' })
      if (response.ok) {
        toast.success('Snippet deleted successfully')
        setIsDeleteDialogOpen(false)
        setSnippetToDelete(null)
        fetchSnippets()
      } else {
        toast.error('Failed to delete snippet')
      }
    } catch (error) {
      console.error('Error deleting snippet:', error)
      toast.error('Failed to delete snippet')
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

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-100 text-green-800',
      draft: 'bg-yellow-100 text-yellow-800',
      archived: 'bg-gray-100 text-gray-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
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
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Sitecore Snippet Manager</h1>
              <p className="text-gray-600">Create, manage, and deploy content snippets across your properties</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search snippets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="cta">CTA</SelectItem>
                    <SelectItem value="banner">Banner</SelectItem>
                    <SelectItem value="notice">Notice</SelectItem>
                    <SelectItem value="form">Form</SelectItem>
                    <SelectItem value="promo">Promo</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    New Snippet
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Snippet</DialogTitle>
                    <DialogDescription>Create a new content snippet for your properties</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newSnippet.title}
                        onChange={(e) => setNewSnippet({ ...newSnippet, title: e.target.value })}
                        placeholder="Enter snippet title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={newSnippet.type} onValueChange={(value) => setNewSnippet({ ...newSnippet, type: value as Snippet['type'] })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cta">CTA</SelectItem>
                          <SelectItem value="banner">Banner</SelectItem>
                          <SelectItem value="notice">Notice</SelectItem>
                          <SelectItem value="form">Form</SelectItem>
                          <SelectItem value="promo">Promo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma-separated)</Label>
                      <Input
                        id="tags"
                        value={newSnippet.tags}
                        onChange={(e) => setNewSnippet({ ...newSnippet, tags: e.target.value })}
                        placeholder="holiday, sale, cta"
                      />
                    </div>
                    <div>
                      <Label htmlFor="content">Content (HTML)</Label>
                      <Textarea
                        id="content"
                        value={newSnippet.content}
                        onChange={(e) => setNewSnippet({ ...newSnippet, content: e.target.value })}
                        placeholder="Enter HTML content for the snippet"
                        rows={6}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleCreateSnippet}>Create Snippet</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Snippets Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSnippets.map((snippet) => (
                <Card key={snippet.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{snippet.title}</CardTitle>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={getTypeColor(snippet.type)}>{snippet.type}</Badge>
                          <Badge className={getStatusColor(snippet.status)}>{snippet.status}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {snippet.tags.map((tag, index) => (
                            <Badge key={index} className="text-xs bg-gray-100 text-gray-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Version {snippet.version}</p>
                      <p className="text-sm text-gray-500">
                        Created: {new Date(snippet.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedSnippet(snippet)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedSnippet(snippet)
                          setIsViewDialogOpen(true)
                        }}
                      >
                        <Code className="h-4 w-4 mr-1" />
                        Embed
                      </Button>
                                             <Button
                         variant="outline"
                         size="sm"
                         onClick={() => handleDeleteSnippet(snippet)}
                       >
                         <Trash2 className="h-4 w-4 mr-1" />
                       </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredSnippets.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No snippets found. Create your first snippet to get started!</p>
              </div>
            )}

            {/* View/Embed Dialog */}
            <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{selectedSnippet?.title}</DialogTitle>
                  <DialogDescription>View snippet details and get embed code</DialogDescription>
                </DialogHeader>
                
                {selectedSnippet && (
                  <Tabs defaultValue="preview" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="code">HTML Code</TabsTrigger>
                      <TabsTrigger value="embed">Embed</TabsTrigger>
                      <TabsTrigger value="history">History</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="preview" className="mt-4">
                      <div className="border rounded-lg p-4 bg-white">
                        <div dangerouslySetInnerHTML={{ __html: selectedSnippet.content }} />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="code" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <Label>HTML Content</Label>
                          <div className="relative">
                            <Textarea
                              value={selectedSnippet.content}
                              readOnly
                              rows={8}
                              className="font-mono text-sm"
                            />
                            <Button
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(selectedSnippet.content)}
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="embed" className="mt-4">
                      <div className="space-y-4">
                        <div>
                          <Label>JavaScript Embed Code</Label>
                          <div className="relative">
                            <Textarea
                              value={`<script src="/api/snippets/${selectedSnippet.id}/embed.js"></script>`}
                              readOnly
                              rows={3}
                              className="font-mono text-sm"
                            />
                            <Button
                              size="sm"
                              className="absolute top-2 right-2"
                              onClick={() => copyToClipboard(`<script src="/api/snippets/${selectedSnippet.id}/embed.js"></script>`)}
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <Label>Iframe Embed Code</Label>
                          <div className="relative">
                            <Textarea
                              value={`<iframe src="/api/snippets/${selectedSnippet.id}/embed" width="100%" height="auto" frameborder="0"></iframe>`}
                              readOnly
                              rows={3}
                              className="font-mono text-sm"
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
                    
                    <TabsContent value="history" className="mt-4">
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Version {selectedSnippet.version} - {new Date(selectedSnippet.updatedAt).toLocaleString()}</p>
                        <p className="text-sm text-gray-500">Created by: {selectedSnippet.createdBy}</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                )}
              </DialogContent>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Snippet</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete "{snippetToDelete?.title}"? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    colorScheme="danger"
                    onClick={confirmDelete}
                  >
                    Delete Snippet
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </main>
      </div>
    </div>
  )
}