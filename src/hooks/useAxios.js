import axios from "axios";
import {ElMessage} from 'element-plus';
import {useBlogStore} from '../store';

const store = useBlogStore()

const $axios = axios.create({
  baseURL: store.baseURL,
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



export async function useAxios (cb, method, url, data) {
  let res = {}
  if (method.toUpperCase() === 'POST') {
    res = await $axios({ method, url, data: data || {} });
  } else {
    res = await $axios({ method, url, params: data || {} });
  }

  if (res?.code && res?.code === 200) {
    ElMessage.success(res.message);
    cb(res)
  } else {
    ElMessage.error(res.message);
  }
};