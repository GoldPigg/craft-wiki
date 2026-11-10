<script setup lang="ts">
import Drum from '../Drum.vue';

const { $gsap, $ScrollTrigger, $ScrollSmoother } = useNuxtApp()
const { height } = useWindowSize()
const sectionRef = useTemplateRef<HTMLDivElement>('section')
const contentRef = useTemplateRef<HTMLDivElement>('content')

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
})

const imagesRef = useTemplateRef<HTMLDivElement[]>('images')
const imageCount = 4
const onStickClick = (stick: 'right' | 'left') => {
    // if (imageIndex.value <= 0 || imageIndex.value >= imageCount) return
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
                <img draggable="false" :src="`image/home/music/${i - 1}.jpg`" />
            </div>
        </div>
        <Drum height="40dvh" @click-stick="onStickClick" style="position: absolute; right: 5dvw; bottom: 10dvh;" />
    </section>
</template>

<style scoped>
section {
    height: 100dvh;
    width: 100dvw;
    position: relative;
    overflow: hidden;
    /* background: linear-gradient(135deg, #C0392B 0%, #D4A017 100%); */
    /* background: radial-gradient(circle at 30% 30%, #C0392B 0%, #2C3E7A 100%); */
    /* background-color: #FDF2F0; */
    /* background-image: url("/image/home/music/music-background.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; */
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
    margin-bottom: 20px;
    margin: 20px;
    position: relative;
}

.image-container img {
    height: 100%;
    width: 60%;
    object-position: center;
    object-fit: contain;
    border-radius: 10px;
}

.content {
    height: 200dvh;
}
</style>