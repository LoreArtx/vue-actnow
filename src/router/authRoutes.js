import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

const authRoutes = [
    {
      path: '/profile',
      name: 'profile',
      component: ()=>import('@/views/Profile.vue'),
      meta:{layout:DefaultLayout}
    },
    {
      path: '/create-request',
      name: 'create-request',
      component: ()=>import('@/views/CreateRequest.vue'),
      meta:{layout:DefaultLayout}
    },
    {
      path:'/request-for-volunteering/:id/settings',
      name:'request-for-voluenteering-settings',
      component:()=>import('@/views/RequestSettings.vue'),
      meta:{layout:DefaultLayout}
    }
]

export default authRoutes