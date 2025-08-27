export interface Snippet {
  id: string
  title: string
  content: string
  type: 'cta' | 'banner' | 'notice' | 'form' | 'promo'
  tags: string[]
  version: number
  createdAt: string
  updatedAt: string
  createdBy: string
  status: 'active' | 'draft' | 'archived'
}

export interface SnippetVersion {
  version: number
  content: string
  createdAt: string
  createdBy: string
  changeNotes: string
}

export interface SnippetVersionHistory {
  snippetId: string
  versions: SnippetVersion[]
}

export interface User {
  email: string
  name: string
  role: 'viewer' | 'editor' | 'admin'
  permissions: string[]
}

export interface CreateSnippetData {
  title: string
  content: string
  type: Snippet['type']
  tags: string[]
  createdBy: string
}

export interface UpdateSnippetData {
  title?: string
  content?: string
  type?: Snippet['type']
  tags?: string[]
  status?: Snippet['status']
}

export interface SnippetFilters {
  type?: string
  tags?: string[]
  status?: string
  search?: string
} 