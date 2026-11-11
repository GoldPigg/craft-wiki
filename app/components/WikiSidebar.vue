<script setup lang="ts">
import { computed } from 'vue'
import type { WikiTreeNode } from '~~/shared/wikiTree'

const props = withDefaults(defineProps<{
  nodes: WikiTreeNode[]
  mobileOpen?: boolean
  sectionName?: string
}>(), {
  mobileOpen: false,
  sectionName: '',
})

const emit = defineEmits<{
  close: []
  navigate: []
}>()

const route = useRoute()

const currentPath = computed(() => {
  const p = route.params.slug
  return Array.isArray(p) ? p.join('/') : (p ?? '')
})

function toggle(node: WikiTreeNode) {
  node.opened = !node.opened
}

function closeMobile() {
  emit('navigate')
}

function containsActive(node: WikiTreeNode): boolean {
  if (!node.children.length) return false
  if (node.fullPath && currentPath.value.startsWith(node.fullPath + '/')) return true
  return node.children.some(c => containsActive(c))
}
</script>

<template>
  <aside :class="['wiki-sidebar', { 'wiki-sidebar--mobile-open': mobileOpen }]"
    :role="mobileOpen ? 'dialog' : undefined" :aria-modal="mobileOpen ? 'true' : undefined"
    aria-label="本栏目目录">
    <div class="wiki-sidebar__mobile-head">
      <div class="wiki-sidebar__mobile-titles">
        <p class="wiki-sidebar__mobile-title">本栏目目录</p>
        <p v-if="sectionName" class="wiki-sidebar__mobile-section">{{ sectionName }}</p>
      </div>
      <button type="button" class="wiki-sidebar__mobile-close" aria-label="关闭目录" @click="emit('close')">
        <Icon name="lucide:x" class="wiki-sidebar__mobile-close-icon" aria-hidden="true" />
      </button>
    </div>

    <nav class="wiki-sidebar" aria-label="Wiki 导航">
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

/* ---------- 移动端抽屉头部（桌面隐藏） ---------- */
.wiki-sidebar__mobile-head {
  display: none;
}

.wiki-sidebar__mobile-title {
  margin: 0;
  font-family: var(--font-heading);
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: var(--color-text-primary);
}

.wiki-sidebar__mobile-section {
  margin: 0.125rem 0 0;
  font-family: var(--font-ui);
  font-size: 0.75rem;
  color: var(--color-text-muted);
}

.wiki-sidebar__mobile-close {
  width: 2.75rem;
  height: 2.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: transparent;
  border: var(--border-width) solid transparent;
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.wiki-sidebar__mobile-close:hover {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 6%, transparent);
  border-color: color-mix(in srgb, var(--color-primary) 25%, transparent);
}

.wiki-sidebar__mobile-close:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

.wiki-sidebar__mobile-close-icon {
  width: 1.125rem;
  height: 1.125rem;
}

/* ---------- 移动端：左侧抽屉 ---------- */
@media (max-width: 1023px) {
  aside.wiki-sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: min(20rem, 82vw);
    max-height: none;
    z-index: var(--z-modal);
    background: var(--color-bg);
    border-right: var(--border-width) solid var(--color-border);
    box-shadow: 4px 0 24px rgba(20, 16, 12, 0.18);
    overscroll-behavior: contain;
    touch-action: pan-y;
    transform: translateX(-100%);
    visibility: hidden;
    transition:
      transform var(--transition-slow) var(--ease-out),
      visibility 0s linear var(--transition-slow);
  }

  aside.wiki-sidebar--mobile-open {
    transform: translateX(0);
    visibility: visible;
    transition: transform var(--transition-slow) var(--ease-out);
  }

  .wiki-sidebar__mobile-head {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space3);
    padding: calc(var(--space3) + env(safe-area-inset-top, 0px)) max(var(--space4), env(safe-area-inset-right, 0px)) var(--space3) max(var(--space4), env(safe-area-inset-left, 0px));
    background: var(--color-bg);
    border-bottom: var(--border-width) solid var(--color-border);
  }

  nav.wiki-sidebar {
    border-right: none;
    padding: var(--space2) max(var(--space3), env(safe-area-inset-right, 0px)) var(--space8) max(var(--space3), env(safe-area-inset-left, 0px));
  }
}

@media (prefers-reduced-motion: reduce) {
  aside.wiki-sidebar {
    transition: none;
  }
}
</style>
