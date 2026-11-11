<script setup lang="ts">
import RisingWater from '../RisingWater.vue';
import { isCompactViewport, prefersReducedMotion } from '~/utils/viewport';

const { $ScrollTrigger, $gsap } = useNuxtApp()
const { height } = useWindowSize()
const luoshenRef = useTemplateRef<HTMLDivElement>('luoshen')
const compactViewport = ref(false)

onMounted(() => {
    compactViewport.value = isCompactViewport()
})

useGsap(() => {

    if (isCompactViewport()) return

    const luoshen = luoshenRef.value
    if (!luoshen) return
    $ScrollTrigger.create({
        trigger: '.section-2',
        start: 'bottom bottom',
        end: `+=${height.value}`,
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
            scrub: 2,
            invalidateOnRefresh: true,
        }
    }
    )
})

const imageIndex = ref(0)
const imagePath = (i: number) => `/image/home/dance/${i}.jpg`
const imageRef = useTemplateRef<HTMLDivElement>('image')
const imageCount = 6

function animateImageChange(direction: 1 | -1) {
    imageIndex.value += direction
    if (prefersReducedMotion()) return

    nextTick(() => {
        const img = imageRef.value?.querySelector<HTMLImageElement>('img')
        if (!img) return
        $gsap.fromTo(img,
            { opacity: 0.35, x: direction * 14 },
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out', overwrite: true })
    })
}

const img = useImage()
useHead({
    link: Array.from({ length: imageCount }, (_, i) => ({
        rel: 'preload',
        as: 'image',
        href: img(imagePath(i)),
    }))
})

const nextImage = () => {
    if (imageIndex.value === imageCount - 1) {
        $gsap.to(window, {
            scrollTo: '.section-3'
        })
        return
    }
    if (isCompactViewport()) {
        animateImageChange(1)
        return
    }
    if (!imageRef.value) return
    const e = imageRef.value
    if (!e) return
    $gsap.to(e, {
        x: -100,
        duration: 0.5,
        opacity: 0,
        onComplete() {
            imageIndex.value++
            $gsap.fromTo(e, {
                delay: 0.5,
                x: 100,
                opacity: 0,
            }, { x: 0, opacity: 1 })
        }
    })
}

const preImage = () => {
    if (imageIndex.value === 0) {
        $gsap.to(window, {
            scrollTo: '.section-1'
        })
        return
    }
    if (isCompactViewport()) {
        animateImageChange(-1)
        return
    }
    if (!imageRef.value) return
    const e = imageRef.value
    if (!e) return
    $gsap.to(e, {
        x: 100,
        duration: 0.5,
        opacity: 0,
        onComplete() {
            imageIndex.value--
            $gsap.fromTo(e, {
                delay: 0.5,
                x: -100,
                opacity: 0,
            }, { x: 0, opacity: 1 })
        }
    })
}

</script>

<template>
    <section>
        <RisingWater>
            <svg class="luoshen-path" preserveAspectRatio="none" viewBox="0 0 256 160"
                style="position: absolute; width: 90%; height: 60%; top: 20%; left: 5%;">
                <path fill="transparent" id="luoshenPath"
                    d="M256 40.8 C248.4 62.3 234.4 73.2 208.4 76.5 C185.6 79.4 158.3 68.1 158.3 39 C158.3 30.7 166.4 17.4 177.4 16.3 C204.8 13.5 213.4 45.2 196.4 62 C194.5 63.8 182.7 71.6 180.3 72.7 C122.1 98.8 45.6 117.2 0 123.2" />
            </svg>
            <div ref="luoshen" class="luoshen-container"
                :style="compactViewport ? { position: 'fixed', left: '2dvw', bottom: '2dvh', rotate: '0.5turn' } : {}">
                <NuxtImg src="/image/home/dance/luoshen.gif" />
            </div>
        </RisingWater>
        <div class="dance-carousel" data-reveal>
            <button type="button" class="chevron-button chevron-button--prev" aria-label="上一张" @click="preImage">
                <Icon name="lucide:chevron-left" aria-hidden="true" />
            </button>
            <div class="image-container" ref="image">
                <NuxtImg :src="imagePath(imageIndex)" />
            </div>
            <button type="button" class="chevron-button chevron-button--next" aria-label="下一张" @click="nextImage">
                <Icon name="lucide:chevron-right" aria-hidden="true" />
            </button>
        </div>
    </section>
</template>

<style scoped>
section {
    height: 100dvh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
}

.dance-carousel {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
}

.luoshen-container {
    width: max-content;
}

.luoshen {
    will-change: translate;
}

.chevron-button {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    padding: 0;
    border: 0;
    background-color: white;
    color: var(--color-text-primary);
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}

.chevron-button:focus-visible {
    outline: 2px solid var(--color-focus-ring);
    outline-offset: 2px;
}

.chevron-button .iconify {
    width: 80%;
    height: 80%;
}

.image-container {
    height: 60dvh;
    max-width: min(100dvh, 60dvw);
    overflow: hidden;
    border-radius: 5%;
    box-shadow: var(--shadow-lg);
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-container img {
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
}

/* ---------- 移动端：4:3 静态画框，取消 pin / 路径动画 ---------- */
@media (max-width: 1023px) {
    section {
        height: auto;
        min-height: 100vh;
        min-height: 100svh;
        padding: 4rem 0;
        overflow: hidden;
    }

    .luoshen-path,
    .luoshen-figure {
        display: none;
    }

    .dance-carousel {
        width: 100%;
        gap: 0;
        /* data-reveal 的 transform 会创建层叠上下文，整组需要压在水面之上 */
        z-index: 2;
    }

    .image-container {
        width: min(88vw, 32rem);
        height: auto;
        aspect-ratio: 4 / 3;
        max-width: none;
        max-height: none;
        border-radius: 1rem;
        /* 手机上让画框浮出水面，避免整张图被水色洗掉 */
        z-index: 2;
    }

    .chevron-button {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 2.75rem;
        height: 2.75rem;
        z-index: 3;
        background: color-mix(in srgb, var(--color-bg) 88%, transparent);
        -webkit-backdrop-filter: blur(6px);
        backdrop-filter: blur(6px);
    }

    .chevron-button--prev {
        left: max(0.5rem, env(safe-area-inset-left, 0px));
    }

    .chevron-button--next {
        right: max(0.5rem, env(safe-area-inset-right, 0px));
    }
}
</style>