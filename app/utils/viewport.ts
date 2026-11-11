/**
 * 首页在窄屏下走“静态简化”分支：
 * 关闭 ScrollSmoother / ScrollTrigger pin / 连续装饰动画。
 * 与 CSS 中的 @media (max-width: 1023px) 保持一致。
 */
export const COMPACT_VIEWPORT_QUERY = '(max-width: 1023px)'
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'

export function isCompactViewport(): boolean {
  return import.meta.client && window.matchMedia(COMPACT_VIEWPORT_QUERY).matches
}

export function prefersReducedMotion(): boolean {
  return import.meta.client && window.matchMedia(REDUCED_MOTION_QUERY).matches
}
