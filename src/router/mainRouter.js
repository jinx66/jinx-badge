const mainRouter = [
  {
    path: "*",
    redirect: "/badges",
  },
  {
    path: "/badges",
    name: "Badges",
    component: () => import("@/views/badges.vue"),
  },
  {
    path: "/test",
    name: "Test",
    component: () => import("@/views/test.vue"),
  },
];

export default mainRouter;
