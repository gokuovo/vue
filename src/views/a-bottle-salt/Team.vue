<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">
    <div style="height: 10%;width: 90rem">
      <toolbar></toolbar>
    </div>

    <div style="height: 90%;width: 90rem">
      <table class="divBase">
        <tr>
          <td style="height: 100%;width: 90%;">
            <div class="selfDefineScroll" style="overflow-y: auto;overflow-x: hidden;height: 100%;width: 100%;min-width: 900px">
              <div style="height: 1500px;width: 100%;position: relative;padding-left: 6rem">

                <div style="position: absolute;width: 13.75rem;height: 18.75rem" @mouseover="divFocus(1)" @mouseout="divLoseFocus(1)">
                  <img ref="1_img" :src="teamImages[0].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="1_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[0]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[0]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[0]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 20rem;height: 12.5rem;top: 18.75rem">
                  <div class="firstFont">
                    in 2015 in Beijing, we established <span style="color: #F24E1E">Salt Sound Studio</span>, offering sound design, sound effects, music, voice over, & sound implantation for games.
                  </div>
                </div>

                <div style="position: absolute;width: 20rem;height: 23.43rem;top: 31.25rem" @mouseover="divFocus(2)" @mouseout="divLoseFocus(2)">
                  <img ref="2_img" :src="teamImages[1].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="2_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[1]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[1]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[1]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 20rem;height: 12.5rem;top: 54.68rem">
                  <div class="firstFont">
                    Our works are frequently displayed on Weplay, E3, PAX, TGS, Gamescom, and won many <span style="color: #F24E1E">AWARDS</span> in IGF, GMGC, IMGA and Indieplay.
                  </div>
                </div>

                <div style="position: absolute;width: 20rem;height: 14.06rem;top: 67.18rem" @mouseover="divFocus(3)" @mouseout="divLoseFocus(3)">
                  <img ref="3_img" :src="teamImages[2].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="3_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[2]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[2]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[2]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 21.875rem;height: 18.75rem;top: 0;left: 19.6rem" @mouseover="divFocus(4)" @mouseout="divLoseFocus(4)">
                  <img ref="4_img" :src="teamImages[3].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="4_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[3]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[3]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[3]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 15.62rem;height: 21.87rem;top: 18.75rem;left: 26rem" @mouseover="divFocus(5)" @mouseout="divLoseFocus(5)">
                  <img ref="5_img" :src="teamImages[4].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="5_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[4]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[4]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[4]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 22.5rem;height: 15rem;top: 39.7rem;left: 26rem" @mouseover="divFocus(6)" @mouseout="divLoseFocus(6)">
                  <img ref="6_img" :src="teamImages[5].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="6_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[5]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[5]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[5]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 22.5rem;height: 26.55rem;top: 54.7rem;left: 26rem" @mouseover="divFocus(7)" @mouseout="divLoseFocus(7)">
                  <img ref="7_img" :src="teamImages[6].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="7_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[6]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[6]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[6]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>


                <div style="position: absolute;width: 18.75rem;height: 28.12rem;top: 0;left: 41.5rem" @mouseover="divFocus(8)" @mouseout="divLoseFocus(8)">
                  <img ref="8_img" :src="teamImages[7].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="8_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[7]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[7]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[7]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 18.75rem;height: 11.58rem;top: 28.12rem;left: 41.5rem" @mouseover="divFocus(9)" @mouseout="divLoseFocus(9)">
                  <img ref="9_img" :src="teamImages[10].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="9_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[10]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[10]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[10]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>


                <div style="position: absolute;width: 30.75rem;height: 20rem;top: 39.7rem;left: 48.47rem" @mouseover="divFocus(10)" @mouseout="divLoseFocus(10)">
                  <img ref="10_img" :src="teamImages[8].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="10_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[8]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[8]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[8]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 30.75rem;height: 21.7rem;top: 59.7rem;left: 48.47rem" @mouseover="divFocus(11)" @mouseout="divLoseFocus(11)">
                  <img ref="11_img" :src="teamImages[9].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="11_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[9]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[9]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[9]['staffDesc'+$store.getters.getLanguage]}}</div>
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>

                <div style="position: absolute;width: 18.87rem;height: 12.5rem;top: 0;left: 60.3rem;">
                  <div class="firstFont">
                    we always keep high standards in terms of aesthetic and creative idea. we Respect <span style="color: #F24E1E">art, creation</span> and the contribution to art through <span style="color: #F24E1E">technology.</span>
                  </div>
                </div>

                <div style="position: absolute;width: 18.87rem;height: 27.2rem;top: 12.5rem;left: 60.3rem" @mouseover="divFocus(12)" @mouseout="divLoseFocus(12)">
                  <img ref="12_img" :src="teamImages[11].staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div ref="12_code" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{teamImages[11]['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[11]['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{teamImages[11]['staffDesc'+$store.getters.getLanguage]}}</div>
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

  import {getTeam} from './requestScript/Team'

  export default {
    name: 'Team',
    components: { toolbar,contacts },
    data(){
      return {
        teamImages:[
        ],
        counts:32,
        staffName: 'staffNameEn',
      }
    },
    watch:{
      "$store.state.fontFamily.maxHeight":function() {
        this.$refs.alignCenter.style.maxHeight = this.$store.getters.geMaxHeight+'px';
      }
    },
    mounted(){
      // getTeam().then(resp =>{
      //   if(resp.data.length > 0){
      //     resp = resp.data;
      //     if(resp.length % 4 != 0){
      //       let remainder = resp.length % 4 == 0 ? 0 : 4 - (resp.length % 4);
      //       for(let i = 0; i < remainder;i++){
      //         let temp = {};
      //         resp.push(temp);
      //       }
      //     }
      //     let arrHeight1 = [40,60,46,54];let arrHeight2 = [55,45,58,42];let arrHeight3 = [50,50,47,53];let arrHeight4 = [58,42,57,43];
      //     let sumHeight1 = 0;let sumHeight2 = 0;let sumHeight3 = 0;let sumHeight4 = 0;
      //     let count = resp.length / 4;
      //     let index = 0;let countIndex = 0;
      //     for(let i = 0;i < count;i++){
      //       if(i+1 == count){
      //         index = i % 4;
      //         resp[countIndex].height = arrHeight1[index];
      //         sumHeight1 += arrHeight1[index];
      //         resp[count + countIndex].height = sumHeight1 - sumHeight2;
      //         resp[count*2 + countIndex].height = sumHeight1 - sumHeight3;
      //         resp[count*3 + countIndex].height = sumHeight1 - sumHeight4;
      //       }else{
      //         index = i % 4;
      //         resp[countIndex].height = arrHeight1[index];
      //         sumHeight1 += arrHeight1[index];
      //         resp[count + countIndex].height = arrHeight2[index];
      //         sumHeight2 += arrHeight2[index];
      //         resp[count*2 + countIndex].height = arrHeight3[index];
      //         sumHeight3 += arrHeight3[index];
      //         resp[count*3 + countIndex].height = arrHeight4[index];
      //         sumHeight4 += arrHeight4[index];
      //         countIndex++;
      //       }
      //     }
      //     this.teamImages = resp;
      //     let that = this;
      //     window.setTimeout(function() {
      //       let arr = [].slice.call(document.getElementsByClassName("g-item"));
      //       for(let i = 0;i < arr.length;i++){
      //         arr[i].style.height = that.teamImages[i].height+"%";
      //         if(that.teamImages[i].id == undefined) {
      //           arr[i].style.background = "rgb(" + that.getRandom(0, 255) + "," + that.getRandom(0, 255) + "," + that.getRandom(0, 255) + ")";
      //         }
      //       }
      //     },100);
      //   }
      // });

      getTeam().then(resp =>{
        if(resp.data.length > 0){
          resp.data.sort(this.compare("sort"));
          this.teamImages = resp.data;
        }
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
        this.$refs[id+"_img"].classList.remove("xiaoshi");
        this.$refs[id+"_img"].classList.remove("chuxian");

        this.$refs[id+"_code"].classList.remove("xiaoshi");
        this.$refs[id+"_code"].classList.remove("chuxian");

        // this.$refs[id+"_img"].style.display = 'none';
        this.$refs[id+"_img"].classList.add("xiaoshi");
        this.$refs[id+"_code"].style.display = 'block';
        this.$refs[id+"_code"].classList.add("chuxian");
      },
      divLoseFocus(id){
        this.$refs[id+"_img"].classList.remove("xiaoshi");
        this.$refs[id+"_img"].classList.remove("chuxian");

        this.$refs[id+"_code"].classList.remove("xiaoshi");
        this.$refs[id+"_code"].classList.remove("chuxian");

        this.$refs[id+"_img"].style.display = 'block';
        this.$refs[id+"_img"].classList.add("chuxian");
        // this.$refs[id+"_code"].style.display = 'none';
        this.$refs[id+"_code"].classList.add("xiaoshi");
      }
    }
  }
</script>

<style lang="scss" scoped>

  .firstFont{
    position: absolute;
    width: 213px;
    height: 108px;
    font-family: 'DIN-BoldItalic';
    font-style: italic;
    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
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

  .chuxian{
    animation: chuxian 1.5s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes chuxian{
    0%{opacity: 0;}
    100%{opacity: 1;}
  }

  .xiaoshi{
    animation: xiaoshi 1.5s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes xiaoshi{
    0%{opacity: 1;}
    100%{opacity: 0;}
  }


  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic
  }

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
