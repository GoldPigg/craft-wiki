<script setup lang="ts">
import WuLong from '../WuLong.vue';

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp()

const model = reactive<{ progress: number, changedByDrag: boolean }>({ progress: 0, changedByDrag: false })
const dragged = ref(false)

const scrollContainerRef = useTemplateRef<HTMLDivElement>('scroll-container')
const sectionRef = useTemplateRef<HTMLDivElement>('section')
let st: ScrollTrigger | null = null

useGsap(() => {
    const track = scrollContainerRef.value!
    const section = sectionRef.value!

    const getScrollAmount = () => {
        return track.clientWidth - window.innerWidth
    }

    st = $ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getScrollAmount()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate(self) {
            if (!dragged.value) {
                model.progress = self.progress
                model.changedByDrag = false
            }
        },
        animation: $gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: 'none',
        }),
        onEnter() {
            $ScrollSmoother.get()?.paused(false)
        }
    })


    $gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: "+=20%",
            // pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            anticipatePin: 1,
        }
    }).from('.wulong', {
        opacity: 0,
    }).from('.box', {
        opacity: 0,
        x: '100vw',
    })
})

watch(model, (v) => {
    if (!v.changedByDrag) return
    st?.scroll(st.start + (st.end - st.start) * Math.min(Math.max(v.progress, 0)))
})

</script>

<template>
    <section ref='section'>
        <div class="scroll-container" ref="scroll-container">
            <div v-for="i in 10" class="box"> {{ i }} </div>
        </div>
        <WuLong height="20dvh" v-model="model" v-model:dragged="dragged" style="position: absolute; bottom: 5%;" />
    </section>
</template>

<style scoped>
section {
    height: 100dvh;
    width: 100dvw;
    position: relative;
}

.scroll-container {
    height: 100%;
    width: max-content;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
}

.box {
    width: 20vw;
    height: 20vw;
    background-color: red;
}
</style>