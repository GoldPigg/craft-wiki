<script lang="ts" setup>

const props = defineProps<{
    streamWidth: number,
    progress: number
}>()

const path = computed(() => {
    const r = props.streamWidth / 2
    return `M${0} ${0}C50 10 90 40 ${100 - r} ${100 - r}`
})

const pathRef = useTemplateRef<SVGPathElement>('path')

const pathLength = computed(() => pathRef.value?.getTotalLength() ?? 0)
const strokeDasharray = computed(() => `${pathLength.value} ${pathLength.value}`)
const strokeDashoffset = computed(() => `${pathLength.value * (1 - (props.progress * 2))}`)

</script>

<template>
    <svg viewBox="0 0 100 100" height="200" width="200" preserveAspectRatio="none">
        <path ref="path" :d="path" fill="none" stroke="#D6EFFA" :stroke-width="streamWidth * 0.4" opacity="0.85"
            :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset" />
        <path :d="path" fill="none" stroke="#A8D8F0" :stroke-width="streamWidth" opacity="0.35"
            :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset" style="filter: blur(0.6px)" />
    </svg>
</template>