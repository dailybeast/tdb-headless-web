# QUESTIONS.md - Development Questions for Review

## Purpose
This document collects questions and decision points that require user input. Development continues while these are pending, but final decisions are needed before production deployment.

---

## Environment & Configuration

### 1. API Authentication
**Context**: Need to configure Cloudflare Access for API authentication
**Questions**:
- Do you have the CF_ACCESS_CLIENT_ID and CF_ACCESS_CLIENT_SECRET credentials?
- Should we use a development proxy or direct API calls during local development?
- Is there a staging/development API endpoint separate from production?

### 2. API Base URL
**Context**: Setting up content cache API connection
**Questions**:
- What is the correct CONTENT_CACHE_API_URL for development?
- Are there rate limits we should be aware of?
- Should we implement request caching during development?

---

## Design & Branding

### 3. The Looker Brand Identity
**Context**: Building header, footer, and overall site design
**Questions**:
- Do you have brand guidelines (colors, fonts, logos) for The Looker?
- Should we create placeholder designs or wait for official assets?
- Any specific navigation menu items to include initially?

### 4. Homepage Layout
**Context**: Implementing the homepage grid
**Questions**:
- How many articles should display on the homepage?
- Should there be a hero/featured article section?
- What's the preferred grid layout (2-column, 3-column, masonry)?

---

## Content & Features

### 5. Article URLs
**Context**: Setting up routing for articles
**Questions**:
- What URL structure should we use? (e.g., /article-slug, /2024/12/article-slug, /category/article-slug)
- Should we support legacy URL redirects?

### 6. Image Handling
**Context**: Displaying images from the API
**Questions**:
- Are images served from a CDN?
- Do we need to implement responsive image sizing?
- Should we use a placeholder/loading state for images?

---

## Technical Decisions

### 7. Error Handling
**Context**: API failures and missing content
**Questions**:
- How should we handle API timeouts/failures? (show cached content, error page, retry?)
- What should display for missing/404 articles?
- Should we implement offline support?

### 8. Build Configuration
**Context**: Setting up production build
**Questions**:
- Are there specific Cloudflare Worker size limits to consider?
- Should we implement edge caching rules?
- Any specific security headers required?

---

## Development Workflow

### 9. Testing Requirements
**Context**: Quality assurance setup
**Questions**:
- Preferred testing framework? (Vitest, Jest, Playwright?)
- Required browser support? (Chrome, Safari, Firefox, Edge versions?)
- Accessibility compliance level? (WCAG 2.1 AA?)

### 10. Analytics & Monitoring
**Context**: Google Tag Manager setup
**Questions**:
- Do you have the GTM container ID for The Looker?
- Which events should we track initially?
- Any custom dimensions/metrics needed?

---

## Notes
- Questions marked with 🚨 are blocking progress
- Questions marked with ⚠️ have temporary workarounds in place
- All other questions can be deferred until later phases

---

*Last Updated: 2025-08-22*
*To answer questions, either update this file directly or provide answers in chat*