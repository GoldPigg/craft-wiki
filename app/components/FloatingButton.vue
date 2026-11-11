<script setup lang="ts">

withDefaults(defineProps<{
  to?: string
}>(), {
  to: undefined,
})

</script>

<template>
  <NuxtLink ref="btnRef" :to="to" class="ribbon-seal" draggable="false">
    <div class="ribbon-inner">

      <svg class="arrow-icon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"
        stroke-linejoin="round" aria-hidden="true">
        <path d="M19 12H5" />
        <path d="M12 19l-7-7 7-7" />
      </svg>

      <span class="text">
        <slot> 点我 </slot>
      </span>

      <svg class="deco-cloud" viewBox="0 0 16 24" fill="none" stroke-width="1.5" stroke-linecap="round"
        stroke-linejoin="round" aria-hidden="true">
        <path d="M 4,4 C 12,4 12,12 4,12 C 0,12 0,20 8,20" opacity="0.6" />
      </svg>


    </div>
  </NuxtLink>
</template>

<style scoped>
.ribbon-seal {
  position: fixed;
  right: 0;
  top: 30%;
  z-index: 9999;

  width: 11.5rem;
  height: 3.2rem;

  clip-path: polygon(100% 0,
      15px 0,
      0 25%,
      10px 50%,
      0 75%,
      15px 100%,
      100% 100%);

  background: rgba(212, 160, 23, 0.85);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: right center;
  transform: translateX(10px);
  cursor: pointer;
  border: none;
  padding: 0;
  outline: none;

  filter: drop-shadow(-4px 8px 16px rgba(192, 57, 43, 0.25));
}

.ribbon-seal:hover {
  transform: translateX(0);
  filter: drop-shadow(-8px 12px 24px rgba(192, 57, 43, 0.4));
}

.ribbon-seal:focus-visible {
  outline: 2px solid #2C3E7A;
  outline-offset: -2px;
}

.ribbon-inner {
  position: absolute;
  inset: 2px;
  clip-path: polygon(100% 0,
      15px 0,
      0 25%,
      10px 50%,
      0 75%,
      15px 100%,
      100% 100%);

  background: linear-gradient(270deg, #D94A38 0%, #C0392B 100%);
  color: #F7F3EC;
  text-decoration: none;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 1.5rem;
  gap: 0.6rem;

  background-image:
    url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 2h5v5H2zM11 11h5v5h-5zM2 11h5v5H2zM11 2h5v5h-5z' stroke='%23D4A017' stroke-width='1.2' fill='none' opacity='0.15'/%3E%3C/svg%3E"),
    linear-gradient(270deg, #D94A38 0%, #C0392B 100%);
  background-blend-mode: overlay, normal;
}

.text {
  user-select: none;
  font-family: var(--font-heading, "Songti SC", serif);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  white-space: nowrap;
  z-index: 2;
}

.deco-cloud {
  width: 14px;
  height: 20px;
  stroke: rgba(212, 160, 23, 0.6);
  flex-shrink: 0;
  transition: stroke 0.3s ease;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  stroke: #F7D08A;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.ribbon-seal:hover .deco-cloud {
  stroke: rgba(212, 160, 23, 1);
}

.ribbon-seal:hover .arrow-icon {
  transform: translateX(-4px);
}

:global([data-theme="dark"]) .ribbon-seal {
  background: rgba(30, 25, 20, 0.9);
}

:global([data-theme="dark"]) .ribbon-inner {
  background-image:
    url("data:image/svg+xml,%3Csvg width='16' height='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 2h5v5H2zM11 11h5v5h-5zM2 11h5v5H2zM11 2h5v5h-5z' stroke='%231E1914' stroke-width='1.2' fill='none' opacity='0.25'/%3E%3C/svg%3E"),
    linear-gradient(270deg, #E0705F 0%, #E88A7B 100%);
  color: #1E1914;
}

:global([data-theme="dark"]) .ribbon-hole {
  background-color: #0E1014;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.9);
}

:global([data-theme="dark"]) .text {
  text-shadow: none;
}

:global([data-theme="dark"]) .deco-cloud {
  stroke: rgba(30, 25, 20, 0.5);
}

:global([data-theme="dark"]) .ribbon-seal:hover .deco-cloud {
  stroke: rgba(30, 25, 20, 0.9);
}

:global([data-theme="dark"]) .arrow-icon {
  stroke: #1E1914;
}

@media (max-width: 768px) {
  .ribbon-seal {
    top: 20%;
    width: 9.5rem;
    height: 2.8rem;
  }

  .text {
    font-size: 0.9rem;
    letter-spacing: 0.1em;
  }

  .ribbon-inner {
    padding-right: 1rem;
    gap: 0.4rem;
  }
}

@media (prefers-reduced-motion: reduce) {

  .ribbon-seal,
  .deco-cloud,
  .arrow-icon {
    transition: none !important;
  }
}
</style>