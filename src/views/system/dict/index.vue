<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button status="primary" @click="openAddModal">{{ t('btn.add') }}</vxe-button>
      </template>
      <!-- 字段列转换 -->
      <template #default_role="{ row }">
        <el-tag v-for="item in row.roles" :key="item.id"> {{ item.name }}</el-tag>
      </template>
      <template #operate="{ row }">
        <vxe-button type="text" icon="vxe-icon-edit" @click="editEvent(row)"></vxe-button>
        <vxe-button
          type="text"
          icon="vxe-icon-delete"
          @click="removeEvent(row)"
          status="danger"
        ></vxe-button>
      </template>
    </vxe-grid>

    <vxe-modal
      v-model="gridOptions.showEdit"
      :title="
        gridOptions.selectRow ? t('modal.title.editAndStore') : t('modal.title.createAndStore')
      "
      width="500"
      min-width="400"
      min-height="300"
      :loading="gridOptions.submitLoading"
      esc-closable
      show-zoom
      resize
      destroy-on-close
    >
      <template #default>
        <vxe-form
          :data="gridOptions.formData"
          :rules="gridOptions.formRules"
          title-align="right"
          title-width="100"
          @submit="submitEvent"
        >
          <vxe-form-item field="code" :title="t('dictPage.code')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model="data.code"
                :placeholder="t('modal.input.placeholder') + t('dictPage.code')"
                :disabled="gridOptions.formData.id != null"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="c_key" :title="t('dictPage.c_key')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model.number="data.c_key"
                :placeholder="t('modal.input.placeholder') + t('dictPage.c_key')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="value" :title="t('dictPage.value')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model.number="data.value"
                :placeholder="t('modal.input.placeholder') + t('dictPage.value')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="sort" :title="t('dictPage.sort')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model.number="data.sort"
                :placeholder="t('modal.input.placeholder') + t('dictPage.sort')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="remark" :title="t('dictPage.remark')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model.number="data.remark"
                :placeholder="t('modal.input.placeholder') + t('dictPage.remark')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item align="center" title-align="left" :span="24">
            <template #default>
              <vxe-button status="primary" type="submit">{{ t('btn.submit') }}</vxe-button>
              <vxe-button @click="closeModal">{{ t('btn.cancel') }}</vxe-button>
            </template>
          </vxe-form-item>
        </vxe-form>
      </template>
    </vxe-modal>
  </div>
</template>

<script setup>
  import { ref, reactive, onBeforeMount } from 'vue';
  import { getDictPage, updateDict, deleteDict, storeDict } from '@/api/system/dict';
  import patternRule from '@/utils/patternRule';
  import { VXETable } from 'vxe-table';
  import { useI18n } from 'vue-i18n';
  import XEUtils from 'xe-utils';

  const { t } = useI18n();

  const xTable = ref(null);

  const roleList = ref([]);

  // 表格: 配置
  const gridOptions = reactive({
    ref: 'xTable',
    loading: false,
    toolbarConfig: {
      custom: true,
      slots: {
        buttons: 'toolbar_buttons',
      },
      print: true,
      export: true,
    },
    showEdit: false,
    submitLoading: false,
    selectRow: null,
    formData: {
      id: null,
      code: null,
      c_key: null,
      value: null,
      sort: null,
      remark: null,
    },
    formRules: {
      code: [
        { required: true, message: t('dictPage.code') + t('modal.form.require') },
        { min: 4, max: 20, message: t('dictPage.code') + t('modal.form.between4_20') },
      ],
      sort: [
        {
          type: 'number',
          min: 0,
          max: 999,
          message: t('dictPage.sort') + t('modal.form.between0_999'),
        },
      ],
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      items: [
        {
          field: 'code',
          title: t('dictPage.code'),
          span: 8,
          titlePrefix: {
            message: t('modal.input.placeholder') + t('dictPage.code'),
            icon: 'vxe-icon-question-circle-fill',
          },
          itemRender: {
            name: '$input',
            props: { placeholder: t('modal.input.placeholder') + t('dictPage.code') },
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
      rules: {
        name: [{ max: 20, message: t('modal.form.max20') }],
      },
    },
    printConfig: {},
    exportConfig: {},
    pagerConfig: {
      currentPage: 1,
      pageSize: 10,
    },
    treeConfig: {
      transform: true,
      parentField: 'parentId',
      rowField: 'id',
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
          const data = {
            page: page.currentPage,
            pageSize: page.pageSize,
          };
          return getDictPage(data).then((res) => {
            const { items, total } = res.data;
            return { items, total };
          });
        },
      },
    },
    columns: [
      { type: 'seq', title: t('table.seq'), width: 80 },
      { field: 'code', title: t('dictPage.code'), treeNode: true },
      { field: 'c_key', title: t('dictPage.c_key') },
      { field: 'value', title: t('dictPage.value') },
      { field: 'sort', title: t('dictPage.sort') },
      { field: 'remark', title: t('dictPage.remark') },
      {
        field: 'createTime',
        title: t('table.created'),
        formatter({ cellValue }) {
          return XEUtils.toDateString(cellValue * 1000, 'yyyy-MM-dd HH:mm:ss');
        },
        showOverflow: true,
        width: 200,
      },
      { title: t('table.operation'), showOverflow: true, slots: { default: 'operate' } },
    ],
  });

  // 新增用户
  const openAddModal = () => {
    gridOptions.formData = {
      id: null,
      code: '',
      c_key: '',
      value: '',
      sort: '',
      remark: '',
    };
    gridOptions.selectRow = null;
    gridOptions.showEdit = true;
  };

  // 删除
  const removeEvent = async (row) => {
    const type = await VXETable.modal.confirm(t('modal.confirm.content'));
    if (type === 'confirm') {
      deleteDict({ id: row.id }).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    }
  };

  // 编辑
  const editEvent = (row) => {
    gridOptions.formData = {
      id: row.id,
      code: row.code,
      c_key: row.c_key,
      value: row.value,
      sort: row.sort,
      remark: row.remark,
    };
    gridOptions.selectRow = row;
    gridOptions.showEdit = true;
  };

  // 关闭弹窗
  const closeModal = () => {
    gridOptions.showEdit = false;
  };

  // 提交更新
  const submitEvent = () => {
    if (gridOptions.formData.id) {
      // 更新
      updateDict(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    } else {
      // 新增
      storeDict(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    }
    gridOptions.selectRow = null;
    gridOptions.showEdit = false;
  };

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
