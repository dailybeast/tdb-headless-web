# Product Requirements Document: The Looker (Daily Beast Sub-Brand) Website

## 1. Project Overview

### 1.1 Purpose
Build a new website for **The Looker**, a sub-brand of The Daily Beast, that will live at `thelooker.thedailybeast.com`. This project serves as the foundation for eventually rebuilding the entire Daily Beast website, starting with this focused sub-brand to prove the architecture and gain control over CDN, codebase, and page performance.

### 1.2 Project Scope
- **Initial Launch**: The Looker sub-brand at `thelooker.thedailybeast.com`
- **Future Expansion**: This codebase will eventually expand to power the entire Daily Beast website
- **Content Source**: Same ArcXP content API as main Daily Beast site

### 1.3 Key Goals
- Full control over CDN and code features
- Improved page speed performance
- Better developer experience
- Static-first architecture with dynamic components where needed
- Mobile-first responsive design
- Scalable foundation for future Daily Beast migration

### 1.4 Core Principles
- Mobile-first, always
- Use Shadcn UI components as base
- Fast page loads (optimize Core Web Vitals)
- Flexible component structure for future additions
- Architecture that can scale to full Daily Beast site

## 2. Technical Architecture

### 2.1 Stack
- **Framework**: Astro with SSR mode
- **Hosting**: Cloudflare Workers
- **CDN**: Cloudflare
- **Database**: Supabase (content cache from ArcXP)
- **UI Components**: Shadcn UI
- **Styling**: Tailwind CSS
- **API Communication**: RPC on Cloudflare, HTTP for local development

### 2.2 API Integration
- **Base URL**: `http://localhost:8787` (local development)
- **Production URL**: Will connect to same API infrastructure as Daily Beast
- **Key Endpoints**:
  - `/collections?content_alias=homepage` - Homepage content (will use Looker-specific collection)
  - `/stories?canonical_url=[slug]` - Individual articles
  - `/stories/list?tag_slug=[tag]` - Tag pages

### 2.3 Cloudflare Integration
- Use `@astrojs/cloudflare` adapter per [Astro Cloudflare docs](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- Configure subdomain routing for `thelooker.thedailybeast.com`

## 3. Page Structure & Routes

### 3.1 Routes
- `/` - The Looker homepage (uses collections endpoint with Looker-specific content_alias)
- `/[slug]` - Article pages (uses stories endpoint with canonical_url)
- `/tag/[tag]` - Tag/category pages (uses stories/list endpoint)
- `/account` - Account page (Zephr integration)

### 3.2 Navigation Structure
Initial navigation for The Looker (to be refined based on editorial needs):
- Politics
- U.S. News
- World
- Entertainment
- Obsessed
- Tech

Note: Navigation will be customizable for The Looker brand identity

## 4. Component Architecture

```
src/
  components/
    blocks/              # Article content blocks (reusable for Daily Beast)
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
      Header.astro        # The Looker branded header
      Footer.astro        # The Looker branded footer
      Navigation.astro
    ui/                 # Shadcn components
      button.tsx
      card.tsx
      ...
    features/           # Page-specific components
      ArticleLayout.astro
      HomepageGrid.astro
      TagPageList.astro
```

## 5. Content Block Types

### 5.1 Complete Block Type List

#### Text Blocks
- **text**: Standard paragraph with embedded HTML links
- **header**: Section headers (levels 2, 3)

#### Media Blocks
- **image**: Full image with caption, credits, alt text, and metadata
- **custom_embed**: 
  - `videoplayer` subtype: JW Player videos
  - `section_break` subtype: Page break elements

#### Quote Blocks
- **quote**: 
  - `pullquote` subtype: Highlighted quotes
  - `blockquote` subtype: Standard blockquotes

#### Structural Blocks
- **list**: Unordered/ordered lists
- **reference**: Related story links (inflated from story IDs)

#### Social/Embed Blocks
- **oembed_response**: 
  - `youtube`: YouTube videos
  - `twitter`: Twitter/X posts
  - `instagram`: Instagram posts and reels
  - `facebook-post`: Facebook posts
  - `tiktok`: TikTok videos

#### Raw HTML Blocks
- **raw_html**: Direct HTML embeds for:
  - DocumentCloud PDFs
  - Truth Social posts
  - SoundCloud audio
  - BlueSky posts
  - Threads posts
  - Other custom embeds

### 5.2 Article Metadata Structure
```javascript
{
  _id: string,
  canonical_url: string,
  headlines: {
    basic: string,
    meta_title: string,
    web: string,
    mobile: string
  },
  subheadlines: { 
    basic: string 
  },
  label: {
    rubric: { display: boolean, text: string },
    special_content_flag: { display: boolean, text: string, url: string }
  },
  display_date: string,
  credits: { 
    by: [...] // Author objects
  },
  promo_items: { 
    basic: {...}, // Main image
    "1_1": {...}  // Square image
  },
  taxonomy: {
    primary_section: {...},
    tags: [...]
  },
  content_elements: [...] // Array of content blocks
}
```

### 5.3 Collection Structure
```javascript
{
  _id: string,
  headlines: { basic: string },
  content_elements: [
    // Array of article objects with full metadata
  ]
}
```

## 6. Features & Integrations

### 6.1 Third-Party Integrations
- **Google Tag Manager (GTM)**: Analytics events (The Looker specific container)
- **Zephr API**: 
  - User authentication (shared with Daily Beast)
  - Display email address in navigation
  - Account page link
  - Logout functionality
  - Implement as dynamic server island component

### 6.2 SEO & Meta Tags
- Meta tags and Open Graph data from API
- Structured data (JSON-LD) for articles
- Site name: "The Looker"
- Domain: `thelooker.thedailybeast.com`
- Responsive images with proper alt text
- Canonical URLs from article data

## 7. Branding & Design

### 7.1 The Looker Brand Identity
- **Note**: The Looker will have its own visual identity while maintaining Daily Beast content standards
- Color scheme: TBD (provide brand guidelines)
- Typography: TBD (provide font specifications)
- Logo and header treatment specific to The Looker

### 7.2 Design System Flexibility
- Components should support theming
- CSS variables for easy brand switching
- Prepare for multi-brand support (The Looker → Daily Beast)

## 8. Component Implementation Details

### 8.1 Block Renderer
Create a flexible block renderer that maps content types to components:

```javascript
// BlockRenderer.astro
const blockComponents = {
  'text': TextBlock,
  'header': HeaderBlock,
  'image': ImageBlock,
  'quote': QuoteBlock,
  'list': ListBlock,
  'reference': ReferenceBlock,
  'oembed_response': OEmbedBlock,
  'custom_embed': CustomEmbedBlock,
  'raw_html': RawHtmlBlock
};
```

### 8.2 OEmbed Handling
Handle different OEmbed subtypes within OEmbedBlock:
- YouTube
- Twitter/X
- Instagram (posts and reels)
- Facebook
- TikTok

### 8.3 Custom Embed Handling
Handle custom embed subtypes:
- Video players (JW Player)
- Section breaks (page breaks with different styles)

### 8.4 Reference Block Handling
Reference blocks link to other stories - handle inflation if needed or display as related content cards.

## 9. Development Setup

### 9.1 Project Structure
```
the-looker-site/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   ├── styles/
│   └── lib/
├── public/
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

### 9.2 Build Commands
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "build:staging": "astro build --mode staging",
    "build:production": "astro build --mode production",
    "preview": "astro preview"
  }
}
```

### 9.3 Astro Configuration
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind(), react()],
  site: 'https://thelooker.thedailybeast.com'
});
```

## 10. Sample Data Files

### 10.1 Provided Files
- `sample-article.json` - Standard article with text, images, and YouTube embeds
- `sample-collection.json` - Homepage collection structure
- `all-components.json` - Complete article with every block type

### 10.2 API Response Structure
```javascript
// Stories endpoint response
{
  success: boolean,
  result: {
    id: string,
    content: { /* Article object */ },
    created_at: string,
    updated_at: string
  }
}

// Collections endpoint response
{
  success: boolean,
  result: {
    id: string,
    content: { /* Collection object */ },
    created_at: string,
    updated_at: string
  }
}
```

## 11. Implementation Phases

### Phase 1: Core Setup
1. Initialize Astro project for The Looker
2. Set up Tailwind CSS and Shadcn UI
3. Create basic layout components with The Looker branding
4. Implement routing structure
5. Set up TypeScript interfaces for all content types

### Phase 2: Content Display
1. Create all content block components (reusable for Daily Beast)
2. Implement block renderer system
3. Build article page with all block types
4. Implement The Looker homepage with news grid layout
5. Add tag pages with article lists
6. Handle responsive images

### Phase 3: Integrations
1. Integrate GTM for The Looker analytics
2. Add Zephr user authentication (shared with Daily Beast)
3. Implement SEO meta tags and JSON-LD
4. Add dynamic server islands for user info

### Phase 4: The Looker Launch
1. Performance testing and optimization
2. Core Web Vitals improvements
3. Subdomain configuration at `thelooker.thedailybeast.com`
4. Production deployment

### Phase 5: Future - Daily Beast Migration
1. Add Daily Beast branding as theme variant
2. Implement main site navigation structure
3. Migrate additional Daily Beast-specific features
4. Plan for full domain migration

## 12. Design Guidelines

### 12.1 Styling Approach
- Use Shadcn UI components as base
- Apply The Looker brand identity
- Support theming for future Daily Beast migration
- Mobile-first responsive design
- Focus on readability and fast load times

### 12.2 Layout Patterns
- **Homepage**: News grid with varying block sizes (The Looker curated)
- **Articles**: Clean reading experience with proper typography
- **Tag pages**: Simple list layout with article cards

### 12.3 Responsive Design
- Mobile breakpoint: < 768px
- Tablet breakpoint: 768px - 1024px
- Desktop breakpoint: > 1024px

## 13. Performance Requirements

### 13.1 Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 13.2 Optimization Strategies
- Cloudflare CDN caching
- Image optimization (lazy loading, responsive sizes)
- Minimal JavaScript for initial load
- Server-side rendering for content

## 14. Error Handling

### 14.1 API Errors
- Graceful fallbacks for failed API calls
- Error boundaries for component failures
- User-friendly error messages

### 14.2 Content Validation
- Handle missing or malformed content blocks
- Default values for missing fields
- Type safety with TypeScript

## 15. Testing Requirements

### 15.1 Component Testing
- Test all block types render correctly
- Verify responsive behavior
- Test with missing/malformed data

### 15.2 Integration Testing
- API endpoint integration
- User authentication flow
- Analytics tracking

## 16. Deployment

### 16.1 Cloudflare Workers Configuration
- Set up workers for SSR
- Configure subdomain: `thelooker.thedailybeast.com`
- Configure environment variables
- Set up staging and production environments

### 16.2 CI/CD Pipeline
- Automated builds on push
- Staging deployment for testing
- Production deployment workflow

### 16.3 Domain Configuration
- Initial: `thelooker.thedailybeast.com`
- Future: Expand to `www.thedailybeast.com`

## 17. Future Enhancements

### 17.1 The Looker Phase
- Custom editorial features specific to The Looker
- Unique content presentation styles
- Specialized topic pages

### 17.2 Daily Beast Migration Phase
- Search functionality with Algolia
- RSS feed generation
- Comment system
- Newsletter signup integration
- Advanced personalization
- A/B testing framework
- Full Daily Beast feature parity

## 18. Notes for Claude Code Implementation

1. **Brand Flexibility**: Build components to support both The Looker and future Daily Beast branding
2. **Start with provided sample JSON files** for development
3. **API endpoints exist but may return empty** - use sample data initially
4. **Focus on component flexibility** - new block types will be added
5. **Handle missing data gracefully** - all fields should have defaults
6. **Use TypeScript** for better type safety
7. **Implement error boundaries** for robust error handling
8. **Create reusable components** - these will power Daily Beast too
9. **Mobile-first approach** - design for mobile, enhance for desktop
10. **Performance first** - optimize bundle size and load times
11. **Accessibility** - ensure WCAG 2.1 AA compliance
12. **Theme Support** - Use CSS variables for easy brand switching

---

## Appendix: Quick Reference

### API Endpoints
- Homepage: `GET /collections?content_alias=looker-homepage` (or appropriate alias)
- Article: `GET /stories?canonical_url=[slug]`
- Tag Page: `GET /stories/list?tag_slug=[tag]`

### Key Libraries
- Astro
- @astrojs/cloudflare
- @astrojs/tailwind
- @astrojs/react
- Tailwind CSS
- Shadcn UI components

### Environment Variables
```
API_URL=http://localhost:8787
GTM_ID=GTM-XXXXX-LOOKER
ZEPHR_API_URL=https://api.zephr.com
SITE_NAME=The Looker
SITE_URL=https://thelooker.thedailybeast.com
```

### Subdomain Configuration
- Development: `http://localhost:3000`
- Staging: `staging-thelooker.thedailybeast.com`
- Production: `thelooker.thedailybeast.com`

---

This PRD provides complete specifications for building The Looker website as a Daily Beast sub-brand, with architecture designed to scale to the full Daily Beast website in the future.