// https://nuxt.com/docs/api/configuration/nuxt-config
import { getPagePaths } from './shared/wikiTree.ts'
import tree from './content/wiki.config.ts'

export default defineNuxtConfig({
  modules: ['@nuxt/icon/module'],
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/prose.css', '@/assets/css/base.css'],
  hooks: {
    'prerender:routes'(ctx) {
      const wikiRoutes = getPagePaths(tree)
      for (const route of wikiRoutes) {
        ctx.routes.add(route)
      }
    },
  },
})
