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
    path: "/index",
    name: "Index",
    component: () => import("@/views/index.vue"),
  },
];

export default mainRouter;
