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
  res => res?.data || res,
  err => err
);



export default function (method, url, data) {
  if (method.toUpperCase() === 'POST') {
    return $axios({ method, url, data: data || {} });
  } else {
    return $axios({ method, url, params: data || {} });
  }
};