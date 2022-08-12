<template>
  <div class="divBase">

    <div @click="bigVideoDivClick" v-show="showBigVideo" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
      <video :src="firstVideo" @click="bigVideoClick" ref="bigVideo" style="position: absolute;width: 60%;left: 15%;top: 20%;height: 70%;object-fit: fill;" controlslist="nofullscreen" controls>
        <source type="video/mp4">
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
                      <div class="BoldItalic" style="top: 20%;left: 20%;position: absolute">
                        {{this.whatWeDo}}
                      </div>
                    </td>
                    <td style="width: 50%;color: #BAB9B6;text-align: left;vertical-align: top;font-size: 18px">
                      <div class="inter" style="padding-top: 10%">
                        {{this.whatWeDoText1}}
                      </div>
                      <div class="inter" style="padding-top: 5%">
                        {{this.whatWeDoText2}}
                      </div>
                      <div class="inter" style="padding-top: 5%">
                        {{this.whatWeDoText3}}
                      </div>
                    </td>
                    <td style="width: 20%"></td>
                  </tr>
                </table>
              </div>
              <div style="width: 100%;height: 10%;color: #F5F5F5;font-size: 20px;font-style:oblique;">
                <table class="divBase" v-show="!showVideo">
                  <tr @click="showVideo = !showVideo">
                    <td @click="fontButtonClick(0)" class="BoldItalic" style="width: 10%;vertical-align: bottom;text-align: right">MUSIC</td>
                    <td @click="fontButtonClick(1)" class="BoldItalic" style="width: 25%;vertical-align: bottom;text-align: center">SOUND DESIGN</td>
                    <td @click="fontButtonClick(2)" class="BoldItalic" style="width: 18%;vertical-align: bottom;text-align: left">VOICE ACTING</td>
                    <td @click="fontButtonClick(3)" class="BoldItalic" style="width: 37%;vertical-align: bottom;text-align: left">GAME AUDIO PIPELINE</td>
                  </tr>
                </table>
              </div>

              <div style="width: 100%;height: 50%;">
                <table class="divBase">
                  <tr>
                    <td style="width: 60%;height: 100%;position: relative">
                      <div style="width: 30%;height: 100%;display: inline-block;font-size: 20px;">
                        <ul class="divAnimate" ref="childTr" v-show="showVideo">
                          <li @click="fontButtonClick(0)" class="fontButton BoldItalic">MUSIC</li>
                          <li @click="fontButtonClick(1)" class="fontButton BoldItalic">SOUND DESIGN</li>
                          <li @click="fontButtonClick(2)" class="fontButton BoldItalic">VOICE ACTING</li>
                          <li @click="fontButtonClick(3)" class="fontButton BoldItalic">GAME AUDIO PIPELINE</li>
                        </ul>
                      </div>
                      <div class="divAnimate" style="width: 70%;height: 100%;display: inline-block;position: relative" v-show="showVideo">
                          <video :src="firstVideo" @click="clickVideo" style="position: absolute;width: 70%;left: 20%;top: 10%;height: 70%;object-fit: fill;" controlslist="nofullscreen" controls>
                            <source type="video/mp4">
                          </video>
                      </div>
                    </td>

                    <td style="width: 40%;height: 100%;position: relative">
                      <div class="divAnimate" v-show="showVideo" style="width: 90%;height: 50%;position: absolute;left: 0;top: 15%;overflow: hidden">
                        <div ref="carouselImgBox" class="carouselImgBox">
                          <img style="width: 100%;height: 100%" v-for="item in carouselImgPaths"
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
  import boxes from './commonScripts/moveBackground'

  import { getVideo,getRotation,getWord } from './requestScript/OurService'

  export default {
    name: 'ourServices',
    components: { toolbar, contacts },
    data() {
      return {
        whatWeDo:'',
        whatWeDoText1:'',
        whatWeDoText2:'',
        whatWeDoText3:'',
        showVideo: false,
        bigVideoIsClicked:false,
        showBigVideo: false,
        firstVideo: '',
        carouselImgPaths: [],
      }
    },
    created() {
      getWord().then(resp =>{
        if(resp.data.length > 0){
          for(let i = 0;i < resp.data.length;i++){
            if(resp.data[i].wordType == "WhatWeDo"){
              this.whatWeDo = resp.data[i]["wordText"+this.$store.getters.getLanguage];
            }else{
              let text = resp.data[i]["wordText"+this.$store.getters.getLanguage];
              let textArr = text.split('\n');
              if(textArr.length == 3){
                this.whatWeDoText1 = textArr[0];
                this.whatWeDoText2 = textArr[1];
                this.whatWeDoText3 = textArr[2];
              }
            }
          }
        }
      })
    },
    mounted() {
      let carouselImages = this.$refs.carouselImgBox.children
      let carouselIndex = 0
      setInterval(function() {//循环播放图片
        if(carouselImages.length > 0) {
          carouselImages[carouselIndex].style.display = 'none'
          if (++carouselIndex == carouselImages.length) {
            carouselIndex = 0
          }
          carouselImages[carouselIndex].style.display = 'block'
        }
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

        let videoType = '0'+(index+1);
        getVideo({videoType:videoType}).then(resp =>{
          if(resp.data != ""){
            this.firstVideo = resp.data;
          }
        });

        getRotation({code:index}).then(resp =>{
          if(resp.data.length > 0){
            this.carouselImgPaths = resp.data;
          }
        })
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

  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic
  }

  .divAnimate{
    animation:animateNum 3s 1;
  }
  @keyframes animateNum{
    0%{opacity: 0;}
    100%{opacity: 1;}
  }

  .inter{
    font-family: inter;
    font-style: normal;
  }

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
