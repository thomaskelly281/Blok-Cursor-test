import { NextRequest, NextResponse } from 'next/server'
import { DataService } from '@/lib/data-service'

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
    
    const embedCode = `<script>
  (function() {
    var script = document.createElement('script');
    script.src = '${request.nextUrl.origin}/api/snippets/${params.id}/embed.js';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>`
    
    const embedData = {
      snippetId: params.id,
      title: snippet.title,
      type: snippet.type,
      embedCode,
      directUrl: `${request.nextUrl.origin}/api/snippets/${params.id}/embed.js`,
      iframeCode: `<iframe src="${request.nextUrl.origin}/api/snippets/${params.id}/embed" width="100%" height="auto" frameborder="0" scrolling="no"></iframe>`
    }
    
    return NextResponse.json(embedData)
  } catch (error) {
    console.error('Error generating embed code:', error)
    return NextResponse.json(
      { error: 'Failed to generate embed code' },
      { status: 500 }
    )
  }
} 