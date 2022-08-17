<template>
  <div style="width: 90rem;height: 100%">
    <table style="width: 90rem;height: 100%">
      <tr>
        <td style="width: 18.75rem;" @click="backToFirstPage">
          <div style="margin-left: 4rem;height: 100%;background-repeat: no-repeat;background-size: 100% 100%;"  :style="{backgroundImage:`url(${$store.getters.getLogo})`}">
          </div>
        </td>
        <td style="width: 60rem;height: 100%;position: relative">
          <el-breadcrumb separator="   ">
            <el-breadcrumb-item :to="item.url" v-for="item in breadcrumbs" :key="item.url">
              <span class="barFont" style="font-style: italic">{{item['menuName'+$store.getters.getLanguage]}}</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
        </td>
        <td style="width: 11.25rem">
          <div style="position: relative;width: 11.25rem;height: 100%">
              <el-dropdown @command="handleCommand">
                <el-button type="primary">
                  <span class="selfFont">EN</span>
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
          </div>
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

  * {
    margin: 0;
    padding: 0
  }

  >>>.el-breadcrumb{
    position: absolute;
    top: 40%;
  }

  >>>.el-breadcrumb__item{
    padding-right: 2.06rem;
  }

  >>>.el-dropdown{
    position: absolute;
    top: 40%;
    right: 6rem;
  }

  table{
    border-collapse:collapse;
    border-spacing: 0;
  }

  .barFont{
    font-family: DIN-BoldItalic;
  }

  .barFont:hover {
    animation: change 1.5s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }

  @keyframes change {
    0% {
      color: rgba(189,187,183,0.1)
    }
    30%{
      color:rgba(248,197,182,0.3)
    }
    50% {
      color: rgba(247,149,123,0.5)
    }
    80% {
      color: rgba(255,101,59,0.8)
    }
    100% {color: rgba(248,81,35,1);}
  }

  .selfFont{
    font-family: DIN-BoldItalic;
    font-style: italic
  }

  .el-breadcrumb{
    font-size: 18px!important;
  }
</style>
