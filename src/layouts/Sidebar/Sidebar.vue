<template>
  <div class="layout-sidebar" :class="{ mobile: mobile, fold: fold, unfold: !fold }">
    <div class="sidebar-mobile-mask" @click="unfoldSidebar"></div>
    <div class="sidebar">
      <div class="sidebar-logo">
      <h1 style="color:white;font-size:24px">Logo</h1>
      </div>
      <el-menu class="sidebar-nav-menu" mode="vertical" :default-active="defaultRoute" :unique-opened="true">
        <NavMenu :navMenus="navList" :collapse-transition="false" @goto="goto"></NavMenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
import NavMenu from "./SidebarNavMenu";
export default {
  name: "Sidebar",
  components: {
    NavMenu
  },
  data() {
    return {
      mobile: false
    };
  },
  computed: {
    defaultRoute() {
      return this.$route.name;
    },
    navList() {
      // return this.$store.state.routes;
      return this.$router.options.routes
    },
    fold() {
      return this.$store.state.ui.sidebar.fold;
    }
  },
  created() {
    console.log("created");
  },
  mounted() {
    this.onWindowResize();
    window.addEventListener("resize", (e) => {
      this.onWindowResize();
    });
  },
  methods: {
    onWindowResize() {
      let width = window.innerWidth;
      let fold = this.fold;
      if (width < 960) {
        this.mobile = true;
        fold = false;
      } else {
        this.mobile = false;
        fold = true;
      }
      this.$store.commit("ui/SET_SIDEBAR", { fold });
    },
    unfoldSidebar() {
      this.$store.commit("ui/SET_SIDEBAR", { fold: false });
    },
    goto({ name }) {
      if (name && this.$route.name != name) {
        this.$router.push({ name }).then((res) => {
          if (this.mobile) {
            this.unfoldSidebar();
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.layout-sidebar {
  height: 100vh;
}
.sidebar {
  background: #2f3448;
  width: 250px;
  height: 100%;
  overflow-x: hidden;
  transition: all 0.3s ease-out;
  .sidebar-logo {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    .nav-logo-img {
      height: 40px;
    }
  }
  .sidebar-nav-menu {
    background: transparent;
    &.el-menu {
      border-right: none;
    }
  }
}

.sidebar-mobile-mask {
  display: none;
}

// 移动端 展开
.mobile {
  .sidebar {
    z-index: 4;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
  }
}

// 移动端 展开
.mobile.fold {
  .sidebar-mobile-mask {
    display: block;
    position: fixed;
    z-index: 3;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.2);
  }
}

// 收起
.unfold {
  .sidebar {
    width: 0;
  }
}
</style>
