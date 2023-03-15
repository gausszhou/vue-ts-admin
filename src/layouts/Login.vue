<template>
  <div class="page-layout wrap login-page">
    <div class="text-center">
      <img class="logo-img" />
      <div class="login-box">
        <div class="title">{{ $t("users.login") }}</div>
        <div class="login-main">
          <el-form :model="userInfo" ref="userInfoForm">
            <el-form-item prop="username" :rules="$rules({ required: true })">
              <el-input
                v-model="userInfo.username"
                :placeholder="$t('users.username')"
                autofocus
                autocomplete
              ></el-input>
            </el-form-item>
            <el-form-item prop="password" :rules="$rules({ required: true })">
              <el-input
                v-model="userInfo.password"
                :placeholder="$t('users.password')"
                type="password"
                @keydown.enter.native="login"
              ></el-input>
            </el-form-item>
            <el-form-item prop="language">
              <el-select v-model="defaultLocale" @change="onLocaleChange">
                <el-option
                  v-for="val in localeOptions"
                  :key="val.value"
                  :value="val.value"  
                  :label="val.label"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-button @click="login" type="primary">{{ $t("users.login") }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import userService from "@/services/user";
import { ElForm } from "element-ui/types/form";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
  public userInfo = {
    username: "",
    password: ""
  };
  public defaultLocale: "zh" | "en" = "zh";
  public localeOptions = [
    {
      value: "zh",
      label: "简体中文"
    },
    {
      value: "en",
      label: "English"
    }
  ];
  public login() {
    (this.$refs.userInfoForm as ElForm).validate((valid: boolean) => {
      if (valid) {
        let userInfo = JSON.parse(JSON.stringify(this.userInfo));
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
          userService.login({ username: username.trim(), password: password.trim() }).then((res) => {
            this.$store.commit("user/SET_USER_INFO", res.data.data);
            this.$message.success(this.$t("tips.loginSuccess") as string);
            
            resolve(res);
          });
          setTimeout(() => {
              this.$router.replace({ name: "home" });
            }, 300);
        });
      }
    });
  }
  public onLocaleChange(val: "zh" | "en") {
    this.defaultLocale = val;
    this.$store.commit('ui/SET_LOCALE', val)
  }
}
</script>

<style scoped lang="scss">
.login-page {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: #eeeeee;
  .logo-img {
    width: 300px;
  }
  .login-box {
    background-color: rgba(255, 255, 255, 0.1);
    width: 400px;
    margin-top: 10px;
    border-radius: 4px;
    box-shadow: 0px 0px 10px 0px rgba(8, 23, 170, 0.11);
    .title {
      height: 50px;
      line-height: 60px;
      font-size: 24px;
      text-align: center;
      border-radius: 4px;
    }

    .login-main {
      padding: 0 5% 20px;
      .el-button {
        width: 100%;
      }
      .el-form-item {
        margin: 25px 0;
      }
      .el-select {
        width: 360px;
      }
      .foot {
        margin-top: 15px;
        span.forgetPassword {
          float: right;
          margin-right: 40px;
          color: #999;
        }
      }
    }
  }
}

/deep/.el-form {
  .el-input,
  .el-select {
    max-width: initial !important;
  }
}
</style>
