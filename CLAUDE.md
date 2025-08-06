# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `yarn dev` or `npm run dev` - Run development server with turbopack
- `yarn build` or `npm run build` - Build production version
- `yarn lint` or `npm run lint` - Run ESLint
- `yarn format` or `npm run format` - Format code with Prettier

## Architecture Overview

This is a Next.js 15 meditation assistant application that helps users find relevant spiritual talks through voice input and AI-powered search.

### Core Components

- **MeditationAssistant** (`src/components/MeditationAssistant.tsx`) - Main UI component with speech recognition, search input, and results modal
- **SearchResults** (`src/components/SearchResults.tsx`) - Displays search results (currently modified)
- **API Route** (`src/app/api/extract-phrases/route.ts`) - OpenAI integration to extract search phrases from user questions

### Key Integrations

- **Algolia Search** - Uses `algoliasearch/lite` client for searching meditation talks
- **OpenAI GPT-4** - Processes natural language questions to extract search phrases
- **Speech Recognition** - Browser-based voice input via `react-speech-recognition`
- **YouTube Integration** - Displays video thumbnails and links from search results

### Data Flow

1. User asks question via voice or text input
2. Question sent to `/api/extract-phrases` endpoint
3. OpenAI extracts key phrases from the question
4. Phrases used to search Algolia index
5. Results displayed in modal with video thumbnails and metadata

### Environment Variables Required

- `NEXT_PUBLIC_ALGOLIA_APP_ID` - Algolia application ID
- `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` - Algolia search-only API key  
- `NEXT_PUBLIC_ALGOLIA_INDEX_NAME` - Algolia index name
- `OPENAI_API_KEY` - OpenAI API key for phrase extraction

### Styling

Uses Tailwind CSS with orange/saffron theme colors for spiritual/meditation aesthetic.