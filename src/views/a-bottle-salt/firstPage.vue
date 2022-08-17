<template>
  <div class="divBase">

<!--    <video ref="firstVideo" class="backGroundStyle">-->
<!--      <source :src="firstVideo"  type="video/mp4">-->
<!--    </video>-->
    <div ref="backGroundBox" class="box">
      <div class="image-wrap">
        <div class="image" :style="{backgroundImage: `url(${firstPage})`}"></div>
      </div>
    </div>

    <div style="height: 10%;width: 90rem;background-color: #0D0D0D;">
      <toolbar></toolbar>
    </div>

    <div style="width: 90rem;height: 90%">
      <table style="width: 100%;height: 100%">
        <tr>
          <td style="width: 80%;text-align: center">
            <div style="width: 100%;height: 80%;position: relative">
              <img :src="secondImg" style="position: absolute;width: 80%;height: 100%;left: 7rem" />
              <img :src="thirdImg" style="position: absolute;width: 20%;;height: 15%;left: 10rem;bottom: 3rem;" />
            </div>
          </td>
          <td style="width: 20%;">
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
        firstPage:'',
        secondImg:'',
        thirdImg:'',
        fontFamily:'',
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
          this.firstPage = resp.data[0].imageUrl.replaceAll('\\','\/');
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
    opacity: 0.9;
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
