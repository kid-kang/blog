<template>
  <div class="friendlink-Manage__wrap">
    <el-table :data="store.friendLink" style="width: 100%" max-height="250">
      <el-table-column prop="name" label="名称" width="100" :show-overflow-tooltip="true" />
      <el-table-column prop="home" label="首页" width="180" :show-overflow-tooltip="true" />
      <el-table-column prop="logo" label="Logo" width="150" :show-overflow-tooltip="true" />
      <el-table-column prop="describe" label="描述" width="200" :show-overflow-tooltip="true" />
      <el-table-column fixed="right" label="操作" width="130">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="openDialog(scope.row)">修改</el-button>
          <el-button link type="danger" size="small" @click.prevent="deleteFriendLink(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-btn" @click="openDialog">添加友链</div>
  </div>

  <!-- 弹窗 -->
  <Dialog>
    <el-form :model="dialogFormData" :rules="rules" ref="refDialogFormData">
      <el-form-item label="名称" label-width="100px" prop="name">
        <el-input v-model="dialogFormData.name" clearable />
      </el-form-item>
      <el-form-item label="首页" label-width="100px" prop="home">
        <el-input v-model="dialogFormData.home" clearable />
      </el-form-item>
      <el-form-item label="Logo" label-width="100px" prop="logo">
        <el-input v-model="dialogFormData.logo" clearable />
      </el-form-item>
      <el-form-item label="描述" label-width="100px">
        <el-input v-model="dialogFormData.describe" type="textarea" :autosize="{minRows: 1, maxRows: 4}" clearable />
      </el-form-item>
      <el-form-item class="dialog-footer__btn" label-width="100px">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submit">确认</el-button>
      </el-form-item>
    </el-form>
  </Dialog>
</template>

<script setup>
import {ref, reactive, provide} from 'vue';
import rules from '../hooks/useFriendLinkRules';
import Dialog from '@/components/common/Dialog.vue';
import {useAxios} from '@/hooks/useAxios';
import {useBlogStore} from '../store';

const store = useBlogStore();
let dialogVisible = ref(false);
provide('dialogVisible', dialogVisible);

// 弹窗的数据
const dialogFormData = reactive({
  name: '',
  home: '',
  logo: '',
  describe: '',
});

function openDialog(item) {
  dialogVisible.value = true;
  dialogFormData.name = item.name;
  dialogFormData.home = item.home;
  dialogFormData.logo = item.logo;
  dialogFormData.describe = item.describe;
  if (item._id) dialogFormData._id = item._id;
}

// 发起 添加 or 修改 请求
let refDialogFormData = ref(null);
function submit() {
  const path = dialogFormData._id ? '/updateLink' : '/addLink';
  refDialogFormData.value.validate(bool => {
    if (bool) {
      useAxios(
        () => {
          dialogVisible.value = false;
          store.getFriendLink();
        },
        'post',
        path,
        {...dialogFormData}
      );
    }
  });
}

function deleteFriendLink(id) {
  useAxios(
    () => {
      store.getFriendLink();
    },
    'post',
    '/deleteLink',
    {id}
  );
}
</script>

<style scoped lang="scss">
.friendlink-Manage__wrap {
  .el-table {
    border-radius: 10px 10px 0 0;
    padding: 18px;
  }
  .add-btn {
    background-color: #fff;
    border-radius: 0 0 10px 10px;
    cursor: pointer;
    font-size: 12px;
    padding: 10px 0 20px 0;
    text-align: center;
    color: #409eff;
  }
}

.el-form {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  margin: auto;
  z-index: 99999999;
  background-color: #fff;
  width: 800px;
  height: 375px;
  border-radius: 10px;
  box-shadow: 0 0 4px #aaa;
  padding: 50px 50px 0 0;

  :deep(.el-popper.is-dark) {
    max-width: 40%;
  }
}
</style>
