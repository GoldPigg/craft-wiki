<script setup lang="ts">
import RisingWater from '../RisingWater.vue';

const { $ScrollTrigger, $gsap } = useNuxtApp()
const { height, width } = useWindowSize()
const luoshenRef = useTemplateRef<HTMLImageElement>('luoshen')
useGsap(() => {
    const luoshen = luoshenRef.value
    if (!luoshen) return
    $ScrollTrigger.create({
        trigger: '.section-2',
        start: 'bottom bottom',
        end: `+=${1000}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
    })

    $gsap.to(luoshen, {
        duration: 1,
        motionPath: {
            path: "#luoshenPath",
            align: "#luoshenPath",
            alignOrigin: [0.5, 0.5],
            autoRotate: true,
        },
        transformOrigin: "50% 50%",
        ease: 'power1.in',
        scrollTrigger: {
            trigger: '.section-2',
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1,
            invalidateOnRefresh: true,
        }
    }
    )
})

</script>

<template>
    <section>
        <RisingWater>
            <svg preserveAspectRatio="none" viewBox="0 0 256 160"
                style="position: absolute; width: 90%; height: 60%; top: 20%; left: 5%;">
                <path fill="transparent" id="luoshenPath"
                    d="M256 40.8 C248.4 62.3 234.4 73.2 208.4 76.5 C185.6 79.4 158.3 68.1 158.3 39 C158.3 30.7 166.4 17.4 177.4 16.3 C204.8 13.5 213.4 45.2 196.4 62 C194.5 63.8 182.7 71.6 180.3 72.7 C122.1 98.8 45.6 117.2 0 123.2" />
            </svg>
            <img ref="luoshen" src="/image/home/dance/luoshen.gif" style="height: 30%;rotate: 60;" />
        </RisingWater>
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