import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layouts/index.vue';
import i18n from '@/locales';
const { global } = i18n;
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: '/index',
    name: 'Root',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index/index.vue'),
        meta: {
          title: global.t('route.home'),
          icon: 'icon-home',
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
    hidden: true,
  },
  {
    path: '/errorPage',
    name: 'ErrorPage',
    component: Layout,
    meta: {
      title: global.t('route.errorPages'),
      icon: 'icon-link-cloud-faild',
    },
    children: [
      {
        path: '/404Page',
        name: '404Page',
        component: () => import('@/views/errorPage/404.vue'),
        meta: {
          title: global.t('route.page404'),
          icon: 'icon-link-cloud-faild',
        },
      },
      {
        path: '/401Page',
        name: '401Page',
        component: () => import('@/views/errorPage/401.vue'),
        meta: {
          title: global.t('route.page401'),
          icon: 'icon-link-interrupt',
        },
      },
    ],
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: '/dashboard',
    name: 'DashboardPage',
    component: Layout,
    meta: {
      title: global.t('route.dashboard.dashboardPage'),
      icon: 'icon-dashboard',
    },
    children: [
      {
        path: '/dashboard/workbench',
        name: 'dashboardWorkbench',
        component: () => import('../views/dashboard/workbench/index.vue'),
        meta: {
          title: global.t('route.dashboard.workbench'),
          icon: 'icon-dashboard',
        },
      },
      {
        path: '/dashboard',
        name: 'dashboardAnalysis',
        component: () => import('../views/dashboard/analysis/index.vue'),
        meta: {
          title: global.t('route.dashboard.analysis'),
          icon: 'icon-analysis',
        },
      },
    ],
  },
  {
    path: '/system',
    name: 'SystemPage',
    component: Layout,
    meta: {
      title: global.t('route.system.systemPage'),
      icon: 'icon-link-cloud-faild',
    },
    children: [
      {
        path: '/system/dept',
        name: 'SystemDept',
        component: () => import('../views/system/dept/index.vue'),
        meta: {
          title: global.t('route.system.dept'),
          icon: 'icon-all-application',
        },
      },
      {
        path: '/system/account',
        name: 'SystemAccount',
        component: () => import('../views/system/account/index.vue'),
        meta: {
          title: global.t('route.system.account'),
          icon: 'icon-user',
        },
      },
      {
        path: '/system/role',
        name: 'SystemRole',
        component: () => import('../views/system/role/index.vue'),
        meta: {
          title: global.t('route.system.role'),
          icon: 'icon-user',
        },
      },
      {
        path: '/system/menu',
        name: 'SystemMenu',
        component: () => import('../views/system/menu/index.vue'),
        meta: {
          title: global.t('route.system.menu'),
          icon: 'icon-application-menu',
        },
      },
      {
        path: '/system/dict',
        name: 'SystemDict',
        component: () => import('../views/system/dict/index.vue'),
        meta: {
          title: global.t('route.system.dict'),
          icon: 'icon-config',
        },
      },
      {
        path: '/system/log',
        name: 'SystemLog',
        component: () => import('../views/system/log/index.vue'),
        meta: {
          title: global.t('route.system.log'),
          icon: 'icon-log',
        },
      },
      {
        path: '/system/changePassword',
        name: 'SystemPassword',
        component: () => import('../views/system/password/index.vue'),
        meta: {
          title: global.t('route.system.password'),
          icon: 'icon-key',
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
