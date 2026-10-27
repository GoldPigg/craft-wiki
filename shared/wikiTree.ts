export type WikiConfig = {
  [key: string]: WikiConfig | string
}

export interface WikiTreeNode {
  name: string
  fullPath: string
  parent: WikiTreeNode | null
  children: WikiTreeNode[]
  opened: boolean
  actived: boolean
  dep: number
}

export function getWikiTree(
  tree: WikiConfig | string,
  nodeMap: Map<string, WikiTreeNode> | null = null,
  name: string = '',
  parent: WikiTreeNode | null = null,
  dep: number = 0
): WikiTreeNode {
  const res: WikiTreeNode = {
    name,
    parent,
    children: [],
    fullPath: '',
    opened: dep == 1,
    actived: false,
    dep
  }

  if (typeof tree === 'string') {
    res.fullPath = tree;
    if (parent) nodeMap?.set(tree, res)
  }
  else {
    for (const [key, value] of Object.entries(tree)) {
      const c = getWikiTree(value, nodeMap, key, res, dep + 1)
      if (res.fullPath === '') res.fullPath = c.fullPath
      res.children.push(c)
    }
  }

  return res
}

export class WikiTree {
  tree: WikiTreeNode;
  nodeMap: Map<string, WikiTreeNode>;
  curNode: WikiTreeNode | null;

  constructor(wikiConfig: WikiConfig) {
    this.nodeMap = new Map()
    this.tree = getWikiTree(wikiConfig, this.nodeMap)
    this.curNode = null
  }

  getNodeByFullPath(fullPath: string) {
    return this.nodeMap.get(fullPath)
  }

  select(node: WikiTreeNode) {
    if(node === this.curNode) return
    var p: WikiTreeNode | null = this.curNode
    while (p) {
      p.actived = false
      p = p.parent
    }

    p = node
    while (p) {
      p.actived = true
      p.opened = true
      p = p.parent
    }
    this.curNode = node
  }
}

export function getAncestors(curPath: string): string[] {
  return []
}

var pageLinks: string[] = []
export function getPagePaths(wikiConfig: WikiConfig): string[] {

  pageLinks = []

  function traversal(config: WikiConfig) {
    for (const value of Object.values(config)) {
      if (typeof value === 'string') pageLinks.push('/wiki/' + value)
      else traversal(value)
    }
  }

  traversal(wikiConfig)

  return pageLinks
}