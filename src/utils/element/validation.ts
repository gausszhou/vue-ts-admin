/* ElementUI 表单验证插件*/

/**
 * 参数 item
 * required true  必填项
 * maxLength  字符串的最大长度
 * min 和 max 必须同时给 min < max  type=number
 * password和passwordConfirm 两个密码是否一致验证
 * */
// $rules({ required: true})

const install = function (Vue:any, options:any) {
  Vue.prototype.$rules = function (item:any) {
    const rules = [];
    // 是否必须 $rules({ required: true })
    if (item.required) {
      rules.push({
        required: true,
        message: this.$t("validation.isRequired"),
        trigger: "blur"
      });
    }
    // 最大长度 $rules({ maxLength: 120 })
    if (item.maxLength) {
      rules.push({
        min: 1,
        max: item.maxLength,
        message: this.$t("validation.upTo") + item.maxLength + this.$t("validation.characters"),
        trigger: "blur"
      });
    }
    // 长度区间 $rules({ maxLength: 120 })
    if (item.min && item.max) {
      rules.push({
        min: item.min,
        max: item.max,
        message: this.$t("validation.characterLength") + item.min + "~" + item.max,
        trigger: "blur"
      });
    }
    // 判断密码是否一致
    if (item.password && item.passwordConfirm) {
      const passwordValid = (rule:any, value:string, callback:Function) => {
        if (item.confirmPassword !== item.password) {
          return callback(new Error(this.$t("validation.twoPwdReq")));
        } else {
          return callback();
        }
      };
      rules.push({
        validator: passwordValid,
        trigger: "blur"
      });
    }
    return rules;
  };
};

export default { install };
