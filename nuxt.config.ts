// https://nuxt.com/docs/api/configuration/nuxt-config
import { getPagePaths } from './shared/wikiTree.ts'
import tree from './content/wiki.config.ts'

export default defineNuxtConfig({
  ssr: true,
  modules: ['@nuxt/icon/module', '@hypernym/nuxt-gsap', '@fontize/nuxt'],
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  fontize: {
    fonts: [{
      alias: 'ZhongQiZhiMang',
      src: './fonts/ZhongQiZhiMang.ttf',
      weight: 400,
    }]
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
