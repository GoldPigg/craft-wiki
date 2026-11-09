<script setup lang="ts">

const { $gsap } = useNuxtApp()
const { height } = useWindowSize()
const causticRefs = useTemplateRef<SVGEllipseElement[]>('causticRefs')
const bubblesContainer = useTemplateRef<HTMLDivElement>('bubblesContainer')

const level = 0.9;
const amp = 40;
const waveLength = 200;
const vboxH = 1000;
const vboxW = 2400;
const bubbleMax = 10
const surfaceY = (1 - level) * vboxH;


const wavePath = computed(() => {
    const points = [];
    points.push(`M 0 ${surfaceY}`);
    for (let x = 0; x < vboxW; x += waveLength / 2) {
        const y1 = surfaceY + Math.sin((x / waveLength) * Math.PI * 2) * amp;
        const nextX = x + waveLength / 2;
        const nextY = surfaceY + Math.sin((nextX / waveLength) * Math.PI * 2) * amp;
        points.push(`Q ${x + waveLength / 4} ${y1 - amp * 0.45} ${nextX} ${nextY}`);
    }

    points.push(`L ${vboxW} ${vboxH + 600}`);
    points.push(`L 0 ${vboxH + 600}`);
    points.push('Z');
    return points.join(' ');
})

let bubble_count = 0
const createBubble = () => {
    if (bubble_count >= bubbleMax || !bubblesContainer.value) return
    bubble_count++
    const span = document.createElement('span');
    span.className = 'bubble';

    const sizeRoll = Math.random();
    let size;
    if (sizeRoll < 0.6) size = 6 + Math.random() * 4;
    else size = 10 + Math.random() * 5;

    span.style.setProperty('--size', `${size}px`);
    span.style.setProperty('left', `${Math.random() * vboxW}px`);

    bubblesContainer.value?.appendChild(span);

    const riseDistance = level * bubblesContainer.value.clientHeight - size / 2;
    const riseDuration = 5 + Math.random() * 4;
    const baseScale = 0.75 + Math.random() * 0.35;

    const tl = $gsap.timeline({
        delay: Math.random() * 6,
        repeatDelay: 1.5 + Math.random() * 2,
        onComplete() {
            span.remove()
            bubble_count--
        },
        onUpdate() {

        }
    });

    tl.set(span, { y: 0, opacity: 0.85 });

    tl.to(span, {
        y: -riseDistance, duration: riseDuration, ease: 'none',
    }, 0.35);

    tl.to(span, {
        scale: baseScale * 1.2, opacity: 0.9, duration: 0.2, ease: 'power2.out',
    });

    tl.to(span, {
        scale: baseScale * 1.8, opacity: 0, duration: 0.3, ease: 'power3.out',
    });
}

useGsap(() => {
    $gsap.fromTo(
        ['.side-water-inner'],
        { y: '80vh' },
        {
            y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: {
                trigger: ".side-water",
                start: 'top bottom',
                end: `+=${height.value}`,
                scrub: 1,
                invalidateOnRefresh: true,
                anticipatePin: 1,
            }
        },
    );

    $gsap.to(['.water', '#highlightRef'], {
        x: -waveLength, duration: 9, repeat: -1, ease: 'none',
    });

    causticRefs.value?.forEach((el, i) => {
        $gsap.to(el, {
            x: () => $gsap.utils.random(-180, 180),
            duration: () => $gsap.utils.random(4, 7),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.4,
        });

        $gsap.to(el, {
            y: () => $gsap.utils.random(-30, 30),
            duration: () => $gsap.utils.random(3, 5.5),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.3,
        });

        $gsap.to(el, {
            scaleX: () => $gsap.utils.random(0.6, 1.8),
            duration: () => $gsap.utils.random(3, 5),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.5,
        });

        $gsap.to(el, {
            opacity: () => $gsap.utils.random(0.4, 1),
            duration: () => $gsap.utils.random(2, 4),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: i * 0.2,
        });
    });

    function bubble() {
        createBubble()
        setTimeout(bubble, Math.random() * 4000 + 500)
    }

    bubble()
})

</script>

<template>
    <div class="side-water" aria-hidden="true">
        <div class="side-water-inner">
            <slot></slot>
            <svg class="water-svg" viewBox="0 0 2400 1000" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="water-body" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#3B5AA8" stop-opacity="0.22" />
                        <stop offset="12%" stop-color="#3B5AA8" stop-opacity="0.38" />
                        <stop offset="50%" stop-color="#3B5AA8" stop-opacity="0.58" />
                        <stop offset="100%" stop-color="#2A3D5C" stop-opacity="0.82" />
                    </linearGradient>

                    <linearGradient id="surface-glow" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stop-color="#fff" stop-opacity="0" />
                        <stop offset="25%" stop-color="#fff" stop-opacity="0.8" />
                        <stop offset="50%" stop-color="#fff" stop-opacity="1" />
                        <stop offset="75%" stop-color="#fff" stop-opacity="0.8" />
                        <stop offset="100%" stop-color="#fff" stop-opacity="0" />
                    </linearGradient>

                    <radialGradient id="caustic-glow">
                        <stop offset="0%" stop-color="#F0F9FF" stop-opacity="0.9" />
                        <stop offset="40%" stop-color="#D6EFFA" stop-opacity="0.4" />
                        <stop offset="100%" stop-color="#D6EFFA" stop-opacity="0" />
                    </radialGradient>

                    <filter id="surface-blur">
                        <feGaussianBlur stdDeviation="2.5" />
                    </filter>
                    <filter id="caustic-blur">
                        <feGaussianBlur stdDeviation="4" />
                    </filter>

                    <mask id="water-mask">
                        <path :d="wavePath" id="waterMaskPath" fill="white" />
                    </mask>
                </defs>

                <path class="water" fill="#66FFE6" stroke="#66FFE6" :d="wavePath"
                    style="z-index: -1; position: relative; opacity: 0.65;" />
                <path class="water" fill="url(#water-body)" :d="wavePath" style="z-index: 0; position: relative;" />

                <g mask="url(#water-mask)"
                    style="mix-blend-mode: screen; filter: url(#caustic-blur); opacity: 0.75; position: relative;z-index: -2;">
                    <ellipse v-for="i in 3" class="caustic" ref="causticRefs" :cx="300 * i"
                        :cy="Math.random() * 100 + 800" :rx="Math.random() * 50 + 150" :ry="Math.random() * 10 + 30"
                        fill="url(#caustic-glow)" />
                </g>

                <path :d="wavePath" id="highlightRef" fill="none" stroke="url(#surface-glow)" stroke-width="3.5"
                    filter="url(#surface-blur)" style="mix-blend-mode: screen" opacity="0.85" />
            </svg>

            <div class="bubbles" ref="bubblesContainer" id="bubbles"></div>
        </div>
    </div>
</template>

<style scoped>
.side-water {
    pointer-events: none;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

.water-svg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 200%;
    height: 100%;
}

.side-water-inner {
    height: 100%;
    width: 100%;
}

.bubbles {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
}

:global(.bubble) {
    position: absolute;
    opacity: 0;
    bottom: 0;
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    will-change: transform, opacity;

    background:
        radial-gradient(circle at 32% 28%,
            rgba(255, 255, 255, 0.98) 0%,
            rgba(255, 255, 255, 0.55) 6%,
            rgba(255, 255, 255, 0.1) 14%,
            transparent 22%),
        radial-gradient(circle at 50% 50%,
            transparent 52%,
            rgba(200, 230, 250, 0.2) 72%,
            rgba(255, 255, 255, 0.55) 90%,
            rgba(255, 255, 255, 0.85) 100%),
        radial-gradient(circle at 50% 85%,
            rgba(180, 220, 245, 0.35) 0%,
            transparent 45%);

    border: 1px solid rgba(255, 255, 255, 0.55);

    box-shadow:
        inset 0 -2px 3px rgba(140, 190, 225, 0.35),
        inset 0 2px 3px rgba(255, 255, 255, 0.6),
        0 0 10px rgba(200, 230, 250, 0.35);

    backdrop-filter: blur(0.8px);
    -webkit-backdrop-filter: blur(0.8px);
}
</style>