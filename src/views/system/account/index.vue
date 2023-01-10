<template>
  <div>
    <vxe-grid v-bind="gridOptions">
      <template #toolbar_buttons>
        <vxe-button status="primary" @click="openAddModal">{{ t('btn.add') }}</vxe-button>
      </template>
      <!-- 字段列转换 -->
      <template #default_role="{ row }">
        <el-tag v-for="item in row.roles" :key="item.id"> {{ item.roleName }}</el-tag>
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
          <vxe-form-item
            field="account"
            :title="t('accountPage.account')"
            :span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.account"
                :placeholder="t('modal.input.placeholder') + t('accountPage.account')"
                :disabled="gridOptions.formData.id != null"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="nickname"
            :title="t('accountPage.nickname')"
            :span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-input
                v-model="data.nickname"
                :placeholder="t('modal.input.placeholder') + t('accountPage.nickname')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="role_ids"
            :title="t('accountPage.role')"
            :span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-select v-model="data.role_ids" transfer multiple>
                <vxe-option
                  v-for="item in roleList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="password"
            :title="t('accountPage.password')"
            :span="24"
            :item-render="{}"
            v-if="gridOptions.formData.id == null"
          >
            <template #default="{ data }">
              <vxe-input
                type="password"
                v-model="data.password"
                :placeholder="t('modal.input.placeholder') + t('accountPage.password')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="status"
            :title="t('accountPage.status')"
            :span="24"
            :item-render="{}"
          >
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
          <vxe-form-item field="email" :title="t('accountPage.email')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model="data.email"
                :placeholder="t('modal.input.placeholder') + t('accountPage.email')"
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
  import { getAccountPage, updateAccount, deleteAccount, storeAccount } from '@/api/system/account';
  import { getRoles } from '@/api/system/role';
  import patternRule from '@/utils/patternRule';
  import { VXETable } from 'vxe-table';
  import { useI18n } from 'vue-i18n';
  import XEUtils from 'xe-utils';

  const { t } = useI18n();

  const xTable = ref(null);

  const roleList = ref([]);

  // 查询条件： 用户状态列表
  const statusList = ref([
    { label: t('accountPage.statusList.enable'), value: 0 },
    { label: t('accountPage.statusList.disable'), value: 1 },
  ]);

  // 表格: 格式化用户状态
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
      role_ids: [],
      account: null,
      name: null,
      password: null,
      email: null,
      status: null,
    },
    formRules: {
      account: [
        { required: true, message: t('accountPage.account') + t('modal.form.require') },
        { min: 4, max: 20, message: t('accountPage.account') + t('modal.form.between4_20') },
      ],
      role_ids: [{ required: true, message: t('accountPage.role') + t('modal.form.require') }],
      status: [{ required: true, message: t('accountPage.status') + t('modal.form.require') }],
      password: [{ required: true, message: t('accountPage.password') + t('modal.form.require') }],
      email: [
        {
          pattern: patternRule.email,
          message: t('accountPage.email') + t('modal.form.errorFormat'),
          trigger: ['blur', 'change'],
        },
      ],
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      items: [
        {
          field: 'status',
          title: t('accountPage.status'),
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
          return getAccountPage(data).then((res) => {
            let { items, total } = res.data;
            return { items, total };
          });
        },
      },
    },
    columns: [
      { type: 'seq', title: t('table.seq'), width: 80 },
      { field: 'account', title: t('accountPage.account') },
      { field: 'nickname', title: t('accountPage.nickname') },
      {
        field: 'status',
        title: t('accountPage.status'),
        filters: statusList,
        formatter: formatterStatus,
      },
      {
        field: 'roles',
        title: t('accountPage.role'),
        showOverflow: true,
        slots: { default: 'default_role' },
      },
      {
        field: 'created',
        title: t('table.created'),
        formatter({ cellValue }) {
          return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss');
        },
        showOverflow: true,
        width: 200,
      },
      {
        field: 'updated',
        title: t('table.updated'),
        formatter({ cellValue }) {
          return XEUtils.toDateString(cellValue, 'yyyy-MM-dd HH:mm:ss');
        },
        showOverflow: true,
        width: 200,
      },
      { title: t('table.operation'), showOverflow: true, slots: { default: 'operate' } },
    ],
  });

  // 新增用户
  const openAddModal = () => {
    getRoleList();
    gridOptions.formData = {
      id: null,
      nickname: '',
      account: '',
      email: '',
      status: '',
      role_ids: [],
    };
    gridOptions.selectRow = null;
    gridOptions.showEdit = true;
  };

  // 删除
  const removeEvent = async (row) => {
    const type = await VXETable.modal.confirm(t('modal.confirm.content'));
    if (type === 'confirm') {
      deleteAccount({ id: row.id }).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    }
  };

  // 编辑
  const editEvent = (row) => {
    getRoleList();
    gridOptions.formData = {
      id: row.id,
      nickname: row.nickname,
      account: row.account,
      email: row.email,
      password: row.password,
      status: row.status,
      role_ids: row.roles.map((v) => {
        return v.id;
      }),
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
      updateAccount(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    } else {
      // 新增
      storeAccount(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    }
    gridOptions.selectRow = null;
    gridOptions.showEdit = false;
  };

  // 获取角色列表
  const getRoleList = async () => {
    const data = {};
    getRoles(data).then((res) => {
      nextTick(() => {
        roleList.value = res.data;
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
