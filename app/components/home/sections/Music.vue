<script setup lang="ts">
import Drum from '../Drum.vue';

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp()
const { height } = useWindowSize()
const sectionRef = useTemplateRef<HTMLDivElement>('section')
const contentRef = useTemplateRef<HTMLDivElement>('content')


const pages = ref(0)
let st: ScrollTrigger

useGsap(() => {
    if (!contentRef.value) return
    const scrollLength = contentRef.value.scrollHeight - height.value
    st = $ScrollTrigger.create({
        trigger: sectionRef.value,
        start: 'top top',
        end: `+=${scrollLength}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        animation: $gsap.to(contentRef.value, {
            y: -scrollLength
        }),
        async onEnter(self) {
            pages.value = 0
            self.scroll(self.start)
        },
        async onEnterBack(self) {
            pages.value = 1
            self.scroll(self.end)
        },
        onToggle(self) {
            if (self.isActive) $ScrollSmoother.get()?.paused(true)
        },
    })
})
const onStickClick = (stick: 'right' | 'left') => {
    $gsap.to(pages, {
        value: stick === 'right' ? "+=1" : "-=1",
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate() {
            st.scroll(st.start + pages.value * height.value)
        },
        onComplete() {
            console.log(st.progress)
            if (st.progress <= 0 || st.progress >= 1) $ScrollSmoother.get()?.paused(false)
        }
    })
}


</script>

<template>
    <section ref="section">
        <div class="content" ref="content">
            <p v-for="i in 50">{{ i }}</p>
        </div>
        <Drum height="40dvh" @click-stick="onStickClick" style="position: absolute; right: 5dvw; bottom: 10dvh;" />
    </section>
</template>

<style>
section {
    height: 100dvh;
    width: 100dvw;
    position: relative;
    overflow: hidden;
}

.content {
    height: 200dvh;
}
</style>