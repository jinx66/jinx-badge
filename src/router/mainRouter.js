const mainRouter = [

  {
    path: "/badges",
    name: "Badges",
    component: () => import("@/views/badges.vue"),
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/index.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/test.vue"),
  },
  {
    path: "/svg",
    name: "Svg",
    component: () => import("@/views/svg.vue"),
  },
  {
    path: "*",
    redirect: "/index",
  },
];

export default mainRouter;
