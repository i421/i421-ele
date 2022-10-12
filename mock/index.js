const prefix = 'http://www.baidu.com';
const list = [
  {
    title: 'Vite 中文',
    desc: '下一代前端开发与构建工具',
    url: 'https://cn.vitejs.dev/',
    logo: 'index/vite.svg',
  },
  {
    title: 'Vue3 文档',
    desc: '渐进式JavaScript框架vue3中文文档',
    url: 'https://vue3js.cn/docs/zh/',
    logo: 'logo.png',
  },
  {
    title: 'ElementPlus',
    desc: '一套基于 Vue 3.0 的桌面端组件库',
    url: 'https://element-plus.gitee.io/#/zh-CN/component/installation',
    logo: 'index/element+.svg',
  },
  {
    title: 'Iconpark',
    desc: '2400+基础图标，29种图标分类，提供更多的选择',
    url: 'https://iconpark.oceanengine.com/home',
    logo: 'index/iconpark.svg',
  },
  {
    title: 'Echarts5.0',
    desc: '一个基于 JavaScript 的开源可视化图表库',
    url: 'https://echarts.apache.org/zh/index.html',
    logo: 'index/echarts.png',
  },
];

const orderList = [
  {
    key: 'planned',
    value: 5021,
    status: 'primary',
  },
  {
    key: 'finished',
    value: 3204,
    status: 'success',
  },
  {
    key: 'unfinished',
    value: 1817,
    status: 'error',
  },
];

const skillList = [
  {
    title: 'JavaScript',
    percentage: 50,
    color: '#67c23a',
  },
  {
    title: 'CSS',
    percentage: 70,
    color: '',
  },
  {
    title: 'Vue',
    percentage: 80,
    color: '#f56c6d',
  },
];

export default [
  {
    url: '/api/getResouceList',
    type: 'get',
    response() {
      return { code: 200, msg: 'success', data: { list, prefix, orderList, skillList } };
    },
  },
];
