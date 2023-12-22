<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%;overflow: hidden">

<!--    <video ref="firstVideo" class="backGroundStyle">-->
<!--      <source :src="firstVideo"  type="video/mp4">-->
<!--    </video>-->
    <div ref="backGroundBox" class="box" style="opacity: 0.3">
      <div class="backGroundStyle image-wrap" >
        <div class="image" :style="{backgroundImage: `url(${firstPage2})`}"></div>
      </div>
    </div>

    <div @click="bigVideoDivClick" v-if="showBigVideo" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
      <video :src="firstVideo.videoUrl" @click="bigVideoClick" ref="bigVideo" style="position: absolute;width: 60%;left: 20%;top: 15%;height: 70%;object-fit: fill;" controlslist="nofullscreen" controls>
        <source type="video/mp4">
      </video>
    </div>
    <div @click="clickVideo" class="videoButton">
      <span @click="clickVideo" class="videoFont">PLAY INTRO</span>
      <img src="../../assets/images/Polygon.png" style="width: 1rem;height: 1rem;object-fit: contain;margin-left: 0.3rem">
    </div>


    <img :src="thirdImg" style="position: absolute;width: 38rem;;height: 14.5rem;left: 0;bottom: 4.43rem;z-index: 1" />

    <img ref="selfOpacity" class="rollAni" :src="secondImg" style="position: absolute;width: 90rem;height: 100%;z-index: -1" />

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

    <div style="position: absolute;bottom: 2rem;left: 50%;color: #514f4f;">
      <a href="https://beian.miit.gov.cn/" target="_blank">京ICP备20006697号-1</a>
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
        showBigVideo:false,
        bigVideoIsClicked:false,
        firstVideo: {videoUrl:'http://101.43.132.47:5000/assets/2022/08/11/994978918c554b93a068ce2cd9fd391c.mp4'},
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
      clickVideo(){
        this.showBigVideo = true;
        this.$refs.selfOpacity.style.filter= 'brightness(23%)';
      },

      bigVideoClick(){
        this.bigVideoIsClicked = true;
        let video = this.$refs.bigVideo;
        if (video.paused || video.ended) video.play();
        else video.pause();
      },

      bigVideoDivClick(){
        if(!this.bigVideoIsClicked){
          this.showBigVideo = false;
          this.$refs.selfOpacity.style.filter= 'brightness(100%)';
          this.$refs.bigVideo.pause();
        }
        this.bigVideoIsClicked = false;
      }
    }//end methods
  }
</script>

<style scoped>
  @import './commonCSS/moveBackground.scss';

  .pointer{
    pointer-events: none;
  }

  .videoButton{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0.375rem 0.5rem 0.375rem 0.75rem;
    gap: 0.125rem;
    position: absolute;
    width: 7.875rem;
    min-width: 108px;
    height: 2.25rem;
    left: 76.125rem;
    top: 49rem;
    background: #BE4123;
    border-radius: 0.3125rem;
  }

  .videoFont{
    font-family: DIN-BoldItalic;
    font-style: italic;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.125rem;
    text-align: right;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #E3E1DB;
  }

  .videoFont:hover{
    cursor: pointer;
  }

  .image{
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    background-blend-mode: normal, luminosity;
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
