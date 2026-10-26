<script setup lang="ts">

definePageMeta({ layout: 'wiki' })

const route = useRoute()
const fullPath = computed(() => {
  const p = route.params.slug
  return Array.isArray(p) ? p.join('/') : p
})

const { data } = await useFetch(`/api/wiki/${fullPath.value}`, {
  key: `wiki-${fullPath.value}`,
})


const wikiTree = inject(wikiTreeKey)
const curNode = computed(() => fullPath.value ? wikiTree?.value.getNodeByFullPath(fullPath.value) : undefined)
if (curNode.value) wikiTree?.value.select(curNode.value)

watch(fullPath, (v) => {
  if (!wikiTree || !v) return
  const node = wikiTree.value.getNodeByFullPath(v)
  if (node) wikiTree.value.select(node);
})

</script>

<template>
  <div v-if="data" class="wiki-article-layout">
    <WikiSidebar v-if="wikiTree" :nodes="wikiTree.tree.children" open />
    <article class="prose" v-html="data.html" />
    <aside v-if="data.toc.length" class="article-toc">
      <Toc :items="data.toc" />
    </aside>
  </div>
</template>

<style scoped>
.wiki-article-layout {
  display: flex;
  gap: var(--space8);
}

@media (max-width: 1023px) {
  .wiki-article-layout {
    grid-template-columns: 1fr;
  }

  .article-toc {
    display: none;
  }
}

.article-toc {
  position: sticky;
  top: calc(var(--header-height) + var(--space4));
  max-height: calc(100vh - var(--header-height) - var(--space8));
  overflow-y: auto;
}
</style>