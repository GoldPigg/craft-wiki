// https://nuxt.com/docs/api/configuration/nuxt-config
import { getPagePaths } from './shared/wikiTree.ts'
import tree from './content/wiki.config.ts'

export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxt/icon/module', '@hypernym/nuxt-gsap', '@nuxt/fonts'],
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  fonts: {
    families: [
      {
        name: 'Liyu Shoushu',
        src: '/fonts/LiyuShoushu-Regular.ttf',
        weight: 400,
        global: true,
      },
    ],
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
  gsap: {
    extraPlugins: {
      scrollTrigger: true,
      draggable: true,
      scrollTo: true,
    },
    clubPlugins: {
      splitText: true,
      scrollSmoother: true,
      inertia: true,
    },
  }
})
