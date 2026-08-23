import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import Sitemap from 'vite-plugin-sitemap'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Generate dynamic routes from content files
function getDynamicRoutes() {
  const routes = []

  // Get project routes
  const projectsDir = './src/content/projects'
  if (fs.existsSync(projectsDir)) {
    const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'))
    for (const file of projectFiles) {
      const content = fs.readFileSync(path.join(projectsDir, file), 'utf-8')
      const { data } = matter(content)
      if (data.id) {
        routes.push(`/project/${data.id}`)
      }
    }
  }

  // Get blog routes
  const blogDir = './src/content/blog'
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'))
    for (const file of blogFiles) {
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace('.md', '')
      routes.push(`/blog/${slug}`)
    }
  }

  return routes
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      // Whether to polyfill `node:` protocol imports.
      protocolImports: true,
    }),
    Sitemap({
      hostname: 'https://connectwithprakash.com',
      dynamicRoutes: [
        '/about',
        '/projects',
        '/news',
        '/publications',
        '/writing',
        '/blog',
        '/resume',
        '/personal',
        '/personal/books',
        '/personal/inquiry',
        ...getDynamicRoutes()
      ],
      exclude: ['/404', '/google1b40ab9e59fe683c'],
      outDir: 'dist',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date(),
      generateRobotsTxt: true,
      robots: [
        { userAgent: '*', allow: '/' }
      ],
    }),
  ],
  base: '/', // GitHub Pages user site (connectwithprakash.github.io)
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React - loaded on every page
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          // UI animations - loaded on every page but can be cached separately
          'vendor-motion': ['framer-motion'],
          // Markdown rendering - only needed for blog/project pages
          'vendor-markdown': ['react-markdown', 'remark-gfm', 'rehype-highlight', 'rehype-raw'],
          // Mermaid diagrams - only loaded when needed (lazy)
          'vendor-mermaid': ['mermaid'],
          // Comments - only on blog posts
          'vendor-giscus': ['@giscus/react'],
        },
      },
    },
  },
})
