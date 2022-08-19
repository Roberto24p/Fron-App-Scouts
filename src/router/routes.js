
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/group', component: () => import('pages/Groups.vue'), name: 'group'},
      { path: '/directing', component: () => import('pages/Directing.vue'), name: 'directing'},
      { path: '/scout', component: ()=> import('pages/Scout.vue'), name: 'scout'},
      { path: '/unit', component: ()=> import('pages/Unit.vue'), name: 'unit'},
      { path: '/period', component: ()=> import('pages/Period.vue'), name: 'period'},
      { path: '/advancePlan', component: ()=> import('pages/AdvancePlan.vue'), name: 'advancePlan'},
      { path: '/advancePlanDetails/:idAdvancePlan', component: ()=> import('pages/AdvancePlanDetails.vue'), name: 'advancePlanDetails'},
      { path: '/advancePlanEdit/:idAdvancePlan', component: ()=> import('pages/AdvancePlanEdit.vue'), name: 'AdvancePlanEdit'},
      { path: '/profile', component: ()=> import('pages/Profile.vue'), name: 'Profile'},
      { path: '/profileEdit', component: ()=> import('pages/ProfileEdit.vue'), name: 'ProfileEdit'},
      { path: '/inscriptionScout', component: ()=> import('pages/InscriptionScout.vue'), name: 'InscriptionScout'},
      { path: '/advancePlanScout', component: ()=> import('pages/AdvancePlanScout.vue'), name: 'AdvancePlanScout'},
      { path: '/inscription', component: ()=> import('pages/Inscription.vue'), name: 'Inscription'},

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
      if(token != null)
          next({path: '/' })
      next()
    }
  }
]

export default routes
