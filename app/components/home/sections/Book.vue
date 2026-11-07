<script lang="ts" setup>
import Rod from '../Rod.vue';

const { $ScrollTrigger, $gsap } = useNuxtApp()
const { height } = useWindowSize()

const scrollHangingContainerRef = useTemplateRef<HTMLDivElement>('scrollHangingContainer')
const sectionRef = useTemplateRef<HTMLDivElement>('section')
const rodRef = useTemplateRef<typeof Rod>('rod')

onMounted(() => {
    const scrollHangingContent = scrollHangingContainerRef.value
    if (!scrollHangingContent) return
    const scrollHeight = scrollHangingContent?.scrollHeight
    const rodHeight = rodRef.value?.$el.scrollHeight ?? 0
    if (sectionRef.value) sectionRef.value.style.height = scrollHeight + 2 * rodHeight + 'px'
})

useGsap(() => {
    const scrollHangingContent = scrollHangingContainerRef.value
    if (!scrollHangingContent) return
    const scrollHeight = scrollHangingContent?.scrollHeight
    $ScrollTrigger.create({
        trigger: ".section-3",
        start: "top 100%",
        end: `+=${height.value}`,
        scrub: true,
        animation: $gsap.fromTo('.section-2', { y: 1000 }, {
            y: `+=${height.value}`,
        })
    })

    $ScrollTrigger.create({
        trigger: ".section-3",
        start: "top 50%",
        end: `+=${scrollHeight}`,
        scrub: true,
        animation: $gsap.to(scrollHangingContent, {
            height: scrollHeight,
        })
    })
})
</script>

<template>
    <section ref="section">
        <Rod class="rod-1" ref="rod" />
        <div class="scroll-hanging-container" ref="scrollHangingContainer">
            <div class="mount-top"></div>
            <div class="scroll-hanging-content">
                <p v-for="i in 50">{{ i }}</p>
            </div>
            <div class="mount-bottom"></div>
        </div>
        <Rod />
    </section>
</template>

<style scoped>
section {
    min-height: 100dvh;
    height: max-content;
    width: 100dvw;
    position: relative;
}

.scroll-hanging-container {
    height: 0;
    background-color: white;
    overflow: hidden;
}

.scroll-hanging-content {
    background: #F7F3EC;
    border-left: 1px solid #d9cdbb;
    border-right: 1px solid #d9cdbb;
    padding: 56px 40px;
    gap: 28px;
    min-height: 360px;
    position: relative;
}

.mount-top {
    height: 64px;
    background: linear-gradient(180deg, #c9b896 0%, #b8a67f 100%);
    border-left: 1px solid #a89570;
    border-right: 1px solid #a89570;
    position: relative;
}

.mount-bottom {
    height: 44px;
    background: linear-gradient(180deg, #b8a67f 0%, #c9b896 100%);
    border-left: 1px solid #a89570;
    border-right: 1px solid #a89570;
    position: relative;
}

.mount-bottom::after {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
        repeating-linear-gradient(-45deg,
            rgba(255, 255, 255, 0.04) 0,
            rgba(255, 255, 255, 0.04) 1px,
            transparent 1px,
            transparent 4px);
    pointer-events: none;
}

.rod-bottom {
    height: 20px;
    background: linear-gradient(180deg, #5a4632 0%, #3d2e1f 50%, #2a1f15 100%);
    border-radius: 10px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
    position: relative;
    z-index: 2;
    flex-shrink: 0;
}

.rod-bottom::before,
.rod-bottom::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    background: radial-gradient(circle at 35% 35%, #e8c25a, #b8860b 45%, #6b4f08);
    border-radius: 50%;
    transform: translateY(-50%);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
}

.rod-bottom::before {
    left: -20px;
}

.rod-bottom::after {
    right: -20px;
}
</style>