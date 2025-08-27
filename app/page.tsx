"use client"

import { TopBar } from "@/registry/new-york/ui/topbar"
import { Button } from "@/registry/new-york/ui/button"
import { Input } from "@/registry/new-york/ui/input"
import { Card, CardContent } from "@/registry/new-york/ui/card"
import { Badge } from "@/registry/new-york/ui/badge"
import { Textarea } from "@/registry/new-york/ui/textarea"
import { useState } from "react"

export default function Page() {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Administrator",
      content: "@Thomas Edward Kelly Testing",
      timestamp: "less than a minute ago",
      avatar: "bg-gray-300"
    }
  ])
  
  const [newComment, setNewComment] = useState("")
  const [isAddingComment, setIsAddingComment] = useState(false)

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: "You",
        content: newComment,
        timestamp: "just now",
        avatar: "bg-blue-500"
      }
      setComments([comment, ...comments])
      setNewComment("")
      setIsAddingComment(false)
    }
  }

  const handleCancelComment = () => {
    setNewComment("")
    setIsAddingComment(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <TopBar 
        className="shadow-base z-10 relative"
        showDotMenu={false}
        navigationItems={[
          { label: "Campaigns", href: "#" },
          { label: "Products", href: "#" },
          { label: "Content", href: "#" },
          { label: "Assets", href: "#" },
          { label: "Collections", href: "#" },
          { label: "Project", href: "#" },
          { label: "Publisher", href: "#" },
          { label: "Create", href: "#" },
          { label: "Review", href: "#" },
          { label: "DRM", href: "#" },
          { label: "Studio (Preview)", href: "#" },
          { label: "Resources", href: "#" }
        ]}
      />

      {/* Title Bar with Buttons */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 -mt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            <h2 className="text-2xl font-semibold text-gray-900">Annotations</h2>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">Download PDF</Button>
            <Button variant="outline">Compare</Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 p-0">
        {/* Left Side - Main Content */}
        <div className="flex-1">
          {/* Editing Tools Bar */}
          <Card className="p-0">
            <CardContent className="">
              <div className="flex items-center justify-between p-0 bg-neutral-50 px-4">
                <div className="flex items-center space-x-4">
                  {/* Document/Image Icon */}
                  <Button variant="ghost" size="icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </Button>
                  
                  {/* Zoom Controls */}
                  <div className="flex items-center space-x-2">
                    <select className="text-sm border border-gray-300 rounded px-2 py-1">
                      <option>120%</option>
                      <option>100%</option>
                      <option>75%</option>
                      <option>50%</option>
                    </select>
                    <Button variant="ghost" size="icon">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </Button>
                  </div>

                  {/* Tools */}
                  <Button variant="ghost" size="icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </Button>
                </div>

                <div className="flex items-center space-x-6">
                  <Button variant="ghost">View</Button>
                  <Button variant="ghost">Annotate</Button>
                  <Badge variant="default" className="bg-blue-50 text-blue-600 hover:bg-blue-100">Shapes</Badge>
                </div>
              </div>

              {/* Shape Tools */}
              <div className=" border-t border-gray-200 flex justify-center py-2 bg-neutral-100">
                <div className="flex items-center space-x-3">
                  <Button variant="ghost" size="icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h18v18H3z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="text-blue-600 bg-blue-100 border-2 border-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3z" />
                    </svg>
                  </Button>
                  
                  {/* Color Picker */}
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded border-2 border-gray-300"></div>
                    <div className="w-6 h-6 bg-green-500 rounded border-2 border-gray-300"></div>
                  </div>

                  {/* Undo/Redo */}
                  <Button variant="ghost" size="icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10h-10a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6" />
                    </svg>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Display Area - Blank */}
          <Card className="bg-neutral-50">
            <CardContent className="px-6 py-0">
              <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ aspectRatio: '16/9' }}>
                {/* Blank area for image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg font-medium">Image Area</p>
                    <p className="text-sm">Upload or drag an image here</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar - Comments */}
        <div className="w-80 bg-white border-l border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Comments</h3>
            <Button variant="ghost" size="icon">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Button>
          </div>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Search comments..."
              className="pl-10"
            />
            <svg className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Add Comment Section */}
          <div className="mb-6">
            {!isAddingComment ? (
              <Button 
                onClick={() => setIsAddingComment(true)}
                className="w-full justify-start text-gray-600 hover:text-gray-900"
                variant="outline"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add a comment...
              </Button>
            ) : (
              <Card className="p-4">
                <Textarea
                  placeholder="Write your comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-3 min-h-[80px] resize-none"
                />
                <div className="flex items-center justify-end space-x-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleCancelComment}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleAddComment}
                    disabled={!newComment.trim()}
                  >
                    Comment
                  </Button>
                </div>
              </Card>
            )}
          </div>
          
          {/* Sort Options */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Created on</span>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <Button variant="ghost" size="icon">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </Button>
          </div>
          
          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="px-2">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-3">
                    <div className={`w-8 h-8 ${comment.avatar} rounded-full flex-shrink-0`}></div>
                    <div className="flex-1 min-w-0 px-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{comment.author}</p>
                        <Button variant="ghost" size="icon">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                          </svg>
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{comment.timestamp}</p>
                      <p className="text-sm text-gray-900">{comment.content}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  )
}