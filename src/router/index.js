import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import useRequests from '@/stores/volunteer-requests';
import { isAuth } from '@/plugins/auth';
import authRoutes from './authRoutes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    ...routes,
    ...authRoutes
  ],
})

router.beforeEach(async (to, from, next) => {
  const {getRequestById} = useRequests()
  if (to.name === 'request-for-volunteering' || to.name === 'request-for-voluenteering-settings') {
    const requestId = to.params.id;
    try {
      const request = await getRequestById(requestId) 

      if (!request) {
        return next({ name: 'home' });
      }
      to.meta.request = request
      next();
    } catch (error) {
      console.error(error);
      next({ name: 'home' });
    }
  } else if(!isAuth.value && authRoutes.some(route => route.path === to.path)){
      return next({name:'sign-in'})
  } else {
    next();
  }
});

export default router
