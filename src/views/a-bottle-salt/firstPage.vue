<template>
  <div class="divBase">

    <div style="height: 10%;width: 100%">
      <toolbar></toolbar>
    </div>

    <div style="height: 80%">
      <table class="divBase">
        <tr>
          <td style="width: 80%;text-align: center">
            <div style="width: 100%;">
              <video width="65%" controls>
                <source :src="firstVideo"  type="video/mp4">
              </video>
            </div>
          </td>
          <td style="width: 20%;">
            <contacts></contacts>
          </td>
        </tr>
      </table>
    </div>

    <div style="height: 10%">
      <table class="divBase">
        <tr>
          <td style="width: 15%">
            <span :style="{'color': '#FFFFFF','font-family': fontFamily}">
              字体（需要能更换主题字体）
            </span>
          </td>
          <td style="width: 65%;text-align: right">
            <span style="color: #FFFFFF">
              预留功能
            </span>
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
    name: 'firstPage',
    components: { toolbar,contacts },
    data() {
      return {
        firstVideo: require('@/assets/404_images/movie.mp4'),
        fontFamily:''
      }
    },
    created() {
      this.$store.commit('fontFamily/CHANGE_FONT_FAMILY','cursive');
      this.fontFamily = this.$store.getters.geFontFamily;
    }
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0
  }

  .divBase {
    width: 100%;
    height: 100%;
  }

  .oneLineDiv{
    display: inline-block;
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
