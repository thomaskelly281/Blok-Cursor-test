import { NextRequest, NextResponse } from 'next/server'
import { DataService } from '@/lib/data-service'
import { UpdateSnippetData } from '@/lib/types'

const dataService = new DataService()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const snippet = await dataService.getSnippetById(params.id)
    
    if (!snippet) {
      return NextResponse.json(
        { error: 'Snippet not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(snippet)
  } catch (error) {
    console.error('Error fetching snippet:', error)
    return NextResponse.json(
      { error: 'Failed to fetch snippet' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body: UpdateSnippetData & { updatedBy: string } = await request.json()
    const { updatedBy, ...updateData } = body
    
    if (!updatedBy) {
      return NextResponse.json(
        { error: 'updatedBy field is required' },
        { status: 400 }
      )
    }
    
    const snippet = await dataService.updateSnippet(params.id, updateData, updatedBy)
    
    if (!snippet) {
      return NextResponse.json(
        { error: 'Snippet not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(snippet)
  } catch (error) {
    console.error('Error updating snippet:', error)
    return NextResponse.json(
      { error: 'Failed to update snippet' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const success = await dataService.deleteSnippet(params.id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Snippet not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ message: 'Snippet deleted successfully' })
  } catch (error) {
    console.error('Error deleting snippet:', error)
    return NextResponse.json(
      { error: 'Failed to delete snippet' },
      { status: 500 }
    )
  }
} 