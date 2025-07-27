# Browser Cursor - AI Agent Extension

A cursor-like AI agent for your browser that provides intelligent assistance through a side panel interface. This project combines a powerful browser extension frontend with a sophisticated AI backend powered by the Mastra framework, enabling seamless integration with GitHub, Notion, and other productivity tools.

## 🚀 Features

### Core Capabilities

- **Browser Side Panel**: Clean, responsive chat interface accessible from any web page
- **Multi-Agent AI System**: Specialized agents for different tasks and integrations
- **Persistent Conversations**: Thread-based chat history with semantic memory
- **Real-time Tool Execution**: Watch AI agents perform actions in real-time
- **Third-party Integrations**: Connect and automate GitHub and Notion workflows

### AI Agents

- **GitHub Agent**: Repository management, issue tracking, pull requests, project boards
- **Notion Agent**: Page creation, database management, workspace organization
- **General Assistant**: Conversational AI for general queries and tasks

### Integrations

- **GitHub**: Full API access for repository operations, issue management, PR workflows
- **Notion**: Comprehensive workspace and content management capabilities
- **Extensible Architecture**: Easy to add new integrations via Composio

## 🏗️ Architecture

### High-Level Design

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Browser       │    │    Backend       │    │   External      │
│   Extension     │◄──►│    (Next.js)     │◄──►│   Services      │
│                 │    │                  │    │                 │
│  ┌───────────┐  │    │  ┌────────────┐  │    │  ┌───────────┐  │
│  │ Side Panel│  │    │  │   tRPC     │  │    │  │  GitHub   │  │
│  │    UI     │  │    │  │    API     │  │    │  │    API    │  │
│  └───────────┘  │    │  └────────────┘  │    │  └───────────┘  │
│                 │    │                  │    │                 │
│  ┌───────────┐  │    │  ┌────────────┐  │    │  ┌───────────┐  │
│  │   Auth    │  │    │  │  Mastra    │  │    │  │  Notion   │  │
│  │  (Clerk)  │  │    │  │  Agents    │  │    │  │    API    │  │
│  └───────────┘  │    │  └────────────┘  │    │  └───────────┘  │
│                 │    │                  │    │                 │
│                 │    │  ┌────────────┐  │    │  ┌───────────┐  │
│                 │    │  │ PostgreSQL │  │    │  │ Composio  │  │
│                 │    │  │  Database  │  │    │  │ Platform  │  │
│                 │    │  └────────────┘  │    │  └───────────┘  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Frontend (Browser Extension)

- **Framework**: WXT (Web Extension Toolkit) with React
- **UI Components**: shadcn/ui with Tailwind CSS
- **Communication**: tRPC client for type-safe API calls
- **Authentication**: Clerk Chrome Extension SDK
- **Features**:
  - Side panel interface with chat UI
  - Integration management page
  - Real-time tool execution visualization
  - Persistent conversations across browser sessions

### Backend (Next.js API)

- **Framework**: Next.js with App Router
- **API Layer**: tRPC for end-to-end type safety
- **AI Framework**: Mastra with agent networks
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk for user management
- **Key Features**:
  - Multi-agent orchestration
  - Conversation memory and threading
  - Integration management
  - Tool execution and monitoring

### AI System (Mastra Framework)

- **Agent Network**: Coordinated multi-agent system with specialized roles
- **Memory System**: PostgreSQL-backed persistent memory with semantic recall
- **Tool Integration**: Composio platform for third-party API access
- **Models**: Claude Sonnet 4 for primary reasoning, GPT-4 Nano for title generation
- **Features**:
  - Contextual conversation threading
  - Tool call filtering and token limiting
  - Automatic task delegation between agents

### Database Schema

- **Users**: Clerk-based user management
- **Conversations**: Thread-based chat history
- **Memory**: Semantic conversation storage
- **Traces**: Comprehensive execution logging
- **Evaluations**: AI performance metrics and testing

## 🛠️ Technology Stack

### Frontend

- **WXT**: Modern web extension framework
- **React 19**: Latest React with modern hooks
- **TypeScript**: Full type safety
- **Tailwind CSS**: Utility-first styling
- **shadcn/ui**: Modern component library
- **Lucide React**: Consistent iconography

### Backend

- **Next.js 15**: Latest Next.js with App Router
- **tRPC**: End-to-end type safety
- **Mastra**: AI agent framework
- **Drizzle ORM**: Type-safe database toolkit
- **PostgreSQL**: Robust data persistence
- **Clerk**: Authentication and user management

### AI & Integrations

- **Anthropic Claude**: Primary reasoning model
- **OpenAI GPT**: Supplementary tasks
- **Composio**: Third-party integration platform
- **GitHub API**: Repository and project management
- **Notion API**: Workspace and content management

## 📦 Project Structure

```
browser-cursor/
├── backend/                    # Next.js API server
│   ├── src/
│   │   ├── app/api/           # API routes
│   │   │   ├── chat/          # Main chat endpoint
│   │   │   └── trpc/          # tRPC router
│   │   ├── lib/               # Agent configuration
│   │   │   ├── agentConfig.ts # AI agent setup
│   │   │   └── agentInstructions.ts # Agent prompts
│   │   └── server/            # Backend logic
│   │       ├── api/           # tRPC routers
│   │       └── db/            # Database schema & migrations
│   └── package.json
│
├── extension/                  # Browser extension
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ChatInterface.tsx # Main chat UI
│   │   │   ├── IntegrationsPage.tsx # Integration management
│   │   │   └── ui/            # shadcn/ui components
│   │   ├── entrypoints/       # Extension entry points
│   │   │   ├── background.ts  # Service worker
│   │   │   ├── content.ts     # Content script
│   │   │   └── sidepanel/     # Side panel app
│   │   └── lib/               # Utilities
│   ├── wxt.config.ts          # Extension configuration
│   └── package.json
│
└── README.md                   # This file
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- PostgreSQL database
- Clerk account for authentication
- Composio account for integrations (optional)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/browser-cursor.git
   cd browser-cursor
   ```

2. **Install dependencies**

   ```bash
   # Backend
   cd backend
   pnpm install

   # Extension
   cd ../extension
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # backend/.env.local
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   NEON_URL=your_postgresql_connection_string
   ANTHROPIC_API_KEY=your_anthropic_api_key
   OPENAI_API_KEY=your_openai_api_key
   COMPOSIO_API_KEY=your_composio_api_key
   ```

4. **Initialize database**

   ```bash
   cd backend
   pnpm drizzle-kit push
   ```

5. **Start development servers**

   ```bash
   # Backend (Terminal 1)
   cd backend
   pnpm dev

   # Extension (Terminal 2)
   cd extension
   pnpm dev
   ```

6. **Load extension in browser**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select `extension/.output/chrome-mv3`

## 🔧 Configuration

### Agent Customization

Modify agent behavior in `backend/src/lib/agentInstructions.ts`:

- Update system prompts for different use cases
- Add new specialized agents
- Configure tool access and permissions

### Integration Management

Add new integrations in `backend/src/lib/agentConfig.ts`:

- Define new tool sets via Composio
- Create specialized agent configurations
- Configure authentication flows

### UI Customization

Extend the interface in `extension/src/components/`:

- Modify chat interface styling
- Add new integration cards
- Customize tool execution visualization

## 🏃‍♂️ Usage

1. **Install and activate** the browser extension
2. **Sign in** using Clerk authentication
3. **Configure integrations** (GitHub, Notion) in the integrations tab
4. **Start chatting** with AI agents through the side panel
5. **Watch tools execute** in real-time as agents complete tasks

### Example Use Cases

- "Create a GitHub issue for the bug I mentioned"
- "Update my Notion project status to completed"
- "Show me recent pull requests in my repositories"
- "Create a new Notion page with meeting notes"

## 🙏 Acknowledgments

- [Mastra](https://mastra.ai) - AI agent framework
- [WXT](https://wxt.dev) - Web extension toolkit
- [Composio](https://composio.dev) - Integration platform
- [Clerk](https://clerk.dev) - Authentication platform
- [shadcn/ui](https://ui.shadcn.com) - Component library
