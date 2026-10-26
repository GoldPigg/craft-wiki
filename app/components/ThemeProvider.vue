<script setup lang="ts">

const themeConfig = reactive<ThemeConfig>(defaultTheme)

const styleObject = computed(() => {
    const res: Record<string, string> = {}
    for (const [key, value] of Object.entries(themeConfig)) {
        res['--' + toKebab(key)] = value
    }
    return res
})

provide('themeConfig', themeConfig)
</script>

<template>
    <div class="theme-provider" :style="styleObject">
        <slot></slot>
    </div>
</template>

<style scoped></style>