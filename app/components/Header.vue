<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'

export interface navItem {
  label: string
  to: string
  actived: boolean
}

const props = defineProps<{
  navItems: navItem[]
}>()

const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

const menuButtonRef = ref<HTMLButtonElement | null>(null)
const mobileNavRef = ref<HTMLElement | null>(null)

// 与样式中的断点保持一致（见文末 @media）
const DESKTOP_QUERY = '(min-width: 900px)'
let desktopMedia: MediaQueryList | null = null

function onScroll() {
  scrolled.value = window.scrollY > 8
}

/* ---------- 移动端菜单 ---------- */

// 菜单打开时冻结背景滚动：不锁 html/body 的 overflow，
// 否则 sticky header 会随锁定失效并滚出视口。
// 遮罩层铺满视口，用 touch-action: none + wheel 拦截手势。
function onWheel(event: WheelEvent) {
  if (mobileOpen.value) event.preventDefault()
}

async function openMenu(options: { focusFirst?: boolean } = {}) {
  mobileOpen.value = true
  if (!options.focusFirst) return

  await nextTick()
  if (!mobileOpen.value) return
  // 键盘打开时把焦点交给第一个目录项，触屏/鼠标打开则保留在按钮上
  mobileNavRef.value?.querySelector<HTMLElement>('a')?.focus({ preventScroll: true })
}

function closeMenu(options: { restoreFocus?: boolean } = {}) {
  if (!mobileOpen.value) return
  mobileOpen.value = false
  if (options.restoreFocus) {
    menuButtonRef.value?.focus({ preventScroll: true })
  }
}

function toggleMenu(event: MouseEvent) {
  if (mobileOpen.value) {
    closeMenu({ restoreFocus: true })
  } else {
    // 键盘激活 click 时 detail 为 0，触屏/鼠标为 1
    openMenu({ focusFirst: event.detail === 0 })
  }
}

function onKeydown(event: KeyboardEvent) {
  if (!mobileOpen.value) return

  if (event.key === 'Escape') {
    event.preventDefault()
    closeMenu({ restoreFocus: true })
    return
  }

  // 焦点不在可滚动的目录内时，避免 PageDown / 方向键把背后的正文滚走
  const scrollKeys = ['PageDown', 'PageUp', 'Home', 'End', 'ArrowDown', 'ArrowUp']
  if (scrollKeys.includes(event.key)) {
    const panel = mobileNavRef.value
    const inPanel = !!panel && event.target instanceof Node && panel.contains(event.target)
    const panelScrollable = !!panel && panel.scrollHeight > panel.clientHeight + 1
    if (!inPanel || !panelScrollable) event.preventDefault()
  }

  // 菜单打开时把 Tab 焦点限制在菜单按钮与目录之间，避免跑到背后被遮罩的正文
  if (event.key === 'Tab' && mobileNavRef.value) {
    const links = Array.from(mobileNavRef.value.querySelectorAll<HTMLElement>('a'))
    if (!links.length) return
    const first = links[0]!
    const last = links[links.length - 1]!

    if (event.shiftKey && document.activeElement === menuButtonRef.value) {
      event.preventDefault()
      last.focus()
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      menuButtonRef.value?.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

function onDesktopChange(event: MediaQueryListEvent) {
  if (event.matches) closeMenu()
}

// 路由变化（包括点击当前页链接）时收起菜单
watch(() => route.fullPath, () => closeMenu())

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  desktopMedia = window.matchMedia(DESKTOP_QUERY)
  desktopMedia.addEventListener('change', onDesktopChange)
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  desktopMedia?.removeEventListener('change', onDesktopChange)
})

</script>

<template>
  <header :class="['app-header', {
    'app-header--scrolled': scrolled,
    'app-header--menu-open': mobileOpen,
  }]" @wheel="onWheel">
    <div class="app-header__inner">
      <!-- 左：朱砂小印 + 站名 -->
      <NuxtLink to="/" class="app-header__logo" aria-label="守艺志 首页">
        <span class="app-header__seal" aria-hidden="true">守</span>
        <span class="app-header__title">守艺志</span>
      </NuxtLink>

      <!-- 中：目录式导航（桌面） -->
      <nav class="app-header__nav" aria-label="主导航">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
          :class="{ 'actived': item.actived }"
          :aria-current="item.actived ? 'page' : undefined">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- 右：功能区 -->
      <div class="app-header__actions">
        <ThemeToggle class="app-header__action" />

        <button ref="menuButtonRef" type="button"
          class="app-header__action app-header__menu-btn"
          :aria-label="mobileOpen ? '关闭目录' : '打开目录'"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav"
          @click="toggleMenu">
          <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>

  <!-- 移动端卷轴菜单：与 header 平级，避免 backdrop-filter 改变 fixed 的定位基准 -->
  <Transition name="mobile-scrim">
    <div v-if="mobileOpen" class="mobile-scrim" aria-hidden="true" @click="closeMenu()"
      @wheel.prevent />
  </Transition>

  <Transition name="mobile-nav">
    <nav v-if="mobileOpen" id="mobile-nav" ref="mobileNavRef" class="mobile-nav" aria-label="移动端导航">
      <p class="mobile-nav__eyebrow">目录</p>

      <ul class="mobile-nav__list">
        <li v-for="(item, index) in navItems" :key="item.to">
          <NuxtLink :to="item.to" class="mobile-nav__link" :class="{ 'is-actived': item.actived }"
            :aria-current="item.actived ? 'page' : undefined" @click="closeMenu()">
            <span class="mobile-nav__marker" aria-hidden="true" />
            <span class="mobile-nav__label">{{ item.label }}</span>
            <span class="mobile-nav__index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </Transition>
</template>

<style scoped>
/* ============================================================
 * Header —— 书眉，不是工具栏
 * 背景半透明 + backdrop-filter，透出底层宣纸纹理
 * 所有颜色走语义 Token，只有 Logo 印章硬编码朱砂
 * ============================================================ */

.app-header {
  position: sticky;
  top: 0;
  z-index: var(--z-header);
  background: var(--header-bg);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: var(--border-width) solid var(--header-border);
  box-shadow: 0 1px 0 var(--color-bg);
  transition: box-shadow var(--transition-base);
}

/* 不支持 color-mix 的兜底 */
@supports not (background: color-mix(in srgb, red 50%, transparent)) {
  .app-header {
    background: var(--color-bg);
  }
}

/* 滚动后底部墨线加深，暗示内容在下面 */
.app-header--scrolled {
  box-shadow:
    0 1px 0 var(--color-bg),
    0 2px 8px rgba(59, 47, 37, 0.06);
}

[data-theme="dark"] .app-header--scrolled {
  box-shadow:
    0 1px 0 var(--color-bg),
    0 2px 8px rgba(0, 0, 0, 0.3);
}

/* 菜单打开时 header 也在遮罩之上，禁止从这里发起滚动手势 */
.app-header--menu-open {
  touch-action: none;
}

.app-header__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  height: var(--header-height);
  padding: 0 var(--space4);
  display: flex;
  align-items: center;
  gap: var(--space6);
}

/* ---------- 左：Logo ---------- */
.app-header__logo {
  user-select: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  flex-shrink: 0;
}

/* 朱砂小印：品牌标识，硬编码色值，不随主题变化 */
.app-header__seal {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: var(--radius-sm);
  background: #C0392B;
  color: #F7F3EC;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    inset 0 0 0 1px rgba(247, 243, 236, 0.12),
    0 1px 2px rgba(192, 57, 43, 0.2);
  transition: transform var(--transition-fast);
}

.app-header__logo:hover .app-header__seal {
  transform: scale(1.04);
}

[data-theme="dark"] .app-header__seal {
  background: #E0705F;
  color: #1E1914;
}

.app-header__title {
  font-family: var(--font-heading);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: var(--color-text-primary);
}

/* ---------- 中：导航 ---------- */
.app-header__nav {
  display: flex;
  align-items: center;
  gap: var(--space1);
  flex: 1;
  min-width: 0;
}

.app-header__nav a {
  position: relative;
  padding: 0.375rem 0.75rem;
  font-family: var(--font-ui);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--color-text-secondary);
  text-decoration: none;
  white-space: nowrap;
  border-radius: var(--radius-sm);
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.app-header__nav a:hover {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 6%, transparent);
}

/* 当前页：短朱砂下划线，像书页的“已读”标记 */
.app-header__nav a.actived {
  color: var(--color-text-primary);
  font-weight: 600;
}

.app-header__nav a.actived::after {
  content: '';
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.125rem;
  height: 2px;
  background: var(--color-primary);
  border-radius: 1px;
}

/* ---------- 右：功能区 ---------- */
.app-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space1);
  flex-shrink: 0;
}

.app-header__action {
  width: 2rem;
  height: 2rem;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: var(--border-width) solid transparent;
  color: var(--color-text-muted);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast),
    border-color var(--transition-fast);
}

.app-header__action :deep(svg) {
  width: 1.125rem;
  height: 1.125rem;
  stroke: currentColor;
  stroke-width: 1.5;
  fill: none;
}

/* hover 浮现“淡印” */
.app-header__action:hover {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 6%, transparent);
  border-color: color-mix(in srgb, var(--color-primary) 25%, transparent);
}

.app-header__action:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: 2px;
}

/* 菜单按钮默认隐藏，小屏才显示 */
.app-header__menu-btn {
  display: none;
}

/* ---------- 移动端遮罩 ---------- */
.mobile-scrim {
  position: fixed;
  inset: 0;
  z-index: calc(var(--z-mobile-nav) - 10);
  /* 用中性黑，亮/暗主题下都能压住背后的正文 */
  background: rgba(20, 16, 12, 0.38);
  -webkit-backdrop-filter: blur(1px);
  backdrop-filter: blur(1px);
  touch-action: none;
  overscroll-behavior: contain;
}

/* ---------- 移动端卷轴菜单 ---------- */
.mobile-nav {
  position: fixed;
  top: var(--header-height);
  left: 0;
  right: 0;
  z-index: var(--z-mobile-nav);
  max-height: calc(100vh - var(--header-height));
  max-height: calc(100dvh - var(--header-height));
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
  background: color-mix(in srgb, var(--color-bg) 97%, transparent);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: var(--border-width) solid var(--color-border);
  box-shadow: 0 12px 28px rgba(59, 47, 37, 0.14);
  padding:
    var(--space3) max(var(--space4), env(safe-area-inset-left, 0px)) calc(var(--space4) + env(safe-area-inset-bottom, 0px)) max(var(--space4), env(safe-area-inset-right, 0px));
  transform-origin: top;
}

@supports not (background: color-mix(in srgb, red 50%, transparent)) {
  .mobile-nav {
    background: var(--color-bg);
  }
}

[data-theme="dark"] .mobile-nav {
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.4);
}

/* 小标题：像书页上的“目录”二字 */
.mobile-nav__eyebrow {
  margin: 0 0 var(--space2);
  padding: 0 var(--space3);
  font-family: var(--font-ui);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: var(--color-text-muted);
}

.mobile-nav__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.mobile-nav__link {
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space3);
  min-height: 2.75rem;
  padding: 0.75rem var(--space3);
  font-family: var(--font-ui);
  font-size: 1rem;
  line-height: 1.4;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  -webkit-tap-highlight-color: transparent;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.mobile-nav__link:hover {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 6%, transparent);
}

.mobile-nav__link:focus-visible {
  outline: 2px solid var(--color-focus-ring);
  outline-offset: -2px;
}

/* 左侧竖条：当前页为朱砂，其余隐藏，和侧边目录保持同一套语言 */
.mobile-nav__marker {
  width: 2px;
  height: 1.1em;
  flex-shrink: 0;
  background: transparent;
  border-radius: 1px;
  transition: background-color var(--transition-fast);
}

.mobile-nav__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mobile-nav__index {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  color: var(--color-text-muted);
  font-variant-numeric: tabular-nums;
  transition: color var(--transition-fast);
}

.mobile-nav__link.is-actived {
  color: var(--color-primary);
  font-weight: 600;
  background: color-mix(in srgb, var(--color-primary) 8%, transparent);
}

.mobile-nav__link.is-actived .mobile-nav__marker {
  background: var(--color-primary);
}

.mobile-nav__link.is-actived .mobile-nav__index {
  color: var(--color-primary);
}

/* 卷轴展开动画：从顶部滑下，像卷轴被拉开 */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition:
    transform var(--transition-base),
    opacity var(--transition-base);
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;
  transform: translateY(-0.5rem);
}

.mobile-scrim-enter-active,
.mobile-scrim-leave-active {
  transition: opacity var(--transition-base);
}

.mobile-scrim-enter-from,
.mobile-scrim-leave-to {
  opacity: 0;
}

/* ---------- 响应式 ---------- */
@media (max-width: 899px) {
  .app-header__nav {
    display: none;
  }

  .app-header__inner {
    justify-content: space-between;
    gap: var(--space2);
    padding-left: max(var(--space4), env(safe-area-inset-left, 0px));
    padding-right: max(var(--space4), env(safe-area-inset-right, 0px));
  }

  .app-header__menu-btn {
    display: flex;
  }

  /* 触控目标至少 44×44 */
  .app-header__action {
    width: 2.75rem;
    height: 2.75rem;
  }

  .app-header__action :deep(svg) {
    width: 1.25rem;
    height: 1.25rem;
  }

  .app-header__action:hover {
    background: transparent;
    border-color: transparent;
  }

  .app-header__action:active {
    color: var(--color-primary);
    background: color-mix(in srgb, var(--color-primary) 10%, transparent);
  }
}

/* 桌面尺寸下即使状态残留也不展示 */
@media (min-width: 900px) {

  .mobile-nav,
  .mobile-scrim {
    display: none;
  }
}

/* 减少动效偏好 */
@media (prefers-reduced-motion: reduce) {

  .app-header,
  .app-header__seal,
  .app-header__nav a,
  .app-header__action,
  .mobile-nav,
  .mobile-nav__link,
  .mobile-nav__marker,
  .mobile-nav__index,
  .mobile-scrim,
  .mobile-nav-enter-active,
  .mobile-nav-leave-active,
  .mobile-scrim-enter-active,
  .mobile-scrim-leave-active {
    transition: none;
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: none;
  }
}
</style>
