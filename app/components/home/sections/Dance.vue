<script setup lang="ts">
import RisingWater from '../RisingWater.vue';

const { $ScrollTrigger, $gsap } = useNuxtApp()
const { height } = useWindowSize()
const luoshenRef = useTemplateRef<HTMLImageElement>('luoshen')
useGsap(() => {
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
            scrub: 1,
            invalidateOnRefresh: true,
        }
    }
    )
})

const imageIndex = ref(0)
const imagePath = (i: number) => `/image/home/dance/${i}.jpg`
const imageRef = useTemplateRef<HTMLDivElement>('image')
const imageCount = 4


const nextImage = () => {
    if (imageIndex.value === imageCount - 1) {
        $gsap.to(window, {
            scrollTo: '.section-3'
        })
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
            <svg preserveAspectRatio="none" viewBox="0 0 256 160"
                style="position: absolute; width: 90%; height: 60%; top: 20%; left: 5%;">
                <path fill="transparent" id="luoshenPath"
                    d="M256 40.8 C248.4 62.3 234.4 73.2 208.4 76.5 C185.6 79.4 158.3 68.1 158.3 39 C158.3 30.7 166.4 17.4 177.4 16.3 C204.8 13.5 213.4 45.2 196.4 62 C194.5 63.8 182.7 71.6 180.3 72.7 C122.1 98.8 45.6 117.2 0 123.2" />
            </svg>
            <img ref="luoshen" src="/image/home/dance/luoshen.gif" style="height: 30%;rotate: 60;" />
        </RisingWater>
        <link v-for="i in imageCount" rel="preload" as="image" :href="imagePath(i - 1)" fetchpriority="high">
        <div style="display: flex; align-items: center; justify-content: center;gap: 10px; position: relative; z-index: 0;"
            ref="image">
            <div @click="preImage" class="chevron-button">
                <Icon name="lucide:chevron-left" />
            </div>
            <div class="image-container" ref="image">
                <img :src="imagePath(imageIndex)" />
            </div>
            <div @click="nextImage" class="chevron-button">
                <Icon name="lucide:chevron-right" />
            </div>

        </div>
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

.chevron-button {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    background-color: white;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>