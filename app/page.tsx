"use client"

import { useState } from "react"
import { mdiMagnify, mdiPlus } from "@mdi/js"
import Icon from "@mdi/react"

import { TopBar } from "@/registry/new-york/ui/topbar"
import { Input } from "@/registry/new-york/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/registry/new-york/ui/select"
import { Button } from "@/registry/new-york/ui/button"
import { Checkbox } from "@/registry/new-york/ui/checkbox"
import { Badge } from "@/registry/new-york/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/registry/new-york/ui/table"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/registry/new-york/ui/pagination"

// Import the data
import data from "./data.json"

export default function Page() {
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set([0, 1, 2, 3, 4, 5]))
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [contentTypeFilter, setContentTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const itemsPerPage = 10
  const totalItems = data.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(new Set(data.map((_, index) => index)))
    } else {
      setSelectedItems(new Set())
    }
  }

  const handleSelectItem = (index: number, checked: boolean) => {
    const newSelected = new Set(selectedItems)
    if (checked) {
      newSelected.add(index)
    } else {
      newSelected.delete(index)
    }
    setSelectedItems(newSelected)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "success"
      case "DRAFT":
        return "warning"
      case "CHANGED":
        return "danger"
      default:
        return "neutral"
    }
  }

  const navigationItems = [
    { label: "Home", href: "#" },
    { label: "Content types", href: "#" },
    { label: "Content", href: "#", isActive: true },
    { label: "Media", href: "#" },
    { label: "Integration", href: "#" }
  ]

  // Logo configuration
  const logoImageSrc = "https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/logo-content_hub_one"
  const logoAlt = "Company Logo"

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        logoImageSrc={logoImageSrc}
        logoAlt={logoAlt}
        navigationItems={navigationItems}
        showHelpButton={false}
        showAvatar={false}
      />
      
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content</h1>
          <p className="text-gray-600">{totalItems} entries</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Icon path={mdiMagnify} size={1} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={contentTypeFilter} onValueChange={setContentTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Content type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All types</SelectItem>
              <SelectItem value="Content type 1">Content type 1</SelectItem>
              <SelectItem value="Content type 2">Content type 2</SelectItem>
              <SelectItem value="Content type 3">Content type 3</SelectItem>
              <SelectItem value="Content type 4">Content type 4</SelectItem>
              <SelectItem value="Content type 5">Content type 5</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="CHANGED">Changed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" size="sm">Publish</Button>
            <Button variant="outline" size="sm">Unpublish</Button>
            <Button variant="outline" size="sm">Duplicate</Button>
            <Button variant="outline" size="sm" className="text-red-600 border-red-600 hover:bg-red-50">Delete</Button>
            {selectedItems.size > 0 && (
              <span className="text-sm text-gray-600 self-center">{selectedItems.size} items selected</span>
            )}
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Icon path={mdiPlus} size={1} className="mr-2" />
            Add content
          </Button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedItems.size === data.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Content Type</TableHead>
                <TableHead>Updated By</TableHead>
                <TableHead>Updated On</TableHead>
                <TableHead>Published By</TableHead>
                <TableHead>Published On</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedItems.has(index)}
                      onCheckedChange={(checked) => handleSelectItem(index, checked as boolean)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.content_type}</TableCell>
                  <TableCell>{item.updated_by}</TableCell>
                  <TableCell>{item.updated_on}</TableCell>
                  <TableCell>{item.published_by}</TableCell>
                  <TableCell>{item.published_on}</TableCell>
                  <TableCell>
                    <Badge 
                      colorScheme={getStatusColor(item.status)}
                      variant="bold"
                      size="sm"
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={currentPage === 1}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={currentPage === 2}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive={currentPage === 3}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  )
}