<template>
  <div style="width: 100%;height: 100%">
    <table style="width: 100%;height: 100%">
      <tr>
        <td style="width: 15%;" @click="backToFirstPage">
          <div style="position: relative;height: 100%;width: 100%">
            <img style="position: absolute;width: 100%;height: 100%" :src="$store.getters.getLogo"/>
          </div>
        </td>
        <td style="width: 65%">
          <el-breadcrumb separator="   ">
            <el-breadcrumb-item :to="item.url" v-for="item in breadcrumbs" :key="item.url">
              <span class="barFont" style="font-style: italic">{{item['menuName'+$store.getters.getLanguage]}}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </td>
        <td style="width: 20%">
          <el-dropdown @command="handleCommand">
            <el-button type="primary">
              <span class="selfFont">Language</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="Chi">
                <span class="selfFont">CN</span>
              </el-dropdown-item>
              <el-dropdown-item command="En">
                <span style="font-style: italic">EN</span>
              </el-dropdown-item>
              <el-dropdown-item command="Spa">
                <span class="selfFont">SPA</span>
              </el-dropdown-item>
              <el-dropdown-item command="Jap">
                <span class="selfFont">JAP</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  import { getMenu, getLogo } from '../requestScript/Toolbar'

  export default {
    name: 'toolbar',
    inject: ['reload'],
    data() {
      return {
        breadcrumbs: [
          {
            menuNameEn: 'OUR SERVICE',
            url: '/ourServices'
          },
          {
            menuNameEn: 'PROJECTS',
            url: '/Projects'
          },
          {
            menuNameEn: 'TEAM',
            url: '/Team'
          },
          {
            menuNameEn: 'NEWS',
            url: '/News'
          },
          {
            menuNameEn: 'CONTACT US',
            url: '/Contacts'
          },
          {
            menuNameEn: 'PARTNERS',
            url: '/Partners'
          }
        ],
      }
    },
    beforeCreate(){
      getLogo().then(resp => {
        if (resp.data != '' && this.$store.getters.getLogo == '') {
          this.$store.dispatch('settings/changeLogo', resp.data)
        }
      })
    },
    created() {
      getMenu().then(resp => {
        if (resp.data.length > 0) {
          this.breadcrumbs = resp.data
        }
      })
    },
    methods: {

      backToFirstPage() {
        this.$router.push('/')
      },

      handleCommand(command) {
        this.$store.dispatch('settings/changeLanguage', command)
        this.$router.push('/')
        this.reload()
      }

    }
  }
</script>

<style scoped>

  .barFont{
    font-family: DIN-BoldItalic;
  }

  .barFont:hover {
    color: red;
  }

  .selfFont{
    font-family: DIN-BoldItalic;
    font-style: italic
  }

  .el-breadcrumb{
    font-size: 18px!important;
  }
</style>
