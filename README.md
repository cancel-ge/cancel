# 🚫 Cancel.ge 🚫

A platform for documenting and exposing companies, public figures, and entities affiliated with the current **de facto government** of Georgia, or those failing to take actions to distance themselves from it, particularly in regard to their stance on Georgian EU membership aspirations.

## 🌐 Tech Stack

- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (UI components)
- **Supabase** (Database & Auth)

## 🔧 Prerequisites

Before you begin, make sure you have the following:

- **Node.js** v18+ (or newer)
- **Supabase** account (for database and authentication)

## 🛠 Installation

Follow these steps to get the project up and running:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/your-repo-name.git
    ```

2. Install the necessary dependencies using `yarn`:
    ```bash
    yarn
    ```

3. Set up **Supabase**:
   - Create a **Supabase** account (if you don’t have one already).
   - Create a `.env` file in the root directory of your project and add the following Supabase credentials:
     ```env
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     NEXT_PUBLIC_APP_URL=http://localhost:3000
     ```

4. Run database migrations:
    ```bash
    yarn db:migrate
    ```

5. Start the development server:
    ```bash
    yarn dev
    ```
