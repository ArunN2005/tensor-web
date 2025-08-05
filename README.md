# Tensor Club Website

Official website for the **Tensor Club** - Premium Tech Community of Amrita Vishwa Vidyapeetham, Coimbatore. This application is built using [Next.js](https://nextjs.org) to deliver a modern, dynamic, and responsive experience.

## Table of Contents

1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [Commit Guidelines](#commit-guidelines)
7. [Technologies Used](#technologies-used)
8. [Components](#components)
9. [Styling](#styling)
10. [Learn More](#learn-more)
11. [Deploy on Vercel](#deploy-on-vercel)
12. [Contributing](#contributing)

---

## Overview

The Tensor Club website serves as the digital hub for one of Amrita Vishwa Vidyapeetham's premier tech communities. Built with modern web technologies, it showcases the club's activities, projects, events, and provides a platform for community engagement.

### Key Features

- **Modern Design**: Clean, responsive interface built with Tailwind CSS
- **Component-Based Architecture**: Reusable UI components for consistent design
- **Performance Optimized**: Next.js App Router for optimal loading speeds
- **Type-Safe**: Built with TypeScript for robust development
- **Accessible**: WCAG compliant components with proper ARIA attributes

---

## Getting Started

To run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Keerthivasan-Venkitajalam/Tensor-Web.git
   cd Tensor-Web
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

---

## Usage

- **Start Development Server:**
  
  ```bash
  npm run dev
  ```
  
- **Build for Production:**
  
  ```bash
  npm run build
  ```
  
  Run the production build:
  
  ```bash
  npm start
  ```

- **Linting:**
  
  ```bash
  npm run lint
  ```

---

## Project Structure

```
tensor-web/
├── public/                 # Static assets
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout component
│   │   └── page.tsx       # Home page component
│   ├── components/        # Reusable components
│   │   ├── pages/         # Page-specific components
│   │   │   ├── AboutUs.tsx
│   │   │   ├── Blog.tsx
│   │   │   ├── Events.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Leaderboard.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Testimonials.tsx
│   │   └── ui/            # UI components
│   │       └── button.tsx # Reusable button component
│   └── lib/
│       └── utils.ts       # Utility functions
├── commitlint.config.js   # Commit message linting
├── next.config.ts         # Next.js configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

---

## Commit Guidelines

### Important Note

This project uses **Commitlint** and **Commitizen** to enforce proper commit message standards following the [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Steps to Commit Changes

1. **Stage your changes:**
   
   ```bash
   git add <files>
   ```

2. **Commit using the interactive prompt:**
   
   ```bash
   npm run commit
   # or
   npx cz
   ```

3. **Follow the prompts** to create a properly formatted commit message

### Commit Message Format

The commit messages follow this format:
```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example:**
```
feat(components): add hero section with animations
fix(button): resolve accessibility issues with focus states
docs(readme): update installation instructions
```

---

## Technologies Used

- **[Next.js](https://nextjs.org/)**: React framework for production with App Router
- **[React](https://reactjs.org/)**: Library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)**: Unstyled, accessible components
- **[Class Variance Authority](https://cva.style/)**: Component variant management
- **[GSAP](https://greensock.com/gsap/)**: Animation library
- **[Commitlint](https://commitlint.js.org/)**: Commit message linting
- **[Husky](https://typicode.github.io/husky/)**: Git hooks

---

## Components

### Page Components (`src/components/pages/`)

- **Hero**: Landing section with club introduction
- **AboutUs**: Information about Tensor Club
- **Events**: Upcoming and past events display
- **Projects**: Showcase of club projects
- **Blog**: Latest articles and updates
- **Testimonials**: Community feedback
- **Leaderboard**: Member achievements
- **Navbar**: Navigation component

### UI Components (`src/components/ui/`)

- **Button**: Customizable button component with multiple variants
  - Variants: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
  - Sizes: `default`, `sm`, `lg`, `icon`

---

## Styling

The project uses **Tailwind CSS** for styling with a custom design system:

- **Colors**: Blue primary palette with gray neutrals
- **Typography**: Geist Sans and Geist Mono fonts
- **Spacing**: Consistent spacing scale
- **Responsive**: Mobile-first responsive design
- **Dark Mode**: Support for theme switching (if implemented)

### Custom CSS Classes

Global styles are defined in `src/app/globals.css` with Tailwind utilities and custom properties.

---

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [React Documentation](https://reactjs.org/docs) - Learn React
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn Tailwind CSS
- [TypeScript Documentation](https://www.typescriptlang.org/docs) - Learn TypeScript

---

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes** following the coding standards
4. **Commit using Commitizen**: `npm run commit`
5. **Push to the branch**: `git push origin feature/amazing-feature`
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Ensure components are accessible
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

---

**Made with passion by the Tensor Club Team at Amrita Vishwa Vidyapeetham, Coimbatore**
