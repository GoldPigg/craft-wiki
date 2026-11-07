export default function () {
    const height = ref(0), width = ref(0)
    const update = () => {
        height.value = window.innerHeight
        width.value = window.innerWidth
    }

    onMounted(() => {
        update()
        window.addEventListener('resize', update)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', update)
    })

    return {height, width}
}