import { ElMessage } from 'element-plus';
import { useBlogStore } from '@/store';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
const store = useBlogStore();

export function useRedirect(isAdminPages) {
  const router = useRouter(); //未知原因 router要定义在use内才生效，store 就不需要。

  onBeforeMount(() => {
    if (isAdminPages && !store.userInfo.admin) {
      ElMessage.error('您没有管理员权限');
      router.replace('/');
    } else if (!store.userInfo.name) {
      ElMessage.error('请登录后操作！');
      router.replace('/');
    }
  });
}