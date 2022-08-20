<template>
  <div style="width: 90rem;height: 100%">

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

    <div style="width: 100%;height: 20%;padding: 0 7rem">
      <table class="divBase">
        <tr>
          <td style="width: 33%;height: 100%">
            <div class="BoldItalic" style="width: 60%;height: 30%;color: #BAB9B6;font-size: 14px;">
              PHONE NUMBER：<span style="font-size: 0.875rem;color: #8c939d">{{contacts.tel}}</span>
            </div>
            <div class="BoldItalic" style="width: 60%;height: 70%;color: #8c939d;font-size: 0.875rem;">
              {{contacts['address'+$store.getters.getLanguage]}}
            </div>
          </td>
          <td style="width: 33%;height: 100%">
            <div class="BoldItalic" style="width: 60%;height: 30%;color: #BAB9B6;font-size: 0.875rem;">
              OUR SOCIAL：
            </div>
            <div style="width: 100%;height: 70%;color: #8c939d;font-size: 12px;font-style: italic;">
                <div v-for="(item,index) in contactImages" style="width: 2rem;height: 20%;position: relative;display: inline-block;" :style="index != 0 ? 'margin-left: 1rem':''">
                  <a :href="item.contactUrl" target="_blank"><img style="position: absolute;width: 75%;height: 100%" :src="item.imageUrl"/></a>
                </div>
            </div>
          </td>
          <td style="width: 33%;height: 100%">
            <div class="BoldItalic" style="width: 60%;height: 30%;color: #BAB9B6;font-size: 0.875rem;">
              E-MAIL：
            </div>
            <div class="BoldItalic" style="width: 60%;height: 70%;color: #8c939d;font-size: 0.875rem">
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

  import {getContactImage_back,getContact,getSocialSix} from './requestScript/Contacts'

  export default {
    name: 'Contacts',
    components: { toolbar, contacts },
    data() {
      return {
        firstImg: '',
        secondImg: '',
        contacts: {
        },
        contactImages: [
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
      getSocialSix().then(resp =>{
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
