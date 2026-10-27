<script setup lang="ts">
const { themeConfig } = useThemeConfig()

const isDark = ref(false)

async function toggle() {
    if (!themeConfig) return
    document.startViewTransition(() => {
        themeConfig.value = isDark.value ? lightTheme : darkTheme
        isDark.value = !isDark.value
    })
}

</script>

<template>
    <button type="button" class="theme-toggle app-header__action" :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
        :aria-pressed="isDark" :title="isDark ? '切换到亮色模式' : '切换到暗色模式'" @click="toggle">
        <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" aria-hidden="true" />
    </button>
</template>