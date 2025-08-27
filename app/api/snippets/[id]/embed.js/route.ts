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
    
    // Generate JavaScript that will inject the snippet content
    const jsCode = `
(function() {
  'use strict';
  
  // Create snippet container
  var snippetContainer = document.createElement('div');
  snippetContainer.id = 'sitecore-snippet-${params.id}';
  snippetContainer.innerHTML = \`${snippet.content}\`;
  
  // Add some basic styling to prevent conflicts
  snippetContainer.style.cssText = 'font-family: inherit; line-height: inherit;';
  
  // Find the best place to insert the snippet
  var targetElement = document.querySelector('[data-sitecore-snippet="${params.id}"]') || 
                     document.querySelector('#sitecore-snippet-${params.id}') ||
                     document.body;
  
  // Insert the snippet
  if (targetElement) {
    targetElement.appendChild(snippetContainer);
  }
  
  // Dispatch event for external scripts to listen to
  var event = new CustomEvent('sitecore-snippet-loaded', {
    detail: {
      snippetId: '${params.id}',
      title: '${snippet.title}',
      type: '${snippet.type}'
    }
  });
  document.dispatchEvent(event);
})();
`
    
    return new NextResponse(jsCode, {
      headers: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
      },
    })
  } catch (error) {
    console.error('Error serving snippet embed:', error)
    return NextResponse.json(
      { error: 'Failed to serve snippet embed' },
      { status: 500 }
    )
  }
} 