import axios from "axios";
import { ElMessage } from 'element-plus';

const $axios = axios.create({
  // baseURL: 'http://127.0.0.1:3300',
  baseURL: 'http://116.62.33.47:3300',
  withCredentials: true,  //携带cookie数据随着请求走;
  timeout: 3000
});

// 请求拦截
$axios.interceptors.request.use(
  config => config,
  err => err
);

//响应拦截器
$axios.interceptors.response.use(
  res => res?.data || res,
  err => err
);

export { $axios };



export async function useAxios(cb, method, url, data) {
  let res = {};
  if (method.toUpperCase() === 'POST') {
    res = await $axios({ method, url, data: data || {} });
  } else {
    res = await $axios({ method, url, params: data || {} });
  }

  if (res?.code && res?.code === 200) {
    if (res.message) ElMessage.success(res.message);
    cb(res);
  } else {
    if (res.message) ElMessage.error(res.message);
  }
};