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
        <vxe-button type="text" icon="vxe-icon-menu" @click="permEvent(row)"></vxe-button>
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
          <vxe-form-item
            field="roleName"
            :title="t('rolePage.roleName')"
            :span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.roleName"
                :placeholder="t('modal.input.placeholder') + t('rolePage.roleName')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="value" :title="t('rolePage.value')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model="data.value"
                :placeholder="t('modal.input.placeholder') + t('rolePage.value')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="description"
            :title="t('rolePage.description')"
            :span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.description"
                :placeholder="t('modal.input.placeholder') + t('rolePage.description')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="status" :title="t('rolePage.status')" :span="24" :item-render="{}">
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
          <vxe-form-item field="sort" :title="t('rolePage.sort')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model.number="data.sort"
                :placeholder="t('modal.input.placeholder') + t('rolePage.sort')"
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

    <!-- 配置权限 -->
    <el-drawer v-model="drawer" :title="t('menuPage.configPerm')" direction="rtl" size="25%">
      <vxe-table
        ref="permTable"
        show-overflow
        :row-config="{ isHover: true, useKey: true }"
        :show-header="false"
        :data="menuList"
        :checkbox-config="{ labelField: 'name' }"
        :tree-config="{
          transform: true,
          accordion: true,
          line: true,
          iconOpen: 'vxe-icon-square-minus',
          iconClose: 'vxe-icon-square-plus',
          parentField: 'parentId',
          rowField: 'id',
        }"
      >
        <vxe-column type="checkbox" tree-node></vxe-column>
      </vxe-table>
      <template #footer>
        <div style="flex: auto">
          <vxe-button @click="storePerm" status="primary">{{ t('btn.submit') }}</vxe-button>
          <vxe-button @click="cancelPerm">{{ t('btn.cancel') }}</vxe-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
  import { ref, reactive, onBeforeMount } from 'vue';
  import {
    getRolePage,
    updateRole,
    updateRoleMenu,
    deleteRole,
    storeRole,
    getRoleMenu,
  } from '@/api/system/role';
  import { getMenus } from '@/api/system/menu';
  import { VXETable } from 'vxe-table';
  import XEUtils from 'xe-utils';
  import { useI18n } from 'vue-i18n';

  const xTable = ref(null);

  const { t } = useI18n();

  // 角色分配菜单
  const permTable = ref(null);
  const drawer = ref(false);
  const menuList = ref([]);

  // 查询条件： 角色状态列表
  const statusList = ref([
    { label: t('rolePage.statusList.disable'), value: 1 },
    { label: t('rolePage.statusList.enable'), value: 0 },
  ]);

  // 表格: 格式化角色状态
  const formatterStatus = ({ cellValue }) => {
    const item = statusList.value.find((item) => item.value === cellValue);
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
      id: null,
      name: null,
      status: null,
      order_no: null,
    },
    formRules: {
      roleName: [
        { required: true, message: t('rolePage.roleName') + t('modal.form.require') },
        { min: 4, max: 20, message: t('rolePage.roleName') + t('modal.form.between4_20') },
      ],
      status: [{ required: true, message: t('rolePage.status') + t('modal.form.require') }],
      sort: [
        {
          type: 'number',
          min: 0,
          max: 999,
          message: t('rolePage.sort') + t('modal.form.between0_999'),
        },
      ],
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      items: [
        {
          field: 'roleName',
          title: t('rolePage.roleName'),
          span: 8,
          titlePrefix: {
            message: t('modal.input.placeholder') + t('rolePage.roleName'),
            icon: 'vxe-icon-question-circle-fill',
          },
          itemRender: {
            name: '$input',
            props: { placeholder: t('modal.input.placeholder') + t('rolePage.roleName') },
          },
        },
        {
          field: 'status',
          title: t('rolePage.status'),
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
          return getRolePage(data).then((res) => {
            const { items, total } = res.data;
            return { items, total };
          });
        },
      },
    },
    columns: [
      { type: 'seq', title: t('table.seq'), width: 80 },
      { field: 'roleName', title: t('rolePage.roleName') },
      { field: 'value', title: t('rolePage.value') },
      { field: 'sort', title: t('rolePage.sort') },
      { field: 'description', title: t('rolePage.description') },
      {
        field: 'status',
        title: t('rolePage.status'),
        filters: statusList,
        formatter: formatterStatus,
      },
      {
        field: 'created',
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

  // 新增角色
  const openAddModal = () => {
    gridOptions.formData = {
      id: null,
      roleName: null,
      value: null,
      status: null,
      description: null,
      sort: null,
    };
    gridOptions.selectRow = null;
    gridOptions.showEdit = true;
  };

  // 删除
  const removeEvent = async (row) => {
    const type = await VXETable.modal.confirm(t('modal.confirm.content'));
    if (type === 'confirm') {
      deleteRole({ id: row.id }).then((res) => {
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
      roleName: row.roleName,
      value: row.value,
      description: row.description,
      status: row.status,
      sort: row.sort,
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
      updateRole(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    } else {
      // 新增
      storeRole(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    }
    gridOptions.selectRow = null;
    gridOptions.showEdit = false;
  };

  // 打开抽屉
  const permEvent = async (row) => {
    await getMenuList();
    nextTick(() => {
      getRolePerm();
    });
    drawer.value = true;
    gridOptions.selectRow = row;
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

  // 获取角色权限
  const getRolePerm = async () => {
    const data = {
      role_id: gridOptions.selectRow.id,
    };
    getRoleMenu(data).then((res) => {
      const $permTable = permTable.value;
      const selectRows = [];
      for (let i = 0; i < menuList.value.length; i++) {
        if (res.data.includes(menuList.value[i].id)) {
          selectRows.push(menuList.value[i]);
        }
      }
      $permTable.setCheckboxRow(selectRows, true);
    });
  };

  // 保存角色配置的权限
  const storePerm = () => {
    const $permTable = permTable.value;
    let menuIds = [];
    let selectedPerm = $permTable.getCheckboxRecords(false);
    for (let i = 0; i < selectedPerm.length; i++) {
      menuIds.push(selectedPerm[i].id);
    }

    const data = {
      role_id: gridOptions.selectRow.id,
      menu_ids: menuIds,
    };
    updateRoleMenu(data).then((res) => {
      ElMessage.success(t('notice.success'));
      drawer.value = false;
    });
  };

  // 取消配置权限
  const cancelPerm = () => {
    drawer.value = false;
    gridOptions.selectRow = null;
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
