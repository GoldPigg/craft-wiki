<script setup lang="ts">
import Drum from '../Drum.vue';
import { isCompactViewport } from '~/utils/viewport';

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp()
const { height } = useWindowSize()
const sectionRef = useTemplateRef<HTMLDivElement>('section')
const contentRef = useTemplateRef<HTMLDivElement>('content')
const drumRef = useTemplateRef<typeof Drum>('drum')

const imageIndex = ref(0)
let st: ScrollTrigger | null = null

useGsap(() => {
    // 手机/平板：不使用 pin/纵向滚动驱动，图片改为横向滑动
    if (isCompactViewport()) return
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
            ease: 'none',
            y: -scrollLength
        }),
        async onEnter(self) {
            imageIndex.value = 0
            self.scroll(self.start)
        },
        async onEnterBack(self) {
            imageIndex.value = imageCount - 1
            self.scroll(self.end)
        },
        onToggle(self) {
            if (self.isActive) $ScrollSmoother.get()?.paused(true)
        },
    })

    if (!drumRef.value) return

    $ScrollTrigger.create({
        trigger: sectionRef.value,
        start: '101% bottom',
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
        animation: $gsap.fromTo(drumRef.value.$el, {
            opacity: 1,
            x: 0,
        }, {
            opacity: 0,
            x: 100,
        })
    })

    $ScrollTrigger.create({
        trigger: sectionRef.value,
        start: 'top 1%',
        toggleActions: "play none none reverse",
        invalidateOnRefresh: true,
        animation: $gsap.fromTo(drumRef.value.$el, {
            opacity: 0,
            x: 100,
        }, {
            opacity: 1,
            x: 0,
        })
    })
})

const imagesRef = useTemplateRef<HTMLDivElement[]>('images')
const imageCount = 8
const onStickClick = (stick: 'right' | 'left') => {
    if (!st || isCompactViewport()) return
    if (imageIndex.value < 0 || imageIndex.value >= imageCount) return
    const trigger = st
    if (stick === 'left') imageIndex.value--
    else imageIndex.value++

    let to = 0
    if (imageIndex.value < 0) {
        to = trigger.start - window.innerHeight
    }
    else if (imageIndex.value >= imageCount) {
        to = trigger.end + window.innerHeight
    }
    else {
        if (!imagesRef.value) return
        const e = imagesRef.value[imageIndex.value]
        if (!e) return
        if (imageIndex.value === 0) to = trigger.start
        else if (imageIndex.value === imageCount - 1) to = trigger.end
        else {
            const rect = e.getBoundingClientRect()
            to = trigger.scroll() + rect.top
        }
    }

    const tmp = { v: trigger.scroll() }
    const index = imageIndex.value
    $gsap.to(tmp, {
        v: to,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate() {
            trigger.scroll(tmp.v)
        },
        onComplete() {
            imageIndex.value = index
            if (trigger.progress <= 0 || trigger.progress >= 1) $ScrollSmoother.get()?.paused(false)
        }
    })
}


</script>

<template>
    <section ref="section">
        <div class="content" ref="content" data-reveal>
            <div v-for="i in imageCount" :key="i" ref="images" class="image-container"
                :class="{ 'image-container--offset': i % 2 === 0 }">
                <NuxtImg draggable="false" loading="lazy" decoding="async" :src="`image/home/music/${i - 1}.jpg`"
                    :alt="`乐舞图片 ${i}`" />
            </div>
        </div>
        <Drum ref="drum" class="music-drum" height="40dvh" @click-stick="onStickClick"
            style="position: absolute; right: 5dvw; bottom: 10dvh;" />
    </section>
</template>

<style scoped>
section {
    height: 100dvh;
    width: 100%;
    position: relative;
    overflow: hidden;
}

section::before {
    content: "";
    display: block;
    position: absolute;
    background: inherit;
    width: 100%;
    height: 100%;
    filter: blur(30px);
}

.image-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
    margin: 20px;
    position: relative;
    max-height: 80dvh;
}

.image-container img {
    height: 100%;
    width: 60%;
    object-position: center;
    object-fit: contain;
    border-radius: 10px;
}

.content {
    padding: 10px;
}

.mobile-gallery-hint {
    display: none;
}

@media (min-width: 1024px) {
    .image-container--offset {
        left: 10%;
    }
}

/* ---------- 移动端：横向滑动画廊，取消 pin / 鼓点滚动 ---------- */
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

    .content {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        width: 100%;
        height: auto;
        gap: 1rem;
        padding: 1rem max(1rem, env(safe-area-inset-right, 0px)) 1rem max(1rem, env(safe-area-inset-left, 0px));
        overflow-x: auto;
        overscroll-behavior-x: contain;
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -webkit-overflow-scrolling: touch;
    }

    .content::-webkit-scrollbar {
        display: none;
    }

    .image-container {
        flex: 0 0 min(82vw, 30rem);
        width: min(82vw, 30rem);
        max-height: none;
        margin: 0;
        left: auto;
        scroll-snap-align: center;
    }

    .image-container img {
        width: 100%;
        height: auto;
        aspect-ratio: 4 / 3;
        object-fit: cover;
        border-radius: 1rem;
    }

    .music-drum {
        display: none;
    }

    .mobile-gallery-hint {
        display: block;
        margin: 1.25rem var(--space4) 0;
        font-family: var(--font-ui);
        font-size: 0.75rem;
        letter-spacing: 0.14em;
        color: var(--color-text-muted);
        text-align: center;
    }
}
</style>