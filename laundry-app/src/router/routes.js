
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/client',
    component: () => import('pages/Client.vue'),
    name: 'client',
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/request',
    component: () => import('pages/Request.vue'),
    name: 'request',
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/account',
    component: () => import('pages/Account.vue'),
    name: 'account',
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/itemCost',
    component: () => import('pages/ItemCost.vue'),
    name: 'itemCost',
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
