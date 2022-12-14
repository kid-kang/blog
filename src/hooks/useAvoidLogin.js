import { onMounted } from 'vue';
import { useBlogStore } from '../store';
import { useAxios } from '@/hooks/useAxios';

export function useAvoidLogin() {
  const store = useBlogStore();

  onMounted(async () => {
    useAxios((res) => {
      store.updateUserInfo(res.data); //免登录
      store.getVisitor(); // 更新访客
    }, 'post', '/avoidLogin');
  });
}