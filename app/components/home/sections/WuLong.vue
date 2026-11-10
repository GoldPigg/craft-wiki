<script setup lang="ts">
import WuLong from '../WuLong.vue';

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp()

const model = reactive<{ progress: number, changedByDrag: boolean }>({ progress: 0, changedByDrag: false })
const dragged = ref(false)

const scrollContainerRef = useTemplateRef<HTMLDivElement>('scroll-container')
const sectionRef = useTemplateRef<HTMLDivElement>('section')
const imagesRef = useTemplateRef<HTMLDivElement[]>('images')
let st: ScrollTrigger | null = null

const imageCount = 6
useGsap(() => {
    const track = scrollContainerRef.value!
    const section = sectionRef.value!

    const getScrollAmount = () => {
        return track.clientWidth - window.innerWidth
    }

    const tween = $gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
    })

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
        animation: tween,
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

    if (imagesRef.value) {
        imagesRef.value.forEach(e => {
            $gsap.from(e, {
                opacity: 0,
                y: -50,
                duration: 0.8,
                scrollTrigger: {
                    trigger: e,
                    containerAnimation: tween,
                    start: "left 80%",
                    end: "right 20%",
                    toggleActions: "play none none reverse",
                }
            })
        });
    }
})

watch(model, (v) => {
    if (!v.changedByDrag) return
    st?.scroll(st.start + (st.end - st.start) * Math.min(Math.max(v.progress, 0)))
})

</script>

<template>
    <section ref='section'>
        <div class="scroll-container" ref="scroll-container">
            <div v-for="i in imageCount" ref="images" class="image-container">
                <img :src="`image/home/wulong/${i - 1}.png`" />
            </div>
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

.image-container {
    aspect-ratio: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 20px;
    margin: 20px;
    position: relative;
    background-image: url("/image/home/wulong/jianzhibox.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.image-container img {
    object-position: center;
    object-fit: contain;
    border-radius: 10px;
}

.box {
    width: 20vw;
    height: 20vw;
    background-color: red;
}
</style>