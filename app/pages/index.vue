<script setup lang="ts">
import FloatingButton from '~/components/FloatingButton.vue';
import Book from '~/components/home/sections/Book.vue';
import Dance from '~/components/home/sections/Dance.vue';
import Music from '~/components/home/sections/Music.vue';
import Welcome from '~/components/home/sections/Welcome.vue';
import WuLong from '~/components/home/sections/WuLong.vue';
import useGsap from '~/composables/useGsap';
import { isCompactViewport, prefersReducedMotion } from '~/utils/viewport';

definePageMeta({ layout: 'home' })
const { $ScrollSmoother, $gsap } = useNuxtApp()

function setupCompactReveals() {
    if (prefersReducedMotion()) return

    // 移动端只做一次性入场：淡入 + 20px 上移，不做 pin / scrub
    $gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        $gsap.from(el, {
            y: 22,
            opacity: 0,
            duration: 0.55,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 92%',
                once: true,
                toggleActions: 'play none none none',
            },
        })
    })
}

useGsap(async () => {
    // 手机/平板使用原生滚动，避免 ScrollSmoother 的固定层和重绘开销
    if (isCompactViewport()) {
        setupCompactReveals()
        return
    }

    $ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true,
    });
})

</script>

<template>
    <FloatingButton to="/wiki/intro/about" class="home-wiki-cta">
        进入wiki
    </FloatingButton>
    <div id="smooth-wrapper">
        <div id="smooth-content" class="home-smooth-content"
            style="user-select: none;background-color: #FDF2F0;">
            <Welcome class="section-1" />
            <Dance class="section-2" />
            <Book class="section-3" />
            <Music class="section-4" />
            <WuLong class="section-5" />
        </div>
    </div>
</template>

<style scoped>
.home-smooth-content {
    will-change: transform;
}

@keyframes home-cta-in {
    from {
        opacity: 0;
        transform: translate3d(0, -10px, 0);
    }

    to {
        opacity: 1;
        transform: none;
    }
}

.home-wiki-cta {
    top: 10px;
}

@media (max-width: 1023px) {
    .home-smooth-content {
        will-change: auto;
    }

    .home-wiki-cta {
        top: max(10px, env(safe-area-inset-top, 0px));
        right: max(12px, env(safe-area-inset-right, 0px));
        width: 8.5rem;
        height: 2.75rem;
        transform: none;
    }

    @media (prefers-reduced-motion: no-preference) {
        .home-wiki-cta {
            animation: home-cta-in 0.45s var(--ease-out) 0.2s both;
        }
    }

    .home-wiki-cta :deep(.ribbon-inner) {
        gap: 0.4rem;
        padding-right: 1rem;
    }

    .home-wiki-cta :deep(.text) {
        font-size: 0.875rem;
        letter-spacing: 0.08em;
    }

    .home-wiki-cta :deep(.arrow-icon) {
        width: 1rem;
        height: 1rem;
    }

    .home-wiki-cta :deep(.deco-cloud) {
        display: none;
    }
}
</style>