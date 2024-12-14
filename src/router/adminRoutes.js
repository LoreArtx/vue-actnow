import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

const adminRoutes = [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: ()=>import('@/views/Dashboard.vue'),
      meta:{layout:DefaultLayout}
    },
]

export default adminRoutes