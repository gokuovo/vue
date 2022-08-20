<template>
  <div style="width: 90rem;height: 100%">
    <div ref="backGroundBox" class="box">
      <div class="image-wrap">
        <div class="image" :style="{backgroundImage: `url(${firstImg})`}"></div>
      </div>
    </div>

    <div style="height: 10%;width: 90rem;">
      <toolbar></toolbar>
    </div>

    <div style="height: 80%;width: 90rem;">
      <table class="divBase">
        <tr>
          <td style="width: 80%;height: 100%;padding: 6% 0">
            <div class="divBase selfDefineScroll" style="overflow-y: auto;padding-left: 7rem">
              <div v-for="(item) in newsData"  style="display: inline-block;width: 50%;height: 25%;position: relative;margin-bottom: 3%">
                <img style="width: 25%;height: 100%;position: absolute" :src="item.url" />
                <div style="width: 60%;height: 100%;position: absolute;left: 30%">
                  <table class="divBase">
                    <tr>
                      <td class="divBase BoldItalic" style="vertical-align: middle">
                        <div style="width: 100%;height: auto;color: #BAB9B6;font-size: 16px;font-style: italic;margin-bottom: 3%">{{item['title'+$store.getters.getLanguage]}}</div>
                        <div style="width: 100%;height: auto;color: rgb(140 140 140);font-size: 14px;font-style: italic;margin-bottom: 3%">DATE:{{item['date'+$store.getters.getLanguage]}}</div>
                        <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-style: italic;">
                          <a class="linkHover" :href="item.link" :target="item.link.indexOf('http') != -1 ? '_blank' : '_self' "><span style="font-size: 13px">EXPLORE</span>&emsp;<i style="color: red" class="el-icon-top-right"></i></a>
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
      <el-button @click="changeShowNewsData(1)" class="buttonStyle" type="danger">
        <span style="font-size: 0.875rem;" class="BoldItalic">NEWS</span>
      </el-button>

      <el-button @click="changeShowNewsData(2)" class="buttonStyle" type="danger">
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
              elements[i-1].style.backgroundColor = "#ff6d6d";
            }else{
              elements[i-1].style.backgroundColor = "unset";
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
      elements[0].style.backgroundColor = "#ff6d6d";
    }
  }
</script>

<style scoped>
  @import './commonCSS/moveBackground.scss';
  >>>.el-button--danger{
    background-color: unset;
    border: none;
  }
  .el-button--danger:hover {
    animation: change 1s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }

  @keyframes change {
    0% {
      color: rgba(189,187,183,0.1)
    }
    30%{
      color:rgba(248,197,182,0.3)
    }
    50% {
      color: rgba(247,149,123,0.5)
    }
    80% {
      color: rgba(255,101,59,0.8)
    }
    100% {color: rgba(248,81,35,1);}
  }

  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic
  }

  .buttonStyle {
    padding: 5px 5px;
    margin-left: 7rem;
    font-size: 0.875rem;
  }

  .selfDefineScroll::-webkit-scrollbar {
    width: 5px !important;
    height: 5px !important;
    background-color: #b5b1b1;
  }

  .selfDefineScroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: black;

  }

  .selfDefineScroll::-webkit-scrollbar-thumb {
    opacity: 0.8;
    height: 20px;
    background: #d1d8e6;
    border-radius: 19px;
    border: 2px solid transparent;
    background-clip: content-box;
  }

  .linkHover:hover{
    background-color:rgba(115,178,230,0.4);
    border: #0a76a4 1px solid;
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
