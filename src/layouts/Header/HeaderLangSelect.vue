<template>
  <el-dropdown trigger="hover" @command="onLocaleChange">
    <div class="langChange">
      <i class="iconfont icon-language"></i>
    </div>
    <el-dropdown-menu slot="dropdown" class="lang_popover">
      <el-dropdown-item
        v-for="val in localeOptions"
        :key="val.value"
        :disabled="$i18n.locale == val.value"
        :command="val.value"
      >
        {{ val.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class LocaleSelect extends Vue {
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
  public onLocaleChange(val: "zh" | "en") {
    this.$store.commit('ui/SET_LOCALE', val)
  }
}
</script>
