# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Application Flow: Supabase, Services & UI Components

This app is a small shipping-order dashboard built on top of Supabase.

- **Supabase client (`app/supabase/index.ts`)**:  
  - Reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from environment variables.  
  - Creates and exports a single `supabase` client instance with `createClient(...)`.  
  - The client is imported once in `ShippingOrderServices` and initialized early via `import "./supabase"` in `root.tsx`.

- **Service layer (`app/services/ShippingOrderServices.ts`)**:  
  - Defines the `Order` TypeScript interface that models a row from the `orders` table in Supabase.  
  - Exposes a singleton `OrderService` with two main methods:
    - **`getShippingOrders()`**: calls `supabase.from("orders").select()` and returns the list of orders (or an error) wrapped in a typed `Response<Order[]>`.  
    - **`addShippingOrder(params)`**: calls `supabase.from("orders").insert({...})` to create a new order, always setting `currency: "INR"` on insert.  
  - All components that need to talk to the backend import this service instead of using the Supabase client directly.

- **Pages & data fetching (`app/routes/orders.tsx`)**:  
  - The `Orders` route component uses `ShippingOrderServices.getShippingOrders()` inside a `useEffect` to fetch data on mount.  
  - It stores the result in local `orders` state and passes it to a reusable `Table` UI component, together with column definitions describing how to render each `Order` field.  
  - Errors from the service are surfaced to the user with `sonner` toasts.

- **Form & mutations (`app/components/shared-components/AddBoxForm.tsx`)**:  
  - Uses `react-hook-form` + `zod` for validation of form inputs (`name`, `weight`, `color`, `destination`).  
  - Computes an estimated shipping price on the client based on the selected destination and weight.  
  - On submit, it calls `ShippingOrderServices.addShippingOrder(...)` to insert a new row into the Supabase `orders` table.  
  - Success and error states are communicated with `sonner` toasts; on success, the form is reset.

- **Shared UI (`app/components/ui`)**:  
  - **`Table`**: generic, typed table that receives `data`, `columns` and `getRowId`; handles loading and empty states.  
  - **`Input` / `Select`**: small, styled form controls that accept props from `react-hook-form`, display labels and validation errors, and keep the form markup clean.

- **Global layout & context (`app/root.tsx`, `app/context/ShippingContext.tsx`)**:  
  - `root.tsx` sets up the HTML shell, global CSS, `Toaster` for notifications, and wraps all routes in `RootLayout` and `ShippingContext`.  
  - `ShippingContext` is currently a simple `React.Context` provider; it can be extended later to share shipping-related global state (e.g. filters, selected order, cached lists) across routes.

In summary, **Supabase** is responsible for persistence, **`ShippingOrderServices`** is the single place where API calls live, and UI components like **`Orders`** and **`AddBoxForm`** use that service to fetch and mutate shipping orders while keeping the presentation layer simple and reusable.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
