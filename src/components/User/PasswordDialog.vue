<template>
  <el-dialog
    :visible.sync="visible"
    :title="$t('users.modifyPassword')"
    :before-close="handleClose"
    width="500px"
    append-to-body
  >
    <el-form :model="form" ref="form" class="custom-form" label-width="150px" size="mini">
      <el-form-item :label="$t('users.newPassword')" prop="password" :rules="$rules({ required: true })">
        <el-input v-model.trim="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item
        prop="passwordAgain"
        :label="$t('users.confirmNewPassword')"
        :rules="$rules({ required: true, password: form.password, confirmPassword: form.passwordAgain })"
      >
        <el-input v-model.trim="form.passwordAgain" type="password" :disabled="!form.password"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button type="primary" size="mini" @click="submitOK">{{ $t("button.ok") }}</el-button>
      <el-button type="danger" size="mini" @click="handleClose">{{ $t("button.cancel") }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "changePwdDialog",
  props: {
    formData: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      form: { 
        password: "", 
        passwordAgain: "" 
      },
      visible: true
    };
  },
  mounted() {
    Object.assign(this.form, this.formData);
  },
  watch: {
    formData(newV, oldV) {
      this.formData = newV;
    }
  },
  methods: {
    submitOK() {
      let params = this.form;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$http.setUser(params).then((res) => {
            this.$message.success(this.$t("tips.modifiedSuccess"));
            this.handleClose();
            this.$emit("change");
          });
        }
      });
    },
    handleClose() {
      this.visible = false;
      this.$emit("close", false);
    }
  }
};
</script>

<style lang="scss" scoped></style>
