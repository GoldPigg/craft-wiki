<script setup lang="ts">

declare module 'nuxt/app' {
    interface NuxtLayouts {
        'home': unknown
    }
}

definePageMeta({
    layout: 'home',
})

</script>

<template>
    <div class="layout">
        <slot/>
    </div>
</template>