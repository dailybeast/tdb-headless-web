# The Looker - News Website

A modern news website built with Astro SSR, designed to be a sub-brand of The Daily Beast. This project is built for scalability and will eventually power the entire Daily Beast website.

## Project Status

### Completed
- Core infrastructure with Astro SSR and Cloudflare Workers adapter
- Tailwind CSS v4 with Shadcn UI components
- Content Cache API integration with Cloudflare Access authentication
- Homepage with article grid layout
- Article pages with dynamic routing
- 404 page with popular article placeholders
- Author and tag archive pages

### In Progress
- Additional content block components
- SEO meta tags
- User authentication (Zephr)

### TODO
- Google Tag Manager integration
- Performance optimizations
- Production deployment configuration

## Tech Stack

- Framework: Astro v5.13 with SSR
- Deployment: Cloudflare Workers
- Styling: Tailwind CSS v4 + Shadcn UI
- Content Source: ArcXP via Content Cache API
- Language: TypeScript

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Access to The Daily Beast Content Cache API
- Cloudflare Access credentials

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and add your API credentials
4. Start development server: `npm run dev`

The site will be available at http://localhost:4321

## Commands

- `npm install` - Install dependencies
- `npm run dev` - Start dev server at localhost:4321
- `npm run build` - Build for production to ./dist/
- `npm run preview` - Preview production build locally
- `npx astro check` - Type-check .astro files

## Configuration

### Environment Variables

Create a `.env` file with:

```
CONTENT_CACHE_API_URL=https://sandbox-api.stg.thedailybeast.com
CF_ACCESS_CLIENT_ID=your_client_id
CF_ACCESS_CLIENT_SECRET=your_client_secret
```

### API Endpoints

The app connects to these endpoints:
- `/collections?content_alias=[alias]` - Get collections
- `/stories?canonical_url=[slug]` - Get articles
- `/stories/list?tag_slug=[tag]` - List by tag
- `/stories/list?author_slug=[author]` - List by author

## AI-Assisted Development

This project is optimized for AI-assisted development using Claude Code.

### Key Files

- `CLAUDE.md` - Project instructions for Claude Code
- `TASKS.md` - Project task tracking
- `AI_LOG.md` - AI decision log
- `.mcp.json` - MCP server configuration

### Important Guidelines

The AI must ask for approval before implementing architectural or technical solutions. All significant changes require explicit user direction. See AI_LOG.md for details.

## Testing

### Manual Testing URLs

- Homepage: http://localhost:4321
- Article pages: Click any article from homepage
- 404 page: http://localhost:4321/404
- API test: http://localhost:4321/api-test

### API Connection Test

```bash
source .env && curl -H "CF-Access-Client-Id: $CF_ACCESS_CLIENT_ID" \
  -H "CF-Access-Client-Secret: $CF_ACCESS_CLIENT_SECRET" \
  "$CONTENT_CACHE_API_URL/collections?content_alias=homepage"
```

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── components/      # React/Astro components
│   ├── lib/            # API client and utilities
│   ├── pages/          # Route pages
│   └── styles/         # Global styles
├── documentation/      # API docs and samples
├── .env.example       # Environment template
├── CLAUDE.md          # AI instructions
├── AI_LOG.md          # Decision log
└── TASKS.md           # Task tracking
```

## Deployment

Build for Cloudflare Workers:

```bash
npm run build
```

Then deploy using Wrangler or Cloudflare Pages.