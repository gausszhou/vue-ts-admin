// 保存一个错误码的引用
const config = {
  title:'',
  error_code: {}
};

let mainTitle = "General Management System";
let subTitle = "";

Object.defineProperty(config, "title", {
  get() {
    if(subTitle) return `${subTitle} | ${mainTitle}`;
    return mainTitle;
  },
});

export function setMainTitle(title:string){
  mainTitle = title;
  document.title = config.title;
}

export function setSubTitle(title:string){
  subTitle = title;
  document.title = config.title;
}

setMainTitle(mainTitle)
export default config;
