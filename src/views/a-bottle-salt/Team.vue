<template>
  <div class="divBase">
    <div style="height: 10%;width: 100%">
      <toolbar></toolbar>
      <span :style="{'--text':counts}"></span>
    </div>

    <div style="height: 90%;width: 100%">
      <table class="divBase">
        <tr>
          <td style="height: 100%;width: 80%;">
            <div class="selfDefineScroll" style="overflow-y: auto;height: 100%;width: 100%;max-width: 1500px;min-width: 800px">
              <div ref="gContainer" class="g-container">
                <div @mouseover="divFocus(item.id)" @mouseout="divLoseFocus(item.id)" v-for="(item) in teamImages" class="g-item">
                  <img :ref="item.id+'_img'" :src="item.staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div :ref="item.id+'_code'" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td style="text-align: center;font-style: italic">
                          <div style="color: #F88E5A;font-size: 16px">{{item['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{item['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{item['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td style="height: 100%;width: 20%;">
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

  import {getTeam} from './requestScript/Team'

  export default {
    name: 'Team',
    components: { toolbar,contacts },
    data(){
      return {
        teamImages:[
          {
            id:1,
            height:30,
            staffNameEn:"AMY LEE",
            staffPostEn:'SINGER',
            staffDescEn:'"Hey there!Nice to greet you here"',
            staffImage:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444'
          },
          {
            id:2,
            height:40,
            staffNameEn:"JAKE MA",
            staffPostEn:'DANCER',
            staffDescEn:'"Hey there!Nice to meet you here"',
            staffImage:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500'
          },
          {
            id:3,
            height:50,
            staffNameEn:"MIKE LI",
            staffPostEn:'CODER',
            staffDescEn:'"Hey there!Nice to greet you here"'
          },
          {
            id:4,
            height:35,
            staffNameEn:"AMY LEE",
            staffPostEn:'SINGER',
            staffDescEn:'"Hey there!Nice to greet you here"'
          }
        ],
        counts:32,
        staffName: 'staffNameEn',
      }
    },
    created(){

    },
    mounted(){
      getTeam().then(resp =>{
        if(resp.data.length > 0){
          resp = resp.data;
          if(resp.length % 4 != 0){
            let remainder = resp.length % 4 == 0 ? 0 : 4 - (resp.length % 4);
            for(let i = 0; i < remainder;i++){
              let temp = {};
              resp.push(temp);
            }
          }
          let arrHeight1 = [30,40,32,38];let arrHeight2 = [25,45,33,37];let arrHeight3 = [28,42,29,41];let arrHeight4 = [35,35,27,43];
          let sumHeight1 = 0;let sumHeight2 = 0;let sumHeight3 = 0;let sumHeight4 = 0;
          let count = resp.length / 4;
          let index = 0;
          let i = 0;
          for(;i < count;i++){
            if(i+1 == count){
              index = i % 4;
              resp[i*4].height = arrHeight1[index];
              sumHeight1 += arrHeight1[index];
              resp[i*4 + 1].height = sumHeight1 - sumHeight2;
              resp[i*4 + 2].height = sumHeight1 - sumHeight3;
              resp[i*4 + 3].height = sumHeight1 - sumHeight4;
            }else{
              index = i % 4;
              resp[i*4].height = arrHeight1[index];
              sumHeight1 += arrHeight1[index];
              resp[i*4 + 1].height = arrHeight2[index];
              sumHeight2 += arrHeight2[index];
              resp[i*4 + 2].height = arrHeight3[index];
              sumHeight3 += arrHeight3[index];
              resp[i*4 + 3].height = arrHeight4[index];
              sumHeight4 += arrHeight4[index];
            }
          }
          this.teamImages = resp;
          let children = this.$refs.gContainer.children;
          for(let i = 0;i < children.length;i++){
            children[i].style.height = this.teamImages[i].height+"vh";
            children[i].style.background = "rgb("+this.getRandom(0,255)+","+this.getRandom(0,255)+","+this.getRandom(0,255)+")";
          }
        }
      });
    },
    methods:{
      getRandom(min, max) { //根据最小值和最大值产生一个随机数
        return Math.floor(Math.random() * (max - min) + min);
      },
      divFocus(id){
        this.$refs[id+"_img"][0].style.display = 'none';
        this.$refs[id+"_code"][0].style.display = 'block';
      },
      divLoseFocus(id){
        this.$refs[id+"_img"][0].style.display = 'block';
        this.$refs[id+"_code"][0].style.display = 'none';
      }
    }
  }
</script>

<style lang="scss" scoped>
  /*@import "./commonCSS/teamImage.scss";*/
  .g-container {
    column-count: 4;
    column-gap: 0;
    width: 100%;
    padding-left: 7%;
  }

  .g-item {
    position: relative;
    width: 100%;
    break-inside: avoid;
    min-height: 200px;
    max-height: 600px;
  }
</style>
<style scoped>
  >>> .el-breadcrumb__inner{
    color: #BDBBB7!important;
  }

  >>> .el-button--primary{
    color: #FFFFFF;
    background-color: #0D0D0D;
    border-color: #0D0D0D;
  }

  .divBase {
    width: 100%;
    height: 100%;
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
</style>
