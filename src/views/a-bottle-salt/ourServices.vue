<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">

    <div ref="backGroundBox" class="box">
      <div class="image-wrap">
        <div class="image" :style="{backgroundImage: `url(${firstImg})`}"></div>
      </div>
    </div>

    <div @click="bigVideoDivClick" v-if="showBigVideo" style="position: absolute;width: 100%;height: 100%;z-index: 2;">
      <video :src="firstVideo.videoUrl" @click="bigVideoClick" ref="bigVideo" style="position: absolute;width: 60%;left: 20%;top: 15%;height: 70%;object-fit: fill;" controlslist="nofullscreen" controls>
        <source type="video/mp4">
      </video>
    </div>

    <div style="width: 90rem;height: 10%;">
      <toolbar></toolbar>
    </div>

    <div ref="selfOpacity" style="height: 85%;width: 100rem;">
      <table class="divBase">
        <tr>
          <td style="width: 80%;text-align: center">
            <div class="divBase">
              <div style="width: 100%;height: 50%">
                <table class="divBase">
                  <tr>
                    <td style="width: 90%;font-size: 28px;vertical-align: top;position: relative">
                      <div class="BoldItalic" style="top: 6.25rem;left: 6rem;position: absolute;font-size: 2.625rem;color: #B8B7B2;font-weight: 500">
                        {{this.whatWeDo}}
                      </div>

                      <div class="inter" style="top: 6.25rem;left: 26.75rem;width: 44rem;height: 1.43rem;text-align: left;position: absolute;line-height: 130%;color: #E3E1DB;font-weight: 200;font-size: 1.125rem;">
                        {{this.whatWeDoText1}}
                      </div>
                      <div class="inter" style="top: 8.93rem;left: 26.75rem;width: 44rem;height: 2.87rem;text-align: left;position: absolute;line-height: 130%;color: #E3E1DB;font-weight: 200;font-size: 1.125rem;">
                        {{this.whatWeDoText2}}
                      </div>
                      <div class="inter" style="top: 13.05rem;left: 26.75rem;width: 44rem;height: 2.87rem;text-align: left;position: absolute;line-height: 130%;color: #E3E1DB;font-weight: 200;font-size: 1.125rem;">
                        {{this.whatWeDoText3}}
                      </div>
                    </td>
                    <td style="width: 10%"></td>
                  </tr>
                </table>
              </div>

              <div style="width: 100%;height: 10%;color: #F5F5F5;font-size: 20px;font-style:oblique;">
                <table class="divBase" v-if="!showVideo">
                  <tr @click="showVideo = !showVideo" class="divBase">
                    <td @click="fontButtonClick(0)" class="fontButton BoldItalic anation" style="position: absolute;left: 6rem;top: 36.31rem">MUSIC</td>
                    <td @click="fontButtonClick(1)" class="fontButton BoldItalic anation" style="position: absolute;left: 13.62rem;top: 36.31rem">SOUND DESIGN</td>
                    <td @click="fontButtonClick(2)" class="fontButton BoldItalic anation" style="position: absolute;left: 26.56rem;top: 36.31rem">VOICE ACTING</td>
                    <td @click="fontButtonClick(3)" class="fontButton BoldItalic anation" style="position: absolute;left: 38.75rem;top: 36.31rem">GAME AUDIO PIPELINE</td>
                  </tr>
                </table>
              </div>

              <div v-if="showVideo" style="width: 100%;height: 40%;">
                <table class="divBase">
                  <tr>
                    <td style="width: 70%;height: 100%;position: relative">
                      <div style="width: 40%;height: 100%;display: inline-block;position: absolute;left: 5rem;top: 0rem;">
                        <ul class="divAnimate" ref="childTr" v-if="showVideo">
                          <li style="height: 15%;" @click="fontButtonClick(0)" class="fontButton BoldItalic anation">MUSIC</li>
                          <li style="height: 15%;" @click="fontButtonClick(1)" class="fontButton BoldItalic anation">SOUND DESIGN</li>
                          <li style="height: 15%;" @click="fontButtonClick(2)" class="fontButton BoldItalic anation">VOICE ACTING</li>
                          <li style="height: 15%;" @click="fontButtonClick(3)" class="fontButton BoldItalic anation">GAME AUDIO PIPELINE</li>
                        </ul>
                      </div>


                      <video v-if="showVideo && !showBigVideo" class="divAnimate" :src="firstVideo.videoUrl" @click="clickVideo"
                             style="object-fit: fill;position: absolute;width: 40%;height: 70%;top: 2rem;left: 25rem" controlslist="nofullscreen" controls>
                        <source type="video/mp4">
                      </video>
                    </td>

                    <td style="width: 50%;height: 100%;left: -6%;position: relative">
                      <div class="divAnimate" v-if="showVideo" style="width: 120%;height: 60%;position: absolute;top: 2rem;overflow: hidden">
                        <div ref="carouselImgBox" class="carouselImgBox">
                          <img class="imgStyle" v-for="item in carouselImgPaths" :src="item"/>
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

  import { getRotation,getWord,getVideoList,getImagesByImageCode } from './requestScript/OurService'

  export default {
    name: 'ourServices',
    components: { toolbar, contacts },
    data() {
      return {
        firstImg:'',
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
    watch:{
      "$store.state.fontFamily.maxHeight":function() {
        this.$refs.alignCenter.style.maxHeight = this.$store.getters.geMaxHeight+'px';
      }
    },
    created() {
      getImagesByImageCode({imageCode:'04'}).then(resp =>{
        if(resp.data.length > 0){
          this.firstImg = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })
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
      }, 5000);

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
    },
    methods: {
      fontButtonClick(index) {
        let that = this;
        window.setTimeout(function() {
          //还要切换视频内容
          let childrens = that.$refs.childTr.childNodes
          for (let i = 0; i < childrens.length; i++) {
            if (i == index) {
              childrens[i].style.color = '#BE4123'
              if(childrens[i].classList.contains("anation")){
                childrens[i].classList.remove("anation");
              }
            } else {
              childrens[i].style.color = '#E3E1DB'
              if(!childrens[i].classList.contains("anation")){
                childrens[i].classList.add("anation");
              }
            }
          }

          getVideoList().then(resp =>{
            if(resp.data != ""){
              for(let i = 0;i < resp.data.length;i++){
                if(index+1 == resp.data[i].id){
                  that.firstVideo = resp.data[i];
                }
              }

            }
          });

          getRotation({code:index}).then(resp =>{
            if(resp.data.length > 0){
              that.carouselImgPaths = resp.data;
            }
          })
        },100);
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

  .image{
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7));
    opacity: 0.5;
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

  .imgStyle{
    max-width: 100%;
    max-height: 100%;
  }

  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic;
    font-size: 1.375rem;
  }

  .fontButton{
    color: #E3E1DB;
    font-weight: 500;
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

  .anation:hover {
    animation: change 0.5s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }

  @keyframes change {
    0% {
      color: #E3E1DB;
    }
    100% {color: #BE4123;}
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
