import store from '@/store'
// 基准大小
const baseSize = 10;
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 1440 宽的缩放比例，可根据自己需要修改。
  let width = document.documentElement.clientHeight * 1.6;
  if(document.documentElement.clientWidth < width){
      let maxHeight = (document.documentElement.clientWidth/1.6);
      store.commit('fontFamily/CHANGE_MAX_HEIGHT',maxHeight);
      width = maxHeight * 1.6;
  }else{
      store.commit('fontFamily/CHANGE_MAX_HEIGHT',document.documentElement.clientHeight);
  }
  let scale = (width / 900);
  scale = scale < 1.22 ? 1.22 : scale;
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize =
    (baseSize * Math.min(scale, 3)).toFixed(2) + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};
