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
                <div @mousemove="divFocus(item.id)" @mouseout="divLoseFocus(item.id)" v-for="(item) in teamImages" class="g-item">
                  <img :ref="item.id+'_img'" :src="item.path" style="position: absolute;width: 100%;height: 100%"/>
                  <div :ref="item.id+'_code'" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td style="text-align: center;font-style: italic">
                          <div style="color: #F88E5A;font-size: 16px">{{item.name}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{item.position}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{item.signature}}</div>
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

  export default {
    name: 'Team',
    components: { toolbar,contacts },
    data(){
      return {
        teamImages:[
          {
            id:1,
            height:30,
            name:"AMY LEE",
            position:'SINGER',
            signature:'"Hey there!Nice to greet you here"',
            path:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444'
          },
          {
            id:2,
            height:40,
            name:"JAKE MA",
            position:'DANCER',
            signature:'"Hey there!Nice to meet you here"',
            path:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500'
          },
          {
            id:3,
            height:50,
            name:"MIKE LI",
            position:'CODER',
            signature:'"Hey there!Nice to greet you here"'
          },
          {
            id:4,
            height:35,
            name:"AMY LEE",
            position:'SINGER',
            signature:'"Hey there!Nice to greet you here"'
          },
          {
            height:30,
          },
          {
            height:40,
          },
          {
            height:50,
          },
          {
            height:35,
          },

          {
            height:35,
          },
          {
            height:30,
          },
          {
            height:50,
          },
          {
            height:30,
          },
          {
            height:40,
          },
          {
            height:50,
          },
          {
            height:35,
          },
          {
            height:40,
          },

          {
            height:30,
          },
          {
            height:40,
          },
          {
            height:50,
          },
          {
            height:40,
          },
          {
            height:30,
          },
          {
            height:35,
          },
          {
            height:50,
          },
          {
            height:35,
          },

          {
            height:50,
          },
          {
            height:30,
          },
          {
            height:35,
          },
          {
            height:40,
          },
          {
            height:30,
          },
          {
            height:35,
          },
          {
            height:50,
          },
          {
            height:40,
          },
        ],
        counts:32,
      }
    },
    mounted(){
      let children = this.$refs.gContainer.children;
      for(let i = 0;i < children.length;i++){
        children[i].style.height = this.teamImages[i].height+"vh";
        children[i].style.background = "rgb("+this.getRandom(0,255)+","+this.getRandom(0,255)+","+this.getRandom(0,255)+")";
      }
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
