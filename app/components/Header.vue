<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

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

function onScroll() {
  scrolled.value = window.scrollY > 8
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

watch(() => route.fullPath, () => {
  mobileOpen.value = false
})

</script>

<template>
  <header :class="['app-header', { 'app-header--scrolled': scrolled }]">
    <div class="app-header__inner">
      <!-- 左：朱砂小印 + 站名 -->
      <NuxtLink to="/" class="app-header__logo" aria-label="守艺志 首页">
        <span class="app-header__seal" aria-hidden="true">守</span>
        <span class="app-header__title">守艺志</span>
      </NuxtLink>

      <!-- 中：目录式导航 -->
      <nav class="app-header__nav" aria-label="主导航">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" :class="[{ 'actived': item.actived }]">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- 右：功能区 -->
      <div class="app-header__actions">
        <!-- <button type="button" class="app-header__action" aria-label="搜索">
          <Icon name="lucide:search" />
        </button> -->

        <ThemeToggle class="app-header__action" />

        <!-- <button type="button" class="app-header__action" aria-label="用户菜单">
          <Icon name="lucide:user" />
        </button> -->

        <!-- <button type="button" class="app-header__action app-header__menu-btn" :aria-label="mobileOpen ? '关闭菜单' : '打开菜单'"
          :aria-expanded="mobileOpen" aria-controls="mobile-nav" @click="mobileOpen = !mobileOpen">
          <Icon :name="mobileOpen ? 'lucide:x' : 'lucide:menu'" />
        </button> -->
      </div>
    </div>

    <!-- 移动端卷轴菜单 -->
    <Transition name="mobile-nav">
      <nav v-if="mobileOpen" id="mobile-nav" class="mobile-nav" aria-label="移动端导航">
        <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to">
          {{ item.label }}
        </NuxtLink>
      </nav>
    </Transition>
  </header>
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

/* ---------- 移动端卷轴菜单 ---------- */
.mobile-nav {
  position: fixed;
  inset: var(--header-height) 0 auto 0;
  z-index: var(--z-mobile-nav);
  background: color-mix(in srgb, var(--color-bg) 96%, transparent);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: var(--border-width) solid var(--color-border);
  box-shadow: 0 4px 12px rgba(59, 47, 37, 0.08);
  padding: var(--space2) var(--space4) var(--space4);
  display: flex;
  flex-direction: column;
  gap: var(--space1);
  transform-origin: top;
}

[data-theme="dark"] .mobile-nav {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.mobile-nav a {
  padding: var(--space3) var(--space3);
  font-family: var(--font-ui);
  font-size: 0.9375rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-sm);
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.mobile-nav a:hover,
.mobile-nav a.active {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 6%, transparent);
}

/* 卷轴展开动画：从顶部 scaleY，像卷轴被拉开 */
.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition:
    transform var(--transition-base),
    opacity var(--transition-base);
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  transform: scaleY(0.9);
  opacity: 0;
}

/* ---------- 响应式 ---------- */
@media (max-width: 767px) {
  .app-header__nav {
    display: none;
  }

  .app-header__inner {
    justify-content: space-between;
    gap: var(--space2);
  }

  .app-header__menu-btn {
    display: flex;
  }
}

/* 减少动效偏好 */
@media (prefers-reduced-motion: reduce) {

  .app-header,
  .app-header__seal,
  .app-header__nav a,
  .app-header__action,
  .mobile-nav,
  .mobile-nav a {
    transition: none;
  }

  .mobile-nav-enter-from,
  .mobile-nav-leave-to {
    transform: none;
  }
}
</style>