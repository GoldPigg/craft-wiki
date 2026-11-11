<script setup lang="ts">
import Drum from '../Drum.vue';

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp()
const { height } = useWindowSize()
const sectionRef = useTemplateRef<HTMLDivElement>('section')
const contentRef = useTemplateRef<HTMLDivElement>('content')
const drumRef = useTemplateRef<typeof Drum>('drum')

const imageIndex = ref(0)
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
    if (imageIndex.value < 0 || imageIndex.value >= imageCount) return
    if (stick === 'left') imageIndex.value--
    else imageIndex.value++

    let to = 0
    if (imageIndex.value < 0) {
        to = st.start - window.innerHeight
    }
    else if (imageIndex.value >= imageCount) {
        to = st.end + window.innerHeight
    }
    else {
        if (!imagesRef.value) return
        const e = imagesRef.value[imageIndex.value]
        if (!e) return
        if (imageIndex.value === 0) to = st.start
        else if (imageIndex.value === imageCount - 1) to = st.end
        else {
            const rect = e.getBoundingClientRect()
            to = st.scroll() + rect.top
        }
    }

    const tmp = { v: st.scroll() }
    const index = imageIndex.value
    $gsap.to(tmp, {
        v: to,
        duration: 0.5,
        ease: 'power2.inOut',
        onUpdate() {
            st.scroll(tmp.v)
        },
        onComplete() {
            imageIndex.value = index
            if (st.progress <= 0 || st.progress >= 1) $ScrollSmoother.get()?.paused(false)
        }
    })
}


</script>

<template>
    <section ref="section">
        <div class="content" ref="content">
            <div v-for="i in imageCount" ref="images" class="image-container"
                :style="{ left: i % 2 === 0 ? ' 10%' : 0 }">
                <NuxtImg draggable="false" :src="`image/home/music/${i - 1}.jpg`" />
            </div>
        </div>
        <Drum ref="drum" height="40dvh" @click-stick="onStickClick"
            style="position: absolute; right: 5dvw; bottom: 10dvh;" />
    </section>
</template>

<style scoped>
section {
    height: 100dvh;
    width: 100dvw;
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
</style>