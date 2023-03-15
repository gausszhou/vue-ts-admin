<template>
  <el-dialog
    :title="$t(dialogTitile)"
    :visible.sync="dialogVisible"
    center
    width="550px"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" label-width="140px" ref="form" size="mini">
      <el-form-item prop="name" label="角色名" :rules="$rules({ required: true })">
        <el-input v-model="form.name" :placeholder="$t('users.userName')"></el-input>
      </el-form-item>
      <el-form-item prop="alias" label="角色别名" :rules="$rules({ required: true })">
        <el-input v-model="form.alias" :placeholder="$t('users.userName')"></el-input>
      </el-form-item>
      <!-- permission -->
      <div class="perm_box">
        <div class="perm_module" v-for="(perm_module, index) in permissionList" :key="index">
          <div class="perm_module_title">{{ $t(perm_module.label) }}</div>
          <div class="perm_module_content">
            <div class="perm_item" v-for="(perm, index) in perm_module.children" :key="index">
              <el-checkbox v-model="perm.checked" @change="onPermCheckedChange"></el-checkbox>
              <label :for="perm.id">{{ $t(perm.label) }}</label>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div class="dialog-footer">
      <el-button @click="handleClose" size="mini">{{ $t("button.cancel") }}</el-button>
      <el-button type="primary" @click="submitOk" size="mini">{{ $t("button.ok") }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "RolePropsDialog",
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
      dialogVisible: true,
      form: {
        id: "",
        name: "",
        permsisson: []
      },
      permissionList: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.form = this.$tools.assign(this.$options.data().form, this.dialogForm);
    this.getData();
  },
  methods: {
    getData() {
      this.getPermList();
    },
    getPermList() {
      this.$http.getPermList().then((res) => {
        this.permissionList = res.data.data;
        this.permissionList.forEach((module) => {
          module.children.forEach((perm) => {
            let checked = this.form.permission.includes(perm.id);
            this.$set(perm, "checked", checked);
          });
        });
      });
    },
    onPermCheckedChange(...args) {
      let keys = [];
      this.permissionList.forEach((module) => {
        module.children.forEach((perm) => {
          if (perm.checked) {
            keys.push(perm.id);
          }
        });
      });
      this.form.permission = keys;
    },
    submitOk() {
      let params = this.form;
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.dialogType == "add" ? this.addRoleHttp(params) : this.setRoleHttp(params);
        }
      });
    },
    addRoleHttp(params) {
      params.id = params.name;
      this.$http
        .addRole(params)
        .then((res) => {
          this.$message.success(this.$t("tips.addSuccess"));
          this.handleClose();
        })
        .catch((e) => {});
    },
    setRoleHttp(params) {
      this.$http
        .setRoleData(params)
        .then((res) => {
          this.$message.success(this.$t("tips.modifiedSuccess"));
          this.handleClose();
        })
        .catch((e) => {});
    },
    handleClose() {
      this.dialogVisible = false;
      this.form = this.$options.data().form;
      this.$emit("closed");
    }
  }
};
</script>

<style lang="scss" scoped>
.perm_box {
  width: 380px;
  margin: auto;
  margin-bottom: 1em;
  .perm_module {
    .perm_module_title {
      font-size: 1.1em;
      font-weight: 700;
    }
    .perm_module_content {
      display: flex;
      flex-wrap: wrap;
      border-bottom: 1px solid #777;
      .perm_item {
        width: 50%;
        margin: 0.5em 0;
      }
    }
    &:last-child {
      .perm_module_content {
        border: none;
      }
    }
  }
}
</style>
