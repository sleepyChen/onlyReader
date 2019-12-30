class FormTest{

  constructor() {}

  // 用户名/密码验证
  regTest(ruleGather){
    return ruleGather.reg.test(ruleGather.value);
  }

  // 再次输入密码验证两次输入是否相同
  equalPwdTest(value1, value2) {
    return value1 === value2;
  }

}

export const formTest = new FormTest();