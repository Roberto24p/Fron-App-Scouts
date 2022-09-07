
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/Index.vue'),
        meta: { auth: true, roles: [1, 3, 4, 5, 6] }
      },
      {
        path: '/group', component: () => import('pages/Groups.vue'), name: 'group',
        meta: { auth: true, roles: [1] }
      },
      {
        path: '/directing', component: () => import('pages/Directing.vue'), name: 'directing',
        meta: { auth: true, roles: [1] }
      },
      {
        path: '/scout', component: () => import('pages/Scout.vue'), name: 'scout',
        meta: { auth: true, roles: [1, 4, 5] }
      },
      {
        path: '/unit', component: () => import('pages/Unit.vue'), name: 'unit',
        meta: { auth: true, roles: [1, 4] }
      },
      {
        path: '/period', component: () => import('pages/Period.vue'), name: 'period',
        meta: { auth: true, roles: [1, 3] }
      },
      {
        path: '/advancePlan', component: () => import('pages/AdvancePlan.vue'), name: 'advancePlan',
        meta: { auth: true, roles: [1] }
      },
      {
        path: '/advancePlanDetails/:idAdvancePlan', component: () => import('pages/AdvancePlanDetails.vue'), name: 'advancePlanDetails',
        meta: { auth: true, roles: [1] }
      },
      {
        path: '/advancePlanEdit/:idAdvancePlan', component: () => import('pages/AdvancePlanEdit.vue'), name: 'AdvancePlanEdit',
        meta: { auth: true, roles: [1] }
      },
      {
        path: '/profile', component: () => import('pages/Profile.vue'), name: 'Profile',
        meta: { auth: true, roles: [1, 3, 4, 5, 6] }
      },
      {
        path: '/profileEdit', component: () => import('pages/ProfileEdit.vue'), name: 'ProfileEdit',
        meta: { auth: true, roles: [1, 4, 5, 6] }
      },
      {
        path: '/inscriptionScout', component: () => import('pages/InscriptionScout.vue'), name: 'InscriptionScout',
        meta: { auth: true, roles: [1, 6] }
      },
      {
        path: '/advancePlanScout/:scoutId', component: () => import('pages/AdvancePlanScout.vue'), name: 'AdvancePlanScout',
        meta: { auth: true, roles: [1, ,4,5] }
      },
      {
        path: '/inscription', component: () => import('pages/Inscription.vue'), name: 'Inscription',
        meta: { auth: true, roles: [1, 3] }
      },
      {
        path: '/team', component: () => import('pages/Teams.vue'), name: 'team',
        meta: { auth: true, roles: [1, 2, 4, 5] }
      },
      {
        path: '/teamScouts', component: () => import('pages/TeamScout.vue'), name: 'teamScouts',
        meta: { auth: true, roles: [1] }
      },
      {
        path: '/user', component: () => import('pages/User.vue'), name: 'user',
        meta: { auth: true, roles: [1] }
      },
      {
        path: '/range', component: () => import('pages/Range.vue'), name: 'range',
        meta: { auth: true, roles: [1] }
      },
      {
        path: '/unauthorized', component: () => import('pages/Unauthorized.vue'), name: 'Unauthorized',
        meta: { auth: true, roles: [2, 3, 4, 5, 6] }
      },
      {
        path: '/reports/periods', component: () => import('pages/reports/inscriptionsReports.vue'), name: 'ReportPeriods',
        meta: {auth: true, roles: [1, 2, 3]}
      }

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
        next({ path: '/profile' })
      next()
    }
  },
  ,
  {
    path: '/recoverpassword',
    name: 'recoverpassword',
    component: () => import('pages/RecoverPassword.vue')
  }
]

export default routes
