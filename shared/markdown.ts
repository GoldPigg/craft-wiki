import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { defaultSchema } from 'rehype-sanitize'
import type { Root, Element, Text } from 'hast'
import rehypeSlug from 'rehype-slug'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

export interface TocItem {
  depth: number   // 1-6，对应 h1-h6
  text: string
  id: string
}

function rehypeExtractToc() {
  return (tree: Root, file: any) => {
    const toc: TocItem[] = []
    visit(tree, 'element', (node: Element) => {
      const match = /^h([1-6])$/.exec(node.tagName)
      if (!match) return
      const id = node.properties?.id
      if (!id) return
      toc.push({
        depth: Number(match[1]),
        text: extractText(node),
        id: String(id),
      })
    })
    file.data.toc = toc
  }
}

function extractText(node: any): string {
  if (node.type === 'text') return node.value
  if (node.children) return node.children.map(extractText).join('')
  return ''
}

function rehypeHeadingAnchor() {
  return (tree: Root) => {
    visit(tree, 'element', (node: Element) => {
      if (!/^h[1-6]$/.test(node.tagName)) return
      const id = node.properties?.id
      if (!id) return

      const anchor: Element = {
        type: 'element',
        tagName: 'a',
        properties: {
          className: ['anchor'],
          href: `#${id}`,
          ariaLabel: '复制锚点链接',
        },
        children: [{ type: 'text', value: '#' } as Text],
      }

      node.children.push(anchor)
    })
  }
}

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    a: [...(defaultSchema.attributes?.a ?? []), 'className', 'ariaLabel'],
  },
  clobberPrefix: '',
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // .use(remarkWikiLink)
  .use(remarkRehype, { allowDangerousHtml: false })
  .use(rehypeSlug)
  .use(rehypeSanitize, schema)
  .use(rehypeExtractToc)
  .use(rehypeHeadingAnchor)
  .use(rehypeStringify)

export async function renderMarkdown(md: string): Promise<{ html: string; toc: TocItem[] }> {
  const file = await processor.process(md)
  return {
    html: String(file),
    toc: (file.data.toc as TocItem[]) ?? [],
  }
}