const mainRouter = [

  {
    path: "/badges",
    name: "Badges",
    component: () => import("@/views/badges.vue"),
  },
  {
    path: "/example",
    name: "Example",
    component: () => import("@/views/example.vue"),
  },
  {
    path: "/default",
    name: "Default",
    component: () => import("@/views/default.vue"),
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
    path: "/404",
    name: "notfound",
    component: () => import("@/views/notfound.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

export default mainRouter;
