export const getters = {

  // 判断注册按钮是否被禁止
  registerBtnDisable(state) {
    let inputs = state.inputs;
    return !(inputs.username.isVerifyPass == true && inputs.pwd1.isVerifyPass == true && inputs.pwd2.isVerifyPass == true);
  }

}
