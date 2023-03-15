<template>
  <el-dialog
    :title="$t(dialogTitile)"
    :visible.sync="visible"
    width="550px"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" label-width="140px" ref="form" size="small">
      <el-form-item prop="username" :label="$t('users.userName')" :rules="$rules({ required: true })">
        <el-input
          v-model="form.username"
          :placeholder="$t('users.userName')"
          :disabled="dialogType == 'pwd'"
        ></el-input>
      </el-form-item>
      <el-form-item
        v-if="dialogType == 'add' || dialogType == 'edit'"
        prop="alias"
        :label="$t('users.alias')"
        :rules="$rules({ required: true })"
      >
        <el-input v-model="form.alias" :placeholder="$t('users.alias')"></el-input>
      </el-form-item>
      <el-form-item
        v-if="dialogType == 'add' || dialogType == 'edit'"
        prop="roleids"
        :label="$t('users.role')"
        :rules="$rules({ required: true })"
      >
        <el-select v-model="form.role">
          <el-option v-for="(item, index) in roleList" :key="index" :value="item.id" :label="item.alias"></el-option>
        </el-select>
      </el-form-item>
      <!-- department -->
      <el-form-item
        v-if="dialogType == 'add' || dialogType == 'edit'"
        prop="department"
        :label="$t('users.department')"
        :rules="$rules({ required: true })"
      >
        <el-cascader
          v-model="form.department"
          :options="departmentTree.children"
          :props="{ expandTrigger: 'hover', children: 'children', value: 'label', label: 'label' }"
          :checkStrictly="true"
          :emitPath="false"
          :multiple="false"
        ></el-cascader>
      </el-form-item>
      <!-- password -->
      <el-form-item
        v-if="dialogType == 'add' || dialogType == 'pwd'"
        prop="password"
        :label="$t('users.newPassword')"
        :rules="$rules({ required: true })"
      >
        <el-input v-model="form.password" type="password" :placeholder="$t('users.newPassword')"></el-input>
      </el-form-item>
      <el-form-item
        prop="confirmNewPassword"
        :label="$t('users.confirmNewPassword')"
        v-if="dialogType == 'add' || dialogType == 'pwd'"
        :rules="$rules({ required: true, password: form.password, confirmPassword: form.confirmNewPassword })"
      >
        <el-input
          v-model="form.confirmNewPassword"
          type="password"
          :placeholder="$t('users.confirmNewPassword')"
          :disabled="!form.password"
        ></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="handleClose" size="mini">{{ $t("button.cancel") }}</el-button>
      <el-button type="primary" @click="submitOk" size="mini">{{ $t("button.ok") }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "userDialog",
  props: {
    dialogTitile: {
      type: [String]
    },
    dialogType: {
      type: [String]
    },
    dialogForm: {
      type: [Object]
    }
  },
  data() {
    return {
      visible: true,
      form: {
        id: "",
        role: "",
        username: "",
        alias: "",
        password: "",
        department: [],
        confirmNewPassword: ""
      },
      roleList: "",
      departmentTree: {}
    };
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo;
    }
  },
  created() {
    this.form = this.$tools.assign(this.$options.data().form, this.dialogForm);
    this.getData();
  },
  methods: {
    getData() {
      this.getRoleList();
      this.getDepartment();
    },
    getRoleList() {
      this.$http.getRoleList().then((res) => {
        this.roleList = res.data.data;
      });
    },
    getDepartment() {
      this.$http.getDepartment().then((res) => {
        this.departmentTree = res.data.data;
        this.formatTree(this.departmentTree);
        console.log(this.departmentTree)
      });
    },
    formatTree(tree) {
      tree.children && tree.children.forEach((node) => {
        if (node.children && node.children.length == 0) {
          delete node.children;
        } else {
          this.formatTree(node);
        }
      });
    },
    submitOk() {
      let params = this.form;
      delete params.confirmNewPassword;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogType == "add" ? this.addUserHttp(params) : this.setUserHttp(params);
        }
      });
    },
    addUserHttp(params) {
      this.$http
        .addUser(params)
        .then((res) => {
          this.$message.success(this.$t("tips.addSuccess"));
          this.handleClose();
        })
        .catch((e) => {});
    },
    setUserHttp(params) {
      this.$http
        .setUserData(params)
        .then((res) => {
          this.$message.success(this.$t("tips.modifiedSuccess"));
          if (this.dialogType == "pwd" && params.username == this.$store.state.userInfo.username) {
            this.$store.dispatch("logout");
          }
          this.handleClose();
        })
        .catch((e) => {});
    },
    handleClose() {
      this.visible = false;
      this.form = this.$options.data().form;
      this.$emit("closed");
    }
  }
};
</script>
