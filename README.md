# Prakash Chaudhary - Personal Portfolio Website

A modern personal portfolio website built with **React**, **Vite**, and **Framer Motion**. Features a dark futuristic theme with glassmorphism effects, gradients, and smooth animations.

## Features

### Design
- **Dark Futuristic Theme** - Cyberpunk-inspired color palette with neon accents
- **Glassmorphism Effects** - Modern frosted glass UI elements
- **Gradient Effects** - Vibrant gradient overlays and text effects
- **Smooth Animations** - Powered by Framer Motion
- **Particle System** - Interactive canvas-based particle background
- **Responsive Design** - Optimized for all screen sizes

### Technologies

#### Core
- **React 19** - Modern component-based architecture
- **Vite** - Lightning-fast build tool and dev server
- **Framer Motion** - Production-ready motion library

#### Styling
- **CSS3** - Custom properties (CSS variables)
- **Modern CSS Features** - Grid, Flexbox, Backdrop Filter
- **Google Fonts** - Inter and Space Grotesk typography

#### Libraries
- **react-router-dom** - Client-side routing with lazy-loaded pages
- **react-icons** - Icon library
- **react-markdown** - Markdown rendering, with remark-gfm and rehype-highlight
- **gray-matter** - Frontmatter parsing for content files
- **mermaid** - Diagram rendering
- **giscus** - GitHub-based comments
- **vite-plugin-sitemap** - Sitemap and robots.txt generation

### Pages

- **Home** - Hero, About, News, Projects, Publications sections
- **About** - Background, skills, career timeline, and education
- **Projects** - Full project listing with category filters
- **News** - Timeline of achievements and milestones
- **Writing & Research** - Blog posts and publications
- **Blog** - Technical blog with markdown support, plus posts pulled from Medium
- **Resume** - Professional resume/CV with a PDF download

## Installation

### Prerequisites
- Node.js (v22, matching CI)
- npm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/connectwithprakash/connectwithprakash.github.io.git
   cd connectwithprakash.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
website/
├── public/              # Static assets, images, resume/CV files
├── skills/              # Repo-specific authoring guides for agents
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components (lazy-loaded routes)
│   ├── content/         # Markdown content (projects, blog)
│   ├── data/            # Content loaders and hand-maintained data
│   ├── context/         # React context providers
│   ├── services/        # External data fetching (Medium RSS)
│   ├── App.jsx          # Routes and providers
│   ├── index.css        # Global styles and CSS variables
│   └── main.jsx         # Entry point
├── package.json
└── vite.config.js       # Build config and sitemap generation
```

## Adding Content

Projects and blog posts are markdown files that register themselves, so adding
content needs no route changes:

- **Project**: add `src/content/projects/<id>.md`. `src/data/projectLoader.js`
  globs the directory, and the `id` in the frontmatter becomes `/project/<id>`.
  Images go in `public/assets/img/projects/<id>/`.
- **Blog post**: add `src/content/blog/YYYY-MM-DD-<slug>.md`. The date prefix is
  stripped to form the URL.

`vite.config.js` reads both directories at build time, so the sitemap picks up
new pages automatically. `src/data/newsData.js` holds the news timeline.

See `skills/portfolio-site/SKILL.md` for the frontmatter schemas, image
conventions, and the pre-publish checklist.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds and publishes to GitHub Pages at
[connectwithprakash.com](https://www.connectwithprakash.com). Pushing is
publishing.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available for personal and commercial use.

## Contact

For questions or collaboration:
- **Email**: connectwithprakash@gmail.com
- **LinkedIn**: [linkedin.com/in/connectwithprakash](https://linkedin.com/in/connectwithprakash)
- **GitHub**: [github.com/connectwithprakash](https://github.com/connectwithprakash)

---

Built with ❤️ using React + Vite, with assistance from Claude Code, Hermes Agent, and Codex
