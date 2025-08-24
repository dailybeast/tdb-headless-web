# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is "The Looker" website - a sub-brand of The Daily Beast that will live at `thelooker.thedailybeast.com`. Built with Astro SSR, deployed to Cloudflare Workers, and designed to eventually scale to power the entire Daily Beast website.

## Development Commands

```bash
# Development
npm run dev          # Start dev server at localhost:4321
npm run build        # Build for production to ./dist/
npm run preview      # Preview production build locally
npx astro check      # Type-check .astro files
```

## Architecture & Key Design Decisions

### Tech Stack

- **Framework**: Astro with SSR mode (server-side rendering)
- **Hosting**: Cloudflare Workers via `@astrojs/cloudflare` adapter
- **UI Components**: Shadcn UI (configured in `components.json`)
- **Styling**: Tailwind CSS v4 with CSS variables for theming
- **React Integration**: For interactive components
- **Content Source**: ArcXP content API (cached in Supabase)

### API Integration

The app connects to a content cache API that provides Daily Beast content:

- **Development**: Use the external API (configure in `.env` file)
- **Full API Documentation**: See `documentation/middleware-api.json` (OpenAPI spec)

**Core Endpoints**:

- `/collections?content_alias=[alias]` - Get collection by alias (e.g., homepage)
- `/collections?id=[id]` - Get collection by ID
- `/stories?canonical_url=[slug]` - Get article by URL slug
- `/stories?id=[id]` - Get article by ID
- `/stories/list?tag_slug=[tag]` - List articles by tag
- `/stories/list?author_slug=[author]` - List articles by author
- `/sections?id=[id]` - Get section metadata

**Query Parameters**:

- `fields` - Comma-separated list of fields to include (reduces payload)
- `limit` & `offset` - Pagination for list endpoints
- `sort_field` & `sort_direction` - Sorting options

**Environment Variables** (see `.env.example`):

- `CONTENT_CACHE_API_URL` - Base URL for content API
- `CF_ACCESS_CLIENT_ID` - Cloudflare Access authentication
- `CF_ACCESS_CLIENT_SECRET` - Cloudflare Access secret

### Component Architecture

The project follows a specific component organization for content blocks:

```
src/
  components/
    blocks/              # Article content blocks (reusable)
      TextBlock.astro
      ImageBlock.astro
      HeaderBlock.astro
      QuoteBlock.astro
      ListBlock.astro
      ReferenceBlock.astro
      OEmbedBlock.astro
      CustomEmbedBlock.astro
      RawHtmlBlock.astro
    layout/              # Site structure
      Header.astro       # The Looker branded header
      Footer.astro       # The Looker branded footer
      Navigation.astro
    ui/                  # Shadcn components
    features/            # Page-specific components
      ArticleLayout.astro
      HomepageGrid.astro
      TagPageList.astro
```

### Content Block Types

Articles from the API contain `content_elements` arrays with these block types:

**Text & Structure**:

- `text`: Paragraphs with embedded HTML
- `header`: Section headers (levels 2, 3)
- `list`: Ordered/unordered lists
- `quote`: Pull quotes and blockquotes

**Media**:

- `image`: Images with captions, credits, metadata
- `custom_embed`: Video players, section breaks
- `oembed_response`: YouTube, Twitter/X, Instagram, Facebook, TikTok embeds
- `raw_html`: DocumentCloud, Truth Social, SoundCloud, other custom embeds

**References**:

- `reference`: Related story links

### Path Aliases

TypeScript paths configured in `tsconfig.json`:

- `@/*` maps to `./src/*`

Shadcn UI aliases in `components.json`:

- `@/components` - Component directory
- `@/lib/utils` - Utility functions
- `@/components/ui` - Shadcn UI components

### Styling Approach

- Mobile-first responsive design
- Tailwind CSS v4 with the new CSS-first configuration
- CSS variables for theming (prepared for Daily Beast migration)
- Global styles in `src/styles/global.css`
- Utility function `cn()` in `src/lib/utils.ts` for className merging

## Important Project Notes

From `documentation/notes-for-claude.md`:

1. Always ask questions before big decisions - don't assume anything
2. Test thoroughly
3. Always commit properly and take notes
4. Keep an AI decision log
5. Maintain a TASKS.md file

## Sample Data

The `documentation/` folder contains sample JSON files for development:

- `sample-article.json` - Standard article structure
- `sample-collection.json` - Homepage collection structure
- `article-with-all-elements.json` - Complete article with every block type
- `apis.json` & `middleware-api.json` - API documentation

## Development Guidelines

1. **Component Flexibility**: Build components to support both The Looker and future Daily Beast branding
2. **Error Handling**: Handle missing data gracefully - all fields should have defaults
3. **TypeScript**: Use TypeScript for type safety throughout
4. **Mobile-First**: Design for mobile, enhance for desktop
5. **Reusability**: Components will eventually power the full Daily Beast site

## Third-Party Integrations

**Zephr API** (User Authentication):

- API Documentation: https://developer.zuora.com/zephr-api-reference/zephr-public-api/overview/
- Features: User login/logout, display email in navigation, account page
- Implementation: Use as dynamic server island component for user state

**Shadcn UI Components**:

- Documentation: https://ui.shadcn.com/
- Already initialized with `components.json` configuration
- Style: "new-york" variant with Tailwind CSS v4

**Planned Integrations**:

- Google Tag Manager (GTM) for analytics (The Looker specific container)
- SEO meta tags and JSON-LD structured data
- JW Player for video embeds

- make sure the project manager agent is keeping a log of AI decisions and updating @TASKS.md constantly.
- only use out of the box components. do not build anything from scratch without my apporoval.