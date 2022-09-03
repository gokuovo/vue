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

                <div class="titleFont" style="position: absolute;width: 25rem;height: 6.87rem;top: 6.68rem;">
                  MELTING GAMES COLLABORATION
                </div>

                <div class="dateFont" style="position: absolute;width: 5.37rem;height: 0.93rem;top: 16.35rem;">
                  Date
                </div>

                <div class="backNewsFont" style="position: absolute;width: 7.12rem;height: 1.12rem;top: 28.9rem;">
                  <a href="/#/News">BACK TO THE NEWS</a>
                </div>

                <div style="position: absolute;width: 18.37rem;height: 10.25rem;top: 53.45rem;">
                  <img  style="position: absolute;width: 100%;height: 100%"/>
                </div>

                <div style="position: absolute;width: 18.37rem;height: 10.25rem;top: 64.95rem;">
                  <img  style="position: absolute;width: 100%;height: 100%"/>
                </div>

                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 5.75rem;top: 6.68rem;left: 32.93rem;">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                </div>

                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 4.31rem;top: 13.68rem;left: 32.93rem;">
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                </div>

                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 4.31rem;top: 19.24rem;left: 32.93rem;">
                  Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
                </div>

                <div style="position: absolute;width: 35.87rem;height: 20rem;top: 28.11rem;left: 32.93rem;">
                  <img  style="position: absolute;width: 100%;height: 100%"/>
                </div>

                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 5.75rem;top: 55.11rem;left: 32.93rem;">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit, sit amet feugiat lectus.
                </div>

                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 4.31rem;top: 62.11rem;left: 32.93rem;">
                  Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus enim egestas, ac scelerisque ante pulvinar.
                </div>

                <div class="contentFont" style="position: absolute;width: 39.31rem;height: 4.31rem;top: 67.67rem;left: 32.93rem;">
                  Donec ut rhoncus ex. Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in elementum tellus.
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

  import {getImagesByImageCode,getWord} from './requestScript/meltingGames'

  export default {
    name: 'meltingGames',
    components: { toolbar,contacts },
    data(){
      return {
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
      }
    },
    created() {

      getImagesByImageCode({imageCode:'111'}).then(resp =>{
        if(resp.data.length > 0){
          this.backImg = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })
      getImagesByImageCode({imageCode:'112'}).then(resp =>{
        if(resp.data.length > 0){
          this.img1 = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })
      getImagesByImageCode({imageCode:'113'}).then(resp =>{
        if(resp.data.length > 0){
          this.img2 = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })
      getImagesByImageCode({imageCode:'114'}).then(resp =>{
        if(resp.data.length > 0){
          this.img3 = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })

      getWord({code:'114'}).then(resp =>{
        if(resp.data.length > 0){
          this.titleFont = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })







    }
  }
</script>

<style scoped>

  .divBase {
    width: 100%;
    height: 100%;
  }

  .titleFont{
    font-family: 'DIN-BoldItalic';
    font-style: italic;
    font-weight: 500;
    font-size: 2.62rem;
    line-height: 130%;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #B8B7B2;
  }

  .dateFont{
    font-family: 'DIN-BoldItalic';
    font-style: italic;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 110%;
    letter-spacing: 0.05em;
    text-transform: capitalize;
    color: #B7B5B0;
    opacity: 0.8;
  }

  .backNewsFont{
    font-family: 'DIN-BoldItalic';
    font-style: italic;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1.125rem;
    letter-spacing: 0.05em;
    text-decoration-line: underline;
    text-transform: uppercase;
    color: #E3E1DB;
    opacity: 0.5;
  }

  .contentFont{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-size: 1.125rem;
    line-height: 130%;
    color: #E3E1DB;
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
