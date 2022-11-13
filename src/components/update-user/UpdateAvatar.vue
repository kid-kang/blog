<template>
  <el-upload
    :action="store.baseURL + '/updateAvatar'"
    :show-file-list="false"
    :with-credentials="true"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    accept=".jpg,png,gif,jpeg,webp"
    class="avatar-uploader"
  >
    <!-- 缩略图 -->
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <span v-else class="avatar-uploader-icon">+</span>
  </el-upload>
</template>

<script setup>
import {useBlogStore} from '../../store';
import {ref} from 'vue';
import {ElMessage} from 'element-plus';

const store = useBlogStore();
let imageUrl = ref('');

// 上传文件之前的钩子函数，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
function beforeAvatarUpload(file) {
  const imgfileType = ['image/gif', 'image/jpeg', 'image/jpg', 'image/pjpeg', 'image/x-png', 'image/png', 'image/webp'];
  const isAvatar = imgfileType.includes(file.type);
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isAvatar) {
    ElMessage.error('上传的只能图片格式!');
  }
  if (!isLt5M) {
    ElMessage.error('上传头像图片大小不能超过 5MB!');
  }
  return isAvatar && isLt5M;
}

//文件上传成功时的钩子函数
function handleAvatarSuccess(res, file) {
  if (res.code && res.code === 200) {
    imageUrl.value = URL.createObjectURL(file.raw); //设置缩略图的路径
    store.updateUserInfo(res.data);
    ElMessage.success(res.message);
    store.getVisitor();
  } else return ElMessage.error(res.message); //上传失败
}
</script>

<style scoped lang="scss">
::v-deep {
  .el-upload {
    position: relative;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    border-radius: 6px;
    .avatar {
      display: block;
      max-width: 178px;
      max-height: 178px;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }
}
</style>
