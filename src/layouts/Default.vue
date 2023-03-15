<template>
  <div class="page-layout default">
    <div class="page-layout-sidebar">
      <Sidebar :mobile="mobile" />
    </div>
    <div class="page-layout-container">
      <HeaderBar />
      <div class="page-layout-main">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderBar from "@/layouts/Header/Header";
import Sidebar from "@/layouts/Sidebar/Sidebar";
export default {
  components: {
    HeaderBar,
    Sidebar
  },
  data() {
    return {
      mobile: false
    };
  }
};
</script>

<style lang="scss" scoped>
.page-layout.default {
  height: 100vh;
  display: flex;
  overflow-y: auto;
  .page-layout-sidebar {
    height: 100vh;
    text-align: left;
    box-sizing: border-box;
    background: #2f3448;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  }
  .page-layout-container {
    flex: 1;
    overflow-y: auto;
    background: #eff0f3;
  }
  .page-layout-main {
    height: calc(100% - 70px);
    padding: 10px;
  }
}
</style>
