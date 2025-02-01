# CineMate 🎬

CineMate helps couples find their perfect movie match. Swipe through movies together and get matched when you both like the same film - no more lengthy debates about what to watch!

## Live Demo

[Coming Soon]

## Features

- Tinder-like swipe interface for movies
- Partner matching system
- Curated movie recommendations
- Watchlist management
- Real-time matching notifications

## Project Roadmap 📈

### Phase 1: Foundation

**Technical Requirements:**

- Next.js 15 with App Router
- Tailwind CSS for styling
- TypeScript for type safety
- Shadcn/ui for component library
- Git for version control

**Tasks:**

- [x] Project Setup

  - [x] Initialize Next.js project with TypeScript
  - [x] Install and configure Tailwind CSS
  - [x] Set up ESLint and Prettier
  - [x] Configure shadcn/ui
  - [x] Create basic folder structure
    - `/app` for routes
    - `/components` for UI components
    - `/lib` for utilities
    - `/types` for TypeScript definitions

- [ ] Basic UI Components

  - [x] Set up layout.tsx with metadata
  - [x] Create reusable Card component using shadcn/ui
  - [x] Implement basic button components
  - [x] Implement stack looking Card
  - [ ] Create loading and error states using Suspense

- [ ] Mock Data Integration
  - [ ] Create movie type definitions
  - [ ] Set up mock data service
  - [ ] Create basic client-side state management with React Context

### Phase 2: Core Features

**Technical Requirements:**

- Framer Motion for animations
- React Server Components where applicable
- Local Storage for client-side persistence

**Tasks:**

- [ ] Swipeable Interface
  - [ ] Create client-side swipe component
  - [ ] Implement Framer Motion animations
  - [ ] Add touch and mouse gesture controls
  - [ ] Implement keyboard navigation
  - [ ] Add haptic feedback for mobile

### Phase 3: Data Integration

**Technical Requirements:**

- Next.js API routes for backend logic
- TMDB API integration
- React Query/TanStack Query for data fetching
- Zod for runtime type validation

**Tasks:**

#### API Integration

- [ ] Set up environment variables

  - [ ] Create `.env.example` and `.env.local`
  - [ ] Add TMDB API keys and configurations
  - [ ] Document all required environment variables

- [ ] Create API route handlers

  - [ ] Set up base API configuration
  - [ ] Create movie search endpoints
  - [ ] Implement movie details endpoint
  - [ ] Add recommendations endpoint
  - [ ] Create genre list endpoint

- [ ] Implement error handling middleware

  - [ ] Create custom error classes
  - [ ] Set up global error handler
  - [ ] Add error logging system
  - [ ] Implement retry logic for failed requests

- [ ] Add request caching with Next.js Cache

  - [ ] Configure cache strategies
  - [ ] Implement cache invalidation
  - [ ] Set up revalidation endpoints
  - [ ] Add cache headers

- [ ] Create type-safe API client
  - [ ] Define API response types
  - [ ] Create API utility functions
  - [ ] Add request interceptors
  - [ ] Implement response transformers

#### Data Management

- [ ] Define Zod schemas for data validation

  - [ ] Create movie schema
  - [ ] Define user preferences schema
  - [ ] Set up validation middleware
  - [ ] Add custom validation rules

- [ ] Implement data transformation utilities

  - [ ] Create movie data normalizer
  - [ ] Add date formatting utilities
  - [ ] Implement rating conversion
  - [ ] Create image URL formatters

- [ ] Set up localStorage sync

  - [ ] Create storage service
  - [ ] Implement sync logic
  - [ ] Add version control for stored data
  - [ ] Handle storage limits

- [ ] Create offline fallback
  - [ ] Implement service worker
  - [ ] Add offline data storage
  - [ ] Create sync queue for pending actions
  - [ ] Handle conflict resolution

#### Search & Filters

- [ ] Implement server-side search

  - [ ] Create search API endpoint
  - [ ] Add search result caching
  - [ ] Implement pagination
  - [ ] Add search suggestions

- [ ] Create genre filter components

  - [ ] Build genre selector UI
  - [ ] Add multi-select functionality
  - [ ] Implement filter logic
  - [ ] Add filter persistence

- [ ] Add year/rating filter logic

  - [ ] Create range selector component
  - [ ] Implement filter combinations
  - [ ] Add filter reset functionality
  - [ ] Create filter presets

- [ ] Implement sort functionality

  - [ ] Add sort parameters to API
  - [ ] Create sort UI components
  - [ ] Implement client-side sorting
  - [ ] Add sort persistence

- [ ] Add URL-based filtering
  - [ ] Implement query parameter handling
  - [ ] Create sharable filter URLs
  - [ ] Add filter state management
  - [ ] Handle filter validation

## Getting Started 🚀

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/cinemate.git
```

2. Install dependencies

```bash
cd cinemate
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```

## Tech Stack 🛠️

- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **Shadcn/ui**
- **Framer Motion**
- **ESLint**
- **Prettier**

## Development Journal 📝

### Week 1 (January 30 - February 5, 2025)

#### January 30, 2025 - Project Initialization 🎬

**Today\'s Focus:** Project Setup and Planning

**Achievements:**

- Created project concept and scope
- Set up initial project documentation
- Decided on technology stack
- Created comprehensive README.md

**Technical Decisions:**

- Selected Next.js App Router for modern rendering patterns and improved performance
- Chose shadcn/ui for accessible, customizable components
- Decided on TypeScript for better type safety and developer experience

**Challenges:**

**Solutions:**

- Created detailed project phases to manage scope

**Learnings:**

- Benefits of breaking down features into manageable tasks

**Next Steps:**

- Begin basic component implementation

#### January 31, 2025 - Implement UI Components 🎬

**Today\'s Focus:** Implement UI Components for Interactions

**Achievements:**

- Created **movie-card** component

**Technical Decisions:**

- Using Card component from shadcn/ui

**Challenges:**

- Having difficulties to look for the right design from figma

**Solutions:**

- Use basic layout, displaying core information about the movie

**Learnings:**

- **Next Steps:**

- Complete the UI Component

#### February 1, 2025 - Implement UI Components 🎬

**Today\'s Focus:** Implement Card Stack layout and Action Buttons

**Achievements:**

- Create stack card layout
- Create action buttons component

**Technical Decisions:**

- Using Button component from shadcn/ui
- Using icons from lucide/react

**Challenges:**

- **Solutions:**

- Use tailwind CSS to position second until last cards

**Learnings:**

- **Next Steps:**

- Implement skeleton UI when load data
