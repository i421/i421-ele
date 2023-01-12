<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button status="primary" @click="openAddModal">{{ t('btn.add') }}</vxe-button>
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

    <!-- 表单编辑 -->
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
          <vxe-form-item field="name" :title="t('menuPage.name')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model="data.name"
                :placeholder="t('modal.input.placeholder') + t('menuPage.name')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="type" :title="t('menuPage.type')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-select v-model="data.type" transfer>
                <vxe-option
                  v-for="item in typeList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item field="status" :title="t('menuPage.status')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-select v-model="data.status" transfer>
                <vxe-option
                  v-for="item in statusList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item field="icon" :title="t('menuPage.icon')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model="data.icon"
                :placeholder="t('modal.input.placeholder') + t('menuPage.icon')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="pid" :title="t('menuPage.parentId')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-select v-model="data.parentId" transfer>
                <vxe-option
                  v-for="item in menuList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item field="path" :title="t('menuPage.path')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model="data.path"
                :placeholder="t('modal.input.placeholder') + t('menuPage.path')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="sort" :title="t('menuPage.sort')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model.number="data.sort"
                :placeholder="t('modal.input.placeholder') + t('menuPage.sort')"
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
  import { getMenuPage, getMenus, updateMenu, deleteMenu, storeMenu } from '@/api/system/menu';
  import { VXETable } from 'vxe-table';
  import XEUtils from 'xe-utils';
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const xTable = ref(null);

  const menuList = ref([]);

  // 查询条件： 菜单状态列表
  const statusList = ref([
    { label: t('menuPage.statusList.disable'), value: 1 },
    { label: t('menuPage.statusList.enable'), value: 0 },
  ]);

  // 查询条件： 菜单状态列表
  const typeList = ref([
    { label: t('menuPage.typeList.btn'), value: 2 },
    { label: t('menuPage.typeList.function'), value: 1 },
    { label: t('menuPage.typeList.menu'), value: 0 },
  ]);

  // 表格: 格式化菜单状态
  const formatterStatus = ({ cellValue }) => {
    const item = statusList.value.find((item) => item.value === cellValue);
    return item ? item.label : '';
  };

  // 表格: 格式化菜单状态
  const formatterType = ({ cellValue }) => {
    const item = typeList.value.find((item) => item.value === cellValue);
    return item ? item.label : '';
  };

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
      id: '',
      icon: '',
      name: '',
      status: '',
      parentId: '',
      type: '',
      path: '',
      sort: '',
    },
    formRules: {
      name: [
        { required: true, message: t('menuPage.name') + t('modal.form.require') },
        { min: 2, max: 20, message: t('menuPage.name') + t('modal.form.between2_20') },
      ],
      status: [{ required: true, message: t('menuPage.status') + t('modal.form.require') }],
      type: [{ required: true, message: t('menuPage.type') + t('modal.form.require') }],
      path: [{ required: true, message: t('menuPage.path') + t('modal.form.require') }],
      sort: [
        {
          type: 'number',
          min: 0,
          max: 999,
          message: t('menuPage.sort') + t('modal.form.between0_999'),
        },
      ],
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      items: [
        {
          field: 'name',
          title: t('menuPage.name'),
          span: 8,
          titlePrefix: {
            message: t('modal.input.placeholder') + t('menuPage.name'),
            icon: 'vxe-icon-question-circle-fill',
          },
          itemRender: {
            name: '$input',
            props: { placeholder: t('modal.input.placeholder') + t('menuPage.name') },
          },
        },
        {
          field: 'status',
          title: t('menuPage.status'),
          span: 8,
          itemRender: { name: '$select', options: statusList },
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
      pageSize: 100,
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
          const conds = [];
          const data = {
            page: page.currentPage,
            pageSize: page.pageSize,
          };
          if (form.name != null) {
            data.name = form.name;
          }
          if (form.status != null) {
            data.status = form.status;
          }
          return getMenuPage(data).then((res) => {
            let items = res.data;
            let total = res.data.length;
            return { items, total };
          });
        },
      },
    },
    columns: [
      { type: 'seq', title: t('table.seq'), width: 80 },
      { field: 'name', title: t('menuPage.name'), treeNode: true },
      { field: 'icon', title: t('menuPage.icon') },
      { field: 'type', title: t('menuPage.type'), formatter: formatterType },
      {
        field: 'status',
        title: t('menuPage.status'),
        filters: statusList,
        formatter: formatterStatus,
      },
      { field: 'sort', title: t('menuPage.sort') },
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

  // 新增菜单
  const openAddModal = () => {
    getMenuList();
    gridOptions.formData = {
      id: null,
      name: null,
      icon: null,
      parentId: null,
      path: null,
      type: null,
      status: null,
      sort: null,
    };
    gridOptions.selectRow = null;
    gridOptions.showEdit = true;
  };

  // 删除
  const removeEvent = async (row) => {
    const type = await VXETable.modal.confirm(t('modal.confirm.content'));
    if (type === 'confirm') {
      deleteMenu({ id: row.id }).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    }
  };

  // 编辑
  const editEvent = (row) => {
    getMenuList();
    if (row.parentId == -1) {
      row.parentId = '';
    }
    gridOptions.formData = {
      id: row.id,
      name: row.name,
      icon: row.icon,
      parentId: row.parentId,
      path: row.path,
      type: row.type,
      status: row.status,
      sort: row.sort,
    };
    gridOptions.showEdit = true;
  };

  // 关闭弹窗
  const closeModal = () => {
    gridOptions.showEdit = false;
  };

  // 提交更新
  const submitEvent = () => {
    if (gridOptions.formData.parentId == '') {
      gridOptions.formData.parentId = -1;
    }
    if (gridOptions.formData.id) {
      // 更新
      updateMenu(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    } else {
      // 新增
      storeMenu(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    }
    gridOptions.selectRow = null;
    gridOptions.showEdit = false;
  };

  // 获取菜单列表
  const getMenuList = async () => {
    const data = {
      page: 1,
      pageSize: 10000,
    };
    getMenus(data).then((res) => {
      nextTick(() => {
        menuList.value = res.data;
      });
    });
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
