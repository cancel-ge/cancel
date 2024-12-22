# 🚫 Cancel.ge 🚫

A platform for documenting and exposing companies, public figures, and entities affiliated with the current **de facto government** of Georgia, or those failing to take actions to distance themselves from it, particularly in regard to their stance on Georgian EU membership aspirations.

---

## ☕ Support the Project

If you like this project and want to support its development, feel free to buy me a coffee! Your support helps us maintain and improve this open-source project.

All funds raised through [Buy Me a Coffee](https://buymeacoffee.com/dsha256) will be used exclusively for the maintenance of this open-source project. We are committed to transparency, and any contributions made will directly support the ongoing development, bug fixes, new features, and general upkeep of the project.

We will provide transparency into how funds are being used to ensure that your contributions are supporting the continued success of the project.

[![Buy Me a Coffee](https://img.buymeacoffee.com/button-api/?text=Buy%20Me%20A%20Coffee&emoji=&slug=dsha256&button_colour=FF813F&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00)](https://buymeacoffee.com/dsha256)

----

## 🌐 Tech Stack

- **Next.js 15**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** (UI components)
- **Supabase** (Database & Auth)

---

## 🔧 Prerequisites

Before you begin, make sure you have the following:

- **Node.js** v18+ (or newer)
- **Supabase** account (for database and authentication)

---

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

---

## 🎊️ Contributing

We welcome contributions to improve the project! Whether you're fixing bugs, adding new features, or improving documentation, your contributions are more than welcomed.

Please refer to our [Contributing Guidelines](./CONTRIBUTING.md) for detailed instructions on how to get started.

By contributing, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md) and adhere to the guidelines outlined in the contributing document.