<script setup lang="ts">
import Kettle from '../Kettle.vue'

const { $SplitText, $gsap } = useNuxtApp()

const titleRef = useTemplateRef<HTMLSpanElement>('titleRef')
useGsap(() => {

    const split = $SplitText.create("#title", { type: "chars" })
    $gsap.from(split.chars, {
        x: 150,
        opacity: 0,
        duration: 1.5,
        ease: "power4",
        stagger: 0.04,
        onStart: () => {
            if (titleRef.value?.style?.opacity) titleRef.value.style.opacity = '1'
        }
    })
    $gsap.to("section", { opacity: 1 })
    $gsap.from('.kettle-container', {
        y: 150,
        opacity: 0,
        duration: 1.5,
        ease: "power4",
        stagger: 0.04,
    })
})

</script>

<template>
    <section>
        <span id="title" ref="titleRef">
            <span> 守艺志 </span>
            <span style="font-size: 0.4em; justify-content: flex-end;"> Craft Wiki </span>
        </span>
        <Kettle height="30dvh" style="position: absolute;left: 5dvw;bottom: 5dvh;" />
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
    opacity: 0;
}

#title {
    font-size: max(5.125rem, min(13.3333vw + 2rem, 18rem));
    width: 50%;
    display: flex;
    flex-direction: column;
    font-family: 'LiyuShoushu';
}

#title span {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
}
</style>