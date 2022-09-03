<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">

    <div ref="backGroundBox" class="box">
      <div class="image-wrap">
        <div class="image" :style="{backgroundImage: `url(${firstImg})`}"></div>
      </div>
    </div>

    <div style="height: 10%;width: 90rem;">
      <toolbar></toolbar>
    </div>

    <img style="top: 17.37rem;width: 78.06rem;left: 6rem;height: 14.12rem;position: absolute" :src="secondImg"/>

    <div style="width: 100%;height: 70%;position: relative">

    </div>

    <div style="width: 100%;height: 7.142857142857143em;padding: 0 6rem">
      <table class="divBase" style="font-weight: 500">
        <tr>
          <td style="width: 33%;height: 100%;">
            <div class="BoldItalic" style="width: 21em;height: 1.2857142857142858em;color: #E3E1DB;font-size: 14px;margin-bottom: 1.4285714285714286em">
              PHONE NUMBER：
              <span style="font-size: 14px;color: #71706E">{{contacts.tel}}</span>
            </div>
            <div class="BoldItalic" style="width: 21em;height: 6.957142857142857em;color: #71706E!important;font-size: 14px;">
              {{contacts['address'+$store.getters.getLanguage]}}
            </div>
          </td>
          <td style="width: 33%;height: 100%;padding-left: 9%">
            <div class="BoldItalic" style="width: 21em;height: 1.2857142857142858em;color: #E3E1DB;font-size: 14px;margin-bottom: 1.4285714285714286em">
              OUR SOCIAL：
            </div>
            <div style="width: 100%;height: 70%;color: #71706E;font-size: 14px;font-style: italic;">
                <div v-for="(item,index) in contactImages" style="width: 2rem;height: 20%;position: relative;display: inline-block;" :style="index != 0 ? 'margin-left: 0.75rem':''">
                  <a :href="item.contactUrl" target="_blank"><img style="position: absolute;width: 1.7142857142857142em;height: 1.7142857142857142em" :src="item.imageUrl"/></a>
                </div>
            </div>
          </td>
          <td style="width: 33%;height: 100%;padding-left: 15%">
            <div class="BoldItalic" style="width: 21em;height: 1.2857142857142858em;color: #E3E1DB;font-size: 14px;margin-bottom: 1.4285714285714286em">
              E-MAIL：
            </div>
            <div class="BoldItalic" style="width: 11.571428571428571em;height: 70%;color: #71706E;font-size: 0.875rem">
              <u>{{contacts.mail}}</u>
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
    watch:{
      "$store.state.fontFamily.maxHeight":function() {
        this.$refs.alignCenter.style.maxHeight = this.$store.getters.geMaxHeight+'px';
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
