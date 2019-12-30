export const getters = {

  isDisable(state) {
    let inputs = state.inputs;
    return !(inputs.username.isVerifyPass == true && inputs.pwd.isVerifyPass == true);
  }

}