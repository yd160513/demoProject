import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    { path: '/', component: () => import('../components/HelloWorld.vue') },
    {
        path: "/three",
        name: "Three",
        component: () =>
            import("../components/Three.vue")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
