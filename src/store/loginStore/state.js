export const state = {

  avatar: require('../../assets/avatar_default.png'),

  inputs: {

    // 保存用户名
    username: {
      // 保存输入值
      value: '',
      // 用户名格式: 英文字母开头, 6-10位
      reg: /^[A-Za-z][A-Za-z0-9_]{6,12}$/,
      // 输入框提示信息, 验证正确则置空, 错误则赋值错误提示信息errMsgTip值
      msgTip: '',
      // 保存输入框输入验证信息
      isVerifyPass: false,
      // 输入验证错误提示
      errMsgTip: '用户名格式: 字母开头,含数字字母6-10位'
    },

    // 保存首次输入密码框信息
    pwd: {
      value: '',
      // 保存密码输入框右侧小眼睛图标名称, closed-eye: 密文, eye-o: 明文, 与type类型对应
      eyeIcon: 'closed-eye',
      // 保存输入框类型, text/password
      type: 'password',
      // 密码支持格式：大写字母开头,必须包含数字字母,6-12
      reg: /^[A-Z](?=.*[0-9])(?=.*[a-zA-Z])[\w]{6,13}$/,
      msgTip: '',
      isVerifyPass: false,
      errMsgTip: '密码格式: 大写字母开头,必须含数字字母,6-12位'
    }


  },

  // 当前是否登录
  isLoading: false,

  // 当前输入元素是否通过验证
  checked: false,

  // 是否忘记密码
  isLosePassword: false

}
