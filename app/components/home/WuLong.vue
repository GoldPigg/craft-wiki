<script setup lang="ts">
const props = defineProps<{
    height: string,
}>()

const model = defineModel<{ progress: number, changedByDrag: boolean }>()
const dragged = defineModel<boolean>('dragged')

const { $gsap, $Draggable } = useNuxtApp()

const dragonBallContainerRef = useTemplateRef<HTMLDivElement>('dragon-ball-container')
const dragonBallRef = useTemplateRef<HTMLDivElement>('dragon-ball')

const width = computed<number>(() => (dragonBallContainerRef.value?.clientWidth ?? 0) - (dragonBallRef.value?.clientWidth ?? 0))

watch(model, (v) => {
    if (!v || v.changedByDrag) return
    const x = v.progress * width.value
    $gsap.set(['.dragon', '.dragon-ball'], { x: x })
}, { deep: true })

useGsap(() => {
    $gsap.to('.dragon-part', {
        y: '20%',
        duration: 0.3,
        ease: 'power1.inOut',
        stagger: {
            yoyo: true,
            repeat: -1,
            amount: 0.6,
        },
    })
    $gsap.to('.dragon-ball', {
        y: '5%',
        duration: 1,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1,
    })
    $Draggable.create('.dragon-ball', {
        type: 'x',
        inertia: true,
        throwResistance: 2000,
        maxDuration: 1.5,
        overshootTolerance: 0,
        bounds: ".dragon-ball-container",
        onDrag: function () {
            dragged.value = true
            if (model.value) model.value.progress = this.x / width.value, model.value.changedByDrag = true
            $gsap.set(".dragon", { x: this.x, delay: this.deltaX > 0 ? 0.1 : 0 })
        },
        onThrowUpdate: function () {
            dragged.value = true
            if (model.value) model.value.progress = this.x / width.value, model.value.changedByDrag = true
            $gsap.set(".dragon", { x: this.x, delay: this.deltaX > 0 ? 0.1 : 0 })
        },
        onThrowComplete: function () {
            dragged.value = false
        }
    })
})
</script>

<template>
    <div :style="{ height: height }" class="wulong">
        <div class="dragon">
            <img class="dragon-part" draggable="false" src="../../assets/svg/dragon-tail.svg" />
            <img v-for="i in 7" class="dragon-part" draggable="false"
                src="../../assets/svg/dragon-body.svg" />
            <img class="dragon-part" draggable="false" src="../../assets/svg/dragon-head.svg" />
        </div>
        <div class="dragon-ball-container" ref="dragon-ball-container">
            <img class="dragon-ball" ref="dragon-ball" draggable="false"
                src="../../assets/svg/dragon-ball.svg" />
        </div>
    </div>
</template>

<style>
.wulong {
    overflow: hidden;
    display: flex;
    position: relative;
    width: 100%;
}

.dragon {
    position: relative;
}

.dragon-part {
    position: relative;
}

.dragon-ball-container {
    flex-grow: 1;
}

img {
    height: 100%;
}
</style>