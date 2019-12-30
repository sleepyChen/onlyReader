import { formTest } from '../../tools/formTest'

export const mutations = {
  // 查看输入密码：明文/密文切换
  checkPassword(state) {

    let inputs = state.inputs;

    // 输入框输入类型切换
    inputs.pwd.type = inputs.pwd.type == 'password' ? 'text' : 'password';
    // 输入框eye-icon切换
    inputs.pwd.eyeIcon = inputs.pwd.eyeIcon == 'closed-eye' ? 'eye-o' : 'closed-eye';

  },


  // 用户名、密码验证
  regTest(state, type) {
    
    let inputs = state.inputs;

    let isValid = null;

    // 用户名输入验证, 首次密码输入验证
    isValid = formTest.regTest({
      value: inputs[type].value,
      reg: inputs[type].reg
    });

    // 赋值返回提示信息
    inputs[type].msgTip = isValid ? '' : inputs[type].errMsgTip;
    inputs[type].isVerifyPass = isValid ? true : false;

  },

  login(state, isPass) {
    state.isLoading = isPass;
  },

  isCheck(state) {
    state.checked = !state.checked;
  },

  register(state) {
    let inputs = state.inputs;
    for (let key in inputs) {
      inputs[key].value = '';
      inputs[key].isVerifyPass = false;
    }
  },

  setAvatar(state, avatar) {
    state.avatar = avatar;
  }

}
