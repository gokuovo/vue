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

                      <div class="inter" style="font-weight:400;top: 6.25rem;left: 26.75rem;width: 44rem;height: 1.43rem;text-align: left;position: absolute;line-height: 130%;color: #b0b0ae;font-weight: 200;font-size: 1.125rem;">
                        {{this.whatWeDoText1}}
                      </div>
                      <div class="inter" style="top: 8.93rem;left: 26.75rem;width: 44rem;height: 2.87rem;text-align: left;position: absolute;line-height: 130%;color: #b0b0ae;font-weight: 200;font-size: 1.125rem;">
                        {{this.whatWeDoText2}}
                      </div>
                      <div class="inter" style="top: 13.05rem;left: 26.75rem;width: 44rem;height: 2.87rem;text-align: left;position: absolute;line-height: 130%;color: #b0b0ae;font-weight: 200;font-size: 1.125rem;">
                        {{this.whatWeDoText3}}
                      </div>
                    </td>
                    <td style="width: 10%"></td>
                  </tr>
                </table>
              </div>

              <div style="width: 100%;height: 10%;color: #F5F5F5;font-size: 20px;font-style:oblique;">
                <table class="divBase divAnimate2" v-show="showMenu">
                  <tr @click="showVideoClick" class="divBase">
                    <td @click="fontButtonClick(0,1)" class="fontButton BoldItalic anation" style="position: absolute;left: 6rem;top: 36.31rem">MUSIC</td>
                    <td @click="fontButtonClick(1,1)" class="fontButton BoldItalic anation" style="position: absolute;left: 13.62rem;top: 36.31rem">SOUND DESIGN</td>
                    <td @click="fontButtonClick(2,1)" class="fontButton BoldItalic anation" style="position: absolute;left: 26.56rem;top: 36.31rem">VOICE ACTING</td>
                    <td @click="fontButtonClick(3,1)" class="fontButton BoldItalic anation" style="position: absolute;left: 38.75rem;top: 36.31rem">GAME AUDIO PIPELINE</td>
                  </tr>
                </table>
              </div>

              <div v-show="showVideo" class="divAnimate" style="width: 100%;height: 40%;opacity: 0">
                <table class="divBase">
                  <tr>
                    <td>
                      <div>
                        <ul ref="childTr">
                          <li style="width: 4.062rem;height: 1.812rem;position: absolute;left: 6rem;top: 36.31rem;" @click="fontButtonClick(0,2)" class="fontButton BoldItalic anation">MUSIC</li>
                          <li style="width: 9.5rem;height: 1.812rem;position: absolute;left: 6rem;top: 39.37rem;" @click="fontButtonClick(1,2)" class="fontButton BoldItalic anation">SOUND DESIGN</li>
                          <li style="width: 8.75rem;height: 1.812rem;position: absolute;left: 6rem;top: 42.43rem;" @click="fontButtonClick(2,2)" class="fontButton BoldItalic anation">VOICE ACTING</li>
                          <li style="width: 14.187rem;height: 1.812rem;position: absolute;left: 6rem;top: 45.5rem;" @click="fontButtonClick(3,2)" class="fontButton BoldItalic anation">GAME AUDIO PIPELINE</li>
                        </ul>
                      </div>


                      <video v-if="!showBigVideo" :src="firstVideo.videoUrl" @click="clickVideo"
                             style="object-fit: fill;position: absolute;width: 16.25rem;height: 12.5rem;top: 36.31rem;left: 26.56rem" controlslist="nofullscreen" controls>
                        <source type="video/mp4">
                      </video>
                    </td>

                    <td>
                      <div style="width: 31.37rem;height: 11.5rem;position: absolute;top: 36.31rem;right: 11.12rem;overflow: hidden">
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
        showMenu:true,
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
      showVideoClick(){
        let that = this;
        this.showVideo = true;
        document.getElementsByClassName("divAnimate2")[0].classList.remove("xiaoshi");
        document.getElementsByClassName("divAnimate2")[0].classList.remove("chuxian");
        document.getElementsByClassName("divAnimate2")[0].classList.add("xiaoshi");
        window.setTimeout(function() {
          document.getElementsByClassName("divAnimate")[0].classList.remove("xiaoshi");
          document.getElementsByClassName("divAnimate")[0].classList.remove("chuxian");
          document.getElementsByClassName("divAnimate")[0].classList.add("chuxian");
        },10);
        window.setTimeout(function() {
          that.showMenu = false;
          document.getElementsByClassName("divAnimate2")[0].classList.remove("xiaoshi");
          document.getElementsByClassName("divAnimate2")[0].classList.remove("chuxian");
          document.getElementsByClassName("divAnimate")[0].classList.remove("xiaoshi");
          document.getElementsByClassName("divAnimate")[0].classList.remove("chuxian");
          document.getElementsByClassName("divAnimate")[0].style.opacity = 1;
          document.getElementsByClassName("divAnimate2")[0].style.opacity = 0;
        },300);
      },
      fontButtonClick(index,flag) {
        let that = this;
        window.setTimeout(function() {
          //还要切换视频内容
          let childrens = that.$refs.childTr.childNodes
          for (let i = 0; i < childrens.length; i++) {
            if (i == index) {
              childrens[i].style.color = '#BE4123'
              if(childrens[i].classList.contains("anation")){
                childrens[i].classList.remove("anation");
              }else{
                if(flag === 2) {
                  document.getElementsByClassName("divAnimate2")[0].classList.remove("xiaoshi");
                  document.getElementsByClassName("divAnimate2")[0].classList.remove("chuxian");
                  document.getElementsByClassName("divAnimate2")[0].classList.add("chuxian");
                  that.showMenu = true;
                  window.setTimeout(function() {
                    document.getElementsByClassName("divAnimate")[0].classList.remove("xiaoshi");
                    document.getElementsByClassName("divAnimate")[0].classList.remove("chuxian");
                    document.getElementsByClassName("divAnimate")[0].classList.add("xiaoshi");
                  },10);
                  window.setTimeout(function() {
                    that.showVideo = false;
                    document.getElementsByClassName("divAnimate2")[0].classList.remove("xiaoshi");
                    document.getElementsByClassName("divAnimate2")[0].classList.remove("chuxian");
                    document.getElementsByClassName("divAnimate")[0].classList.remove("xiaoshi");
                    document.getElementsByClassName("divAnimate")[0].classList.remove("chuxian");
                    document.getElementsByClassName("divAnimate")[0].style.opacity = 0;
                    document.getElementsByClassName("divAnimate2")[0].style.opacity = 1;
                  },300);
                }
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

  .chuxian{
    animation: chuxian 0.3s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes chuxian{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }

  .xiaoshi{
    animation: xiaoshi 0.3s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes xiaoshi{
    0%{
      opacity: 1;
    }
    100%{
      opacity: 0;
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
    list-style-type: none;
  }

  li {
    height: 20%;
  }
</style>
