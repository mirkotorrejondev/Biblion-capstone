# Biblion

Biblion is an application designed to search for books in a university library and book loans.

## 🚀 Features

- Advanced search with multiple parameters
- Detailed book information visualization
- Fully responsive design
- Theme switcher (light/dark mode)
- User authentication (Pending)
- Book upload functionality (Pending)

## 🛠️ Technologies

- [Next.js 15+](https://nextjs.org/) - React Framework
- [React 19+](https://reactjs.org/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Static typing
- [Redux Toolkit](https://redux-toolkit.js.org/) - Global state management

## 📋 Prerequisites

Before you begin, ensure you have installed:

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/mirkotorrejondev/Biblion-capstone.git
cd Biblion-capstone
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_OPENLIBRARY_BASE_URL=https://openlibrary.org
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
├── app/                   # Next.js App Router
│   ├── layout.tsx         # Main layout
│   ├── page.tsx           # Home page
│   └── [...]/             # Other routes
├── components/            # Reusable components
├── lib/                   # Utilities and configurations
│   ├── services/          # API services
│   ├── hooks/             # Custom React hooks
│   └── config.ts          # Endpoint configuration
├── types/                 # TypeScript definitions
├── public/                # Static files
└── next.config.js         # Next.js configuration
```

## 🎯 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run linter
npm run format       # Format all documents
```

## Deployment

### Live Demo

The application is deployed on Netlify:
**[https://biblion-capstone-web.netlify.app/](https://biblion-capstone-web.netlify.app/)**

## Author

- **Mirko Torrejon** - [GitHub](https://github.com/mirkotorrejondev)

## Contact

For questions or suggestions, feel free to reach out through GitHub.
