<script setup lang="ts">
import { wikiTreeKey } from '~/utils/injectionKey';

declare module 'nuxt/app' {
    interface NuxtLayouts {
        'wiki': unknown
    }
}

definePageMeta({
    layout: 'wiki',
})

const navItems = computed(() => {
    const res = [{ label: '首页', to: `/`, actived: false }]
    if (wikiTree?.value) res.push(...wikiTree.value.tree.children.map((v) =>
        ({ label: v.name, to: `/wiki/` + v.fullPath, actived: v.actived })))
    return res
})

const wikiTree = inject(wikiTreeKey)
</script>

<template>
    <div class="layout">
        <Header :nav-items="navItems" />
        <div class="md-main">
            <div class="md-main--inner">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<style scoped>
.layout::before {
    background-image: var(--paper-texture);
    background-repeat: repeat;
    background-size: var(--paper-texture-size);
    opacity: var(--paper-texture-opacity);
    mix-blend-mode: var(--paper-texture-blend);
    content: '';
    position: absolute;
    display: block;
    height: 100%;
    width: 100%;
}

.layout {
    position: relative;
    min-height: 100vh;
    min-width: 100vw;
    background-color: var(--color-bg);
}

.md-main {
    margin-top: var(--space8);
}

.md-main--inner {
    display: flex;
    justify-content: center;
}
</style>