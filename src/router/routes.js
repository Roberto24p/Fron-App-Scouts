
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      {
        path: '/group', component: () => import('pages/Groups.vue'), name: 'group',
        meta: { auth: true, roles: [6] }
      },
      {
        path: '/directing', component: () => import('pages/Directing.vue'), name: 'directing',
        meta: { auth: true }
      },
      {
        path: '/scout', component: () => import('pages/Scout.vue'), name: 'scout',
        meta: { auth: true }
      },
      {
        path: '/unit', component: () => import('pages/Unit.vue'), name: 'unit',
        meta: { auth: true, roles: [6] }
      },
      {
        path: '/period', component: () => import('pages/Period.vue'), name: 'period',
        meta: { auth: true }
      },
      {
        path: '/advancePlan', component: () => import('pages/AdvancePlan.vue'), name: 'advancePlan',
        meta: { auth: true }
      },
      {
        path: '/advancePlanDetails/:idAdvancePlan', component: () => import('pages/AdvancePlanDetails.vue'), name: 'advancePlanDetails',
        meta: { auth: true }
      },
      {
        path: '/advancePlanEdit/:idAdvancePlan', component: () => import('pages/AdvancePlanEdit.vue'), name: 'AdvancePlanEdit',
        meta: { auth: true }
      },
      {
        path: '/profile', component: () => import('pages/Profile.vue'), name: 'Profile',
        meta: { auth: true, roles: [6] }
      },
      {
        path: '/profileEdit', component: () => import('pages/ProfileEdit.vue'), name: 'ProfileEdit',
        meta: { auth: true }
      },
      {
        path: '/inscriptionScout', component: () => import('pages/InscriptionScout.vue'), name: 'InscriptionScout',
        meta: { auth: true }
      },
      {
        path: '/advancePlanScout/:scoutId', component: () => import('pages/AdvancePlanScout.vue'), name: 'AdvancePlanScout',
        meta: { auth: true }
      },
      {
        path: '/inscription', component: () => import('pages/Inscription.vue'), name: 'Inscription',
        meta: { auth: true }
      },
      {
        path: '/team', component: () => import('pages/Teams.vue'), name: 'team',
        meta: { auth: true }
      },
      {
        path: '/teamScouts', component: () => import('pages/TeamScout.vue'), name: 'teamScouts',
        meta: { auth: true }
      },
      {
        path: '/user', component: () => import('pages/User.vue'), name: 'user',
        meta: { auth: true, roles: [6] }
      },

    ]
  },
  {
    path: '/register',
    component: () => import('pages/Register.vue'),
    name: 'register'
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login.vue'),
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem('token')
      if (token != null)
        next({ path: '/' })
      next()
    }
  }
]

export default routes
