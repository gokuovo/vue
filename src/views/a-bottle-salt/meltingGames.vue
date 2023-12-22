<template>

  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">

    <div ref="backGroundBox" class="box" style="opacity: 0.1">
      <div class="image-wrap">
        <div class="image" :style="{backgroundImage: `url(${firstImg})`}"></div>
      </div>
    </div>

    <div style="height: 10%;width: 90rem">
      <toolbar></toolbar>
    </div>

    <div style="height: 90%;width: 90rem">
      <table class="divBase">
        <tr>
          <td style="height: 100%;width: 90%;">
            <div class="selfDefineScroll" style="overflow-y: auto;overflow-x: hidden;height: 100%;width: 100%;min-width: 900px">
              <div style="height: 1500px;width: 100%;position: relative;padding-left: 6rem">

                <div style="position: absolute; width: 25rem; height: auto; top: 6.68rem;">
                  <div class="titleFont" style="width: 25rem;height: auto;">
                    {{titleFont}}
                  </div>

                  <div class="dateFont" style="width: auto;height: 0.93rem;margin-top: 3rem;">
                    DATE：{{dateFont}}
                  </div>

                  <div class="backNewsFont" style="width: auto;height: 1.12rem;margin-top: 10rem;">
                    <a href="/News">BACK TO THE NEWS</a>
                  </div>

                  <div style="position: absolute;width: 18.37rem;height: 10.25rem;top: 47.45rem;">
                    <img :src="img1" style="position: absolute;width: 100%;height: 100%"/>
                  </div>

                  <div style="position: absolute;width: 18.37rem;height: 10.25rem;top: 58.95rem;">
                    <img :src="img2" style="position: absolute;width: 100%;height: 100%"/>
                  </div>
                </div>

                <div v-html="textHtml" class="fontColor" style="position: absolute;width: 39.31rem;height: 1500px;top: 6.68rem;left: 32.93rem;">

                </div>

<!--                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 5.75rem;top: 6.68rem;left: 32.93rem;">-->
<!--                  {{font1}}-->
<!--                </div>-->

<!--                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 4.31rem;top: 13.68rem;left: 32.93rem;">-->
<!--                  {{font2}}-->
<!--                </div>-->

<!--                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 4.31rem;top: 19.24rem;left: 32.93rem;">-->
<!--                  {{font3}}-->
<!--                </div>-->

<!--                <div style="position: absolute;width: 35.87rem;height: 20rem;top: 28.11rem;left: 32.93rem;">-->
<!--                  <img :src="img3" style="position: absolute;width: 100%;height: 100%"/>-->
<!--                </div>-->

<!--                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 5.75rem;top: 55.11rem;left: 32.93rem;">-->
<!--                  {{font4}}-->
<!--                </div>-->

<!--                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 4.31rem;top: 62.11rem;left: 32.93rem;">-->
<!--                  {{font5}}-->
<!--                </div>-->

<!--                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 4.31rem;top: 67.67rem;left: 32.93rem;">-->
<!--                  {{font6}}-->
<!--                </div>-->

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
  import boxes from './commonScripts/moveBackground'

  import {getNewsLink,getImagesByImageCode} from './requestScript/meltingGames'

  export default {
    name: 'meltingGames',
    components: { toolbar,contacts },
    data(){
      return {
        firstImg: '',
        backImg:'',
        img1:'',
        img2:'',
        img3:'',
        titleFont:'',
        dateFont:'',
        font1:'',
        font2:'',
        font3:'',
        font4:'',
        font5:'',
        font6:'',
        textHtml:'',
      }
    },
    created() {
      let that = this;
      getNewsLink({id:this.$route.query.id}).then(resp =>{
        if(resp.data && resp.data.length > 0){
          resp = resp.data;
          this.img1 = resp[0].img01 ? resp[0].img01.replaceAll('\\','\/') : "";
          this.img2 = resp[0].img02 ? resp[0].img02.replaceAll('\\','\/') : "";
          this.img3 = resp[0].img03 ? resp[0].img03.replaceAll('\\','\/') : "";
          this.titleFont = resp[0].title;
          this.dateFont = resp[0].date;
          this.font1 = resp[0]['text'+that.$store.getters.getLanguage+'01'] ? resp[0]['text'+that.$store.getters.getLanguage+'01'].split('\n')[0] : "";
          this.font2 = resp[0]['text'+that.$store.getters.getLanguage+'01'] ? resp[0]['text'+that.$store.getters.getLanguage+'01'].split('\n')[1] : "";
          this.font3 = resp[0]['text'+that.$store.getters.getLanguage+'01'] ? resp[0]['text'+that.$store.getters.getLanguage+'01'].split('\n')[2] : "";
          this.font4 = resp[0]['text'+that.$store.getters.getLanguage+'02'] ? resp[0]['text'+that.$store.getters.getLanguage+'02'].split('\n')[0] : "";
          this.font5 = resp[0]['text'+that.$store.getters.getLanguage+'02'] ? resp[0]['text'+that.$store.getters.getLanguage+'02'].split('\n')[1] : "";
          this.font6 = resp[0]['text'+that.$store.getters.getLanguage+'02'] ? resp[0]['text'+that.$store.getters.getLanguage+'02'].split('\n')[2] : "";
          this.textHtml = resp[0]['text'];
        }
      })

      getImagesByImageCode({imageCode:'08'}).then(resp =>{
        if(resp.data.length > 0){
          this.firstImg = resp.data[0].imageUrl ? resp.data[0].imageUrl.replaceAll('\\','\/') : "";
        }
      })

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
      elements[0].style.backgroundColor = "#BE4123";
      elements[0].classList.remove("anation");
    }
  }
</script>

<style scoped>
  @import './commonCSS/moveBackground.scss';

  .image{
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
    opacity: 0.3;
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

  >>> .el-button--primary{
    color: #FFFFFF;
    background-color: #0D0D0D;
    border-color: #0D0D0D;
  }

  .divBase {
    width: 100%;
    height: 100%;
  }

  .titleFont{
    font-weight: 500;
    font-size: 2.62rem;
    line-height: 130%;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #B8B7B2;
    font-family: DIN-BoldItalic;
    font-style: italic;
  }

  .fontColor{
    color: #B8B7B2;
  }

  .dateFont{
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 110%;
    letter-spacing: 0.05em;
    text-transform: capitalize;
    color: #B7B5B0;
    opacity: 0.8;
    font-family: DIN-BoldItalic;
    font-style: italic;
  }

  .backNewsFont{
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1.125rem;
    letter-spacing: 0.05em;
    text-decoration-line: underline;
    text-transform: uppercase;
    color: #E3E1DB;
    opacity: 0.5;
    font-family: DIN-BoldItalic;
    font-style: italic;
  }

  .contentFont{
    font-weight: 200;
    font-size: 1.125rem;
    line-height: 130%;
    color: #b0b0ae;
    font-family: inter;
    font-style: normal;
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
