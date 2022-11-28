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

<!--    <div style="width: 100%;height: 70%;position: relative">-->

<!--    </div>-->

    <div style="width: 78em;height: 5.75em;padding: 38.43em 5.8rem ">
      <table class="divBase" style="font-weight: 500">
        <tr>
          <td style="width: 18.375em;height: 100%;">
            <div class="BoldItalic" style="width: 18.375em;height: 1.2857142857142858em;color: #E3E1DB;font-size: 14px;letter-spacing: 0.05em;margin-bottom: 1.35em;line-height: 18px">
              PHONE NUMBER:
              <span style="font-size: 14px;color: #71706E">{{contacts.tel}}</span>
            </div>
            <div class="BoldItalic" style="width: 18.375em;height: 6.957142857142857em;color: #71706E!important;font-size: 0.875rem;line-height: 18px;letter-spacing: 0.55px;">
              {{contacts['address'+$store.getters.getLanguage]}}
            </div>
          </td>
          <td style="width: 18.375em;height: 100%;padding-left: 15.732142857142858em">
            <div class="BoldItalic" style="width: 21em;height: 1.2857142857142858em;color: #E3E1DB;font-size: 0.875rem;margin-bottom: 1.3em;letter-spacing: 0.05em">
              OUR SOCIAL：
            </div>
            <div style="width: 19em;height: 70%;color: #71706E;font-size: 0.875rem;font-style: italic;">
                <div v-for="(item,index) in contactImages" style="width: 1.7142857142857142em;height: 1.7142857142857142em;margin-right: 0.35em;position: relative;display: inline-block;" :style="index != 0 ? 'margin-left: 0.75rem':''">
                  <el-popover :disabled="(item.connectType != '微信' && item.connectType != 'skype')" placement="top" width="150" trigger="hover">
                    <div style="width:150px;height:150px;">
                      <img
                        style="width:150px;height:150px;object-fit: fill;"
                        :src="item.contactUrl"
                        alt
                      />
                    </div>
                      <div style="width: 1.7142857142857142em;height: 1.7142857142857142em;" slot="reference">
                          <a :style="(item.connectType != '微信' && item.connectType != 'skype') ? '':'pointer-events:none'" :href="item.contactUrl" target="_blank">
                            <img slot="reference" style="position: absolute;width: 1.7142857142857142em;height: 1.7142857142857142em;" :src="item.imageUrl"/>
                          </a>
                      </div>
                  </el-popover>
                </div>
            </div>
          </td>
          <td style="width: 33%;height: 100%;padding-left: 17.2em;letter-spacing: 0.05em">
            <div class="BoldItalic" style="width: 21em;height: 1.2857142857142858em;color: #E3E1DB;font-size: 0.875rem;margin-bottom: 1.3em">
              E-MAIL：
            </div>
            <div class="BoldItalic" style="width: 11.571428571428571em;height: 70%;color: #71706E;font-size: 0.875rem">
              <u>{{contacts.mail}}</u>
            </div>
          </td>
        </tr>
      </table>

      <el-popover placement="top" title width="200" trigger="hover">
        <div style="width:200px;height:200px;">
          <img
            style="width:100%;height:100%;object-fit: cover;"
            :src="firstImg"
            alt
          />
        </div>
        <div style="width:80px;height:80px;" slot="reference">
          <img
            style="width:100%;height:100%;object-fit: cover;"
            :src="firstImg"
            alt
          />
        </div>
      </el-popover>
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
    },
    mounted() {
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

<style>

  .el-popover{
    background-color: #383838 !important;
    border-color: #383838 !important;
    padding: 0;
  }

</style>

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
