import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalizedGeneric,
  type RouteLocationNormalizedLoadedGeneric
} from 'vue-router'
import { checkLogin } from '../api/auth'

const routes = [
  {
    path: '/',
    component: () => import('../layouts/BaseLayout.vue'),
    children: [
      {
        path: '',
        meta: { title: 'Главная' },
        component: () => import('../../pages/home/HomePage.vue')
      },
      {
        path: 'notes',
        meta: { title: 'Мои заметки' },
        component: () => import('../../pages/notes/NotesPage.vue'),
        beforeEnter: async (
          to: RouteLocationNormalizedGeneric,
          from: RouteLocationNormalizedLoadedGeneric,
          next: NavigationGuardNext
        ) => {
          const check = await checkLogin()

          if (check === 'logout') next('')
          if (check === 'continue') next()
        }
      }
    ]
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title as string
  next()
})
