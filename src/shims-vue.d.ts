declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

// declare module "vue/types/vue" {
//   import Vue from "vue";
//   interface VueWithProtoType extends Vue {
//     $t:any;
//     t: (key: any) => string;
//     $store: any;
//     $message: any;
//     $notify: any;
//   }
//   export default VueWithProtoType;
// }
