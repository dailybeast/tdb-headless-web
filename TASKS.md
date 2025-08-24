# TASKS.md - The Looker Website Development

## Project Overview

Building "The Looker" website - a sub-brand of The Daily Beast at `thelooker.thedailybeast.com`

- **Framework**: Astro SSR with Cloudflare Workers deployment
- **Content Source**: ArcXP content API (cached in Supabase)
- **UI**: Shadcn UI components with Tailwind CSS v4

## Task Management Guidelines

### Agent Responsibilities

- **astro-architect**: All Astro framework decisions, routing, SSR configuration
- **news-ux-designer**: Homepage layout, article pages, navigation UX
- **project-tracker**: Maintains this file and AI_LOG.md
- **general-purpose**: API integration, TypeScript interfaces, utility functions

---

## 🚀 Phase 1: Foundation Setup

_Target: Core infrastructure and development environment_

### ✅ Completed

- [x] Initialize Astro project with SSR mode
- [x] Configure Cloudflare Workers adapter
- [x] Setup Tailwind CSS v4
- [x] Initialize Shadcn UI with components.json
- [x] Create basic project structure

### 📋 TODO

#### Environment & Configuration

- [ ] Create and validate `.env` file from `.env.example`
- [ ] Test connection to content cache API
- [ ] Verify Cloudflare Access authentication works

#### TypeScript & Type Safety

- [ ] Create TypeScript interfaces for API responses
  - [ ] Article interface (based on sample-article.json)
  - [ ] Collection interface (based on sample-collection.json)
  - [ ] Content block types (text, image, header, etc.)
  - [ ] API response wrappers
- [ ] Setup API client with proper error handling
- [ ] Configure strict TypeScript settings

---

## 🎨 Phase 2: Component Architecture

_Target: Build reusable content blocks and layouts_
_Agent: news-ux-designer for UX, general-purpose for implementation_

### Content Blocks (`src/components/blocks/`)

- [ ] TextBlock.astro - Render text with embedded HTML
- [ ] ImageBlock.astro - Handle images with captions/credits
- [ ] HeaderBlock.astro - Section headers (H2, H3)
- [ ] QuoteBlock.astro - Pull quotes and blockquotes
- [ ] ListBlock.astro - Ordered/unordered lists
- [ ] ReferenceBlock.astro - Related story links
- [ ] OEmbedBlock.astro - Social media embeds
- [ ] CustomEmbedBlock.astro - Video players, section breaks
- [ ] RawHtmlBlock.astro - DocumentCloud, other custom embeds

### Layout Components (`src/components/layout/`)

- [ ] Header.astro - The Looker branded header with navigation
- [ ] Footer.astro - The Looker branded footer
- [ ] Navigation.astro - Responsive navigation menu

### Feature Components (`src/components/features/`)

- [ ] ArticleLayout.astro - Full article page layout
- [ ] HomepageGrid.astro - Homepage content grid
- [ ] TagPageList.astro - Tag/category listing pages
- [ ] AuthorPageList.astro - Author archive pages

---

## 📄 Phase 3: Core Pages

_Target: Implement main site pages_
_Agent: astro-architect for routing decisions_

### Pages to Create

- [ ] Homepage (`src/pages/index.astro`)
  - [ ] Fetch homepage collection via API
  - [ ] Implement responsive grid layout
  - [ ] Handle featured stories
- [ ] Article Page (`src/pages/[...slug].astro`)
  - [ ] Dynamic routing for article slugs
  - [ ] Fetch article by canonical_url
  - [ ] Render all content block types
  - [ ] Handle missing articles (404)
- [ ] Tag Pages (`src/pages/tags/[tag].astro`)
  - [ ] List articles by tag
  - [ ] Implement pagination
- [ ] Author Pages (`src/pages/authors/[author].astro`)
  - [ ] List articles by author
  - [ ] Author bio section
- [ ] Section Pages (`src/pages/sections/[section].astro`)
  - [ ] Section-specific layouts

---

## 🔌 Phase 4: API Integration

_Target: Robust data fetching and caching_
_Agent: general-purpose_

### API Client Development

- [ ] Create API service module (`src/lib/api/`)
  - [ ] Base client with auth headers
  - [ ] Error handling and retries
  - [ ] Response caching strategy
- [ ] Implement API endpoints
  - [ ] getCollection(alias/id)
  - [ ] getArticle(slug/id)
  - [ ] listArticlesByTag(tag, limit, offset)
  - [ ] listArticlesByAuthor(author, limit, offset)
  - [ ] getSection(id)
- [ ] Add field filtering support
- [ ] Implement pagination helpers

---

## 🎯 Phase 5: User Features

_Target: Enhanced user experience_

### Authentication (Zephr Integration)

- [ ] Create auth service module
- [ ] Implement login/logout components
- [ ] User state management (server islands)
- [ ] Protected content handling
- [ ] Account page

### SEO & Meta Tags

- [ ] Dynamic meta tags for articles
- [ ] Open Graph tags
- [ ] Twitter/X cards
- [ ] JSON-LD structured data
- [ ] Sitemap generation
- [ ] RSS feed

### Performance

- [ ] Image optimization
- [ ] Lazy loading for embeds
- [ ] Critical CSS extraction
- [ ] Bundle optimization

---

## 🧪 Phase 6: Testing & Quality

_Target: Production readiness_

### Testing

- [ ] Setup testing framework
- [ ] Unit tests for API client
- [ ] Component testing
- [ ] Integration tests for pages
- [ ] Performance testing

### Build & Deploy

- [ ] Production build validation
- [ ] Cloudflare Workers deployment config
- [ ] Environment variable management
- [ ] CI/CD pipeline setup

---

## 🚦 Phase 7: Analytics & Monitoring

_Target: Track performance and usage_

### Analytics

- [ ] Google Tag Manager integration
- [ ] Custom events for article views
- [ ] User interaction tracking
- [ ] Performance metrics

### Error Monitoring

- [ ] Error logging service
- [ ] API failure tracking
- [ ] 404 monitoring

---

## 🎨 Phase 8: Polish & Optimization

_Target: Final touches before launch_

### UI/UX Refinements

- [ ] Mobile responsiveness testing
- [ ] Cross-browser compatibility
- [ ] Accessibility audit (WCAG compliance)
- [ ] Loading states and skeletons
- [ ] Error pages (404, 500)

---

## 📝 Notes & Decisions

### Key Decisions Made

- Using Astro SSR for dynamic content
- Cloudflare Workers for edge deployment
- Shadcn UI for consistent component library
- Mobile-first responsive design

### Dependencies

- Content Cache API must be accessible
- Cloudflare Access credentials required
- Zephr API access for authentication
- Google Tag Manager container ID

---

## 🔄 Progress Tracking

### Current Sprint Focus

**Phase 1: Foundation Setup** - Environment configuration and TypeScript setup

### Blockers

- None currently identified

### Next Steps

1. Validate API connection with provided credentials
2. Create TypeScript interfaces for content types
3. Build first content block component (TextBlock)

---

_Last Updated: [Auto-update via project-tracker agent]_
_Maintained By: project-tracker agent_
