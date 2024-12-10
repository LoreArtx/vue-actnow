import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: ()=> import('@/views/Home.vue'),
      meta:{layout:DefaultLayout}
    },
    {
      path: '/about',
      name: 'about',
      component: ()=>import('@/views/About.vue'),
      meta:{layout:DefaultLayout}
    },
    {
      path: '/why-trust-us',
      name: 'why-trust-us',
      component: ()=>import('@/views/WhyTrustUs.vue'),
      meta:{layout:DefaultLayout}
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: ()=>import('@/views/SignIn.vue'),
      meta:{layout:AuthLayout}
    },
    {
      path:'/sign-up',
      name:'sign-up',
      component: ()=>import('@/views/SignUp.vue'),
      meta:{layout:AuthLayout}
    },
    {
      path:'/all-requests',
      name:'all-requests',
      component: ()=>import('@/views/AllRequests.vue'),
      meta:{layout:DefaultLayout}
    },
    {
      path:'/request-for-volunteering/:id',
      name:'request-for-volunteering',
      component:()=>import('@/views/VolunteerRequest.vue'),
      meta:{layout:DefaultLayout}
    }
  ]

export default routes