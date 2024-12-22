# Cancel.ge

A platform for documenting and exposing companies, public figures, and entities affiliated with the current ex-facto government of Georgia or those failing to take actions to distance themselves from it, particularly in regard to their stance on Georgian EU membership aspirations.

## Tech Stack

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase (Database & Auth)

## Prerequisites

- Node.js 18+ 
- Supabase account

## Installation

1. Clone the repository;
2. Install dependencies using `yarn`
3. Set up Supabase, create a `.env` file with the necessary Supabase credentials:
    - NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    - NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    - NEXT_PUBLIC_APP_URL=http://localhost:3000

4. Run migrations: `yarn db:migrate`
5. Run the development server: `yarn dev`
