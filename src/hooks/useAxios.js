import axios from "axios";
import { ElMessage } from 'element-plus';

const $axios = axios.create({
  baseURL: 'http://127.0.0.1:3300',
  withCredentials: true,  //携带cookie数据随着请求走;
  timeout: 3000
});

//响应拦截器
$axios.interceptors.response.use(
  res => res.data || res,
  err => err
);

export { $axios };


// cb是请求成功后的回调。 cb参数为什么不放最后？ 因为data非必传只能放最后，所以放第一个妥当
export async function useAxios(cb, method, url, data = {}) {
  const res = method.toUpperCase() === 'POST' ? await $axios({ method, url, data }) : await $axios({ method, url, params: data });

  if (res.code === 200) {
    if (res.message) ElMessage.success(res.message);
    cb(res);
  } else {
    if (res.message) ElMessage.error(res.message);
  }
};