import Vue from "vue"
import Router from "vue-router"
import mainRouter from "./mainRouter"

Vue.use(Router)

const router = new Router({
  mode: "history",
  base: '/function/',
  routes: mainRouter,
})

export default router
