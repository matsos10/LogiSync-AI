# LogiSync AI

An AI-powered SaaS platform for optimizing logistics and supply chain management, from demand forecasting to delivery planning.

[cloudflarebutton]

LogiSync AI is a cutting-edge, AI-powered SaaS platform designed to revolutionize logistics and supply chain management for modern businesses. It directly addresses critical industry pain points such as inefficient stock management, costly delivery routes, and unforeseen supply disruptions. The platform provides a suite of intelligent tools including AI-driven demand forecasting, automated inventory optimization with smart alerts and auto-ordering, AI-powered delivery route planning, and proactive disruption detection.

## Table of Contents

- [✨ Key Features](#-key-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [💻 Usage](#-usage)
- [☁️ Deployment](#️-deployment)
- [📂 Project Structure](#-project-structure)
- [📄 License](#-license)

## ✨ Key Features

- **AI-Driven Demand Forecasting**: Predict future demand with high accuracy to optimize stock levels.
- **Automated Inventory Optimization**: Smart alerts and automated purchase orders to prevent stockouts and reduce holding costs.
- **Intelligent Delivery Planning**: Optimize delivery routes to save time and fuel costs.
- **Proactive Disruption Detection**: Early warnings for potential delays in your supply chain.
- **Centralized Dashboard**: Real-time visibility and actionable insights in one place.
- **Multi-language Support**: Available in English, French, Spanish, and Portuguese.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Backend**: Hono on Cloudflare Workers
- **State Management**: Zustand
- **Routing**: React Router
- **Form Handling**: React Hook Form, Zod
- **Animations**: Framer Motion
- **Internationalization**: i18next, react-i18next
- **Icons**: Lucide React

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Bun](https://bun.sh/) installed on your machine.
- A [Cloudflare account](https://dash.cloudflare.com/sign-up).
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and authenticated.

```bash
bun install -g wrangler
wrangler login
```

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/logisync_ai.git
    cd logisync_ai
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file.
    ```bash
    cp .env.example .env
    ```
    Fill in the necessary values in your new `.env` file (Supabase URL, Stripe keys, etc.).

## 💻 Usage

To start the development server, which includes the Vite frontend and the Hono backend worker, run:

```bash
bun dev
```

This will start the application, typically with the frontend available at `http://localhost:3000`. The Vite server will proxy API requests to the local Wrangler server.

## ☁️ Deployment

This project is designed for easy deployment to Cloudflare's global network.

1.  **Build the application:**
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    ```bash
    bun run deploy
    ```

This command will build the frontend assets and deploy both the static site and the worker to your Cloudflare account.

Alternatively, you can deploy directly from your GitHub repository with one click.

[cloudflarebutton]

## 📂 Project Structure

-   `src/`: Contains the frontend React application.
    -   `components/`: Reusable UI components.
    -   `pages/`: Top-level page components for each route.
    -   `lib/`: Utility functions and API client.
    -   `hooks/`: Custom React hooks.
    -   `locales/`: Translation files for i18n.
-   `worker/`: Contains the Hono backend code for the Cloudflare Worker.
-   `shared/`: TypeScript types and data shared between the frontend and backend.
-   `public/`: Static assets.

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.