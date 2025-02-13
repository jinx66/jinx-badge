const mainRouter = [
  // {
  //   path: "/",
  //   name: "Index",
  //   component: () => import("@/views/index.vue"),
  // },
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
  // {
  //   path: "*",
  //   redirect: "/index",
  // },
];

export default mainRouter;
