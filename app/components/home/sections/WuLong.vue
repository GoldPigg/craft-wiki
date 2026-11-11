<script setup lang="ts">
import WuLong from '../WuLong.vue';
import { isCompactViewport } from '~/utils/viewport';

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp()

const model = reactive<{ progress: number, changedByDrag: boolean }>({ progress: 0, changedByDrag: false })
const dragged = ref(false)

const scrollContainerRef = useTemplateRef<HTMLDivElement>('scroll-container')
const sectionRef = useTemplateRef<HTMLDivElement>('section')
const imagesRef = useTemplateRef<HTMLDivElement[]>('images')
let st: ScrollTrigger | null = null

const imageCount = 6
useGsap(() => {
    // 手机/平板：取消横向 pin 与拖拽龙，改为触屏横向画廊
    if (isCompactViewport()) return

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
                <NuxtImg draggable="false" :src="`image/home/wulong/${i - 1}.png`" />
            </div>
        </div>
        <WuLong class="wulong-figure" height="20dvh" v-model="model" v-model:dragged="dragged"
            style="position: absolute; bottom: 5%;" />
    </section>
</template>

<style scoped>
section {
    height: 100dvh;
    width: 100%;
    position: relative;
    background-image: url("/image/home/wulong/wulong-background.webp");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

section::before {
    content: "";
    display: block;
    position: absolute;
    background: inherit;
    border: 0;
    width: 100%;
    height: 100%;
    filter: blur(2px);
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
    height: 60%;
    width: 100%;
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
    height: 100%;
    width: 60%;
    object-position: center;
    object-fit: contain;
    border-radius: 10px;
}

.box {
    width: 20vw;
    height: 20vw;
    background-color: red;
}

.mobile-gallery-hint {
    display: none;
}

/* ---------- 移动端：横向剪纸画廊，取消 pin / 拖拽龙 ---------- */
@media (max-width: 1023px) {
    section {
        height: auto;
        min-height: 100vh;
        min-height: 100svh;
        padding: 4rem 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        overflow: hidden;
    }

    section::before {
        display: none;
    }

    .wulong-figure {
        display: none;
    }

    .scroll-container {
        width: 100%;
        height: auto;
        justify-content: flex-start;
        gap: 1rem;
        padding: 0 max(1rem, env(safe-area-inset-right, 0px)) 0 max(1rem, env(safe-area-inset-left, 0px));
        overflow-x: auto;
        overscroll-behavior-x: contain;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
    }

    .scroll-container::-webkit-scrollbar {
        display: none;
    }

    .image-container {
        flex: 0 0 min(78vw, 26rem);
        width: min(78vw, 26rem);
        margin: 0;
        border-radius: 1rem;
        scroll-snap-align: center;
    }

    .image-container img {
        width: 82%;
        height: 82%;
        object-fit: contain;
    }

    .mobile-gallery-hint {
        display: block;
        margin: 1.25rem var(--space4) 0;
        font-family: var(--font-ui);
        font-size: 0.75rem;
        letter-spacing: 0.14em;
        color: var(--color-text-secondary);
        text-align: center;
    }
}
</style>