<template>
  <el-form ref="refFormData" :model="formData" label-width="100px" class="share-wrap">
    <el-alert title="上传的md文件中无法显示本地的图片哦！🎈" type="info" :closable="false" center />
    <el-form-item label="标题">
      <el-input v-model="formData.title" placeholder="可以自动获取上传的md文件名称"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input
        type="textarea"
        v-model="formData.describe"
        :autosize="{minRows: 2, maxRows: 5}"
        placeholder="请输入内容"
        maxlength="500"
      />
    </el-form-item>
    <el-form-item label="重新上传md文件">
      <el-upload
        ref="refMdForm"
        class="upload-demo"
        drag
        accept=".md"
        :action="store.baseURL + '/uploadMd'"
        :auto-upload="false"
        :limit="1"
        :with-credentials="true"
        :on-change="mdChange"
        :on-error="err"
        :on-success="mdUploadSuccess"
        :before-remove="beforeRemove"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </el-form-item>
    <el-form-item label="重新上传动态封面">
      <el-upload
        accept=".jpg,png,gif,jpeg,webp"
        :action="store.baseURL + '/uploadCover'"
        :show-file-list="false"
        :auto-upload="false"
        :with-credentials="true"
        :on-change="coverChange"
        :on-success="coverUploadSuccess"
        :on-error="err"
        ref="refCoverForm"
        class="cover-uploader"
      >
        <!-- 缩略图 -->
        <div class="cover-wrap" v-if="imageUrl || formData.coverUrl">
          <img :src="imageUrl || store.baseURL + formData.coverUrl" class="cover" />
        </div>
        <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm" round>修改</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {UploadFilled, Plus} from '@element-plus/icons-vue';
import {ElMessage} from 'element-plus';
import {ref, reactive} from 'vue';
import {useAxios} from '@/hooks/useAxios';
import {useBlogStore} from '@/store';
import {useRouter, useRoute} from 'vue-router';

const store = useBlogStore();
const router = useRouter();
const route = useRoute();
let refFormData = ref(null);
let refMdForm = ref(null);
let refCoverForm = ref(null);
const formData = reactive({...store.dynamicData.find(val => val._id === route.query.id)});
// 鉴权重定向  如果这篇不是本人发表的 or 不是管理员 则非法进入编辑页
if (formData.author._di !== store.userInfo._id && !store.userInfo.admin) {
  ElMessage.error('您非法进入编辑页');
  router.replace('/');
}

let imageUrl = ref('');
let monitorMd = ref(false);

//添加md文件、成功上传md、上传失败时都会调用mdChange
function mdChange(file, fileList) {
  if (file.status === 'ready') {
    //为待上传状态时，对md文件做校验
    if (/^.+\.md$/.test(file.name)) {
      //只有文件后缀名为.md时
      formData.title = file.name.slice(0, -3);
      monitorMd.value = true;
    } else {
      ElMessage.error('只能上传.md后缀名的文件');
      fileList.pop(); //从尾部删除文件列表中的文件对象
    }
  }
}

//添加封面图片、成功上传封面、上传失败时都会调用coverChange
function coverChange(file, fileList) {
  const imgfileType = ['image/gif', 'image/jpeg', 'image/jpg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/webp'];
  if (file.status === 'ready') {
    const isImg = imgfileType.includes(file.raw.type);
    const isLt5M = file.raw.size / 1024 / 1024 < 5;
    if (!isImg) ElMessage.error('上传头像图片只能是图片格式!');
    if (!isLt5M) ElMessage.error('上传头像图片大小不能超过 5MB!');
    if (isImg && isLt5M) imageUrl.value = URL.createObjectURL(file.raw);
    else fileList.pop();
  }
}

//从文件列表中删除文件后，触发
function beforeRemove(file) {
  formData.title = '';
}

//点击提交按钮
function submitForm() {
  if (monitorMd.value) refMdForm.value.submit();
  else if (imageUrl.value) refCoverForm.value.submit();
  else edit();
}

//文件上传成功后
function mdUploadSuccess(res) {
  if (res.mdUrl) formData.mdUrl = res.mdUrl;
  if (imageUrl.value) refCoverForm.value.submit();
  else edit();
}

function coverUploadSuccess(res) {
  if (res.coverUrl) formData.coverUrl = res.coverUrl;
  edit();
}

function err() {
  ElMessage.error('文件上传失败');
}

// 修改
function edit() {
  useAxios(
    () => {
      store.getDynamic();
      router.push('/dynamic');
    },
    'POST',
    '/updateArticle',
    {id: route.query.id, doc: {...formData}}
  );
}
</script>

<style scoped lang="scss">
.share-wrap {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;

  .el-upload {
    position: relative;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    .cover-wrap {
      height: 178px;
      .cover {
        display: block;
        max-width: 178px;
        max-height: 178px;
        border-radius: 6px;
      }
    }
    .cover-uploader-icon {
      font-size: 28px;
      border-radius: 6px;
      border: 1px dashed #d9d9d9;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      &:hover {
        border: 1px dashed #409eff;
      }
    }
  }

  .upload-demo {
    height: 246px;
  }

  .cover-uploader {
    height: 178px;
  }

  .el-alert {
    margin-bottom: 22px;
  }
}
</style>
