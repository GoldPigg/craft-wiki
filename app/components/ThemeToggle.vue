<script setup lang="ts">
const { themeConfig } = useThemeConfig()

const isDark = ref(false)

async function toggle() {
    if (!themeConfig) return
    const transiton = document.startViewTransition(async () => {
        themeConfig.value = isDark.value ? lightTheme : darkTheme
        isDark.value = !isDark.value
    })
    await transiton.ready
    await document.querySelector('#piying-seal-clip path')?.animate([
        { transform: `translate(0.5px, 0.5px) scale(0.00001, 0.000015)`, },
        { transform: `translate(-0.1px, -0.3px) translate(0.5px, 0.5px) rotate(-20deg) scale(0.00003, 0.000045)`, },
        { transform: `translate(0.5px, 0.5px) scale(0.00005, 0.000075)`, },
        { transform: `translate(-0.1px, -0.3px) translate(0.5px, 0.5px) rotate(-20deg) scale(0.00007, 0.000095)`, },
        { transform: `translate(0.5px, 0.5px) scale(0.00009, 0.000135)`, offset: 0.8, },
        { transform: `translate(0.5px, 0.5px) scale(0.002, 0.003)`, },
    ], {
        duration: 800,
        easing: 'ease-in',
    }).ready
    await transiton.ready
}

</script>

<template>
    <button type="button" class="theme-toggle app-header__action" :aria-label="isDark ? '切换到亮色模式' : '切换到暗色模式'"
        :aria-pressed="isDark" :title="isDark ? '切换到亮色模式' : '切换到暗色模式'" @click="toggle">
        <Icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" aria-hidden="true" />
    </button>
</template>