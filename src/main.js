import { createApp } from 'vue';

// permission 权限文件
import './config/permission';

// element
import 'element-plus/theme-chalk/display.css';
import App from './App.vue';
const app = createApp(App);

// vxe-table
import 'xe-utils';
import VXETable from 'vxe-table';
import VXETablePluginElement from 'vxe-table-plugin-element';
import 'vxe-table-plugin-element/dist/style.css';
import 'vxe-table/lib/style.css';
VXETable.use(VXETablePluginElement);

// VXETable全局配置
VXETable.setup({
  size: 'medium', // 全局尺寸
  table: {
    border: true,
    resizable: true, // 列是否允许拖动列宽调整大小
    showOverflow: true, // 当内容过长时显示为省略号
    highlightHoverRow: true, // 鼠标移到行是否要高亮显示
    highlightCurrentRow: true, // 是否要高亮当前行
    scrollY: {
      // 纵向虚拟滚动配置（不支持深层结构和展开行）
      rHeight: 36, // 当启用虚拟滚动后，该参数用于设置每一行的固定高度
    },
  },
  pager: {
    size: null,
    autoHidden: false,
    perfect: true,
    pageSize: 10,
    pagerCount: 5,
    pageSizes: [10, 20, 50, 100],
    layouts: [
      'PrevJump',
      'PrevPage',
      'Jump',
      'PageCount',
      'NextPage',
      'NextJump',
      'Sizes',
      'Total',
    ],
  },
});
app.use(VXETable);

import { VueClipboard } from '@soerenmartius/vue3-clipboard';
app.use(VueClipboard);

// layout components
import layoutComp from './layouts/components/export';
layoutComp(app);

// router
import router from './router/index';
app.use(router);

// vuex
import store from '@/store';
app.use(store);

// 按需注册方式
// import elementPlus from './plugin/el-comp';
// 注册 elementPlus组件/插件
// elementPlus(app);
// // 完整引入

// 注册字节跳动图标
import iconPark from './plugin/icon-park';
iconPark(app);

import loadI18n from './plugin/i18n';
loadI18n(app);

app.mount('#app');
