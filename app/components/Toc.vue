<script setup lang="ts">
import type { TocItem } from '~~/shared/markdown'

const props = defineProps<{ items: TocItem[] }>()

const visibleItems = computed(() =>
    props.items.filter(i => i.depth > 1 && i.depth <= 3)
)

const activeId = ref('')

onMounted(() => {
    if (!visibleItems.value.length) return

    const headings = visibleItems.value
        .map(i => document.getElementById(i.id))
        .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
        (entries) => {
            const visible = entries
                .filter(e => e.isIntersecting)
                .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
            if (visible[0]) activeId.value = visible[0].target.id
        },
        { rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    )

    headings.forEach(h => observer.observe(h))
    onBeforeUnmount(() => observer.disconnect())
})

function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
    <nav class="toc">
        <p class="toc-title">本页目录</p>
        <ul>
            <li v-for="item in visibleItems" :key="item.id"
                :class="[`depth${item.depth}`, { active: activeId === item.id }]">
                <a :href="`#${item.id}`" @click.prevent="scrollTo(item.id)">
                    {{ item.text }}
                </a>
            </li>
        </ul>
    </nav>
</template>

<style scoped>

.toc {
    width: var(--toc-width);
}

.toc-title {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-text-muted);
    margin-bottom: var(--space2);
}

.toc ul {
    list-style: none;
    padding: 0;
    border-left: var(--border-width) solid var(--color-border);
}

.toc li a {
    display: block;
    padding: var(--space1) var(--space3);
    font-size: var(--text-sm);
    color: var(--color-text-muted);
    text-decoration: none;
    border-left: 2px solid transparent;
    margin-left: -1px;
    transition: color 0.15s, border-color 0.15s;
}

.toc li a:hover {
    color: var(--color-text-primary);
}

.toc li.active a {
    color: var(--color-primary);
    border-left-color: var(--color-primary);
}

.depth2 {
    padding-left: var(--space3);
}

.depth3 {
    padding-left: var(--space6);
}
</style>