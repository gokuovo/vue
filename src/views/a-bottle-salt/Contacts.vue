<template>
  <div class="divBase">

    <div ref="backGroundBox" class="box">
      <div class="image-wrap">
        <div class="image" :style="{backgroundImage: `url(${firstImg})`}"></div>
      </div>
    </div>

    <div style="height: 10%;width: 100%;background-color: #0D0D0D;">
      <toolbar></toolbar>
    </div>

    <div style="width: 100%;height: 70%;position: relative">
      <img style="width: 100%;height: 100%;position: absolute" :src="secondImg"/>
    </div>

    <div style="width: 100%;height: 20%;padding: 0 5% 0 5%;">
      <table class="divBase">
        <tr>
          <td style="width: 33%;height: 100%">
            <div class="BoldItalic" style="width: 60%;height: 30%;color: #BAB9B6;font-size: 14px;">
              PHONE NUMBER：<span style="font-size: 12px;color: #8c939d">{{contacts.tel}}</span>
            </div>
            <div class="BoldItalic" style="width: 60%;height: 70%;color: #8c939d;font-size: 12px;">
              {{contacts['address'+$store.getters.getLanguage]}}
            </div>
          </td>
          <td style="width: 33%;height: 100%">
            <div class="BoldItalic" style="width: 60%;height: 30%;color: #BAB9B6;font-size: 14px;">
              OUR SOCIAL：
            </div>
            <div style="width: 100%;height: 70%;color: #8c939d;font-size: 12px;font-style: italic;">
              <el-tooltip v-for="(item) in contactImages" class="item" effect="dark" :content="item.noti" placement="top-start">
                <div style="width: 10%;height: 20%;position: relative;display: inline-block;padding-left: 5%">
                  <img style="position: absolute;width: 75%;height: 100%" :src="item.imageUrl"/>
                </div>
              </el-tooltip>
            </div>
          </td>
          <td style="width: 33%;height: 100%">
            <div class="BoldItalic" style="width: 60%;height: 30%;color: #BAB9B6;font-size: 14px;">
              E-MAIL：
            </div>
            <div class="BoldItalic" style="width: 60%;height: 70%;color: #8c939d;font-size: 12px;">
              {{contacts.mail}}
            </div>
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

  import {getContactImage_back,getContact} from './requestScript/Contacts'

  export default {
    name: 'Contacts',
    components: { toolbar, contacts },
    data() {
      return {
        firstImg: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fphoto%2F2009-4-13%2F200904112336058564.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658928800&t=8913213d93980e32fae1222eda918e7f',
        secondImg: 'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
        contacts: {
          id: 1,
          tel: '1866 - 56 -33 -202',
          addressEn: 'ROOM 1109,BUILDING #61,YUANYANGTIANDI,MID RD.EAST 4TH RING,CHAOYANG DISTRICT,BEIJING',
          mail: 'SALTSTUDIO@YEAH.NET'
        },
        contactImages: [
          {
            id: 1,
            imageUrl: 'require(\'@/assets/images/twitter.jpeg\')',
            noti: 'twitter'
          },
          {
            id: 2,
            imageUrl: 'require(\'@/assets/images/twitter.jpeg\')',
            noti: 'twitter'
          },
          {
            id: 3,
            imageUrl: 'require(\'@/assets/images/twitter.jpeg\')',
            noti: 'twitter'
          },
        ]
      }
    },
    created(){
      //可动背景图
      getContactImage_back({imageCode:'10'}).then(resp =>{
        resp = resp.data;
        if(resp.length > 0){
          this.firstImg = resp[0].imageUrl.replaceAll('\\','\/');
        }
      });

      //背景图
      getContactImage_back({imageCode:'06'}).then(resp =>{
        resp = resp.data;
        if(resp.length > 0){
          this.secondImg = resp[0].imageUrl;
        }
      });

      //联系地址等信息
      getContact().then(resp =>{
        if(resp.data){
          this.contacts = resp.data;
        }
      });

      //获取图标
      getContactImage_back({imageCode:'11'}).then(resp =>{
        resp = resp.data;
        if(resp.length > 0){
          this.contactImages = resp;
        }
      });

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

  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic
  }

  .divBase {
    width: 100%;
    height: 100%;
  }

  >>> .el-breadcrumb__inner {
    color: #BDBBB7 !important;
  }

  >>> .el-button--primary {
    color: #FFFFFF;
    background-color: #0D0D0D;
    border-color: #0D0D0D;
  }
</style>
