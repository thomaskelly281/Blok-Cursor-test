# Sitecore Snippet Manager MVP

A lightweight content snippet management system for marketers and developers to create, manage, and deploy small reusable content snippets across multiple websites without requiring the full Sitecore platform.

## 🎯 Purpose

Provide marketers with a lightweight way to create, manage, and deploy small reusable content snippets (CTAs, banners, notices, promos) without requiring the full Sitecore platform.

## 🚀 Features

### Core Functionality
- **Snippet Creation & Management**: Create, edit, and delete content snippets with rich HTML support
- **Version History**: Track changes and rollback to previous versions
- **Tagging & Organization**: Organize snippets with tags and categories
- **Search & Filtering**: Find snippets quickly by type, status, tags, or content
- **Status Management**: Control snippet lifecycle (active, draft, archived)

### Deployment Options
- **JavaScript Embed**: Dynamic script loading for seamless integration
- **Iframe Embed**: Isolated content areas with full control
- **API Endpoints**: RESTful API for programmatic access
- **Copy-Paste Code**: Easy integration for developers

### User Experience
- **Modern UI**: Clean, responsive interface built with shadcn/ui
- **Real-time Preview**: See how snippets look before deployment
- **Embed Code Generation**: Automatic code generation for different platforms
- **Demo Environment**: Test snippets in a simulated website context

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 15 with React 19
- **UI Components**: shadcn/ui with Tailwind CSS
- **Data Storage**: Local JSON files (no database required)
- **API**: RESTful API routes with Next.js API routes
- **TypeScript**: Full type safety throughout the application

### Data Structure
```
data/
├── snippets.json      # Main snippet data
├── versions.json      # Version history
└── users.json        # User permissions
```

### API Endpoints
- `GET /api/snippets` - List all snippets with filtering
- `POST /api/snippets` - Create new snippet
- `GET /api/snippets/[id]` - Get specific snippet
- `PUT /api/snippets/[id]` - Update snippet
- `DELETE /api/snippets/[id]` - Delete snippet
- `GET /api/snippets/[id]/versions` - Get version history
- `GET /api/snippets/[id]/embed` - Get embed information
- `GET /api/snippets/[id]/embed.js` - Get JavaScript embed code

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Sample Data
The application comes with sample snippets including:
- Seasonal CTA buttons
- Privacy notices
- Maintenance banners
- Newsletter signup forms

## 📖 Usage

### Creating Snippets
1. Navigate to the Dashboard
2. Click "New Snippet"
3. Fill in title, content (HTML), type, and tags
4. Click "Create Snippet"

### Embedding Snippets
1. Go to the Demo page
2. Select a snippet
3. Copy the embed code
4. Paste into your website

### Embedding Options

#### JavaScript Embed (Recommended)
```html
<script src="/api/snippets/[ID]/embed.js"></script>
```

#### Iframe Embed
```html
<iframe src="/api/snippets/[ID]/embed" width="100%" height="auto" frameborder="0"></iframe>
```

#### Targeted Placement
```html
<div data-sitecore-snippet="[ID]"></div>
```

## 🔧 Configuration

### Environment Variables
No environment variables required for local development.

### Data Files
- Modify `data/snippets.json` to add/edit sample data
- Update `data/users.json` to manage user permissions
- Version history is automatically maintained

## 🎨 Customization

### Styling
- Uses Tailwind CSS for styling
- Customizable through `app/globals.css`
- Component variants available through shadcn/ui

### Content Types
Supported snippet types:
- `cta` - Call-to-action buttons
- `banner` - Informational banners
- `notice` - Legal/important notices
- `form` - Interactive forms
- `promo` - Promotional content

## 🔒 Security

### Current Implementation
- Local development only
- No authentication required
- Basic permission system in place

### Production Considerations
- Implement proper authentication
- Add rate limiting
- Secure API endpoints
- Database integration
- CDN for static assets

## 🚧 Limitations (MVP)

- **Local Storage**: Data stored in JSON files (not suitable for production)
- **No Authentication**: Basic permission system only
- **Single Instance**: No multi-tenancy support
- **Limited Analytics**: Basic usage tracking only
- **No CDN**: Static assets served locally

## 🛣️ Roadmap

### v1.1
- User authentication and authorization
- Database integration (PostgreSQL/MongoDB)
- Advanced search and filtering
- Bulk operations

### v1.2
- Analytics and usage tracking
- A/B testing support
- Content scheduling
- API rate limiting

### v2.0
- Multi-tenant support
- Advanced personalization
- Content workflows
- Enterprise integrations

## 🤝 Contributing

This is an MVP demonstration. For production use, consider:
- Adding proper authentication
- Implementing database storage
- Adding comprehensive testing
- Setting up CI/CD pipelines

## 📄 License

This project is for demonstration purposes. Please ensure compliance with Sitecore licensing for production use.

## 🆘 Support

For questions or issues:
1. Check the demo page for usage examples
2. Review the API documentation
3. Examine the sample data structure
4. Check browser console for errors

---

**Note**: This MVP is designed for local development and demonstration purposes. It showcases the core functionality of a snippet management system without the complexity of production infrastructure.

 