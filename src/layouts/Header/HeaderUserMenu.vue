<template>
  <el-dropdown trigger="hover" @command="handleCommand">
    <span class="el-dropdown-link">
      <i class="el-icon-user"></i>
      <span class="el-dropdown-text">{{ username }}</span>
      <i class="el-icon-caret-bottom"></i>
    </span>
    <el-dropdown-menu slot="dropdown" class="nav-dropdown">
      <el-dropdown-item command="password">
        <i class="el-icon-unlock" aria-hidden="true"></i>
        {{ $t("users.changePassword") }}
      </el-dropdown-item>
      <el-dropdown-item command="logout">
        <i class="el-icon-user" aria-hidden="true"></i>
        {{ $t("users.logout") }}
      </el-dropdown-item>
    </el-dropdown-menu>
    <PasswordDialog
      v-if="passwordDialogVisible"
      :formData="passwordForm"
      @close="onPasswordClose"
      @change="onPasswordChange"
    ></PasswordDialog>
  </el-dropdown>
</template>

<script lang="ts">
import PasswordDialog from "@/components/User/PasswordDialog.vue";

import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    PasswordDialog
  }
})
export default class UserMenu extends Vue {
  public passwordDialogVisible: boolean = false;
  public passwordForm = {};
  get username() {
    return this.$store.state.user.userInfo.alias || this.$store.state.user.userInfo.username || "admin";
  }
  created() {}

  handleCommand(command: "logout" | "password") {
    if (command === "logout") {
      this.logout();
    }
    if (command === "password") {
      this.modifyPassword();
    }
  }
  logout() {
    this.$store.dispatch("logout").then((res) => {
      this.$message.success(this.$t("users.logoutSuccess") as string);
    });
  }
  modifyPassword() {
    this.passwordForm = {
      id: this.$store.state.userInfo.user_id,
      username: this.$store.state.userInfo.username
    };
    this.passwordDialogVisible = true;
  }
  onPasswordChange() {
    this.logout();
  }
  onPasswordClose(val: boolean) {
    this.passwordDialogVisible = val;
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-dropdown-link {
  display: inline-flex;
}
</style>
