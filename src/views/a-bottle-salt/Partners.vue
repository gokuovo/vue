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

    <div style="height: 90%;width: 100%">
      <table class="divBase">
        <tr>
          <td style="width: 80%;height: 100%">
            <div class="divBase selfDefineScroll" style="height: 60%;width: 80%;overflow-y: auto;margin-left: 5%">
              <div v-for="(item) in partners" style="display: inline-block;position: relative;width: 18%;height: 35%;margin-left: 1%;margin-top: 5%">
                <a :href="item.link" :target="item.link.indexOf('http') != -1 ? '_blank' : '_self' ">
                  <img class="linkHover"  style="position: absolute;width: 100%;height: 100%" :src="item.img" />
                </a>
              </div>
            </div>
          </td>
          <td style="width: 20%;">
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

  export default {
    name: 'Partners',
    components: { toolbar,contacts },
    data(){
      return {
        firstImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2009-4-13%2F200904112336058564.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658928800&t=8913213d93980e32fae1222eda918e7f',
        partners:[
          {
            id:1,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id:2,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },
          {
            id:1,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id:2,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },
          {
            id:1,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id:2,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },
          {
            id:1,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id:2,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },
          {
            id:1,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id:2,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },
          {
            id:1,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            link:'http://www.baidu.com'
          },
          {
            id:2,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            link:'/ourServices'
          },

        ]
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

  .divBase {
    width: 100%;
    height: 100%;
  }

  .linkHover:hover{
    background-color: rgba(0, 0, 0, 0.5);
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


  >>> .el-breadcrumb__inner{
    color: #BDBBB7!important;
  }

  >>> .el-button--primary{
    color: #FFFFFF;
    background-color: #0D0D0D;
    border-color: #0D0D0D;
  }
</style>
