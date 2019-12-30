export const state = {

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
      errMsgTip: '格式错误,字母开头,含数字字母6-10位'
    },

    // 保存首次输入密码框信息
    pwd1: {
      value: '',
      // 保存密码输入框右侧小眼睛图标名称, closed-eye: 密文, eye-o: 明文, 与type类型对应
      eyeIcon: 'closed-eye',
      // 保存输入框类型, text/password
      type: 'password',
      // 密码支持格式：大写字母开头,必须包含数字字母,6-12
      reg: /^[A-Z](?=.*[0-9])(?=.*[a-zA-Z])[\w]{6,13}$/,
      msgTip: '',
      isVerifyPass: false,
      errMsgTip: '格式错误,大写字母开头,必须含数字字母,6-12位'
    },

    // 保存确认输入密码框信息
    pwd2: {
      value: '',
      eyeIcon: 'closed-eye',
      type: 'password',
      msgTip: '',
      isVerifyPass: false,
      errMsgTip: '两次密码输入不一致！'
    },

    // 保存手机号输入框输入信息
    phone: {
      value: '',
      reg: '',
      msgTip: '',
      isVerifyPass: false,
      errMsgTip: '手机号输入错误'
    }

  },

  // 注册中...
  isLoading: false,


  userMsg: {
    // 用户名
    username: '',
    // 密码
    password: '',
    // 注册时间
    registerTime: '',
    // 用户头像
    avatarImg: '',
    // 数组保存购票信息
    ticketMsg: [],
    // 保存用户想看的或收藏的影片
    loveOrCollect: []
  }

}
