<template>
  <div class="header">
    <div class="nav-left">
      <i
        class="ft-20 icon-hover hover_blue"
        :class="{
          'el-icon-s-fold': fold,
          'el-icon-s-unfold': !fold
        }"
        @click="toggleSidebar"
      ></i>
    </div>
    <div class="nav-center">
      <span class="app-name">{{ }}</span>
    </div>
    <div class="nav-right">
      <LangSelect class="mr-4x"/>
      <UserMenu />
    </div>
  </div>
</template>

<script>
import LangSelect from "../Header/HeaderLangSelect.vue";
import UserMenu from "../Header/HeaderUserMenu.vue";
export default {
  components: {
    LangSelect,
    UserMenu
  },
  data() {
    return {
      general: {}
    };
  },
  computed: {
    fold() {
     return this.$store.state.ui.sidebar.fold;
    }
  },
  methods: {
    toggleSidebar() {
      let fold = !this.fold;
      this.$store.commit("ui/SET_SIDEBAR", { fold });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 2;
  box-sizing: border-box;
  height: 50px;
  padding: 0 15px;
  color: #333;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  align-items: center;

  .nav-left {
    flex: 1;
    display: flex;
    align-items: center;
  }
  .nav-center {
    display: flex;
    align-items: center;
    justify-content: center;
    .app-name {
      font-weight: bold;
      font-size: 18px;
      white-space: nowrap;
    }
  }
  .nav-right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    .el-icon-info {
      margin-left: 15px;
      font-size: 24px;
    }
  }
}
</style>
