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

#### February 2, 2025 - Implement UI Components 🎬

**Today\'s Focus:** Implement Skeleton and Error fallback

**Achievements:**

- Create skeleton using suspense next.js
- Create error page using error boundary in next.js
- Implement new protected route /discover for the main swipe UI

**Technical Decisions:**

- created grouped routes (protected) indicating routes for authenticated users
- grouped card related components under /components/cards
- implement MovieStack component as Server Component so we can use Suspense

**Challenges:**

- Making the suspense work accordingly as I was using Client Component at first.

- **Solutions:**

- Set MovieStack as server component and uses Suspense

**Learnings:**

- Be mindful when deciding which component should be server/client component

- **Next Steps:**

- API integration

#### February 13, 2025 - Implement Animation 🎬

**Today\'s Focus:** Implement Swipe Animation

**Achievements:**

- Install framer-motion
- Implement swipe motion to like/dislike movie

**Technical Decisions:**

- Use framer-motion (now called motion)

**Challenges:**

- Making the swipe motion correct
- Displaying the second to last movie properly

- **Solutions:**

- Set MovieStack as server component and uses Suspense

**Learnings:**

- Z-index dynamically to create stack properly

- **Next Steps:**

- Store the liked/disliked card

#### February 14, 2025 - Implement Core Functionality 🎬

**Today\'s Focus:**

- Implement swiped movies tracker
- Implement room for multiplayer interactions

**Achievements:**

- Create SwipeTracker class
- Create new dynamic page route for dynamic movie types
- Integrate tracking liked/disliked movies on client side and storing it to cookies
- Filter out the liked/disliked movies on SSR
- Implement room for multiplayer to start swiping together

- **Next Steps:**

- Allow user to create user name and track user in localStorage
- Track swiped movies for each user in a room

#### February 14, 2025 - Implement Core Functionality 🎬

**Today\'s Focus:**

- Allow user to create user name and track user in localStorage
- Track swiped movies for each user in a room

**Achievements:**

- Create RoomSwipeTracker class
- Create RoomPresenceProvider to track active users in a room
- Display information about active users in a room
- Display toast for liked movies and when a match is found in a room

- **Next Steps:**
- Design how we can allow multiplayer using the same room
