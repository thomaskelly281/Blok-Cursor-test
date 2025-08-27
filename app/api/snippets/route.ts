import { NextRequest, NextResponse } from 'next/server'
import { DataService } from '@/lib/data-service'
import { CreateSnippetData } from '@/lib/types'

const dataService = new DataService()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || undefined
    const tags = searchParams.get('tags')?.split(',') || undefined
    const status = searchParams.get('status') || undefined
    const search = searchParams.get('search') || undefined

    const filters = { type, tags, status, search }
    const snippets = await dataService.searchSnippets(filters)
    
    return NextResponse.json(snippets)
  } catch (error) {
    console.error('Error fetching snippets:', error)
    return NextResponse.json(
      { error: 'Failed to fetch snippets' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateSnippetData = await request.json()
    
    // Basic validation
    if (!body.title || !body.content || !body.type || !body.createdBy) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const snippet = await dataService.createSnippet(body)
    return NextResponse.json(snippet, { status: 201 })
  } catch (error) {
    console.error('Error creating snippet:', error)
    return NextResponse.json(
      { error: 'Failed to create snippet' },
      { status: 500 }
    )
  }
} 