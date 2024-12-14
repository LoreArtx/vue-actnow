import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

const authRoutes = [
    {
      path: '/profile',
      name: 'profile',
      component: ()=>import('@/views/Profile.vue'),
      meta:{layout:DefaultLayout}
    },
    {
      path:'/become-volunteer',
      name:'become-volunteer',
      component: ()=>import('@/views/BecomeVolenteer.vue'),
      meta:{layout:DefaultLayout}
    },
]

export default authRoutes