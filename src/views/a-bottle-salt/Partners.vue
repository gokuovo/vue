<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">
    <div ref="backGroundBox" class="box">
      <div class="image-wrap" style="opacity: 0.05">
        <div class="image" :style="{backgroundImage: `url(${firstImg})`}"></div>
      </div>
    </div>

    <div style="height: 10%;width: 100%">
      <toolbar></toolbar>
    </div>

    <div style="height: 90%;width: 100%">
      <table class="divBase">
        <tr>
          <td style="width: 80%;height: 100%;vertical-align: top;padding-top: 6.06rem">
            <div class="divBase selfDefineScroll" style="height: 70%;width: 72.81rem;overflow-y: auto;margin-left: 6rem;margin-bottom: 10rem">
              <div v-for="(item,index) in partners" class="divClass" :style="{marginLeft: `${index % 5 != 0 ? '1.5rem' : ''}`}">
                <a :href="item.partnerLink" :target="item.partnerLink.indexOf('http') != -1 ? '_blank' : '_self' ">
                  <img class="linkHover"  style="position: absolute;width: 11.75rem;height: 11.75rem;object-fit: cover;" :src="item.partnerUrl" />
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

  import {getAllPartners,getContactImage_back} from './requestScript/Partners'

  export default {
    name: 'Partners',
    components: { toolbar,contacts },
    data(){
      return {
        firstImg: '',
        partners:[
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
      getAllPartners().then(resp =>{
        resp = resp.data;
        if(resp.length > 0){
          this.partners = resp;
        }
      });

      getContactImage_back({imageCode:'09'}).then(resp =>{
        resp = resp.data;
        if(resp.length > 0){
          this.firstImg = resp[0].imageUrl.replaceAll('\\','\/');
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
    },
  }
</script>

<style scoped>
  @import './commonCSS/moveBackground.scss';

  .divClass{
    display: inline-block;
    position: relative;
    width: 11.75rem;
    height: 11.75rem;
    margin-top: 3.125rem
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

  .divBase {
    width: 100%;
    height: 100%;
  }

  .linkHover:hover{
    background-color: rgba(0, 0, 0, 0.7);
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


  >>> .el-breadcrumb__inner{
    color: #BDBBB7!important;
  }

  >>> .el-button--primary{
    color: #FFFFFF;
    background-color: #0D0D0D;
    border-color: #0D0D0D;
  }
</style>
