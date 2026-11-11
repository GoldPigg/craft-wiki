<script setup lang="ts">
import Kettle from '../shapes/Kettle.vue';
import Stream from './Stream.vue';

const props = defineProps<{
    height: string
}>()

const n = 400
const maxY = 25
const maxAngle = 40
const { $gsap, $Draggable, $ScrollTrigger, $ScrollSmoother } = useNuxtApp()
const kettleRef = useTemplateRef<typeof Kettle>('kettle')
const fireChildsRef = useTemplateRef<HTMLDivElement[]>('fire-child')
const progress = ref(0)
watch(progress, (v) => {
    const angle = v * maxAngle
    $gsap.set('.kettle', { rotation: angle })
    updatePoint()
})


const x = ref(0), y = ref(0)

const updatePoint = () => {
    if (!kettleRef.value) return
    const { x: nx, y: ny } = svgPointToWindow(kettleRef.value.$el, 1700, 115);
    x.value = nx, y.value = ny
}

const showArrow = ref(true)
let isStreaming = ref(false)

useGsap(() => {
    $Draggable.create('.kettle-inner', {
        type: 'y',
        inertia: true,
        throwResistance: 2000,
        maxDuration: 1.5,
        edgeResistance: 0.99,
        overshootTolerance: 0,
        bounds: { minY: -maxY, maxY: 0 },
        onDragStart() {
            showArrow.value = false
        },
        onDrag: function () {
            progress.value = -this.y / maxY
        },
        onThrowUpdate() {
            progress.value = -this.y / maxY
        },
        onThrowComplete() {
            if (!isStreaming.value) showArrow.value = true
        }
    })

    fireChildsRef.value?.forEach((v) => $gsap.to(v, {
        repeat: -1,
        duration: Math.random(),
        ease: "power1.in",
        keyframes: {
            '0%': {
                y: 0,
                scale: 1,
                filter: 'opacity(1)',
            },
            '25%': {
                filter: 'opacity(0),'
            },

            '100%': {
                y: '-200%',
                scale: 0,
                filter: 'opacity(0)',
            }
        }
    }))
    $ScrollTrigger.create({
        onUpdate: updatePoint
    })
})

onMounted(() => {
    updatePoint()
    window.addEventListener('resize', updatePoint)
})

const streamProgress = ref(0)
watch(progress, (v) => {
    if (!isStreaming.value && v > 0.95) {
        isStreaming.value = true
        $gsap.timeline({
            onComplete() {
                isStreaming.value = false
                showArrow.value = true
            }
        }).fromTo(streamProgress, { value: 0, duration: 0.4 }, { value: 0.5 })
            .to(streamProgress, { delay: 0.5, value: 1 })
            .to('.kettle-inner', {
                y: 0,
                onUpdate() {
                    progress.value = 1 - this.progress()
                }
            })
        $ScrollSmoother.get()?.paused(false)
        $gsap.to(window, {
            scrollTo: { y: '.section-2' },
            duration: 1.5,
            ease: 'power2.inOut',
        })
    }
})

</script>

<template>
    <div :style="{ height: height }" class="kettle-container">
        <div class="kettle-inner">
            <Arrow v-show="showArrow" style="position: absolute; bottom: 105%; left: 6%;" />
            <Kettle ref="kettle" class="kettle" draggable="false" />
        </div>
        <div class="fire">
            <div v-for="i in n" :style="{ left: `${100 * i / n - 20}%` }" ref="fire-child"></div>
        </div>
        <Teleport to="body" defer>
            <Stream v-show="isStreaming" :stream-width="2" :progress="streamProgress"
                :style="{ position: 'fixed', top: y + 'px', left: x + 'px', height: '60dvh', width: '30dvw', zIndex: 1 }" />
        </Teleport>
    </div>
</template>

<style scoped>
img {
    height: 100%;
}

.kettle {
    height: 100%;
    width: 100%;
}

.kettle-inner {
    height: 60%;
}

.kettle-container {
    display: flex;
    flex-direction: column;
}

.fire {
    width: 30%;
    height: 40%;
    position: relative;
}

.fire div {
    position: absolute;
    bottom: 0;
    height: 50%;
    width: 50%;
    border-radius: 50%;
    background: radial-gradient(orangered 20%,
            rgba(255, 69, 0, 0) 70%);
    mix-blend-mode: screen;
}
</style>