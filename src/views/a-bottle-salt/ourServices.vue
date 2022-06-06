<template>
  <div class="divBase">
    <div style="height: 10%;width: 100%">
      <toolbar></toolbar>
    </div>

    <div style="height: 90%;width: 100%">
      <table class="divBase">
        <tr>
          <td style="width: 80%;text-align: center">
            <div style="width: 100%;height: 40%">
              <table class="divBase">
                <tr>
                  <td style="width: 30%;color: #F5F5F5;font-size: 28px;vertical-align: top">
                    <div style="padding-top: 15%">
                      WHAT WE DO
                    </div>
                  </td>
                  <td style="width: 50%;color: #BAB9B6;text-align: left;vertical-align: top">
                    <div style="padding-top: 10%">
                      We hold high standard for our works.
                    </div>
                    <div style="padding-top: 5%">
                        We see every game and film as art; based on that we design, compose our music that fits in "three element" as the core.
                    </div>
                    <div style="padding-top: 5%">
                        Therefore, our music and audio projects have won many awards in IGF, IMGA,INDIEPLAY,GMGC,CMA，ANIWow and so on.
                    </div>
                  </td>
                  <td style="width: 20%"></td>
                </tr>
              </table>
            </div>
            <div style="width: 100%;height: 10%;color: #F5F5F5;font-size: 18px;font-style:oblique;">
              <table class="divBase">
                <tr>
                  <td style="width: 25%;vertical-align: bottom;text-align: right">MUSIC</td>
                  <td style="width: 25%;vertical-align: bottom;text-align: center">SOUND DESIGN</td>
                  <td style="width: 18%;vertical-align: bottom;text-align: left">VOICE ACTING</td>
                  <td style="width: 37%;vertical-align: bottom;text-align: left">GAME AUDIO PIPELINE</td>
                </tr>
              </table>
            </div>
            <div style="width: 100%;height: 10%">
              <table v-show="!watchVideoOrNot" class="divBase">
                <tr>
                  <td style="width: 33%;vertical-align: bottom;text-align: right">
                    <el-button @click="watchVideoOrNot = !watchVideoOrNot" type="danger">WATCH VIDEO<i class="el-icon-caret-right el-icon--right"></i></el-button>
                  </td>
                  <td></td>
                </tr>
              </table>
            </div>
            <div style="width: 100%;height: 40%">
              <table v-show="!watchVideoOrNot" class="divBase">
                <tr>
                  <td style="width: 40%;vertical-align: middle;text-align: right;color: #BAB9B6;">
                    <ul>
                      <li v-for="(item) in links">
                        <a target="_blank" :href="item.value">{{item.key}}</a>
                      </li>
                    </ul>
                  </td>
                  <td style="color: #BAB9B6;text-align:left;vertical-align: top;">
                    <div style="padding-top: 7%">
                      "We've worked with Salt Sound Studio for a number of years, those gyus have agreat ear for music and help to bring the best out of each song,
                    </div>
                    <div style="padding-top: 2%">
                      lt's always a pleasure to work together.
                    </div>
                    <div style="padding-top: 2%">
                      We recommend anyone who wants a high quality professional sound to book SaltSound Studio."
                    </div>
                  </td>
                </tr>
              </table>

              <table v-show="watchVideoOrNot" class="divBase">
                <tr>
                  <td style="color: #BAB9B6;width: 40%;vertical-align: middle;font-style:oblique;">
                    <div @click="watchVideoOrNot = !watchVideoOrNot">BACK TO TESTIMONIALS</div>
                  </td>
                  <td style="width: 60%;text-align: left">
                    <video width="45%" controls>
                      <source :src="firstVideo"  type="video/mp4">
                    </video>
                  </td>
                </tr>
              </table>
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

  export default {
    name: 'ourServices',
    components: { toolbar, contacts },
    data() {
      return {
        links:[{key:'PERFECT WORLD GAMES',value:'https://www.baidu.com'},{key:'FUN PLUS',value:'https://www.baidu.com'},{key:'TOP JOY',value:'https://www.baidu.com'},{key:'CENTURY GAMES',value:'https://www.baidu.com'}],
        watchVideoOrNot:false,
        firstVideo: require('@/assets/404_images/movie.mp4'),
      }
    }
  }
</script>

<style scoped>
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

  ul{
    list-style-type: none;
    height: 100%;
    padding-top: 10%;
    text-align: left;
    padding-left: 50%;
  }

  li{
    height: 20%;
  }
</style>
