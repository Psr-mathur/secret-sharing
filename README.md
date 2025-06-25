# Secret Sharing

A secure platform for sharing sensitive information using the T3 Stack. Share secrets with optional password protection, expiration times, and view limits.

🌐 **Live Demo**: [secret-sharing-delta.vercel.app](https://secret-sharing-delta.vercel.app)

## Features

- 🔐 Secure secret sharing with optional password protection
- ⏰ Set expiration times for secrets
- 👥 Track number of views
- 🔑 User authentication
- 📝 Support for long text content (up to 10,000 characters)

## Tech Stack

- [Next.js](https://nextjs.org) - React framework
- [NextAuth.js](https://next-auth.js.org) - Authentication
- [Prisma](https://prisma.io) - Database ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [tRPC](https://trpc.io) - End-to-end typesafe API
- [Material UI](https://mui.com/) - UI components

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Copy `.env.example` to `.env` and update the variables
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the database:
   ```bash
   npm run db:push
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## Database Schema

### User
```prisma
model User {
    id            String    @id @default(cuid())
    name          String?
    email         String    @unique
    emailVerified DateTime?
    password      String?
    secrets       Secret[]
}
```

### Secret
```prisma
model Secret {
    id          String    @id @default(cuid())
    key         String    @unique
    content     String    @db.VarChar(10000)
    expiresAt   DateTime?
    views       Int       @default(0)
    password    String?
    createdById String
    createdBy   User      @relation(fields: [createdById], references: [id])
}
```

## Development

```bash
# Run development server
npm run dev

# Type checking
npm run typecheck

# Linting
npm run lint

# Formatting
npm run format:write

# Database management
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
```

## Deployment

This application is deployed on Vercel at [secret-sharing-delta.vercel.app](https://secret-sharing-delta.vercel.app).

You can also deploy it on:
- [Netlify](https://create.t3.gg/en/deployment/netlify)
- [Docker](https://create.t3.gg/en/deployment/docker)

## License

MIT
