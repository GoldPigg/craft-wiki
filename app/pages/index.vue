<script setup lang="ts">
import Book from '~/components/home/sections/Book.vue';
import Dance from '~/components/home/sections/Dance.vue';
import Welcome from '~/components/home/sections/Welcome.vue';
import WuLong from '~/components/home/sections/WuLong.vue';
import useGsap from '~/composables/useGsap';

definePageMeta({ layout: 'home' })
const { $ScrollSmoother } = useNuxtApp()

useGsap(async () => {
    $ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
    });
    await nextTick()
    const smoother = $ScrollSmoother.get()
})

</script>

<template>
    <div id="smooth-wrapper">
        <div id="smooth-content" style="user-select: none;">
            <Welcome class="section-1"/>
            <Dance class="section-2"/>
            <Book class="section-3"></Book>
            <WuLong class="section-4"/>
            <p v-for="i in 100">{{ i }}</p>
        </div>
    </div>
</template>