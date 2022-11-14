<template>
  <el-table :data="feedbackData">
    <el-table-column label="日期" width="150" :show-overflow-tooltip="true">
      <template #default="scope">
        <span>{{ new Date(scope.row.date).toLocaleString() }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称" width="100" :show-overflow-tooltip="true" />
    <el-table-column prop="email" label="Email" width="180" :show-overflow-tooltip="true" />
    <el-table-column prop="message" label="内容" width="150" :show-overflow-tooltip="true" />
    <el-table-column label="是否处理" fixed="right" width="180" :show-overflow-tooltip="true">
      <template #default="scope">
        <el-switch
          style="display: block"
          v-model="scope.row.reading"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="已阅读"
          inactive-text="未阅读"
          @change="switchState(scope.row)"
        ></el-switch>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useAxios} from '@/hooks/useAxios';
const feedbackData = ref([]);

function getContactData() {
  useAxios(
    res => {
      feedbackData.value = res.data;
    },
    'get',
    '/getFeedback'
  );
}
onMounted(() => getContactData());

//点击开关修改状态时触发
function switchState(row) {
  useAxios(
    () => {
      getContactData();
    },
    'POST',
    '/updateFeedback',
    {id: row._id, reading: row.reading}
  );
}
</script>

<style scoped lang="scss">
.el-table {
  border-radius: 10px;
  padding: 18px;
  .el-switch {
    display: flex !important;
    align-items: center;
    .el-switch__core {
      margin-top: 10px;
    }
  }
}
</style>
