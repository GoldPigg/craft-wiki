<script setup lang="ts">
import { computed } from 'vue'
import type { WikiTreeNode } from '~~/shared/wikiTree'

const props = defineProps<{
  nodes: WikiTreeNode[]
}>()

const emit = defineEmits<{
  close: []
}>()

const route = useRoute()

const currentPath = computed(() => {
  const p = route.params.slug
  return Array.isArray(p) ? p.join('/') : (p ?? '')
})

function toggle(node: WikiTreeNode) {
  node.opened = !node.opened;
}

function closeMobile() {
  emit('close')
}

function containsActive(node: WikiTreeNode): boolean {
  if (!node.children.length) return false
  if (node.fullPath && currentPath.value.startsWith(node.fullPath + '/')) return true
  return node.children.some(c => containsActive(c))
}
</script>

<template>
  <aside :class="['wiki-sidebar']" aria-label="Wiki 导航">
    <nav class="wiki-sidebar">
      <ul class="wiki-nav-list">
        <template v-for="node in nodes" :key="node.fullPath">
          <WikiNavItem v-if="node.dep > 1 || node.actived" :node="node" :current-path="currentPath"
            :is-active="node.actived && node.children.length === 0" :contains-active="containsActive(node)"
            @toggle="toggle" @navigate="closeMobile" />
        </template>
      </ul>
    </nav>

  </aside>
</template>

<style scoped>
aside.wiki-sidebar {
  position: sticky;
  top: calc(var(--header-height) + var(--space4));
  max-height: calc(100vh - var(--header-height) - var(--space4));
  width: var(--sidebar-width);
  flex-shrink: 0;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: var(--color-border-strong) transparent;
}

.wiki-sidebar::-webkit-scrollbar {
  width: 6px;
}

.wiki-sidebar::-webkit-scrollbar-track {
  background: transparent;
}

.wiki-sidebar::-webkit-scrollbar-thumb {
  background: var(--color-border-strong);
  border-radius: 3px;
}

nav.wiki-sidebar {
  font-family: var(--font-ui);
  font-size: 0.875rem;
  border-right: var(--border-width) solid var(--color-border);
}

.wiki-nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}
</style>