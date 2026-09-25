import { copyFileSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const pages = process.env.GITHUB_PAGES === 'true'
let outDir = 'dist'

export default defineConfig({
  // arusha.com.np is the site root, so Pages assets must be /assets/….
  // A local build uses relative paths so opening dist/index.html can run it.
  base: pages ? '/' : './',
  build: pages
    ? undefined
    : {
        modulePreload: false,
        cssCodeSplit: false,
        rollupOptions: {
          output: {
            format: 'iife',
            inlineDynamicImports: true,
            entryFileNames: 'assets/app.js',
          },
        },
      },
  plugins: [
    react(),
    {
      name: 'dist-html',
      apply: 'build',
      configResolved(config) {
        outDir = config.build.outDir
      },
      transformIndexHtml: {
        order: 'post',
        handler(html) {
          if (pages) return html
          // A classic script in <head> runs before #root exists, so the page stays blank.
          const src = html.match(/<script[^>]*src="([^"]+)"[^>]*><\/script>/)?.[1]
          if (!src) return html
          return html
            .replace(/<script[^>]*src="[^"]+"[^>]*><\/script>\s*/, '')
            .replace(
              /<link rel="stylesheet" crossorigin href="(\.\/assets\/[^"]+)">/,
              '<link rel="stylesheet" href="$1">',
            )
            .replace('</body>', `  <script src="${src}"></script>\n  </body>`)
        },
      },
      closeBundle() {
        const file = join(outDir, 'index.html')
        if (!pages) {
          let html = readFileSync(file, 'utf8')
          const cssName = html.match(/href="\.\/assets\/([^"]+\.css)"/)?.[1]
          const jsName = html.match(/src="\.\/assets\/([^"]+\.js)"/)?.[1]
          if (cssName) {
            const css = readFileSync(join(outDir, 'assets', cssName), 'utf8')
            html = html.replace(
              /<link rel="stylesheet" href="\.\/assets\/[^"]+\.css">/,
              () => `<style>${css}</style>`,
            )
          }
          if (jsName) {
            const js = readFileSync(join(outDir, 'assets', jsName), 'utf8').replaceAll('</script', '<\\/script')
            html = html.replace(
              /<script src="\.\/assets\/[^"]+\.js"><\/script>/,
              () => `<script>${js}</script>`,
            )
          }
          writeFileSync(file, html)
        }
        copyFileSync(file, join(outDir, '404.html'))
      },
    },
  ],
})
