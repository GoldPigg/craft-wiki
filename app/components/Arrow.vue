<script lang="ts" setup>
import { isCompactViewport } from '~/utils/viewport'

type Direction = 'left' | 'up' | 'down' | 'right'
type Type = 'move' | 'click'

const props = withDefaults(defineProps<{
    direction?: Direction,
    type?: Type,
}>(), { direction: 'up', type: 'move' })

const rotateAngle = computed(() => {
    if (props.direction === 'down') return '0'
    if (props.direction === 'left') return '90deg'
    if (props.direction === 'up') return '180deg'
    if (props.direction === 'right') return '270deg'
    const tmp: never = props.direction as never
    return tmp
})

const { $gsap } = useNuxtApp()
const arrowRef = useTemplateRef<SVGElement>('arrow')

useGsap(() => {
    if (isCompactViewport()) return

    if (props.type === 'move') {
        const tl = $gsap.timeline({
            repeat: -1,
            repeatDelay: 0.4
        })
        tl.fromTo(arrowRef.value, {
            opacity: 0,
        }, { opacity: 1 })
        tl.to(arrowRef.value, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power4.in",
        })
    }
    else if (props.type === 'click') {
        $gsap.to(arrowRef.value, {
            y: -20,
            duration: 0.3,
            yoyo: true,
            repeat: -1,
        })
    }
})

</script>

<template>
    <div :style="{ transform: `rotate(${rotateAngle})` }">
        <svg ref='arrow' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="100"
            viewBox="0 0 119.254 191.765" \>
            <path
                d="M66.493 100 L41.493 100 L41.493 10.412 C41.493 4.662 46.156 0 51.906 0 L56.081 0 C61.831 0 66.493 4.662 66.493 10.412 Z"
                fill="#d81e06" />
            <path
                d="M106.693 115.875 L63.568 185.812 C61.685 188.87 58.359 190.742 54.768 190.765 C51.177 190.788 47.828 188.959 45.906 185.925 L1.618 115.987 C-0.415 112.78 -0.541 108.719 1.291 105.392 C3.122 102.064 6.62 99.998 10.418 100 L97.831 100 C101.606 99.996 105.088 102.036 106.93 105.331 C108.772 108.627 108.686 112.661 106.706 115.875 Z"
                fill="#d81e06" />
        </svg>
    </div>
</template>

<style scoped></style>