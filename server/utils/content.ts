import { readFile } from 'node:fs/promises'
import matter from 'gray-matter'

export interface WikiPage {
  slug: string
  title: string
  markdown: string
  updatedAt: Date
}

export async function getPage(slug: string): Promise<WikiPage | null> {
  try {
    const raw = await readFile(`content/wiki/${slug}.md`, 'utf-8')
    const { data, content } = matter(raw)
    return {
      slug,
      title: data.title ?? slug,
      markdown: content,
      updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
    }
  } catch(e) {
    return null
  }
}