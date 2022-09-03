<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%;overflow: hidden">

<!--    <video ref="firstVideo" class="backGroundStyle">-->
<!--      <source :src="firstVideo"  type="video/mp4">-->
<!--    </video>-->
    <div ref="backGroundBox" class="box">
      <div class="backGroundStyle" >
        <div class="image" :style="{backgroundImage: `url(${firstPage2})`}"></div>
      </div>
    </div>

    <img :src="thirdImg" style="position: absolute;width: 38rem;;height: 14.5rem;left: 0;bottom: 4.43rem;" />

    <img class="rollAni" :src="secondImg" style="position: absolute;width: 90rem;height: 100%;" />

    <div style="height: 10%;width: 90rem;">
      <toolbar></toolbar>
    </div>

    <div style="width: 90rem;height: 90%">
      <table style="width: 100%;height: 100%">
        <tr>
          <td style="width: 80%;text-align: center">
          </td>
          <td style="width: 10%;">
            <contacts></contacts>
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
  import toolbar from './components/toolbar'
  import contacts from './components/contacts'

  import boxes from './commonScripts/moveBackground'

  import { getImagesByImageCode } from './requestScript/firstPage'

  export default {
    name: 'firstPage',
    components: { toolbar,contacts },
    data() {
      return {
        firstVideo: '',
        firstPage2:'',
        secondImg:'',
        thirdImg:'',
        fontFamily:'',
      }
    },
    watch:{
      "$store.state.fontFamily.maxHeight":function() {
        this.$refs.alignCenter.style.maxHeight = this.$store.getters.geMaxHeight+'px';
      }
    },
    created() {
      this.$store.commit('fontFamily/CHANGE_FONT_FAMILY','cursive');
      this.fontFamily = this.$store.getters.geFontFamily;

      //首页背景图下层
      getImagesByImageCode({imageCode:'02'}).then(resp =>{
        if(resp.data.length > 0){
          this.secondImg = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })

      //首页背景图上层
      getImagesByImageCode({imageCode:'03'}).then(resp =>{
        if(resp.data.length > 0){
          this.thirdImg = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })

      //首页背景动图
      getImagesByImageCode({imageCode:'16'}).then(resp =>{
        if(resp.data.length > 0){
          this.firstPage2 = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })
    },
    mounted(){
      let video = this.$refs.firstVideo;
      if(video) {
        video.addEventListener("canplay", function() { //获取播放声音权限
          video.play().catch(function() {
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then(function() {
                video.play();
              })
              .catch(function() {
                // 获取权限错误，则静音播放
                video.muted = true;
                video.play();
              });
          });
        });
        video.addEventListener('ended', function() { //视频循环播放
          video.play();
        });
      }

      let boxElement = this.$refs.backGroundBox;
      boxes.push({
        el: boxElement,
        targetX: 0,
        targetY: 0,
        x: 0,
        y: 0,
        left: boxElement.offsetLeft,
        top: boxElement.offsetTop,
        size: boxElement.offsetWidth
      });
    },//end of mounted
    methods:{

    }//end methods
  }
</script>

<style scoped>
  @import './commonCSS/moveBackground.scss';

  .image{
    /*filter: grayscale(0.7);*/
  }

  .rollAni{
    animation: rotate 800ms linear infinite;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }

  @keyframes rotate{
    0%{
      transform: rotateZ(356deg);/*从0度开始*/
      opacity: 0;
    }
    25%{
      transform: rotateZ(357deg);
      opacity: 0.25;
    }
    50%{
      transform: rotateZ(358deg);
      opacity: 0.5;
    }
    75%{
      transform: rotateZ(359deg);
      opacity: 0.75;
    }
    100%{
      transform: rotateZ(360deg);/*360度结束*/
      opacity: 1;
    }
  }

  .alignCenter{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 1100px;
    min-height: 687px;
  }

  * {
    margin: 0;
    padding: 0
  }

  table{
    border-collapse:collapse;
    border-spacing: 0;
  }

  .backGroundStyle{
    height: 100%;
    width: 100%;
    position: absolute;
    z-index:-1;
    object-fit:fill;
    /*background: rgba(0, 0, 0, 0.7);*/
    mix-blend-mode: luminosity;
    /*filter: grayscale(1);*/
  }


  .divBase {
    width: 100%;
    height: 100%;
  }

  .oneLineDiv{
    display: inline-block;
  }

  >>> .el-breadcrumb__inner{
    color: #BDBBB7!important;
  }

  >>> .el-button--primary{
    color: #FFFFFF;
    background-color: #0D0D0D;
    border-color: #0D0D0D;
  }
</style>
