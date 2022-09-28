<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">
    <div style="height: 10%;width: 90rem">
      <toolbar></toolbar>
    </div>

    <div style="height: 90%;width: 90rem;position: absolute;top: 9.375rem;background-color: rgba(0, 0, 0, 0.9)">
      <table class="divBase">
        <tr>
          <td style="height: 100%;width: 79rem;">
            <div style="height: 100%;width: 78.81rem;min-width: 56.28rem">
              <vue-custom-scrollbar ref="childScrollbar" class="scroll-area" :settings="settings" style="height: 46.7rem;width: 78.81rem;min-width: 56.28rem">
                <div style="height: 106rem;width: 100%;position: relative;padding-left: 6rem">

                <div style="position: absolute;width: 13.75rem;height: 18.75rem" @mouseover="divFocus(1)" @mouseout="divLoseFocus(1)">
                  <img ref="1_img" :src="teamImages[0].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="1_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[0]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[0]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">
                            {{teamImages[0]['staffDesc'+$store.getters.getLanguage]}}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 20rem;height: 12.5rem;top: 18.75rem;background: #121212;">
                  <div class="firstFont">
                    <span ref="fontA">in 2015</span> in Beijing, we established <span style="color: #F24E1E">Salt Sound Studio</span>, offering sound design, sound effects, music, voice over, & sound implantation for games.
                  </div>
                </div>

                <div style="position: absolute;width: 20rem;height: 23.43rem;top: 31.25rem" @mouseover="divFocus(2)" @mouseout="divLoseFocus(2)">
                  <img ref="2_img" :src="teamImages[1].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="2_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[1]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem;">{{teamImages[1]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[1]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 20rem;height: 12.5rem;top: 54.68rem;background: #121212;">
                  <div class="firstFont">
                    Our works are frequently displayed on Weplay, E3, PAX, TGS, Gamescom, and won many <span style="color: #F24E1E">AWARDS</span> in IGF, GMGC, IMGA and Indieplay.
                  </div>
                </div>

                <div style="position: absolute;width: 20rem;height: 14.06rem;top: 67.18rem" @mouseover="divFocus(3)" @mouseout="divLoseFocus(3)">
                  <img ref="3_img" :src="teamImages[2].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="3_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[2]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[2]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[2]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 21.875rem;height: 18.75rem;top: 0;left: 19.6rem" @mouseover="divFocus(4)" @mouseout="divLoseFocus(4)">
                  <img ref="4_img" :src="teamImages[3].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="4_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[3]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[3]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[3]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 15.62rem;height: 21.87rem;top: 18.75rem;left: 26rem" @mouseover="divFocus(5)" @mouseout="divLoseFocus(5)">
                  <img ref="5_img" :src="teamImages[4].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="5_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[4]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[4]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[4]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 22.5rem;height: 15rem;top: 39.7rem;left: 26rem" @mouseover="divFocus(6)" @mouseout="divLoseFocus(6)">
                  <img ref="6_img" :src="teamImages[5].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="6_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[5]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[5]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[5]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 22.5rem;height: 26.55rem;top: 54.7rem;left: 26rem" @mouseover="divFocus(7)" @mouseout="divLoseFocus(7)">
                  <img ref="7_img" :src="teamImages[6].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="7_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[6]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[6]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[6]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>


                <div style="position: absolute;width: 18.75rem;height: 28.12rem;top: 0;left: 41.5rem" @mouseover="divFocus(8)" @mouseout="divLoseFocus(8)">
                  <img ref="8_img" :src="teamImages[7].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="8_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[7]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[7]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[7]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 18.75rem;height: 11.58rem;top: 28.12rem;left: 41.5rem" @mouseover="divFocus(9)" @mouseout="divLoseFocus(9)">
                  <img ref="9_img" :src="teamImages[10].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="9_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[10]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[10]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[10]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>


                <div style="position: absolute;width: 28.88rem;height: 20rem;top: 39.7rem;left: 48.47rem" @mouseover="divFocus(10)" @mouseout="divLoseFocus(10)">
                  <img ref="10_img" :src="teamImages[8].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="10_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[8]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[8]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[8]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 28.88rem;height: 21.7rem;top: 59.7rem;left: 48.47rem" @mouseover="divFocus(11)" @mouseout="divLoseFocus(11)">
                  <img ref="11_img" :src="teamImages[9].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="11_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[9]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[9]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[9]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 17rem;height: 12.5rem;top: 0;left: 60.3rem;background: #121212;">
                  <div class="firstFont">
                    we always keep high standards in terms of aesthetic and creative idea. we Respect <span style="color: #F24E1E">art, creation</span> and the contribution to art through <span style="color: #F24E1E">technology.</span>
                  </div>
                </div>

                <div style="position: absolute;width: 17rem;height: 27.2rem;top: 12.5rem;left: 60.3rem" @mouseover="divFocus(12)" @mouseout="divLoseFocus(12)">
                  <img ref="12_img" :src="teamImages[11].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="12_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #080808">
                    <table class="divBase">
                      <tr class="trStyle">
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F24E1E;font-size: 1rem">{{teamImages[11]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B5B0;padding-top: 1.25rem">{{teamImages[11]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 0.875rem;color:#B7B6B1;padding-top: 1.25rem;width: 9.875rem">{{teamImages[11]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

              </div>
              </vue-custom-scrollbar>
            </div>
          </td>
          <td style="height: 100%;">
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
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import "vue-custom-scrollbar/dist/vueScrollbar.css"

  import {getTeam} from './requestScript/Team'

  export default {
    name: 'Team',
    components: { toolbar,contacts,vueCustomScrollbar },
    data(){
      return {
        teamImages:[
        ],
        counts:32,
        staffName: 'staffNameEn',
        animationFlag:false,
        settings: {
          suppressScrollY: false,
          suppressScrollX: true,
          wheelPropagation: false,
          maxScrollbarLength:50,
        },
      }
    },
    watch:{
      "$store.state.fontFamily.maxHeight":function() {
        this.$refs.alignCenter.style.maxHeight = this.$store.getters.geMaxHeight+'px';
      }
    },
    mounted(){

      getTeam().then(resp =>{
        if(resp.data.length > 0){
          resp.data.sort(this.compare("sort"));
          this.teamImages = resp.data;
        }
      });

      let that = this;
      window.addEventListener('resize', function() {
        that.$refs.childScrollbar.__init();
      });
    },
    methods:{
      compare(key) {
        return function(b, a) {//第一个参数是前一个对象，第二个参数是后一个对象,如果从大到小排序，将参数位置调换
          let val1 = a[key];
          let val2 = b[key];
          return val2 - val1;//求差：如果差值大于0，这两个就要对调位置
        }
      },
      getRandom(min, max) { //根据最小值和最大值产生一个随机数
        return Math.floor(Math.random() * (max - min) + min);
      },
      divFocus(id){
        this.animationFlag=false
        this.$refs[id+"_img"].classList.remove("xiaoshi");
        this.$refs[id+"_img"].classList.remove("chuxian");

        this.$refs[id+"_code"].classList.remove("xiaoshi");
        this.$refs[id+"_code"].classList.remove("chuxian");

        this.$refs["fontA"].classList.remove("chuxian1");
        this.$refs["fontA"].classList.remove("xiaoshi1");
        // this.$refs[id+"_img"].style.display = 'none';
        this.$refs[id+"_img"].classList.add("xiaoshi");
        this.$refs[id+"_code"].style.display = 'block';
        this.$refs[id+"_code"].classList.add("chuxian");

        this.$refs["fontA"].classList.add("chuxian1");
      },
      divLoseFocus(id){
        this.animationFlag=true
        this.$refs[id+"_img"].classList.remove("xiaoshi");
        this.$refs[id+"_img"].classList.remove("chuxian");

        this.$refs[id+"_code"].classList.remove("xiaoshi");
        this.$refs[id+"_code"].classList.remove("chuxian");

        this.$refs["fontA"].classList.remove("chuxian1");
        this.$refs["fontA"].classList.remove("xiaoshi1");

        this.$refs[id+"_img"].style.display = 'block';
        this.$refs[id+"_img"].classList.add("chuxian");
        // this.$refs[id+"_code"].style.display = 'none';
        this.$refs[id+"_code"].classList.add("xiaoshi");

        this.$refs["fontA"].classList.add("xiaoshi1");
      }
    }
  }
</script>

<style lang="scss" scoped>
  .trStyle{
    display: flex;align-items: center;height: 100%
  }

  .firstFont{
    position: absolute;
    width: 13.31rem;
    height: 6.75rem;
    font-family: DIN-BoldItalic;
    font-style: italic;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.125rem;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #E3E1DB;

    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%,-50%);
    -moz-transform: translate(-50%,-50%);
    transform:translate(-50%,-50%);
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

  /*@import "./commonCSS/teamImage.scss";*/
  .g-container {
    column-count: 4;
    column-gap: 0;
    width: 100%;
    height: 100%;
    padding-left: 6rem;
    position: relative;
  }

  .g-item {
    position: relative;
    width: 100%;
    break-inside: avoid;
    min-height: 200px;
  }
</style>
<style scoped>

  /*新滚动条样式*/
  >>> .ps--active-y>.ps__rail-y{
    background-color: #383838!important;
  }

  >>> .ps__rail-y{
    width: 3px;
    opacity: 1;
    margin: 18rem 0 13rem 0;
  }

  >>> .ps .ps__rail-y:focus, >>> .ps .ps__rail-y:hover{
    background-color: #383838;
    opacity: 1;
  }

  >>> .ps:hover>.ps__rail-y{
    opacity: 1;
  }

  >>> .ps__thumb-y {
    background: #d1d8e6;
    border-radius: 19px;
    background-clip: content-box;
    position: absolute;
    width: 3px;
    right: 0;
  }

  >>> .ps__rail-y.ps--clicking .ps__thumb-y, >>> .ps__rail-y:focus>.ps__thumb-y, >>> .ps__rail-y:hover>.ps__thumb-y {
    background-color: #d1d8e6;
    width: 3px;
  }
  /*新滚动条样式*/

  .chuxian{
    animation: chuxian 0.65s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes chuxian{
    0%{
     opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }

  .xiaoshi{
    animation: xiaoshi 0.65s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes xiaoshi{
    0%{
      opacity: 1;
    }
    100%{
     opacity: 0;
    }
  }

  .chuxian1{
    animation: chuxian1 0.65s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes chuxian1{
    0%{
      color: #E3E1DB;
    }
    100%{
      color: #F24E1E;
    }
  }

  .xiaoshi1{
    animation: xiaoshi1 0.65s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes xiaoshi1{
    0%{
      color: #F24E1E;
    }
    100%{
      color: #E3E1DB;
    }
  }


  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }
  .BoldItalic div{
    width: 100%;
    text-align: center;
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
</style>
