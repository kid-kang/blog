<template>
  <el-table :data="linkInfo" style="width: 100%" max-height="250">
    <el-table-column fixed="left" prop="name" label="名称" width="100" />
    <el-table-column
      prop="home"
      label="首页"
      width="150"
      :show-overflow-tooltip="true"
    />
    <el-table-column
      prop="logo"
      label="Logo"
      width="150"
      :show-overflow-tooltip="true"
    />
    <el-table-column
      prop="describe"
      label="描述"
      width="200"
      :show-overflow-tooltip="true"
    />
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="onOpenEditLink(scope.row, scope.$index)"
        >
          修改
        </el-button>
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.$index)"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-button class="mt-4" style="width: 100%" @click="onOpenAddLink"
    >添加友链</el-button
  >

  <!-- 弹窗 -->
  <el-dialog v-model="linkFormDialogVisible" :title="`${dialogType}友链`">
    <el-form :model="linkForm" :rules="rules">
      <el-form-item label="名称" :label-width="linkFormLabelWidth" prop="name">
        <el-input v-model="linkForm.name" type="text" />
      </el-form-item>
      <el-form-item label="首页" :label-width="linkFormLabelWidth" prop="home">
        <el-input v-model="linkForm.home" type="text" />
      </el-form-item>
      <el-form-item label="Logo" :label-width="linkFormLabelWidth" prop="logo">
        <el-input v-model="linkForm.logo" :rows="2" type="textarea" clearable />
      </el-form-item>
      <el-form-item label="描述" :label-width="linkFormLabelWidth">
        <el-input
          v-model="linkForm.describe"
          :rows="2"
          type="textarea"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="linkFormDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onConfirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {useAxios} from '@/hooks/useAxios';

const linkInfo = ref([
  {
    name: 'apple',
    home: 'https://www.apple.com.cn/',
    logo: 'https://gss3.bdstatic.com/84oSdTum2Q5BphGlnYG/timg?wapp&quality=80&size=b150_150&subsize=20480&cut_x=0&cut_w=0&cut_y=0&cut_h=0&sec=1369815402&srctrace&di=8b65b78fffac67dbcfa61739193001ce&wh_rate=null&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fpic%2Fitem%2Fb2de9c82d158ccbf256dd55512d8bc3eb035418f.jpg',
    describe: 'iphone13 强的很',
  },
])

const deleteRow = (index) => {
  linkInfo.value.splice(index, 1)
}
const linkFormLabelWidth = '100px'

const linkForm = reactive({
  name: '',
  home: '',
  logo: '',
  describe: '',
})
const rules = reactive({
  name: [{ required: true, trigger: 'blur' }],
  home: [{ required: true, trigger: 'blur' }],
  logo: [{ required: true, trigger: 'blur' }],
  // describe: [{ required: true, trigger: 'blur' },],
})
let dialogType = ref('')
const linkFormDialogVisible = ref(false)
let openIndex = 0
const onOpenEditLink = (row, index) => {
  dialogType.value = '修改'
  openIndex = index
  linkForm.name = row.name
  linkForm.home = row.home
  linkForm.logo = row.logo
  linkForm.describe = row.describe
  linkFormDialogVisible.value = true
}
const onConfirm = () => {
  const { name, home, logo, describe } = linkForm
  if (dialogType.value === '添加') {
    linkInfo.value.push({
      name,
      home,
      logo,
      describe,
    })
  } else if (dialogType.value === '修改') {
    linkInfo.value[openIndex].name = name
    linkInfo.value[openIndex].home = home
    linkInfo.value[openIndex].logo = logo
    linkInfo.value[openIndex].describe = describe
  }
  linkFormDialogVisible.value = false
}
const onOpenAddLink = () => {
  dialogType.value = '添加'
  linkForm.name = ''
  linkForm.home = ''
  linkForm.logo = ''
  linkForm.describe = ''
  linkFormDialogVisible.value = true
}
</script>

<style scoped lang="scss">
:deep(.el-popper.is-dark) {
  max-width: 40%;
}
</style>