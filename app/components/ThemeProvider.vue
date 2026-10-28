<script setup lang="ts">
import { lightTheme } from '~/composables/useThemeConfig'
import { themeConfigKey } from '~/utils/injectionKey'

const themeConfig = ref<ThemeConfig>(lightTheme)

const styleObject = computed(() => {
    const res: Record<string, string> = {}
    for (const [key, value] of Object.entries(themeConfig.value)) {
        res['--' + toKebab(key)] = value
    }
    return res
})

provide(themeConfigKey, themeConfig)
</script>

<template>
    <div class="theme-provider" :style="styleObject">
        <slot></slot>
    </div>
</template>

<style scoped></style>