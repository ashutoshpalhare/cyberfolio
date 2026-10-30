# CyberFolio — Neural Portfolio 2077

A cyberpunk-inspired, single-page developer portfolio that presents a profile as a futuristic command-center interface. CyberFolio combines a cinematic boot sequence, motion-driven sections, holographic-style cards, and a small rule-based portfolio assistant.

> **Project status:** Portfolio UI / personal-site experiment. Review the profile content and replace all sample data before treating the site as an accurate public CV. The current project dataset contains placeholder project entries and hard-coded GitHub figures.

## Overview

CyberFolio is built around a deliberately immersive interface rather than a conventional portfolio layout. Visitors move through the profile using a floating navigation bar and anchored sections.

The experience includes:

- **Boot sequence** — an introductory startup animation before the portfolio is revealed.
- **Animated portfolio interface** — cyber-grid backgrounds, neon accents, a custom cursor, hover effects, and Framer Motion transitions.
- **Profile and experience** — identity details, experience cards, and a chronological timeline driven by local data.
- **Project gallery** — project cards with descriptions, technology tags, images, repository links, and demo links.
- **Skills and achievements** — grouped skill collections and achievement cards.
- **GitHub overview** — a visual GitHub-style section whose current figures and activity samples are static data, not live GitHub API results.
- **Portfolio assistant** — answers a limited set of common questions using local portfolio data.

## Important implementation notes

A few distinctions matter when evaluating this project:

- The assistant is **rule-based**, not an LLM chatbot. It matches question keywords such as projects, skills, experience, contact, resume, and GitHub, then formats answers from `src/lib/portfolio-data.ts`. It does not call OpenAI or another AI API.
- The GitHub metrics, contribution cells, and activity examples in the portfolio dataset are **hard-coded sample values**. They are not fetched from GitHub.
- The project list currently includes generic sample entries and profile links. Update the data and verify every repository/demo URL before publishing the site as a factual portfolio.
- The visual interface uses a futuristic theme, but it is still a portfolio frontend; it does not implement a real neural interface or authentication system.

## Tech stack

| Area | Technology |
| --- | --- |
| UI | React 19, TypeScript |
| Routing / app framework | TanStack React Router, TanStack Start |
| Build tooling | Vite |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion |
| UI primitives | Radix UI-based components |
| Charts | Recharts (dependency available in the project) |
| Icons | Lucide React, React Icons |

## Project structure

```text
.
├── src/
│   ├── components/
│   │   ├── AIAssistant.tsx
│   │   ├── Background.tsx
│   │   ├── BootSequence.tsx
│   │   ├── Cursor.tsx
│   │   └── ui/
│   ├── lib/
│   │   └── portfolio-data.ts
│   ├── routes/
│   │   ├── __root.tsx
│   │   └── index.tsx
│   ├── router.tsx
│   ├── server.ts
│   └── styles.css
├── public/
├── package.json
└── vite.config.ts
```

The main portfolio content is centralized in `src/lib/portfolio-data.ts`. This includes the profile, timeline, experience, projects, skill groups, achievements, and GitHub display data.

## Getting started

### Prerequisites

- [Bun](https://bun.sh/) (recommended; the repository includes `bun.lock`)
- Git

### Install and run

```bash
git clone https://github.com/ashutoshpalhare/CyberFolio.git
cd CyberFolio
bun install
bun run dev
```

Vite prints the local development URL in the terminal.

### Available scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start the development server |
| `bun run build` | Create a production build |
| `bun run build:dev` | Build using development mode |
| `bun run preview` | Preview the production build locally |
| `bun run lint` | Run ESLint |
| `bun run format` | Format project files with Prettier |

## Personalizing the portfolio

1. Open `src/lib/portfolio-data.ts`.
2. Replace the profile, education, experience, projects, skills, achievements, and contact details with verified information.
3. Replace all sample project images and links with the correct assets, source repositories, and live demos.
4. Replace the hard-coded GitHub metrics and activity samples, or clearly label them as illustrative.
5. Review the assistant's responses so they reflect the updated data.
6. Check the site on mobile and desktop, and verify all external links before deployment.

Do not publish placeholder projects, unverified metrics, or experience claims as real achievements.

## Current limitations

- No backend database or authentication layer is implemented for portfolio content.
- The assistant uses local keyword matching and predefined response logic; it does not generate answers with an LLM.
- GitHub summary values are static and can become outdated.
- Project content is maintained in a TypeScript data file rather than a CMS.
- A contact UI should not be assumed to deliver messages unless a working submission service is configured and tested.

## Contributing

This repository is primarily a personal portfolio project. If you find a bug or want to suggest an improvement, open an issue with reproduction steps and the expected behaviour. Keep changes focused and avoid adding dependencies for effects that can be implemented with the existing stack.

## License

No license file is currently included. Unless a license is added, the repository is publicly viewable but reuse and redistribution are not automatically granted.
