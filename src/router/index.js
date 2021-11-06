import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from "../views/LoginPage";
import Strategies from "../views/Strategies";
import store from './../store/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Strategies',
    component: Strategies,
    meta: {
        requiresAuth: true,
      }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: {
        requiresAuth: false,
      }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) =>
{
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check the login status if the requested page is protected
    if (!store.getters.isLoggedIn) {
        //Route to non protected login page
        next({
          path: '/login'
        })
      }
    else
    {
      next();
    }
  }
  else
  {
    next();
  }
})

export default router
