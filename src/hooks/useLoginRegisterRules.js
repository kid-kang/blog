export const useLoginRegisterRules = function (formData, key) {
  return {
    name: [
      { required: true, message: "请输入昵称" },
      {
        validator(rule, value, callback) {
          if (/([a-zA-Z0-9_]{1,16})|([\u4e00-\u9fa5]{2,8})|([a-zA-Z0-9_\u4e00-\u9fa5]{3,12})/.test(value)) {
            callback(); //验证成功
          } else {
            callback(new Error("昵称不符合规范"));
          }
        },
      },
    ],
    user: [
      { required: true, message: "请输入用户名" },
      {
        validator(rule, value, callback) {
          if (/^[a-zA-Z0-9_]{5,18}$/.test(value)) {
            callback(); //验证成功
          } else {
            callback(new Error("只允许5~18位字母、数字和下划线"));
          }
        },
      },
    ],
    oldPassword: [
      { required: true, message: "请输入密码" },
      {
        validator(rule, value, callback) {
          if (/^[a-zA-Z0-9_]{6,18}$/.test(value)) {
            callback(); //验证成功
          } else {
            callback(new Error("只允许6~18位字母、数字和下划线"));
          }
        },
      },
    ],
    password: [
      { required: true, message: "请输入密码" },
      {
        validator(rule, value, callback) {
          if (/^[a-zA-Z0-9_]{6,18}$/.test(value)) {
            callback(); //验证成功
          } else {
            callback(new Error("只允许6~18位字母、数字和下划线"));
          }
        },
      },
    ],
    rePassword: [
      { required: true, message: "请确认密码" },
      {
        validator: (rule, value, callback) => {
          if (formData[key].password === value) {
            callback(); //密码一致
          } else {
            callback(new Error("两次密码不一致"));
          }
        },
      },
    ],
    reNewPassword: [
      { required: true, message: "请确认密码" },
      {
        validator: (rule, value, callback) => {
          if (formData[key].password === value) {
            callback(); //密码一致
          } else {
            callback(new Error("两次密码不一致"));
          }
        },
      },
    ],
  };
};