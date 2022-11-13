<template>
  <ul class="dynamic-wrap" v-infinite-scroll="store.loadDynamic" infinite-scroll-distance="1">
    <li v-for="dynamic in store.showDynamicData" :key="dynamic._id">
      <header>
        <h2>{{ dynamic.title }}</h2>
        <p class="date">{{ new Date(dynamic.date).toLocaleString() }}</p>
      </header>
      <main>
        <div class="cover-wrap">
          <img :src="store.baseURL + dynamic.coverUrl" alt="封面" />
        </div>
        <div class="describe-wrap">
          <p class="describe">{{ dynamic.describe }}</p>
          <div class="read">
            <span>阅读量：{{ dynamic.readingNum }}</span>
            <div class="btn-group">
              <el-button
                v-if="store.userInfo.admin || store.userInfo._id === dynamic.author._id"
                type="danger"
                size="small"
                round
                @click="openDialogAndGetDynamicId(dynamic._id)"
              >
                删除
              </el-button>
              <el-button
                v-if="store.userInfo.admin || store.userInfo._id === dynamic.author._id"
                type="primary"
                size="small"
                round
                @click="readOrEdit(dynamic._id, '/edit')"
              >
                编辑
              </el-button>
              <el-button type="success" size="small" round @click="readOrEdit(dynamic._id, '/detail')">阅读</el-button>
            </div>
          </div>
        </div>
      </main>
    </li>
  </ul>
  <Dialog>
    <el-card class="box-card">
      <h3>您确定删除吗？</h3>
      <p class="box-card__btn">
        <el-button round @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" round @click="deleteDynamic">确定</el-button>
      </p>
    </el-card>
  </Dialog>
</template>

<script setup>
import {useRouter} from 'vue-router';
import {useBlogStore} from '@/store';
import {useAxios} from '@/hooks/useAxios';
import Dialog from '@/components/common/Dialog.vue';
import {ref, provide} from 'vue';

const store = useBlogStore();
const router = useRouter();

function readOrEdit(id, path) {
  router.push({path, query: {id}}); //跳转到id对应的文章详情页
}

// 删除动态的弹框
let dialogVisible = ref(false);
let deleteDynamicId = ref(''); // 保存二次确认要删除话题的ID
provide('dialogVisible', dialogVisible);
function openDialogAndGetDynamicId(dynamicId) {
  deleteDynamicId.value = dynamicId;
  dialogVisible.value = true;
}
function deleteDynamic() {
  useAxios(
    () => {
      store.getDynamic();
      dialogVisible.value = false;
    },
    'post',
    '/deleteArticle',
    {id: deleteDynamicId.value}
  );
}
</script>

<style scoped lang="scss">
.dynamic-wrap {
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;

  li {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 4px #aaa;
    padding: 8px;
    letter-spacing: 3px;
    margin-bottom: 15px;

    header {
      display: flex;
      justify-content: space-between;
      h2 {
        margin-bottom: 15px;
        border-left: 5px solid #73b899;
        font-size: 20px;
        letter-spacing: 3px;
        line-height: 24px;
        text-indent: 10px;
      }
      .date {
        font-weight: bolder;
        color: #6bc30d;
        font-size: 16px;
        line-height: 24px;
      }
    }
    main {
      display: flex;
      justify-content: space-between;
      .cover-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 178px;
        height: 178px;
        margin-right: 18px;
        img {
          display: inline-block;
          max-width: 178px;
          max-height: 178px;
          border-radius: 6px;
        }
      }

      .describe-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .describe {
          text-overflow: ellipsis;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 6;
          -webkit-box-orient: vertical;
          font-size: 14px;
          text-indent: 2em;
          line-height: 22px;
        }
        .read {
          display: flex;
          justify-content: space-between;
          span {
            font-size: 12px;
            color: #aaa;
            line-height: 24px;
          }
          .btn-group {
            .el-button {
              margin-left: 12px;
            }
          }
        }
      }
    }
  }
}
.box-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  border-radius: 10px;
  padding: 20px;
  letter-spacing: 2px;
  line-height: 26px;
  .box-card__btn {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
  }
}
</style>
