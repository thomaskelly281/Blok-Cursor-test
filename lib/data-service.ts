import { promises as fs } from 'fs'
import path from 'path'
import { Snippet, SnippetVersionHistory, User, CreateSnippetData, UpdateSnippetData } from './types'

const DATA_DIR = path.join(process.cwd(), 'data')

export class DataService {
  private async readJsonFile<T>(filename: string): Promise<T> {
    try {
      const filePath = path.join(DATA_DIR, filename)
      const data = await fs.readFile(filePath, 'utf-8')
      return JSON.parse(data) as T
    } catch (error) {
      console.error(`Error reading ${filename}:`, error)
      return [] as T
    }
  }

  private async writeJsonFile<T>(filename: string, data: T): Promise<void> {
    try {
      const filePath = path.join(DATA_DIR, filename)
      await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    } catch (error) {
      console.error(`Error writing ${filename}:`, error)
      throw new Error(`Failed to write ${filename}`)
    }
  }

  // Snippet operations
  async getAllSnippets(): Promise<Snippet[]> {
    return this.readJsonFile<Snippet[]>('snippets.json')
  }

  async getSnippetById(id: string): Promise<Snippet | null> {
    const snippets = await this.getAllSnippets()
    return snippets.find(s => s.id === id) || null
  }

  async createSnippet(data: CreateSnippetData): Promise<Snippet> {
    const snippets = await this.getAllSnippets()
    const newSnippet: Snippet = {
      id: Date.now().toString(),
      ...data,
      version: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'active'
    }
    
    snippets.push(newSnippet)
    await this.writeJsonFile('snippets.json', snippets)
    
    // Create version history
    await this.createVersionHistory(newSnippet.id, newSnippet.content, data.createdBy, 'Initial version')
    
    return newSnippet
  }

  async updateSnippet(id: string, data: UpdateSnippetData, updatedBy: string): Promise<Snippet | null> {
    const snippets = await this.getAllSnippets()
    const snippetIndex = snippets.findIndex(s => s.id === id)
    
    if (snippetIndex === -1) return null
    
    const oldSnippet = snippets[snippetIndex]
    const updatedSnippet: Snippet = {
      ...oldSnippet,
      ...data,
      version: oldSnippet.version + 1,
      updatedAt: new Date().toISOString()
    }
    
    snippets[snippetIndex] = updatedSnippet
    await this.writeJsonFile('snippets.json', snippets)
    
    // Update version history if content changed
    if (data.content && data.content !== oldSnippet.content) {
      await this.createVersionHistory(id, data.content, updatedBy, 'Content updated')
    }
    
    return updatedSnippet
  }

  async deleteSnippet(id: string): Promise<boolean> {
    const snippets = await this.getAllSnippets()
    const filteredSnippets = snippets.filter(s => s.id !== id)
    
    if (filteredSnippets.length === snippets.length) return false
    
    await this.writeJsonFile('snippets.json', filteredSnippets)
    return true
  }

  // Version history operations
  async getVersionHistory(snippetId: string): Promise<SnippetVersionHistory | null> {
    const versions = await this.readJsonFile<SnippetVersionHistory[]>('versions.json')
    return versions.find(v => v.snippetId === snippetId) || null
  }

  private async createVersionHistory(snippetId: string, content: string, createdBy: string, changeNotes: string): Promise<void> {
    const versions = await this.readJsonFile<SnippetVersionHistory[]>('versions.json')
    const existingHistory = versions.find(v => v.snippetId === snippetId)
    
    const newVersion = {
      version: existingHistory ? Math.max(...existingHistory.versions.map(v => v.version)) + 1 : 1,
      content,
      createdAt: new Date().toISOString(),
      createdBy,
      changeNotes
    }
    
    if (existingHistory) {
      existingHistory.versions.push(newVersion)
    } else {
      versions.push({
        snippetId,
        versions: [newVersion]
      })
    }
    
    await this.writeJsonFile('versions.json', versions)
  }

  // User operations
  async getAllUsers(): Promise<User[]> {
    return this.readJsonFile<User[]>('users.json')
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const users = await this.getAllUsers()
    return users.find(u => u.email === email) || null
  }

  // Search and filter operations
  async searchSnippets(filters: { type?: string; tags?: string[]; status?: string; search?: string }): Promise<Snippet[]> {
    let snippets = await this.getAllSnippets()
    
    if (filters.type) {
      snippets = snippets.filter(s => s.type === filters.type)
    }
    
    if (filters.tags && filters.tags.length > 0) {
      snippets = snippets.filter(s => filters.tags!.some(tag => s.tags.includes(tag)))
    }
    
    if (filters.status) {
      snippets = snippets.filter(s => s.status === filters.status)
    }
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      snippets = snippets.filter(s => 
        s.title.toLowerCase().includes(searchLower) ||
        s.content.toLowerCase().includes(searchLower) ||
        s.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    }
    
    return snippets
  }
} 