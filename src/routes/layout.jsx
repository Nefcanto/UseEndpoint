import { component$, Slot } from '@builder.io/qwik'

const Layout = component$(() => {
    return <>
        <Slot />
    </>
})

export default Layout
