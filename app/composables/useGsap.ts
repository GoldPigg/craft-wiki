
export default function (callback: () => void) {

    const { $gsap } = useNuxtApp()
    let ctx: gsap.Context | undefined;

    onMounted(() => {
        ctx = $gsap.context(callback)
    })

    onUnmounted(() => {
        ctx?.revert()
    })
}