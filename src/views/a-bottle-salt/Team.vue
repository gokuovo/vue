<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">
    <div style="height: 10%;width: 90rem">
      <toolbar></toolbar>
    </div>

    <div style="height: 90%;width: 90rem">
      <table class="divBase">
        <tr>
          <td style="height: 100%;width: 80%;">
            <div class="selfDefineScroll" style="overflow-y: auto;height: 100%;width: 100%;max-width: 1500px;min-width: 800px">
              <div ref="gContainer" class="g-container">
                <div @mouseover="divFocus(item.id)" @mouseout="divLoseFocus(item.id)" v-for="(item) in teamImages" class="g-item">
                  <img :ref="item.id+'_img'" :src="item.staffImage" style="position: absolute;width: 100%;height: 100%"/>
                  <div :ref="item.id+'_code'" style="position: absolute;width: 100%;height: 100%;display: none;background: #0D0D0D">
                    <table class="divBase">
                      <tr>
                        <td class="BoldItalic" style="text-align: center;">
                          <div style="color: #F88E5A;font-size: 16px">{{item['staffName'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{item['staffPost'+$store.getters.getLanguage]}}</div>
                          <div style="font-size: 13px;color:#BAB9B6;padding-top: 5%">{{item['staffDesc'+$store.getters.getLanguage]}}</div>
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
      getTeam().then(resp =>{
        if(resp.data.length > 0){
          resp = resp.data;
          if(resp.length % 4 != 0){
            let remainder = resp.length % 4 == 0 ? 0 : 4 - (resp.length % 4);
            for(let i = 0; i < remainder;i++){
              let temp = {};
              resp.push(temp);
            }
          }
          let arrHeight1 = [40,60,46,54];let arrHeight2 = [55,45,58,42];let arrHeight3 = [50,50,47,53];let arrHeight4 = [58,42,57,43];
          let sumHeight1 = 0;let sumHeight2 = 0;let sumHeight3 = 0;let sumHeight4 = 0;
          let count = resp.length / 4;
          let index = 0;let countIndex = 0;
          for(let i = 0;i < count;i++){
            if(i+1 == count){
              index = i % 4;
              resp[countIndex].height = arrHeight1[index];
              sumHeight1 += arrHeight1[index];
              resp[count + countIndex].height = sumHeight1 - sumHeight2;
              resp[count*2 + countIndex].height = sumHeight1 - sumHeight3;
              resp[count*3 + countIndex].height = sumHeight1 - sumHeight4;
            }else{
              index = i % 4;
              resp[countIndex].height = arrHeight1[index];
              sumHeight1 += arrHeight1[index];
              resp[count + countIndex].height = arrHeight2[index];
              sumHeight2 += arrHeight2[index];
              resp[count*2 + countIndex].height = arrHeight3[index];
              sumHeight3 += arrHeight3[index];
              resp[count*3 + countIndex].height = arrHeight4[index];
              sumHeight4 += arrHeight4[index];
              countIndex++;
            }
          }
          this.teamImages = resp;
          let that = this;
          window.setTimeout(function() {
            let arr = [].slice.call(document.getElementsByClassName("g-item"));
            for(let i = 0;i < arr.length;i++){
              arr[i].style.height = that.teamImages[i].height+"%";
              if(that.teamImages[i].id == undefined) {
                arr[i].style.background = "rgb(" + that.getRandom(0, 255) + "," + that.getRandom(0, 255) + "," + that.getRandom(0, 255) + ")";
              }
            }
          },100);
        }
      });
    },
    methods:{
      getRandom(min, max) { //根据最小值和最大值产生一个随机数
        return Math.floor(Math.random() * (max - min) + min);
      },
      divFocus(id){
        this.$refs[id+"_img"][0].classList.remove("xiaoshi");
        this.$refs[id+"_img"][0].classList.remove("chuxian");

        this.$refs[id+"_code"][0].classList.remove("xiaoshi");
        this.$refs[id+"_code"][0].classList.remove("chuxian");

        // this.$refs[id+"_img"][0].style.display = 'none';
        this.$refs[id+"_img"][0].classList.add("xiaoshi");
        this.$refs[id+"_code"][0].style.display = 'block';
        this.$refs[id+"_code"][0].classList.add("chuxian");
      },
      divLoseFocus(id){
        this.$refs[id+"_img"][0].classList.remove("xiaoshi");
        this.$refs[id+"_img"][0].classList.remove("chuxian");

        this.$refs[id+"_code"][0].classList.remove("xiaoshi");
        this.$refs[id+"_code"][0].classList.remove("chuxian");

        this.$refs[id+"_img"][0].style.display = 'block';
        this.$refs[id+"_img"][0].classList.add("chuxian");
        // this.$refs[id+"_code"][0].style.display = 'none';
        this.$refs[id+"_code"][0].classList.add("xiaoshi");
      }
    }
  }
</script>

<style lang="scss" scoped>
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
    padding-left: 7rem;
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
    animation: chuxian 3s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes chuxian{
    0%{opacity: 0;}
    100%{opacity: 1;}
  }

  .xiaoshi{
    animation: xiaoshi 3s linear 0s;
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
