<script setup lang="ts">
import type { WikiTreeNode } from '~~/shared/wikiTree'

const props = defineProps<{
  node: WikiTreeNode
  currentPath: string
  isActive: boolean
  containsActive: boolean
  depth?: number
}>()

const emit = defineEmits<{
  toggle: [node: WikiTreeNode]
  navigate: []
}>()

const depth = computed(() => props.depth ?? 0)

function onToggle(e: MouseEvent) {
  e.preventDefault()
  e.stopPropagation()
  emit('toggle', props.node)
}

</script>

<template>
  <li :class="[
    'wiki-nav-item',
    `wiki-nav-item--depth${Math.min(depth, 3)}`,
    {
      'wiki-nav-item--group': node.children.length,
      'wiki-nav-item--active': isActive,
      'wiki-nav-item--contains-active': containsActive,
    },
  ]">
    <NuxtLink v-if="node.children.length === 0" :to="`/wiki/${node.fullPath}`" class="wiki-nav-link"
      @click="emit('navigate')">
      <span class="wiki-nav-marker" aria-hidden="true" />
      <span class="wiki-nav-label">{{ node.name }}</span>
    </NuxtLink>

    <template v-else>
      <button type="button" class="wiki-nav-group" :aria-expanded="node.opened" @click="onToggle">
        <span class="wiki-nav-marker" aria-hidden="true" />
        <span class="wiki-nav-label">{{ node.name }}</span>
        <Icon name="lucide:chevron-right" class="wiki-nav-chevron" :class="{ 'wiki-nav-chevron--open': node.opened }"
          aria-hidden="true" />
      </button>

      <Transition name="wiki-nav-expand">
        <ul v-if="node.opened && node.children.length" class="wiki-nav-children">
          <WikiNavItem v-for="child in node.children" :key="child.fullPath" :node="child" :current-path="currentPath"
            :is-active="child.children.length === 0 && child.actived" :contains-active="false"
            :depth="depth + 1" @toggle="emit('toggle', $event)" @navigate="emit('navigate')" />
        </ul>
      </Transition>
    </template>
  </li>
</template>

<style scoped>
/* ============================================================
 * WikiNavItem —— 单个目录项
 * 左侧标记条：透明 → hover 浅灰 → active 朱砂
 * ============================================================ */

.wiki-nav-item {
  position: relative;
  list-style: none;
}

/* 链接和分组标题共享的基础样式 */
.wiki-nav-link,
.wiki-nav-group {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.375rem 0.75rem;
  font-family: var(--font-ui);
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--color-text-secondary);
  text-decoration: none;
  text-align: left;
  background: transparent;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.wiki-nav-link:hover,
.wiki-nav-group:hover {
  color: var(--color-text-primary);
  background: color-mix(in srgb, var(--color-primary) 5%, transparent);
}

.wiki-nav-link:focus-visible,
.wiki-nav-group:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: -2px;
}

/* 左侧标记：2px 竖条，默认透明 */
.wiki-nav-marker {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 2px;
  height: 60%;
  background: transparent;
  border-radius: 1px;
  transition: background-color var(--transition-fast);
}

/* 当前页：朱砂标记 + 主色文字 + 加粗 */
.wiki-nav-item--active>.wiki-nav-link {
  color: var(--color-primary);
  font-weight: 600;
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
}

.wiki-nav-item--active>.wiki-nav-link .wiki-nav-marker {
  background: var(--color-primary);
}

/* 包含当前页的分组：文字稍重，表示“这里有当前位置” */
.wiki-nav-item--contains-active>.wiki-nav-group {
  color: var(--color-text-primary);
  font-weight: 500;
}

.wiki-nav-item--contains-active>.wiki-nav-group .wiki-nav-marker {
  background: color-mix(in srgb, var(--color-primary) 40%, transparent);
}

/* 分组标题默认比叶子稍重 */
.wiki-nav-group {
  font-weight: 500;
  color: var(--color-text-primary);
}

.wiki-nav-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 折叠箭头 */
.wiki-nav-chevron {
  width: 0.875rem;
  height: 0.875rem;
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
  flex-shrink: 0;
  color: var(--color-text-muted);
  transition: transform var(--transition-fast);
}

.wiki-nav-chevron--open {
  transform: rotate(90deg);
}

/* 子项缩进，用 padding-left 而非 margin，保持左侧标记对齐 */
.wiki-nav-children {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.wiki-nav-item--depth1>.wiki-nav-link,
.wiki-nav-item--depth1>.wiki-nav-group {
  padding-left: calc(0.75rem + var(--space4));
}

.wiki-nav-item--depth2>.wiki-nav-link,
.wiki-nav-item--depth2>.wiki-nav-group {
  padding-left: calc(0.75rem + var(--space8));
}

.wiki-nav-item--depth3>.wiki-nav-link,
.wiki-nav-item--depth3>.wiki-nav-group {
  padding-left: calc(0.75rem + var(--space12));
}

/* 深层级的字体略小 */
.wiki-nav-item--depth2 .wiki-nav-link,
.wiki-nav-item--depth2 .wiki-nav-group,
.wiki-nav-item--depth3 .wiki-nav-link,
.wiki-nav-item--depth3 .wiki-nav-group {
  font-size: 0.8125rem;
}

/* 展开/折叠动画 */
.wiki-nav-expand-enter-active,
.wiki-nav-expand-leave-active {
  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
  transform-origin: top;
}

.wiki-nav-expand-enter-from,
.wiki-nav-expand-leave-to {
  opacity: 0;
  transform: scaleY(0.95);
}

@media (prefers-reduced-motion: reduce) {

  .wiki-nav-link,
  .wiki-nav-group,
  .wiki-nav-marker,
  .wiki-nav-chevron,
  .wiki-nav-expand-enter-active,
  .wiki-nav-expand-leave-active {
    transition: none;
  }

  .wiki-nav-expand-enter-from,
  .wiki-nav-expand-leave-to {
    transform: none;
  }
}
</style>