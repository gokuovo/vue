<template>
  <div class="divBase">

    <div @click="bigVideoDivClick" v-show="showBigVideo" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
      <video @click="bigVideoClick" ref="bigVideo" style="position: absolute;width: 60%;left: 15%;top: 20%;height: 70%;object-fit: fill;" controlslist="nofullscreen" controls>
        <source :src="showingInfo.firstVideo" type="video/mp4">
      </video>
    </div>

    <div style="height: 10%;width: 100%">
      <toolbar></toolbar>
    </div>

    <div ref="selfOpacity" style="height: 85%;width: 100%;">
      <table class="divBase">
        <tr>
          <td style="width: 80%;text-align: center">
            <div class="divBase">
              <div style="width: 100%;height: 40%">
                <table class="divBase">
                  <tr>
                    <td style="width: 30%;color: #F5F5F5;font-size: 28px;vertical-align: top;position: relative">
                      <div style="top: 20%;left: 20%;position: absolute">
                        WHAT WE DO
                      </div>
                    </td>
                    <td style="width: 50%;color: #BAB9B6;text-align: left;vertical-align: top">
                      <div style="padding-top: 10%">
                        We hold high standard for our works.
                      </div>
                      <div style="padding-top: 5%">
                        We see every game and film as art; based on that we design, compose our music that fits in
                        "three element" as the core.
                      </div>
                      <div style="padding-top: 5%">
                        Therefore, our music and audio projects have won many awards in IGF,
                        IMGA,INDIEPLAY,GMGC,CMA，ANIWow and so on.
                      </div>
                    </td>
                    <td style="width: 20%"></td>
                  </tr>
                </table>
              </div>
              <div style="width: 100%;height: 10%;color: #F5F5F5;font-size: 18px;font-style:oblique;">
                <table class="divBase" v-show="!showVideo">
                  <tr @click="showVideo = !showVideo">
                    <td style="width: 10%;vertical-align: bottom;text-align: right">MUSIC</td>
                    <td style="width: 25%;vertical-align: bottom;text-align: center">SOUND DESIGN</td>
                    <td style="width: 18%;vertical-align: bottom;text-align: left">VOICE ACTING</td>
                    <td style="width: 37%;vertical-align: bottom;text-align: left">GAME AUDIO PIPELINE</td>
                  </tr>
                </table>
              </div>

              <div style="width: 100%;height: 50%;">
                <table class="divBase">
                  <tr>
                    <td style="width: 60%;height: 100%;position: relative">
                      <div style="width: 30%;height: 100%;display: inline-block">
                        <ul ref="childTr" v-show="showVideo">
                          <li @click="fontButtonClick(0)" class="fontButton">MUSIC</li>
                          <li @click="fontButtonClick(1)" class="fontButton">SOUND DESIGN</li>
                          <li @click="fontButtonClick(2)" class="fontButton">VOICE ACTING</li>
                          <li @click="fontButtonClick(3)" class="fontButton">GAME AUDIO PIPELINE</li>
                        </ul>
                      </div>
                      <div style="width: 70%;height: 100%;display: inline-block;position: relative" v-show="showVideo">
                          <video @click="clickVideo" style="position: absolute;width: 70%;left: 20%;top: 10%;height: 70%;object-fit: fill;" controlslist="nofullscreen" controls>
                            <source :src="showingInfo.firstVideo" type="video/mp4">
                          </video>
                      </div>
                    </td>

                    <td style="width: 40%;height: 100%;position: relative">
                      <div v-show="showVideo"
                           style="width: 90%;height: 50%;position: absolute;left: 0;top: 15%;overflow: hidden">
                        <div ref="carouselImgBox" class="carouselImgBox">
                          <img style="width: 100%;height: 100%" v-for="item in showingInfo.carouselImgPaths"
                               :src="item"/>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>

          <td style="width: 20%;padding-left: 2%">
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
  import { findStorageByUserId } from './requestScript/OurService'

  import boxes from './commonScripts/moveBackground'

  export default {
    name: 'ourServices',
    components: { toolbar, contacts },
    data() {
      return {
        showVideo: false,
        bigVideoIsClicked:false,
        showBigVideo: false,
        infoDetails: [
          {
            firstVideo: require('@/assets/404_images/movie.mp4'),
            carouselImgPaths: [require('@/assets/images/font.png'), require('@/assets/images/font2.png'), require('@/assets/images/font3.png')]
          },
          {
            firstVideo: require('@/assets/404_images/movie.mp4'),
            carouselImgPaths: [require('@/assets/images/font.png'), require('@/assets/images/font2.png'), require('@/assets/images/font3.png')]
          }
        ],
        showingInfo: {}
        // links:[{key:'PERFECT WORLD GAMES',value:'https://www.baidu.com'},{key:'FUN PLUS',value:'https://www.baidu.com'},{key:'TOP JOY',value:'https://www.baidu.com'},{key:'CENTURY GAMES',value:'https://www.baidu.com'}],
      }
    },
    created() {
      // findStorageByUserId({
      //   userId: 1
      // }).then(resp => {
      //   console.log(resp)
      // })

      this.showingInfo = this.infoDetails[0]
    },
    mounted() {
      let carouselImages = this.$refs.carouselImgBox.children
      let carouselIndex = 0
      setInterval(function() {//循环播放图片
        carouselImages[carouselIndex].style.display = 'none'
        if (++carouselIndex == carouselImages.length) {
          carouselIndex = 0
        }
        carouselImages[carouselIndex].style.display = 'block'
      }, 5000)

    },
    methods: {
      fontButtonClick(index) {
        //还要切换视频内容
        let childrens = this.$refs.childTr.childNodes
        for (let i = 0; i < childrens.length; i++) {
          if (i == index) {
            childrens[i].style.color = 'red'
          } else {
            childrens[i].style.color = '#F5F5F5'
          }
        }
      },

      clickVideo(){
        this.showBigVideo = true;
        this.$refs.selfOpacity.style.opacity = 0.23;
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
          this.$refs.selfOpacity.style.opacity = 1;
          this.$refs.bigVideo.pause();
        }
        this.bigVideoIsClicked = false;
      }
    }
  }
</script>

<style scoped>
  @import './commonCSS/moveBackground.scss';

  .fontButton:hover {
    color: red;
  }

  .divBase {
    width: 100%;
    height: 100%;
  }

  .carouselImgBox {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  >>> .el-breadcrumb__inner {
    color: #BDBBB7 !important;
  }

  >>> .el-button--primary {
    color: #FFFFFF;
    background-color: #0D0D0D;
    border-color: #0D0D0D;
  }

  ul {
    position: absolute;
    top: 5%;
    left: 12%;
    padding: 0;
    list-style-type: none;
    height: 100%;
    width: 100%;
    text-align: left;
    color: #F5F5F5;
    font-size: 18px;
    font-style: oblique;
  }

  li {
    height: 20%;
  }
</style>
