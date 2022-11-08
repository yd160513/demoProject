import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('../components/HelloWorld.vue') },
  //{
  //  path: "/three",
  //  name: "Three",
  //  component: () =>
  //    import("../components/Three.vue")
  //},
  //{
  //  path: "/demo",
  //  name: "Demo",
  //  component: () =>
  //    import("../components/ThreeDemo.vue")
  //},
  {
    path: "/three",
    name: "Three",
    component: () =>
      import("../views/three/demo.vue")
  },
  {
    path: "/threeDemo",
    name: "ThreeDemo",
    component: () =>
      import("../views/three/index.vue")
  },
  {
    path: "/threeDemo",
    name: "ThreeDemo",
    component: () =>
      import("../views/three/index.vue")
  }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router
