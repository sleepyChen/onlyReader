import {
  formTest
} from '../../tools/formTest'

export const mutations = {


  // 查看输入密码：明文/密文切换
  checkPassword(state, pwd) {

    let inputs = state.inputs;

    // 输入框输入类型切换
    inputs[pwd].type = inputs[pwd].type == 'password' ? 'text' : 'password';
    // 输入框eye-icon切换
    inputs[pwd].eyeIcon = inputs[pwd].eyeIcon == 'closed-eye' ? 'eye-o' : 'closed-eye';

  },

  // 用户名、密码验证
  regTest(state, type) {

    let inputs = state.inputs;

    let isValid = null;

    if (type == 'pwd2') {

      // 确认密码验证
      isValid = formTest.equalPwdTest(inputs.pwd1.value, inputs.pwd2.value);

    } else {

      // 用户名输入验证, 首次密码输入验证
      isValid = formTest.regTest({
        value: inputs[type].value,
        reg: inputs[type].reg
      });

    }

    // 赋值返回提示信息
    inputs[type].msgTip = isValid ? '' : inputs[type].errMsgTip;
    inputs[type].isVerifyPass = isValid ? true : false;

  },

  // 注册
  register(state, isPass) {
    state.isLoading = isPass;
  },

  login(state) {

    let inputs = state.inputs;

    for (let key in inputs) {
      inputs[key].value = '';
      inputs[key].isVerifyPass = false;
    }

  },

  // 保存登录用户信息
  setUserMsg(state, obj) {
    state.userMsg.username = obj.username;
    state.userMsg.password = obj.password;
    state.userMsg.registerTime = obj.registerTime;
  },

  // 保存用户头像
  setAvatarImg(state, avatarImg) {
    state.userMsg.avatarImg = avatarImg;
  }

}
