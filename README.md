# Dharma Putra Maritime Landing Page

Official landing page for **Dharma Putra Maritime**, a professional maritime services provider. This project is built using [Astro](https://astro.build/) for high-performance static site generation.

## 🚀 Project Structure

Inside this project, you'll find the following folders and files:

- `src/`: Contains the Astro components, layouts, and pages.
- `public/`: Static assets like images, fonts, and the manifest file.
- `dist/`: The output directory for production builds (generated).
- `astro.config.mjs`: Astro configuration file.
- `tailwind.config.cjs`: Tailwind CSS configuration.

## 🛠️ Tech Stack

- **Framework**: [Astro v5+](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [AOS (Animate On Scroll)](https://michalsnik.github.io/aos/)
- **Deployment**: GitHub Pages (via GitHub Actions)

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:3000`      |
| `npm run build`           | Build your static site to `dist/`                |
| `npm run preview`         | Preview your build locally                       |
| `npm run lint`            | Run Astro check to find issues                   |

## 📦 Deployment

This project uses **GitHub Actions** for automated deployment to GitHub Pages. 

### Automated Workflow
Whenever a change is pushed to the `main` branch, the `.github/workflows/pages.yml` workflow will:
1.  Checkout the code.
2.  Install dependencies using `npm ci`.
3.  Build the project using `npm run build`.
4.  Upload the `dist/` folder as a GitHub Pages artifact.
5.  Deploy the artifact to the official domain.

### Environment Configuration
The site is configured to deploy to [https://dharmaputramaritime.co.id](https://dharmaputramaritime.co.id). Base paths and trailing slashes are handled automatically in `astro.config.mjs`.

## 🛡️ Security
We maintain a clean dependency tree. Recent security patches include:
- `lodash` prototype pollution fix via `overrides` in `package.json`.
- Updated `@astrojs/check` for better development diagnostics.

---

Built with ❤️ by the Dharma Putra Maritime Tech Team.