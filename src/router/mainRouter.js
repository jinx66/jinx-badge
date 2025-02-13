const mainRouter = [
  {
  path: "*",
  redirect: "/badges"
},
{
  path: "/badges",
  name: "Badges",
  component: () => import("@/views/badges.vue")
},]

export default mainRouter