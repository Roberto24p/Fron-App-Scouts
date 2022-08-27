import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { useUsersStore } from '../store/user-store'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const publicPages = [
    '/login'
  ]
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  Router.beforeEach(async (to, from, next) => {
    console.log(to)
    const userStore = useUsersStore()
    const requireAuth = to.meta.auth
    if(requireAuth){
      //validar
      await userStore.validateToken()
      console.log(userStore.token)
      if(userStore.token){
        const roles = to.meta.roles
        console.log(roles)
        let validate = roles.find(r => r == userStore.role)
        if(validate == undefined){
          next('/fdsfd')
        }
        return next()
      }

      return next('/login')
    }
    next()
    console.log(to.path != '/login')
    if (token == null && to.path != '/login') {
      console.log('Ir a login')
      if (to.path == '/register') {
        console.log('ir a register')
        next({ path: '/register', name: 'register' })

      } next({ path: '/login', name: 'login' })
    } else {
      next()
      console.log('Hola mundo2')
    }

  })

  return Router
})
