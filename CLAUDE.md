# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` or `npm run dev` - Run development server with turbopack
- `yarn build` or `npm run build` - Build production version  
- `yarn start` - Start production server
- `yarn lint` or `npm run lint` - Run ESLint
- `yarn format` or `npm run format` - Format code with Prettier

## Architecture Overview

This is a Next.js 15 meditation assistant application that helps users find relevant spiritual talks through voice input and AI-powered search.

### Application Structure

The app uses a single-page navigation pattern with section-based routing managed in `src/app/page.tsx`:
- **Homepage** - Landing page with three navigation "gateways"
- **MeditationAssistant** - Voice/text search interface  
- **SearchResults/Glossary** - Tabbed exploration interface
- **About** - Information about the spiritual lineage

### Core Components

- **MeditationAssistant** (`src/components/MeditationAssistant.tsx`) - Main search interface with speech recognition, text input, and modal results display
- **Homepage** (`src/components/Homepage.tsx`) - Spiritual-themed landing page with three navigation sections
- **SearchResults** (`src/components/SearchResults.tsx`) - Displays search results in tabbed interface
- **API Route** (`src/app/api/extract-phrases/route.ts`) - OpenAI GPT-4o integration to extract search phrases from natural language questions

### Key Integrations

- **Algolia Search** - Uses `algoliasearch/lite` client for searching meditation talks. Client initialized in both `src/lib/algoliaClient.ts` and directly in components
- **OpenAI GPT-4o** - Processes natural language questions to extract 3-5 search phrases. Handles JSON parsing with markdown fence removal
- **Speech Recognition** - Browser-based voice input via `react-speech-recognition` with continuous listening disabled
- **YouTube Integration** - Extracts video IDs and displays thumbnails from `img.youtube.com` with embedded player links

### Data Flow

1. User navigates through homepage sections or enters question via voice/text in MeditationAssistant
2. Voice input transcribed in real-time and synced to text field
3. Question sent to `/api/extract-phrases` endpoint  
4. OpenAI GPT-4o extracts 3-5 search phrases from the question
5. Phrases joined and used to query Algolia index (3 results max)
6. Results displayed in modal with YouTube thumbnails, AI summaries, concepts (orange badges), and tags (blue badges)

### Environment Variables Required

- `NEXT_PUBLIC_ALGOLIA_APP_ID` - Algolia application ID
- `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` - Algolia search-only API key  
- `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` - Algolia index name
- `OPENAI_API_KEY` - OpenAI API key for phrase extraction

### Styling & Theme

Uses Tailwind CSS v4 with a spiritual/meditation aesthetic:
- **Color Palette**: Amber/orange/saffron gradient backgrounds (`from-amber-50 via-orange-50 to-yellow-50`)
- **Sacred Elements**: Custom CSS classes like `sacred-glow`, `animate-sacred-breathe`, `animate-gentle-pulse`
- **Typography**: Font-serif for headings, spiritual tone throughout
- **Components**: HeadlessUI for modals, Heroicons for icons
- **Custom Animations**: Breathing/pulsing effects on interactive elements

### Technical Stack

- **Framework**: Next.js 15 with App Router and React 19
- **Styling**: Tailwind CSS v4, PostCSS
- **UI Components**: HeadlessUI, Heroicons
- **Search**: Algolia with multiple react-instantsearch packages
- **AI**: OpenAI API with GPT-4o model
- **Speech**: react-speech-recognition for browser-based voice input
- **Build**: Turbopack for development, ESLint + Prettier for code quality