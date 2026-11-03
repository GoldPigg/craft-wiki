<script setup lang="ts">
import Dance from '~/components/home/sections/Dance.vue';
import Welcome from '~/components/home/sections/Welcome.vue';
import WuLong from '~/components/home/sections/WuLong.vue';
import useGsap from '~/composables/useGsap';

definePageMeta({ layout: 'home' })
const { $ScrollSmoother } = useNuxtApp()

useGsap(() => {
    $ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
    });
})

</script>

<template>
    <div id="smooth-wrapper">
        <div id="smooth-content" style="user-select: none;">
            <Welcome />
            <Dance />
            <WuLong />
            <p v-for="i in 100">{{ i }}</p>
        </div>
    </div>
</template>