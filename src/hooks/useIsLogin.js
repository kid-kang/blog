import { ElMessage } from 'element-plus';
import { useBlogStore } from '@/store';
const store = useBlogStore();

export function isLogin() {
  //判断用户是否登录
  if (store.userInfo.name) return true;

  ElMessage.error('请登录后操作！');
  return false;
}