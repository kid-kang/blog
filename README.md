# blog

> 线上体验地址：[博客分享平台](https://wangzhengkang.cool/#/)

你好 👋！欢迎来到博客分享平台！在这里你可以浏览或分享一些你的技术文章亦或是美文美诗，甚至可以分享生活中的趣事，你也可以在讨论区说出你的看法，在这里你或许能遇见相似的灵魂...

该项目前端使用 Vue3 + Pinia 重构我了我之前的项目，优化了性能，优化了界面，使其成为公共的技术分享及讨论平台。

早就有过重构本站的念头但迟迟没有动手，这次终于撸起袖子，但是遇到的种种困难让我夜不能寐。我想，就算是通宵达旦我也要尽快的完成它！

该平台诞生于 2021.9，重构于 2022.11

## 启动项目概要

先启动后端服务再启动前端，后端源码请看 [blog-api](https://github.com/kid-kang/blog-api)

PS：后端环境需要有下载 MongonDB 哦

```sh
// 安装依赖
npm install
```

```sh
// 启动前端服务
npm run dev
```

```sh
// 打包
npm run build
```



## 优化详情

| 重构之前                                    | 重构之后                                                     |
| :------------------------------------------ | ------------------------------------------------------------ |
| 没有做前后端分离                            | 改成前后端完全分离 ✋🏻                                        |
| Element-plus，md文档库等完整导入            | CDN 在线引入，减小打包后文件大小 ✋🏻                          |
| history模式刷新导致 404                     | 改成哈希模式 ✋🏻 （PS：后端使用connect-history-api-fallback也能处理该问题） |
| Vuex                                        | Pinia✋🏻                                                      |
| 管理后台需手动输入路由进入                  | 根据权限入口界面化 ✋🏻                                        |
| 普通用户无法发表文章                        | 新增发表文章页，文章列表新增编辑按钮和全局搜索框，按钮做权限控制，点击编辑进入编辑页 ✋🏻 |
| 不支持删除评论及留言                        | 支持删除评论及留言，配置删除权限按钮 ✋🏻                      |
| 不支持展示访客来访时间                      | 支持展示访客来访时间 ✋🏻                                      |
| 昵称即账号                                  | 新增昵称，区分账号和昵称，保护用户账号 ✋🏻                    |
| 后端 - 删除或更新文件本地不删除更新前的文件 | 删除或修改文章，更新头像，将以前的文件删除，防止积累过多垃圾文件 ✋🏻 |

## 开发中遇到的问题

- 后端 - 设置 cookie 的时候 userInfo 中有中文 - 导致 cookie 设置不成功
  -  写入 cookie 时不能出现中文，需要使用`encodeURIComponent()`进行 URI 编码
  - 响应之前用 `decodeURIComponent()` 解码
- el-form 组件的 model 属性绑定的是直接的表单对象，不能是对嵌套的对象  [详情](https://blog.csdn.net/weixin_42190844/article/details/121532087)
- 无法在 router.js 和 axios.js（等外部 js 文件）里使用 pinia，原因是外部 js 文件在 pinia 实例化之前解析，从而获取不到 pinia 的 store 实例对象。应该是 vue3 待决解的一个问题。目前没有找到绝对有效的方式解决。
  - 所以我的路由守卫改成封装 `onBeforeMount` 的方式解决
- 未知原因：router 要定义在导出的 usehooks 函数内定义才生效，store 就不需要。
  - 2023.4.20 原因找到：
  - 这是因为 Vue 3 使用了基于 Proxy 的响应式系统，它的实现方式与 Vue 2 不同。在 Vue 2 中，Vue 使用了 Object.defineProperty 来劫持对象的属性，并在内部维护了一个依赖图来追踪属性之间的依赖关系。因此，在 Vue 2 中，你可以在组件外部使用 createStore 函数来创建一个 store 实例。
  - 但是在 Vue 3 中，由于基于 Proxy 的响应式系统的实现方式不同，Vue 需要在组件函数执行时才能创建实例化组件的上下文。这就意味着，如果你想在 JavaScript 文件中使用 useStore 函数获取一个 store 实例，你需要将其放在组件函数内部定义，以确保 Vue 能够正确地创建实例化组件的上下文。

```js
import { useBlogStore } from '@/store';
import { useRouter } from 'vue-router';

const store = useBlogStore();	// store在函数外定义 在函数内可以使用，函数导出有效

export function useRedirect(isAdminPages) {
  const router = useRouter(); //未知原因 router要定义在函数内才生效，store 就不需要。
   ...
   ...
}
```

- mongonDB 表定义时间要写 Date.now ，不能加括号。

## 上线遇到的问题

- 后端部署到线上环境，前端在本地测试，发现接口无效
  - 原因：线上和本地为两个域名环境。cookie 不同域不生效。
  - 把前端部署到同域名下的服务器就好了
- 前端项目部署协议升级到了 https，但是后端项目部署的还是 http，导致 https 下的浏览器不请求 http 的接口

  - 解决：把后端也升级到 https

- 后端升级 https 遇到的问题

  - 下载 https 包然后配置
  - 然后发现 https 放在本地运行无效 要放在线上环境
  - 遇见`NET::ERR_CERT_COMMON_NAME_INVALID`这个报错的原因是网站 ssl 证书颁发的域名与网站实际打开的域名（或者请求的 URL）不匹配

  - 我的项目在部署 https 访问的时候报了该错误。于是我看了一下请求后台的接口地址。发现是IP请求：`https://ip/api`，不是域名`https://www.xxx.com/api`，所以会报这个错。于是去前端把axios的请求路径换成域名形式的就ok。然后打包，重新上线！
  - [解释](https://blog.csdn.net/xzwwjl1314/article/details/105006707)
