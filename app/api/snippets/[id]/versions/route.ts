import { NextRequest, NextResponse } from 'next/server'
import { DataService } from '@/lib/data-service'

const dataService = new DataService()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const versionHistory = await dataService.getVersionHistory(params.id)
    
    if (!versionHistory) {
      return NextResponse.json(
        { error: 'Version history not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(versionHistory)
  } catch (error) {
    console.error('Error fetching version history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch version history' },
      { status: 500 }
    )
  }
} 