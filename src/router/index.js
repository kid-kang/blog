import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/Home.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/share',
      name: 'share',
      // route level code-splitting
      // this generates a separate chunk (Share.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Share.vue')
    },
    {
      path: '/dynamic',
      name: 'dynamic',
      // route level code-splitting
      // this generates a separate chunk (Dynamic.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Dynamic.vue')
    },
    {
      path: '/discuss',
      name: 'discuss',
      // route level code-splitting
      // this generates a separate chunk (Discuss.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Discuss.vue')
    },
    {
      path: '/friendLink',
      name: 'friendLink',
      // route level code-splitting
      // this generates a separate chunk (FriendLink.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FriendLink.vue')
    },
    {
      path: '/feedback',
      name: 'feedback',
      // route level code-splitting
      // this generates a separate chunk (Feedback.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Feedback.vue')
    },
    {
      path: '/updateUser',
      name: 'updateUser',
      // route level code-splitting
      // this generates a separate chunk (Discuss.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UpdateUser.vue')
    },
  ]
});

router.afterEach(() => {
  document.documentElement.scrollTop = 0;
});

export default router;
