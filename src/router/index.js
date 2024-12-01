import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import useRequests from '@/stores/volunteer-requests';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    ...routes,
  ],
})

router.beforeEach(async (to, from, next) => {
  const {getRequestById} = useRequests()
  if (to.name === 'request-for-volunteering') {
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
  } else {
    next();
  }
});

export default router
