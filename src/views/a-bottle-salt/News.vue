<template>
  <div class="divBase">
    <div ref="backGroundBox" class="box">
      <div class="image-wrap">
        <div class="image" :style="{backgroundImage: `url(${firstImg})`}"></div>
      </div>
    </div>

    <div style="height: 10%;width: 100%">
      <toolbar></toolbar>
    </div>

    <div style="height: 80%;width: 100%">
      <table class="divBase">
        <tr>
          <td style="width: 80%;height: 100%;padding: 6% 0">
            <div class="divBase selfDefineScroll" style="overflow-y: auto;padding-left: 6%">
              <div v-for="(item) in newsData"  style="display: inline-block;width: 50%;height: 25%;position: relative;margin-bottom: 3%">
                <img style="width: 25%;height: 100%;position: absolute" :src="item.img" />
                <div style="width: 60%;height: 100%;position: absolute;left: 30%">
                  <table class="divBase">
                    <tr>
                      <td class="divBase" style="vertical-align: middle">
                        <div style="width: 100%;height: auto;color: #BAB9B6;font-size: 16px;font-style: italic;margin-bottom: 3%">{{item.title}}</div>
                        <div style="width: 100%;height: auto;color: rgb(140 140 140);font-size: 14px;font-style: italic;margin-bottom: 3%">DATE:{{item.date}}</div>
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

    <div style="height: 10%;width: 100%">
      <el-button @click="changeShowNewsData(1)" class="buttonStyle" type="danger">
        NEWS
      </el-button>

      <el-button @click="changeShowNewsData(2)" class="buttonStyle2" type="danger">
        WORKLOGS
      </el-button>
    </div>

  </div>
</template>

<script>
  import toolbar from './components/toolbar'
  import contacts from './components/contacts'

  import boxes from './commonScripts/moveBackground'

  export default {
    name: 'News',
    components: { toolbar,contacts },
    data(){
      return {
        firstImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2009-4-13%2F200904112336058564.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658928800&t=8913213d93980e32fae1222eda918e7f',
        newsData:[
          {
            id: 1,
            title: 'MELTING GAMES COLLABORATION',
            date: '20 May,2022',
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id: 2,
            title: 'THE NEWS WEST LIMITED VINYL RELEASE',
            date: '20 May,2022',
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },
          {
            id: 3,
            title: 'METHOD MAN RELEASES NEW SONG FOR \'EVIL DEAD: THE GAMES\'',
            date: '20 May,2022',
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id: 4,
            title: 'MELTING GAMES COLLABORATION',
            date: '20 May,2022',
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },
          {
            id: 5,
            title: 'MELTING GAMES COLLABORATION',
            date: '20 May,2022',
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id: 6,
            title: 'MELTING GAMES COLLABORATION',
            date: '20 May,2022',
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },
          {
            id: 7,
            title: 'MELTING GAMES COLLABORATION',
            date: '20 May,2022',
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id: 8,
            title: 'MELTING GAMES COLLABORATION',
            date: '20 May,2022',
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },
        ]
      }
    },
    methods: {
      changeShowNewsData(type){
        console.log(type);
        this.newsData.sort(function() {
          return Math.random() > 0.5 ? -1 : 1;
        });
      }
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
      })
    }
  }
</script>

<style scoped>
  @import './commonCSS/moveBackground.scss';

  .buttonStyle {
    padding: 5px 5px;
    margin-left: 5%
  }

  .buttonStyle2 {
    padding: 5px 5px;
    margin-left: 5%
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
