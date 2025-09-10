# CC Copilot - AI-Powered Content Creator

An AI-powered content creation platform that transforms raw ideas into high-performing short-form video scripts, hooks, and captions optimized for Instagram Reels, TikTok, and YouTube Shorts.

## 🏗️ Project Structure

```
cc-copilot/
├── apps/
│   ├── web/                    # Next.js web application
│   │   ├── src/
│   │   │   ├── app/           # Next.js 14 app router
│   │   │   ├── components/    # React components
│   │   │   ├── lib/           # Utility functions
│   │   │   ├── hooks/         # Custom React hooks
│   │   │   ├── types/         # TypeScript type definitions
│   │   │   └── constants/     # App constants
│   │   └── public/            # Static assets
│   └── mobile/                # React Native mobile app (Phase 2)
├── packages/
│   ├── ui/                    # Shared UI components
│   ├── database/              # Prisma schema and migrations
│   ├── ai-agents/             # AI agent logic
│   └── utils/                 # Shared utilities
├── supabase/
│   ├── migrations/            # Database migrations
│   └── functions/             # Edge functions
├── PRD.md                     # Product Requirements Document
└── TASKMASTER.md              # Development task breakdown
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cc-copilot
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp apps/web/.env.example apps/web/.env.local
# Edit .env.local with your actual values
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## 🛠️ Technology Stack

### Frontend
- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Animation**: Framer Motion

### Backend
- **API**: Next.js API Routes with tRPC
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Clerk or NextAuth.js

### AI/ML
- **LLM Provider**: OpenAI API (GPT-4) with fallback to Anthropic Claude
- **Voice Processing**: Whisper API for transcription
- **Vector Database**: Pinecone or Weaviate
- **Agent Framework**: LangChain or Vercel AI SDK

### Infrastructure
- **Hosting**: Vercel (Frontend) + Supabase (Backend)
- **File Storage**: Uploadthing or Supabase Storage
- **Analytics**: PostHog + Vercel Analytics
- **Monitoring**: Sentry

## 📝 Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint issues
npm run format           # Format with Prettier
npm run format:check     # Check Prettier formatting
npm run type-check       # TypeScript type checking
```

## 🎯 Development Phases

### Phase 1: MVP Foundation (Weeks 1-6)
- ✅ Next.js project setup with TypeScript
- ✅ TailwindCSS and shadcn/ui components
- ✅ ESLint, Prettier, and Husky configuration
- ✅ Environment variables structure
- ✅ Project file structure
- 🔄 Database setup with Supabase
- 🔄 Authentication system
- 🔄 Basic AI integration with OpenAI
- 🔄 Idea capture system
- 🔄 Content generation engine

### Phase 2: Enhanced Features (Weeks 7-10)
- 🔄 Voice input with Whisper API
- 🔄 Advanced AI agents with LangChain
- 🔄 Performance tracking
- 🔄 Mobile app development

### Phase 3: Scale & Optimize (Weeks 11-14)
- 🔄 Social media integrations
- 🔄 Advanced analytics
- 🔄 Team collaboration features
- 🔄 Admin dashboard

## 🔧 Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values:

```env
# Database
DATABASE_URL=""
DIRECT_URL=""

# Authentication
NEXTAUTH_SECRET=""
CLERK_SECRET_KEY=""

# AI Services
OPENAI_API_KEY=""
ANTHROPIC_API_KEY=""

# Storage & Analytics
UPLOADTHING_SECRET=""
POSTHOG_KEY=""

# Payment
STRIPE_SECRET_KEY=""
```

## 📊 Key Features

### Core Functionality
- 🎯 **Hook Generator**: Create attention-grabbing hooks with proven formulas
- 📝 **Script Writer**: Generate platform-optimized scripts with brand voice
- 📱 **Multi-Platform**: Support for TikTok, Instagram Reels, YouTube Shorts
- 🎤 **Voice Input**: Transcribe and process voice recordings
- 📚 **Content Library**: Store and organize all generated content

### AI Features
- 🤖 **Multi-Agent System**: Specialized AI agents for different content types
- 🧠 **Context Memory**: Maintains brand voice and user preferences
- 📈 **Performance Learning**: Improves suggestions based on content performance
- 🔄 **Repurposing Engine**: Generate variations of successful content

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: support@cc-copilot.com
- 💬 Discord: [Join our community]()
- 📖 Documentation: [docs.cc-copilot.com]()

---

**Status**: 🚧 Under Development - Phase 1 MVP Foundation