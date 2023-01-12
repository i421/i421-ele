<template>
  <el-dropdown @command="handleCommand">
    <span class="avatar-dropdown" :style="{ color }">
      <!--<el-avatar class="user-avatar" :src="avatar"></el-avatar>-->
      <img class="user-avatar" :src="avatar" alt="" />
      <div class="user-name">
        {{ userName }}
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="updatePasswd" divided>{{
          t('navbar.updatePassword')
        }}</el-dropdown-item>
        <el-dropdown-item command="logout" divided>{{ t('navbar.logOut') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <!-- 更新密码弹窗 -->
  <el-dialog v-model="dialogFormVisible" :title="t('navbar.updatePassword')">
    <el-form :model="form" :rules="formRules" ref="updatePasswordForm">
      <el-form-item :label="t('navbar.oldPassword')" label-width="140px" prop="old_password">
        <el-input
          type="password"
          v-model="form.old_password"
          autocomplete="off"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item :label="t('navbar.newPassword')" label-width="140px" prop="new_password">
        <el-input
          type="password"
          v-model="form.new_password"
          autocomplete="off"
          show-password
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{ t('btn.cancel') }}</el-button>
        <el-button type="primary" @click="submitUpdatePassword">
          {{ t('btn.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
  export default {
    name: 'Avatar',
  };
</script>

<script setup>
  import { reactive, ref } from 'vue';
  import { useStore } from 'vuex';
  import { ElMessageBox, ElNotification } from 'element-plus';
  import { setting } from '@/config/setting';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import avatarLogo from '@/assets/15922_100.gif';
  import { updatePassword } from '@/api/system/account';

  const { title, recordRoute } = setting;
  const { t } = useI18n();
  const avatar = ref(avatarLogo);
  // const userName = ref('ss');
  const store = useStore();
  const router = useRouter();

  const userName = computed(() => {
    return store.getters['user/username'];
  });

  const updatePasswordForm = ref(null);
  const dialogFormVisible = ref(false);
  const form = reactive({
    old_password: '',
    new_password: '',
  });

  const formRules = reactive({
    old_password: [
      { required: true, message: t('navbar.oldPassword') + t('modal.form.require') },
      { min: 4, max: 20, message: t('navbar.oldPassword') + t('modal.form.between4_20') },
    ],
    new_password: [
      { required: true, message: t('navbar.newPassword') + t('modal.form.require') },
      { min: 4, max: 20, message: t('navbar.newPassword') + t('modal.form.between4_20') },
    ],
  });

  defineProps({
    color: {
      type: String,
      default: '#666',
    },
  });

  const handleCommand = (command) => {
    switch (command) {
      case 'logout':
        handleLogout();
        break;
      case 'updatePasswd':
        showUpdatePasswordDialog();
        break;
      default:
        break;
    }
  };

  const showUpdatePasswordDialog = () => {
    dialogFormVisible.value = true;
  };

  // 提交更新密码
  const submitUpdatePassword = () => {
    updatePasswordForm.value.validate((valid) => {
      if (valid) {
        const data = {
          oldPwd: form.old_password,
          newPwd: form.new_password,
        };
        updatePassword(data).then((res) => {
          ElMessage.success(t('notice.success'));
          dialogFormVisible.value = false;
          updatePasswordForm.value.resetFields();
        });
      }
    });
  };

  const handleLogout = () => {
    ElMessageBox.confirm(`${t('confirm.msg')}${title}？`, t('confirm.title'), {
      confirmButtonText: t('btn.confirm'),
      cancelButtonText: t('btn.cancel'),
      dangerouslyUseHTMLString: true,
      type: 'warning',
    })
      .then(async () => {
        await store.dispatch('user/logout');
        if (recordRoute) {
          const { fullPath } = router.currentRoute._value;
          location.replace('/');
        } else {
          router.push('/login');
        }
      })
      .catch(() => {});
  };
</script>

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;
    height: $base-avatar-dropdown-height;
    padding: $base-padding-10;
    .user-avatar {
      width: $base-avatar-widht;
      height: $base-avatar-height;
      cursor: pointer;
      border-radius: $base-border-radius-circle;
    }

    .user-name {
      position: relative;
      margin-left: $base-margin-5;
      margin-left: $base-margin-5;
      cursor: pointer;
    }
  }
</style>
