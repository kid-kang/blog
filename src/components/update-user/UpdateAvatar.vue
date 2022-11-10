<template>
  <el-upload
    class="avatar-uploader"
    :action="store.baseURL+'/updateAvatar'"
    :show-file-list="false"
    :with-credentials="true"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <!-- 缩略图 -->
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script setup>
import {useBlogStore} from '../../store';
import {ref} from 'vue';

const store = useBlogStore();
let imageUrl = ref('');

// 上传文件之前的钩子函数，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
function beforeAvatarUpload(file) {
  const imgfileType = ['image/gif', 'image/jpeg', 'image/jpg', 'image/pjpeg', 'image/x-png', 'image/png'];
  const isJPG = imgfileType.includes(file.type);
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isJPG) {
    this.$message.error('上传头像图片只能是 JPG 格式!');
  }
  if (!isLt5M) {
    this.$message.error('上传头像图片大小不能超过 2MB!');
  }
  return isJPG && isLt5M;
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
