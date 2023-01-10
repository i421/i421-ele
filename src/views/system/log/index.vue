<template>
  <div>
    <vxe-grid v-bind="gridOptions"> </vxe-grid>
  </div>
</template>

<script setup>
  import { reactive, onBeforeMount } from 'vue';
  import { getLogPage } from '@/api/system/log';
  import XEUtils from 'xe-utils';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  // 表格: 配置
  const gridOptions = reactive({
    ref: 'xTable',
    loading: false,
    toolbarConfig: {
      custom: true,
      print: true,
      export: true,
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      items: [
        {
          field: 'title',
          title: t('logPage.title'),
          span: 8,
          titlePrefix: {
            message: t('modal.input.placeholder') + t('logPage.title'),
            icon: 'vxe-icon-question-circle-fill',
          },
          itemRender: {
            name: '$input',
            props: { placeholder: t('modal.input.placeholder') + t('logPage.title') },
          },
        },
        {
          span: 24,
          align: 'center',
          collapseNode: false,
          itemRender: {
            name: '$buttons',
            children: [
              { props: { type: 'submit', content: t('btn.search'), status: 'primary' } },
              { props: { type: 'reset', content: t('btn.reset') } },
            ],
          },
        },
      ],
    },
    printConfig: {},
    exportConfig: {},
    pagerConfig: {
      currentPage: 1,
      pageSize: 10,
    },
    proxyConfig: {
      props: {
        result: 'items',
        total: 'total',
      },
      form: true,
      page: true,
      ajax: {
        query: ({ page, form }) => {
          const conds = [];
          const data = {
            page: page.currentPage,
            pageSize: page.pageSize,
          };
          return getLogPage(data).then((res) => {
            const { items, total } = res.data;
            return { items, total };
          });
        },
      },
    },
    columns: [
      { type: 'seq', title: t('table.seq'), width: 80 },
      { field: 'user_id', title: t('logPage.user_id') },
      { field: 'title', title: t('logPage.title') },
      { field: 'operation', title: t('logPage.operation') },
      { field: 'ip', title: t('logPage.ip') },
      {
        field: 'createTime',
        title: t('table.created'),
        formatter({ cellValue }) {
          return XEUtils.toDateString(cellValue * 1000, 'yyyy-MM-dd HH:mm:ss');
        },
        showOverflow: true,
        width: 200,
      },
    ],
  });

  // 请求
  onBeforeMount(() => {
    // todo
  });
</script>

<style lang="scss" scoped>
  :deep(.vxe-buttons--wrapper) {
    padding: 0 5px;
  }
  :deep(.vxe-tools--operate) {
    padding: 0 5px;
  }
</style>
