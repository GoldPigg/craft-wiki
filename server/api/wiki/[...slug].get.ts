import { renderMarkdown } from '~~/shared/markdown'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')
  console.log(slug)
  if (!slug) throw createError({ statusCode: 400 })

  const page = await getPage(slug)
  if (!page) throw createError({ statusCode: 404 })

  const { html, toc } = await renderMarkdown(page.markdown)

  return {
    slug: page.slug,
    title: page.title,
    html,
    toc,
    updatedAt: page.updatedAt.toISOString(),
  }
})