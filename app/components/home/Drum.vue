<script setup lang="ts">

const props = defineProps<{
    height: string
}>()
const { $gsap } = useNuxtApp()

const emit = defineEmits<{
    clickStick: [stick: 'left' | 'right']
}>()

const onLeftStickClick = (e: MouseEvent) => {
    emit('clickStick', 'left')
    const element = e.currentTarget as SVGPathElement
    $gsap.fromTo(element, { y: 0, rotate: 0 }, {
        yoyo: true,
        y: 10,
        rotate: 10,
        duration: 0.1,
        repeat: 1,
    })
}

const onRightStickClick = (e: MouseEvent) => {
    emit("clickStick", 'right')
    const element = e.currentTarget as SVGPathElement
    $gsap.fromTo(element, { y: 0, rotate: 0 }, {
        yoyo: true,
        y: 10,
        rotate: -10,
        transformOrigin: "100% 0%",
        duration: 0.1,
        repeat: 1,
    })
}

</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" :style="{ height: height }"
        preserveAspectRatio="xMidYMid meet">
        <path fill="#ffd8b2"
            d="M138 120h118v50c0 12 0 22-8 31q-9 9-22 10-12-1-21-9-7-7-8-16h-2v2q-4 12-13 18-10 6-23 4-14-4-20-16l-2-8h-2v2q-3 12-13 18-11 6-24 4a31 31 0 0 1-19-15q-6-14-2-30 6-23 27-37 16-9 34-8" />
        <path fill="#ff6680"
            d="M136 120h222l7-1c21 0 38 3 54 18q17 18 18 44-1 12-9 21-6 6-14 7l2 3a188 188 0 0 1 31 65q5 20 4 39v2q1 18-3 34l-1 2c-5 23-15 49-32 66h17c12 1 12 1 16 5q4 5 3 12v14l1 33v16q-1 6-7 11-6 2-12 1h-9l-9 1-5-1-3 1q-8 0-13-5c-6-8-4-17-4-26H286v21c-5 7-5 7-9 9h-18l-9 1-5-1-3 1q-7 0-13-5c-3-5-3-5-3-26H122v15q0 8-7 13-3 3-7 2H80l-3 1q-7 0-13-5-4-5-3-12v-47l-1-5 1-7v-4q0-7 6-11l9-2h21l-2-2c-20-26-34-59-34-92v-2q-3-47 20-89l2-3 15-23h-2q-11-3-17-14-6-16-1-33 8-26 33-37 12-5 25-5" />
        <path fill="#f35"
            d="M315 186h2l1 2q4 13 15 19 12 5 24 0t16-15l2-6h2l1 2q4 13 15 19l14 2c6 0 6 0 9 3q4 3 6 8l2 3q27 42 27 93v2a135 135 0 0 1-4 36c-5 23-15 49-32 66h17c12 1 12 1 16 5q4 5 3 12v14l1 45v4q-1 6-7 11-6 2-12 1h-9l-9 1h-8q-8 0-13-5c-6-8-4-17-4-26H286v21c-5 7-5 7-9 9h-18l-9 1h-8q-7 0-13-5c-3-5-3-5-3-26H122v15q0 8-7 13-3 3-7 2H80l-3 1q-7 0-13-5-4-5-3-12v-47l-1-5 1-7v-4q0-7 6-11l11-1h178v-60l12-2q17-4 27-21 8-17 4-35-6-17-22-27-10-4-21-5v-84l4 7q6 10 16 14 12 4 24-2 10-6 15-18z" />
        <path fill="#4c4646"
            d="M76 421h210l56-1h97q7 2 11 7l1 10v63q0 6-6 11-6 2-12 1h-23l-3 1q-8 0-13-5c-6-8-4-17-4-26H286v21c-5 7-5 7-9 9h-32l-3 1q-7 0-13-5c-3-5-3-5-3-26H122v15q-1 8-7 13l-7 2H77q-7 1-13-4-4-5-3-12v-47l-1-5v-11q1-5 5-9 6-4 11-3" />
        <path fill="#ffba99"
            d="M136 120h222l7-1c21 0 38 3 54 18q17 18 18 44-1 12-9 21l-5 4-2 1q-10 5-22 3-13-4-20-15-3-4-2-9h-2v3q-3 11-13 17-11 6-23 4-14-5-21-17l-1-7h-2v3q-3 11-13 17-11 6-23 4-14-5-21-17l-1-8h-2v3q-2 10-11 16-11 8-25 6-14-4-20-16l-2-8h-2v2q-3 12-13 18t-23 4q-14-4-20-16l-2-8h-2v2q-3 12-13 18-11 6-24 4-12-3-18-13l-1-2q-6-13-2-30 6-23 27-37 15-8 32-8" />
        <path fill="#655e5e"
            d="M78 421h178v91c-21 0-21 0-27-4-3-5-3-5-3-26H122v15q-1 8-7 13l-7 2H80l-3 1q-7 0-13-5-4-5-3-12v-47l-1-5 1-7v-4q0-7 6-11z" />
        <path fill="#ffbd40"
            d="M283 279q14 11 18 28 2 23-12 40-11 12-29 14-21 1-37-13l-8-13-1-2q-7-17 0-34 8-18 27-26 23-7 42 6" />
        <path fill="#ffde40" d="M256 271v90q-19 0-33-13l-8-13-1-2q-7-17 0-34t25-25q8-3 17-3" />
        <path fill="#655e5e" class="stick" @click="onLeftStickClick"
            d="m32 3 14 5 7 2 17 6 21 7 8 3 4 1 11 4 83 27q8 2 14 11 2 8-2 16-3 5-10 5-12 0-22-4l-4-1-11-4-11-4-47-15-9-4h-2L38 40l-3-1-14-5-4-1-3-1q-7-3-13-8l-1-9v-3Q0 6 6 2c8-5 18-2 26 1" />
        <path fill="#4c4646" class="stick"" @click="onRightStickClick"
            d="M507 2q5 4 5 10l-1 12q-11 9-23 11l-4 1-10 4-134 44-4 2c-20 7-20 7-30 2q-5-3-5-10l2-13q8-7 19-9l17-6 16-5 27-9 7-2 45-15 8-3 5-2h3l15-6 9-3 4-1c9-3 19-7 29-2" />
    </svg>
</template>

<style scoped>
.stick {
    cursor: pointer;
}
</style>