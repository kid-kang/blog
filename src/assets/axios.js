import axios from "axios";

const $axios = axios.create({
  baseURL: "http://116.62.33.47:3300",
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
  res => res,
  err => err
);

export default $axios;