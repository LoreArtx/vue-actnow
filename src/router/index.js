import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import useRequests from '@/stores/volunteer-requests';
import { isAuth, userToken } from '@/plugins/auth';
import authRoutes from './authRoutes';
import voluenteerRoutes from './volunteerRoutes';
import { jwtDecode } from 'jwt-decode';
import adminRoutes from './adminRoutes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    ...routes,
    ...authRoutes,
    ...voluenteerRoutes,
    ...adminRoutes
  ],
})

router.beforeEach(async (to, from, next) => {
  const {getRequestById} = useRequests()
  if (to.name === 'request-for-volunteering') 
  {
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
  }
  else if(to.name === 'request-for-voluenteering-settings')
  {
      const requestId = to.params.id;
      try {
        const request = await getRequestById(requestId) 

      if (jwtDecode(userToken.value).user.role !== 'admin' && (!request || request.author !== jwtDecode(userToken.value).user.organization)) {
          console.log(jwtDecode(userToken.value).user.role !== 'admin')
          alert("You have no access to modify that request")
          return next({ name: 'home' });
        }
        to.meta.request = request
        next();
    } catch (error) {
        console.error(error);
        next({ name: 'home' });
    }

  }
  else if(!isAuth.value && (authRoutes.some(route => route.path === to.path) || voluenteerRoutes.some(route => route.path === to.path)))
  {
    return next({name:'sign-in'})
  }
  else if(isAuth.value && jwtDecode(userToken.value).user.role !== 'volunteer' && voluenteerRoutes.some(route => route.path === to.path))
  {
    return next({name:'become-volunteer'})
  }
  else if(isAuth.value && jwtDecode(userToken.value).user.role !== 'admin' && to.name === "dashboard")
  {
    next({name:"home"});
  } 
  else
  {
    next();
  }
});

export default router
