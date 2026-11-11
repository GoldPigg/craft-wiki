<script setup lang="ts">
import Kettle from '../Kettle.vue'
import { useText } from '@fontize/vue'
import { isCompactViewport } from '~/utils/viewport'

const { $SplitText, $gsap } = useNuxtApp()

const titleRef = useTemplateRef<HTMLSpanElement>('titleRef')
useGsap(async () => {
    if (isCompactViewport()) return

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

const title = useText('守艺志', 'ZhongQiZhiMang')
const subTitle = useText('Craft Wiki', 'ZhongQiZhiMang')

</script>

<template>
    <section>
        <span id="title" ref="titleRef">
            <span v-text="title"></span>
            <span v-text="subTitle" style="font-size: 0.4em; justify-content: flex-end;"></span>
        </span>
        <Kettle class="welcome-kettle" height="var(--welcome-kettle-height, 30dvh)" />
    </section>
</template>

<style scoped>
section {
    background-image: url("/image/home/welcomeBackground.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100dvh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    opacity: 0;
}

.welcome-kettle {
    --welcome-kettle-height: 30dvh;
    position: absolute;
    left: 5vw;
    bottom: 5dvh;
}

section::before {
    content: "";
    position: absolute;
    background: inherit;
    width: 100%;
    height: 100%;
    filter: blur(20px);
}

#title {
    font-size: max(5.125rem, min(13.3333vw + 2rem, 18rem));
    width: 50%;
    display: flex;
    flex-direction: column;
    font-family: 'ZhongQiZhiMang';
}

#title span {
    width: 100%;
    margin: 0;
    padding: 0;
    display: flex;
}

@keyframes welcome-rise-in {
    from {
        opacity: 0;
        transform: translate3d(0, 18px, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

/* ---------- 移动端：静态首屏 ---------- */
@media (max-width: 1023px) {
    section {
        /* JS 不播放入场动画，直接显示 */
        opacity: 1;
        padding: 0 var(--space4);
    }

    /* 全屏模糊图层在手机上代价较高，且静态首屏不需要 */
    section::before {
        display: none;
    }

    #title {
        width: min(86vw, 30rem);
        font-size: clamp(4rem, 20vw, 6.5rem);
    }

    .welcome-kettle {
        --welcome-kettle-height: 26dvh;
        left: 4vw;
        bottom: 6dvh;
    }
}

@media (max-width: 1023px) and (prefers-reduced-motion: no-preference) {
    #title {
        animation: welcome-rise-in 0.7s var(--ease-out) both;
    }

    .welcome-kettle {
        animation: welcome-rise-in 0.75s var(--ease-out) 0.12s both;
    }
}
</style>