# Indian Paratha Company

Welcome to the **Indian Paratha Company** web application repository. This is a modern, interactive, and visually stunning web application built with React, Vite, and Tailwind CSS. It features 3D elements powered by Three.js, smooth animations using Framer Motion, and AI integration via the Gemini API.

## 🌟 Features

- **Modern UI/UX**: Built with Tailwind CSS and Framer Motion for a sleek, responsive, and highly interactive user experience.
- **3D Elements**: Incorporates Three.js for immersive visual effects.
- **AI Integration**: Connects with the Gemini API to power smart, generative features within the app.
- **Firebase Backend**: Uses Firebase for database (Firestore) and authentication.
- **Fast Build Tooling**: Powered by Vite for rapid development and optimized production builds.

## 🛠 Tech Stack

- **Frontend Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: Three.js
- **Icons**: Lucide React
- **AI**: Google Gen AI SDK (`@google/genai`)
- **Backend/Services**: Firebase

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone the repository

```bash
git clone https://github.com/mhr476658/indian-Paratha-co.git
cd indian-Paratha-co
```

### 2. Install dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory (you can copy `.env.example` as a template) and add your required keys, including your Gemini API key and Firebase configuration:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

The application will be available locally (usually at `http://localhost:5173/` or another port specified by Vite).

## ⚙️ CI/CD Pipeline

This repository is configured with a GitHub Actions CI/CD pipeline. Whenever code is pushed to the `master` or `main` branches, the pipeline automatically:
1. Installs dependencies
2. Runs the linter (`npm run lint`)
3. Builds the application (`npm run build`)

Check the "Actions" tab in the GitHub repository to view the pipeline runs.
