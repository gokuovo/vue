<template>
  <div style="width: 90rem;height: 100%">

    <img @click="backToFirstPage" :src="$store.getters.getLogo" style="position: absolute;left: 6rem;top: 2.18rem;width: 7.81rem;height: 2.5rem;" />

    <table style="width: 90rem;height: 100%">
      <tr>
        <td style="width: 18.75rem;">
          <div style="width: 100%;height: 100%"></div>
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
                  <span class="selfFont">En</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="Chi">
                    <span class="selfFont">CN</span>
                  </el-dropdown-item>
                  <el-dropdown-item command="En">
                    <span class="selfFont">EN</span>
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

  >>>.el-breadcrumb__separator{
    margin: 0!important;
  }

  >>>.el-breadcrumb{
    position: absolute;
    top: 50%;
  }

  >>>.el-breadcrumb__item{
    margin-right: 1.875rem;
  }

  >>>.el-dropdown{
    position: absolute;
    top: 50%;
    right: 6rem;
  }

  table{
    border-collapse:collapse;
    border-spacing: 0;
  }

  .barFont{
    font-family: DIN-BoldItalic;
    font-size: 0.875rem;
    color: #E3E1DB;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .barFont:hover {
    animation: change 1s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }

  @keyframes change {
    0% {
      color: rgba(189,187,183,0.1)
    }
    30%{
      color:#9d6f44
    }
    50% {
      color: #a86627
    }
    80% {
      color: #be6732
    }
    100% {color: #BE4123;}
  }

  .selfFont{
    font-family: DIN-BoldItalic;
    font-style: italic;
    font-size: 0.875rem;
  }

  .el-breadcrumb{
    font-size: 1.125rem!important;
  }
</style>
