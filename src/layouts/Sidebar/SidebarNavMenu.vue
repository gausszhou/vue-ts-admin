<template>
  <div class="nav-menu-box">
    <template v-for="navMenu in navMenus">
      <!-- 此菜单下还有子菜单 递 -->
      <el-submenu
        v-if="navMenu.children && navMenu.children.length > 1"
        :key="navMenu.name"
        :data="navMenu"
        :index="navMenu.name"
      >
        <template slot="title">
          <i class="menu-item-icon iconfont" :class="navMenu.meta.icon"></i>
          <span class="menu-item-label">{{ $t(navMenu.meta.title) }}</span>
        </template>
        <!-- 递 -->
        <NavMenu :navMenus="navMenu.children" @goto="goto"></NavMenu>
      </el-submenu>
      <el-menu-item
        v-else-if="navMenu.children && navMenu.children.length == 1"
        :key="navMenu.meta.title"
        :index="navMenu.name"
        @click="goto(navMenu.children[0])"
      >
        <i class="menu-item-icon iconfont" :class="navMenu.meta.icon"></i>
        <template slot="title">
          <span class="menu-item-label">{{ $t(navMenu.meta.title) }}</span>
        </template>
      </el-menu-item>
      <!-- 最后一级菜单 归  -->
      <el-menu-item
        v-if="!navMenu.children"
        :key="navMenu.meta.titlel"
        :index="navMenu.name || navMenu.label"
        @click="goto(navMenu)"
      >
        <i class="menu-item-icon iconfont" :class="navMenu.meta.icon"></i>
        <template slot="title">
          <span class="menu-item-label">{{ $t(navMenu.meta.title) }}</span>
        </template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "NavMenu",
  props: {
    navMenus: {
      type: [Array, Object]
    }
  },
  methods: {
    goto(nav) {
      this.$emit("goto", nav);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/.nav-menu-box {
  background-color: #2f3448;
  .el-submenu__title,
  .el-menu-item {
    color: #e6e6e6;
    padding-left: 10px;
    padding-right: 10px;
  }

  .menu-item-icon {
    margin: 0 0.5em;
    color: inherit;
  }

  .el-submenu__title:hover,
  .el-submenu__title:focus,
  .el-menu-item:hover,
  .el-menu-item:focus,
  .el-menu-item.is-active {
    color: #e6e6e6;
    background: #4165d7;
  }
}
</style>
