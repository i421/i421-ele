const data = [
  {
    path: '/index',
    meta: {
      title: '首页',
      icon: 'icon-home',
    },
  },
  {
    path: '/errorPage',
    meta: {
      title: '错误页面',
      icon: 'icon-link-cloud-faild',
    },
    children: [
      {
        path: '/404Page',
        meta: {
          title: '404',
          icon: 'icon-link-cloud-faild',
        },
      },
      {
        path: '/401Page',
        meta: {
          title: '401',
          icon: 'icon-link-interrupt',
        },
      },
    ],
  },
];
export default [
  {
    url: '/api/menu/navigate',
    type: 'post',
    response() {
      return { code: 200, msg: 'success', data: data };
    },
  },
];
