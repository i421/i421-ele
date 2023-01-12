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
          <vxe-form-item field="name" :title="t('deptPage.name')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model="data.name"
                :placeholder="t('modal.input.placeholder') + t('deptPage.name')"
                :disabled="gridOptions.formData.id != null"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="status" :title="t('deptPage.status')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-select v-model="data.status" transfer clearable>
                <vxe-option
                  v-for="item in statusList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item
            field="parentId"
            :title="t('deptPage.parentId')"
            :span="24"
            :item-render="{}"
          >
            <template #default="{ data }">
              <vxe-select v-model="data.parentId" transfer>
                <vxe-option
                  v-for="item in deptList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.name"
                ></vxe-option>
              </vxe-select>
            </template>
          </vxe-form-item>
          <vxe-form-item field="remark" :title="t('deptPage.remark')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model="data.remark"
                :placeholder="t('modal.input.placeholder') + t('deptPage.remark')"
              ></vxe-input>
            </template>
          </vxe-form-item>
          <vxe-form-item field="sort" :title="t('deptPage.sort')" :span="24" :item-render="{}">
            <template #default="{ data }">
              <vxe-input
                v-model.number="data.sort"
                :placeholder="t('modal.input.placeholder') + t('deptPage.sort')"
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
  import { getDeptPage, updateDept, deleteDept, storeDept } from '@/api/system/dept';
  import patternRule from '@/utils/patternRule';
  import { VXETable } from 'vxe-table';
  import { useI18n } from 'vue-i18n';
  import XEUtils from 'xe-utils';

  const { t } = useI18n();

  const xTable = ref(null);

  const deptList = ref([]);

  // 查询条件： 用户状态列表
  const statusList = ref([
    { label: t('deptPage.statusList.disable'), value: 1 },
    { label: t('deptPage.statusList.enable'), value: 0 },
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
      name: null,
      status: null,
      parentId: null,
      remark: null,
      sort: null,
    },
    formRules: {
      name: [{ required: true, message: t('deptPage.name') + t('modal.form.require') }],
      sort: [
        {
          type: 'number',
          min: 0,
          max: 999,
          message: t('deptPage.sort') + t('modal.form.between0_999'),
        },
      ],
    },
    formConfig: {
      titleWidth: 100,
      titleAlign: 'right',
      items: [
        {
          field: 'name',
          title: t('deptPage.name'),
          span: 8,
          titlePrefix: {
            message: t('modal.input.placeholder') + t('deptPage.name'),
            icon: 'vxe-icon-question-circle-fill',
          },
          itemRender: {
            name: '$input',
            props: { placeholder: t('modal.input.placeholder') + t('deptPage.name') },
          },
        },
        {
          field: 'status',
          title: t('deptPage.status'),
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
    treeConfig: {
      transform: true,
      parentField: 'parentId',
      rowField: 'id',
    },
    proxyConfig: {
      props: {
        result: 'data',
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
          if (form.name != null) {
            data.name = form.name;
          }
          if (form.status != null) {
            data.status = form.status;
          }
          return getDeptPage(data).then((res) => {
            let data = res.data;
            let total = res.data.length;
            return { data, total };
          });
        },
      },
    },
    columns: [
      { type: 'seq', title: t('table.seq'), width: 80 },
      { field: 'name', title: t('deptPage.name'), treeNode: true },
      { field: 'remark', title: t('deptPage.remark') },
      {
        field: 'status',
        title: t('deptPage.status'),
        filters: statusList,
        formatter: formatterStatus,
      },
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
    getDeptList();
    gridOptions.formData = {
      id: null,
      name: '',
      remark: '',
      status: '',
      sort: '',
    };
    gridOptions.selectRow = null;
    gridOptions.showEdit = true;
  };

  // 删除
  const removeEvent = async (row) => {
    const type = await VXETable.modal.confirm(t('modal.confirm.content'));
    if (type === 'confirm') {
      deleteDept({ id: row.id }).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    }
  };

  // 编辑
  const editEvent = (row) => {
    getDeptList();
    // 顶层转化
    if (row.parentId == -1) {
      row.parentId = '';
    }
    gridOptions.formData = {
      id: row.id,
      name: row.name,
      remark: row.remark,
      parentId: row.parentId,
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
    // 顶层转化-1
    if (gridOptions.formData.parentId == '') {
      gridOptions.formData.parentId = -1;
    }
    if (gridOptions.formData.id) {
      // 更新
      updateDept(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    } else {
      // 新增
      storeDept(gridOptions.formData).then((res) => {
        ElMessage.success(t('notice.success'));
        const $table = xTable.value;
        $table.commitProxy('query');
      });
    }
    gridOptions.selectRow = null;
    gridOptions.showEdit = false;
  };

  // 获取部门列表
  const getDeptList = async () => {
    const data = {
      page: 1,
      pageSize: 10000,
      status: 0,
    };
    return getDeptPage(data).then((res) => {
      nextTick(() => {
        deptList.value = res.data;
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
