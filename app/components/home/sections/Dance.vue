<script setup lang="ts">
import RisingWater from '../RisingWater.vue';

const { $ScrollTrigger } = useNuxtApp()
useGsap(() => {
    $ScrollTrigger.create({
        trigger: '.section-2',
        start: 'bottom bottom',
        end: `+=${1000}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
    })
})

</script>

<template>
    <section>
        <RisingWater />
    </section>
</template>

<style scoped>
section {
    height: 100dvh;
    width: 100dvw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
}
</style>