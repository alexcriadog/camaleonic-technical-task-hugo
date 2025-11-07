# Camaleonic Analytics Dashboard

A comprehensive social media analytics dashboard that centralizes data from multiple platforms (Instagram, Facebook, Twitter) into a unified interface. Track engagement metrics, visualize performance trends, and manage your social media data with intuitive charts, tables, and CRUD operations.

🔗 **Live Demo**: [https://camaleonic-technical-task.vercel.app/](https://camaleonic-technical-task.vercel.app/)

## Features

### 🎯 Core Functionality

- **Multi-Platform Analytics**: Aggregate data from Instagram, Facebook, and Twitter in one dashboard
- **Interactive Charts**: Dynamic visualizations using Recharts with multiple chart types (line, bar, area)
- **Data Tables**: Sortable, filterable tables with full CRUD operations
- **Real-time Filters**: Filter data by platform, date range, and engagement metrics
- **Performance Metrics**: Track likes, comments, shares, reach, and engagement rates
- **Follower Growth**: Monitor follower trends across all platforms

### 🔐 Authentication

- **Better Auth Integration**: Secure authentication with session management
- **GitHub OAuth**: Social login support
- **MongoDB Sessions**: Persistent session storage
- **Protected Routes**: Dashboard access control

### 🎨 User Experience

- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Built with Radix UI components and shadcn/ui
- **Loading States**: Skeleton loaders and optimistic updates
- **Toast Notifications**: User feedback with Sonner

## Tech Stack

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI Library**: React 19.2
- **Styling**: Tailwind CSS 4
- **Component Library**: Radix UI + shadcn/ui
- **Charts**: Recharts
- **Tables**: TanStack Table
- **State Management**: Zustand
- **Date Handling**: date-fns

### Backend

- **Database**: MongoDB Atlas
- **Authentication**: Better Auth
- **OAuth**: GitHub
- **API**: Mock API (mockapi.io)

### DevOps

- **Deployment**: Vercel
- **Package Manager**: pnpm
- **Linting**: ESLint

## Prerequisites

Before setting up the project, ensure you have:

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher (or npm/yarn)
- **MongoDB Atlas Account** (free tier works)
- **GitHub OAuth App** (for authentication)
- **Mockapi.io Project** (for data storage)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/hugoogb/camaleonic-technical-task.git
cd camaleonic-technical-task
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory by copying the template:

```bash
cp env.template .env.local
```

Configure the following environment variables:

#### MongoDB Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Get your connection string
4. Add to `.env.local`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/
MONGODB_DB_NAME=auth
```

#### Better Auth Secret

Generate a secure random string:

```bash
openssl rand -base64 32
```

Add to `.env.local`:

```env
BETTER_AUTH_SECRET=your-generated-secret-key
```

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Add credentials to `.env.local`:

```env
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

#### Mock API Setup

1. Go to [Mockapi.io](https://mockapi.io/)
2. Create a new project
3. Create two resources:
   - `posts` (for social media posts)
   - `followers` (for follower data)
4. Import data from `seed-data.json`
5. Add API URL to `.env.local`:

```env
NEXT_PUBLIC_MOCK_API_URL=https://your-project-id.mockapi.io/api/v1
```

#### Application URL

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Seed Data (Optional)

If you want to populate your Mock API with sample data, use the provided `seed-data.json` file which contains:

- 75 social media posts across Instagram, Facebook, and Twitter
- 75 follower growth records for each platform

### 5. Run Development Server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
camaleonic-technical-task/
├── app/                      # Next.js app router
│   ├── (auth)/              # Authentication routes
│   ├── api/                 # API routes (auth endpoints)
│   ├── dashboard/           # Dashboard pages
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Landing page
├── components/              # React components
│   ├── auth-provider.tsx    # Auth context
│   ├── dashboard/           # Dashboard components
│   ├── ui/                  # Reusable UI components
│   ├── footer.tsx
│   ├── header.tsx
│   └── theme-provider.tsx
├── lib/                     # Utilities and configuration
├── public/                  # Static assets
├── seed-data.json          # Sample data for Mock API
└── env.template            # Environment variables template
```

## Approach & Architecture

### Design Philosophy

The application follows a **component-driven architecture** with a focus on:

- **Separation of Concerns**: Clear boundaries between UI, business logic, and data
- **Reusability**: Modular components that can be composed
- **Type Safety**: Full TypeScript coverage for reliability
- **Performance**: Optimistic updates and efficient re-renders

### Key Architectural Decisions

#### 1. **Next.js App Router**

Chose the modern App Router over Pages Router for:

- Server Components by default (better performance)
- Nested layouts and loading states
- Simplified data fetching with async components
- Better SEO with built-in metadata API

#### 2. **Better Auth**

Selected Better Auth over NextAuth because:

- Modern, lightweight, and TypeScript-first
- Better MongoDB adapter support
- Simpler configuration
- Active development and better DX

#### 3. **Mock API Strategy**

Used Mockapi.io for data persistence instead of embedding in MongoDB:

- Separates concerns (auth vs data)
- Easier to demonstrate CRUD operations
- Simulates real-world API integration
- No complex backend setup required

#### 4. **State Management**

Zustand for client state because:

- Minimal boilerplate compared to Redux
- React hooks-based API
- No context provider needed
- Perfect for dashboard filters and UI state

#### 5. **Component Architecture**

**Server Components** (Default):

- Landing page
- Dashboard layout
- Static content

**Client Components** (`"use client"`):

- Interactive charts (Recharts)
- Data tables (TanStack Table)
- Forms and filters
- Theme toggle

#### 6. **Styling Strategy**

Tailwind CSS + Radix UI for:

- Utility-first rapid development
- Accessible components out of the box
- Dark mode support with CSS variables
- Consistent design system

### Data Flow

```
User Interaction → Component State → API Call → Mock API
                                                    ↓
User Feedback ← Toast Notification ← Response ← Update
```

1. **Authentication Flow**: Better Auth → MongoDB → Session
2. **Data Fetching**: Client Component → API Route → Mock API
3. **CRUD Operations**: Optimistic UI → API Call → Revalidation

### Performance Optimizations

- **Lazy Loading**: Dynamic imports for heavy components
- **Memoization**: React.memo and useMemo for expensive renders
- **Debouncing**: Search and filter inputs
- **Skeleton Loading**: Better perceived performance
- **Code Splitting**: Automatic with Next.js

### Security Considerations

- Environment variables for sensitive data
- Protected API routes with session validation
- CORS configuration for API endpoints
- Secure session storage in MongoDB
- XSS protection with React's built-in sanitization

## Troubleshooting

### Common Issues

**Database Connection Failed**

- Verify MongoDB URI is correct
- Check network access in MongoDB Atlas (add your IP)
- Ensure database user has correct permissions

**GitHub OAuth Not Working**

- Verify callback URL matches in GitHub app settings
- Check client ID and secret are correct
- Ensure app is not in development mode restrictions

**Mock API Errors**

- Verify API URL includes `/api/v1` at the end
- Check that resources `posts` and `followers` exist
- Ensure data format matches expected schema

## License

This project is created as a technical task for Camaleonic Analytics.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
