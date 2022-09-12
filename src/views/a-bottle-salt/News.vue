<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">
    <div ref="backGroundBox" class="box">
      <div class="image-wrap" style="opacity: 0.01">
        <div class="image" :style="{backgroundImage: `url(${firstImg})`}"></div>
      </div>
    </div>

    <div style="height: 10%;width: 90rem;">
      <toolbar></toolbar>
    </div>

    <div style="height: 80%;width: 90rem;">
      <table class="divBase">
        <tr>
          <td style="width: 78.81rem;height: 100%;padding: 6% 0">
            <div class="selfDefineScroll" style="overflow-y: auto;padding-left: 6rem;width: 78.81rem;height: 33.75rem">

              <div v-for="(item) in newsData"  style="display: inline-block;width: 31.625rem;height: 8.75rem;position: relative;margin-bottom: 3.75rem">
                <img style="width: 8.75rem;height: 8.75rem;position: absolute;object-fit: cover;" :src="item.url" />
                <div style="width: 21rem;height: 100%;position: absolute;left: 10.625rem">
                  <table class="divBase">
                    <tr>
                      <td class="divBase BoldItalic" style="vertical-align: middle">
                        <div class="font1" style="margin-bottom: 0.625rem">{{item['title'+$store.getters.getLanguage]}}</div>
                        <div class="font2"  style="margin-bottom: 1.3125rem">DATE:{{item['date'+$store.getters.getLanguage]}}</div>
                        <div style="font-style: italic;">
                          <a :href="item.link" :target="item.link.indexOf('http') != -1 ? '_blank' : '_self' ">
                            <span class="font3" style="text-decoration: underline;" @mouseout="mouseOut($event)" @mouseover="mouseOver($event)">EXPLORE</span>&emsp;
                            <img style="width: 0.75rem;height: 0.75rem;opacity: 1" src="../../assets/images/jiantou.png"/>
                          </a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

            </div>
          </td>
          <td style="width: 20%;">
            <contacts></contacts>
          </td>
        </tr>
      </table>
    </div>

    <div style="height: 10%;width: 100%;color: #F5F5F5;">
      <el-button @click="changeShowNewsData(1)" class="buttonStyle anation" type="danger">
        <span style="font-size: 0.875rem;" class="BoldItalic">NEWS</span>
      </el-button>

      <el-button style="margin-left: 1.5rem" @click="changeShowNewsData(2)" class="buttonStyle anation" type="danger">
        <span style="font-size: 0.875rem;" class="BoldItalic">WORKLOGS</span>
      </el-button>
    </div>

  </div>
</template>

<script>
  import toolbar from './components/toolbar'
  import contacts from './components/contacts'
  import boxes from './commonScripts/moveBackground'

  import {getNews,getWorkLogNews,getImagesByImageCode} from './requestScript/News'

  export default {
    name: 'News',
    components: { toolbar,contacts },
    data(){
      return {
        firstImg: '',
        newsData:[
        ]
      }
    },
    watch:{
      "$store.state.fontFamily.maxHeight":function() {
        this.$refs.alignCenter.style.maxHeight = this.$store.getters.geMaxHeight+'px';
      }
    },
    created(){
      getNews().then(resp => {
        resp = resp.data;
        if(resp.length > 0){
          this.newsData = resp;
        }
      })

      getImagesByImageCode({imageCode:'08'}).then(resp =>{
        if(resp.data.length > 0){
          this.firstImg = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })
    },
    methods: {
      mouseOut(event){
        event.target.classList.remove("xiaoshi1");
        event.target.classList.remove("chuxian1");

        event.target.classList.add("xiaoshi1");
      },
      mouseOver(event){
        event.target.classList.remove("xiaoshi1");
        event.target.classList.remove("chuxian1");

        event.target.classList.add("chuxian1");
      },
      changeShowNewsData(type){
        this.newsData.sort(function() {
          return Math.random() > 0.5 ? -1 : 1;
        });

        if(type == 1){
          getNews().then(resp => {
            resp = resp.data;
            if(resp.length > 0){
              this.newsData = resp;
              this.buttonStyle(type);
            }
          })
        }else{
          getWorkLogNews().then(resp => {
            resp = resp.data;
            if(resp.length > 0){
              this.newsData = resp;
              this.buttonStyle(type);
            }
          })
        }
      },
      buttonStyle(index){
        window.setTimeout(function() {
          let elements = document.getElementsByClassName("buttonStyle");
          for(let i = 1;i < 3;i++){
            if(i == index) {
              elements[i-1].style.backgroundColor = "#BE4123";
              if(elements[i-1].classList.contains("anation")){
                elements[i-1].classList.remove("anation");
              }
            }else{
              elements[i-1].style.backgroundColor = "unset";
              if(!elements[i-1].classList.contains("anation")){
                elements[i-1].classList.add("anation");
              }
            }
          }
        },100);
      },
    },
    mounted() {
      //背景图移动起来
      let boxElement = this.$refs.backGroundBox
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
      let elements = document.getElementsByClassName("buttonStyle");
      elements[0].style.backgroundColor = "#BE4123";
      elements[0].classList.remove("anation");
    }
  }
</script>

<style scoped>
  @import './commonCSS/moveBackground.scss';

  .chuxian1{
    animation: chuxian1 0.65s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes chuxian1{
    0%{
      color: #B7B5B0;
      opacity: 0.5;
    }
    100%{
      color: #F24E1E;
      opacity: 1;
    }
  }

  .xiaoshi1{
    animation: xiaoshi1 0.65s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes xiaoshi1{
    0%{
      color: #F24E1E;
      opacity: 1;
    }
    100%{
      color: #B7B5B0;
      opacity: 0.5;
    }
  }


  .font1{
    font-family: DIN-BoldItalic;
    font-size: 1.125rem;
    line-height: 1.4375rem;
    letter-spacing: 2%;
    color: #B7B5B0;
  }

  .font2{
    font-family: DIN-BoldItalic;
    font-style: italic;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.125rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #B7B5B0;
    opacity: 0.8;
  }

  .font3{
    font-family: DIN-BoldItalic;
    font-style: italic;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1.125rem;;
    letter-spacing: 0.05em;
    text-decoration-line: underline;
    text-transform: uppercase;

    color: #B7B5B0;
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

  >>>.el-button--danger{
    background-color: unset;
    border: none;
    color: #E3E1DB;
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

  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic
  }

  .buttonStyle {
    padding: 5px 5px;
    margin-left: 6rem;
    font-size: 0.875rem;
  }

  .selfDefineScroll::-webkit-scrollbar {
    width: 3px;
    background-color: #b5b1b1;
  }

  .selfDefineScroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #383838;
  }

  .selfDefineScroll::-webkit-scrollbar-thumb {
    opacity: 0.8;
    height: 20px;
    background: #d1d8e6;
    border-radius: 19px;
    background-clip: content-box;
  }

  .divBase {
    width: 100%;
    height: 100%;
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
