<script setup lang="ts">

definePageMeta({ layout: 'wiki' })

const route = useRoute()
const fullPath = computed(() => {
  const p = route.params.slug
  return Array.isArray(p) ? p.join('/') : p
})

const { data, error } = await useFetch(`/api/wiki/${fullPath.value}`)

if (error.value) {
  throw createError({
    statusCode: error.value.status ?? 500,
    statusMessage: error.value.message ?? '加载失败',
    fatal: true,
  })
}

const wikiTree = inject(wikiTreeKey)
const curNode = computed(() => fullPath.value ? wikiTree?.value.getNodeByFullPath(fullPath.value) : undefined)
if (curNode.value) wikiTree?.value.select(curNode.value)

/* ---------- 移动端目录抽屉 ---------- */

const sidebarOpen = ref(false)
const sidebarTriggerRef = ref<HTMLButtonElement | null>(null)

const DESKTOP_QUERY = '(min-width: 1024px)'
let desktopMedia: MediaQueryList | null = null

// 当前文章所属的一级栏目，例如「简介」「北方地区」
const currentSection = computed(() => {
  let node = curNode.value
  while (node?.parent && node.parent.dep > 0) node = node.parent
  return node?.name ?? ''
})

function sidebarElement() {
  return document.getElementById('wiki-sidebar') as HTMLElement | null
}

async function openSidebar() {
  sidebarOpen.value = true
  await nextTick()

  const el = sidebarElement()
  if (!el) return

  el.querySelector<HTMLElement>('.wiki-sidebar__mobile-close')?.focus({ preventScroll: true })

  // 目录较长时，把当前条目滚到可视区域，别让用户自己找
  const active = el.querySelector<HTMLElement>('.wiki-nav-item--active > .wiki-nav-link, .wiki-nav-item--active > .wiki-nav-group')
  if (!active) return

  const head = el.querySelector<HTMLElement>('.wiki-sidebar__mobile-head')
  const headHeight = head?.offsetHeight ?? 0
  const delta = active.getBoundingClientRect().top - el.getBoundingClientRect().top - headHeight - 24
  el.scrollTop = Math.max(0, el.scrollTop + delta)
}

function closeSidebar(options: { restoreFocus?: boolean } = {}) {
  if (!sidebarOpen.value) return
  sidebarOpen.value = false
  if (options.restoreFocus) {
    sidebarTriggerRef.value?.focus({ preventScroll: true })
  }
}

function onKeydown(event: KeyboardEvent) {
  if (!sidebarOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closeSidebar({ restoreFocus: true })
    return
  }

  const el = sidebarElement()
  if (!el) return

  // 焦点仍在抽屉外时，阻止方向键/PageDown 把背后的正文滚走
  const scrollKeys = ['PageDown', 'PageUp', 'Home', 'End', 'ArrowDown', 'ArrowUp']
  if (scrollKeys.includes(event.key)) {
    const inDrawer = event.target instanceof Node && el.contains(event.target)
    const scrollable = el.scrollHeight > el.clientHeight + 1
    if (!inDrawer || !scrollable) event.preventDefault()
  }

  if (event.key !== 'Tab') return

  const focusables = Array.from(el.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'))
    .filter(item => item.getClientRects().length > 0)
  if (!focusables.length) return

  const first = focusables[0]!
  const last = focusables[focusables.length - 1]!

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

function onDesktopChange(event: MediaQueryListEvent) {
  if (event.matches) closeSidebar()
}

watch(fullPath, (v) => {
  closeSidebar()
  if (!wikiTree || !v) return
  const node = wikiTree.value.getNodeByFullPath(v)
  if (node) wikiTree.value.select(node)
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  desktopMedia = window.matchMedia(DESKTOP_QUERY)
  desktopMedia.addEventListener('change', onDesktopChange)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  desktopMedia?.removeEventListener('change', onDesktopChange)
})

</script>

<template>
  <div v-if="data" class="wiki-article-layout">
    <!-- 移动端：本栏目目录入口 -->
    <div v-if="wikiTree" class="wiki-mobile-bar">
      <button ref="sidebarTriggerRef" type="button" class="wiki-mobile-trigger"
        aria-haspopup="dialog" aria-controls="wiki-sidebar" :aria-expanded="sidebarOpen" @click="openSidebar">
        <Icon name="lucide:list-tree" class="wiki-mobile-trigger__icon" aria-hidden="true" />
        <span class="wiki-mobile-trigger__label">本栏目目录</span>
        <span v-if="currentSection" class="wiki-mobile-trigger__section">{{ currentSection }}</span>
        <Icon name="lucide:chevron-right" class="wiki-mobile-trigger__chevron" aria-hidden="true" />
      </button>
    </div>

    <WikiSidebar v-if="wikiTree" id="wiki-sidebar" :nodes="wikiTree.tree.children" :mobile-open="sidebarOpen"
      :section-name="currentSection" @close="closeSidebar({ restoreFocus: true })" @navigate="closeSidebar()" />

    <article class="prose" v-html="data.html" />

    <aside v-if="data.toc.length" class="article-toc">
      <Toc :items="data.toc" />
    </aside>

    <!-- 移动端抽屉遮罩 -->
    <Transition name="wiki-drawer-scrim">
      <div v-if="sidebarOpen" class="wiki-drawer-scrim" aria-hidden="true"
        @click="closeSidebar({ restoreFocus: true })" @wheel.prevent />
    </Transition>
  </div>
</template>

<style scoped>
.wiki-article-layout {
  display: flex;
  gap: var(--space8);
}

.wiki-mobile-bar {
  display: none;
}

.wiki-drawer-scrim {
  display: none;
}

/* 1024–1239：两栏（侧栏 + 正文），隐藏右侧本页目录，避免溢出 */
@media (max-width: 1239px) {
  .article-toc {
    display: none;
  }
}

/* ---------- 移动端：正文单列 + 目录抽屉 ---------- */
@media (max-width: 1023px) {
  .wiki-article-layout {
    display: block;
    width: 100%;
  }

  .wiki-mobile-bar {
    display: block;
    position: sticky;
    top: var(--header-height);
    z-index: var(--z-sticky);
    height: 3rem;
    background: color-mix(in srgb, var(--color-bg) 92%, transparent);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    border-bottom: var(--border-width) solid var(--color-border);
  }

  @supports not (background: color-mix(in srgb, red 50%, transparent)) {
    .wiki-mobile-bar {
      background: var(--color-bg);
    }
  }

  .wiki-mobile-trigger {
    width: 100%;
    max-width: var(--prose-max-width);
    height: 100%;
    margin-inline: auto;
    display: flex;
    align-items: center;
    gap: var(--space2);
    padding: 0 max(var(--space4), env(safe-area-inset-right, 0px)) 0 max(var(--space4), env(safe-area-inset-left, 0px));
    font-family: var(--font-ui);
    text-align: left;
    color: var(--color-text-secondary);
    background: transparent;
    border: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: color var(--transition-fast);
  }

  .wiki-mobile-trigger:hover {
    color: var(--color-primary);
  }

  .wiki-mobile-trigger:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: -2px;
  }

  .wiki-mobile-trigger__icon {
    width: 1.125rem;
    height: 1.125rem;
    flex-shrink: 0;
    color: var(--color-text-muted);
  }

  .wiki-mobile-trigger__label {
    flex-shrink: 0;
    font-size: 0.8125rem;
    letter-spacing: 0.12em;
    color: var(--color-text-muted);
  }

  .wiki-mobile-trigger__section {
    min-width: 0;
    overflow: hidden;
    font-size: 0.9375rem;
    font-weight: 500;
    color: var(--color-text-primary);
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .wiki-mobile-trigger__section::before {
    content: '·';
    margin-right: var(--space2);
    color: var(--color-border-strong);
  }

  .wiki-mobile-trigger__chevron {
    width: 1rem;
    height: 1rem;
    flex-shrink: 0;
    margin-left: auto;
    color: var(--color-text-muted);
  }

  /* 正文：单列、全宽、避开刘海 */
  .wiki-article-layout>.prose {
    width: auto;
    max-width: var(--prose-max-width);
    margin-inline: auto;
    padding-top: var(--space6);
    padding-bottom: var(--space16);
    padding-left: max(var(--space4), env(safe-area-inset-left, 0px));
    padding-right: max(var(--space4), env(safe-area-inset-right, 0px));
  }

  .wiki-drawer-scrim {
    display: block;
    position: fixed;
    inset: 0;
    z-index: var(--z-overlay);
    background: rgba(20, 16, 12, 0.42);
    -webkit-backdrop-filter: blur(1px);
    backdrop-filter: blur(1px);
    touch-action: none;
    overscroll-behavior: contain;
  }

  .wiki-drawer-scrim-enter-active,
  .wiki-drawer-scrim-leave-active {
    transition: opacity var(--transition-base);
  }

  .wiki-drawer-scrim-enter-from,
  .wiki-drawer-scrim-leave-to {
    opacity: 0;
  }
}

.article-toc {
  position: sticky;
  top: calc(var(--header-height) + var(--space4));
  max-height: calc(100vh - var(--header-height) - var(--space8));
  overflow-y: auto;
}

@media (prefers-reduced-motion: reduce) {
  .wiki-mobile-trigger {
    transition: none;
  }

  .wiki-drawer-scrim-enter-active,
  .wiki-drawer-scrim-leave-active {
    transition: none;
  }
}
</style>
