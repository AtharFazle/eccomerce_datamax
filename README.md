Berikut adalah versi dokumentasi yang telah diperbarui dengan **tambahan cara menjalankan JSON DB server** menggunakan `json-server`:

---

# React + Vite + TypeScript Template (react-vite-ui)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AtharFazle/eccomerce_datamax/blob/main/LICENSE)

A React + Vite template powered by shadcn/ui.

## 🎉 Features

* **React** – A JavaScript library for building user interfaces.
* **Vite** – A fast, opinionated frontend build tool.
* **TypeScript** – A typed superset of JavaScript that compiles to plain JavaScript.
* **Tailwind CSS** – A utility-first CSS framework. (`v3`)
* **Tailwind Prettier Plugin** – A Prettier plugin for formatting Tailwind CSS classes.
* **ESLint** – A pluggable linting utility for JavaScript and TypeScript.
* **PostCSS** – A tool for transforming CSS with JavaScript.
* **Autoprefixer** – A PostCSS plugin to parse CSS and add vendor prefixes.
* **shadcn/ui** – Beautifully designed components that you can copy and paste into your apps.
* **JSON Server** – A fake REST API using a simple JSON file, great for prototyping.

## ⚙️ Prerequisites

Make sure you have the following installed on your development machine:

* Node.js (version 22 or above)
* pnpm (package manager)

## 🚀 Getting Started

Follow these steps to get started with the `react-vite-ui` template:

1. Clone the repository:

   ```bash
   git clone https://github.com/AtharFazle/eccomerce_datamax.git
   ```

2. Navigate to the project directory:

   ```bash
   cd eccomerce_datamax
   ```

3. Install the dependencies:

   ```bash
   pnpm install
   ```

4. Start the development server:

   ```bash
   pnpm dev
   ```

## 🗃️ Running the JSON Server (Mock API)

This project uses `json-server` as a mock backend. Follow these steps to run the mock API server:

1. Make sure you have `json-server` installed (globally or locally). You can install it globally with:

   ```bash
   npm install -g json-server
   ```

   atau secara lokal (disarankan, jika belum diinstall):

   ```bash
   pnpm add -D json-server
   ```

2. Tambahkan file `db.json` di root project Anda referensi bisa pakai db.json yang sudah saya sediakan, misalnya:

   ```json
   {
     "users": [],
     "products": [],
     "orders": []
   }
   ```

3. Jalankan server dengan perintah:

   ```bash
   npx json-server --watch db.json --port 3001
   ```

   Ini akan menjalankan server di `http://localhost:3001`.

4. (Opsional) Tambahkan script ke `package.json` agar lebih mudah:

   ```json
   "scripts": {
     "serve:db": "json-server --watch db.json --port 3001"
   }
   ```

   Lalu jalankan dengan:

   ```bash
   pnpm serve:db
   ```

## 📜 Available Scripts

* `pnpm dev` – Starts the development server.
* `pnpm build` – Builds the production-ready code.
* `pnpm lint` – Runs ESLint to analyze and lint the code.
* `pnpm preview` – Starts the Vite development server in preview mode.
* `pnpm serve:db` – Starts the JSON mock API server.

## 📂 Project Structure

```plaintext
eccomerce_datamax/
  ├── db.json              # JSON mock database
  ├── node_modules/        # Project dependencies
  ├── public/              # Public assets
  ├── src/                 # Application source code
  │   ├── components/      # React components
  │   │   └── ui/          # shadcn/ui components
  │   ├── styles/          # CSS stylesheets
  │   ├── lib/             # Utility functions
  │   ├── App.tsx          # Application entry point
  │   └── index.tsx        # Main rendering file
  ├── eslint.config.js     # ESLint configuration
  ├── index.html           # HTML entry point
  ├── postcss.config.js    # PostCSS configuration
  ├── tailwind.config.ts   # Tailwind CSS configuration
  ├── tsconfig.json        # TypeScript configuration
  └── vite.config.ts       # Vite configuration
```

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/AtharFazle/eccomerce_datamax/blob/main/LICENSE) file for details.

---

Kalau kamu juga ingin ditambahkan cara integrasi API dari `json-server` ke dalam kode React-nya, tinggal bilang saja!
