<template>
    <div style="width: 100%;height: 100%">
      <table style="width: 100%;height: 100%">
        <tr>
          <td style="width: 15%;" @click="backToFirstPage">
            <div style="position: relative;height: 100%;width: 100%">
              <img style="position: absolute;width: 100%;height: 100%" :src="firstImg"/>
            </div>
          </td>
          <td style="width: 65%">
            <el-breadcrumb separator="   ">
              <el-breadcrumb-item :to="item.srcPath" v-for="item in breadcrumbs" :key="item.srcPath">
                <span style="font-style: italic">{{item.name}}</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
          </td>
          <td style="width: 20%">
            <el-dropdown>
              <el-button type="primary">
                <span style="font-style: italic">Language</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span style="font-style: italic">EN</span>
                </el-dropdown-item>
                <el-dropdown-item>
                  <span style="font-style: italic">CN</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </td>
        </tr>
      </table>
    </div>
</template>

<script>
  export default {
    name: 'toolbar',
    data(){
      return {
        firstImg: require('@/assets/images/salt.png'),
        breadcrumbs:[
          {
            name:'OUR SERVICE',
            srcPath:'/ourServices'
          },
          {
            name:'PROJECT',
            srcPath:'/Projects'
          },
          {
            name:'TEAM',
            srcPath:'/Team'
          },
          {
            name:'NEWS',
            srcPath:'/News'
          },
          {
            name:'CONTACT US',
            srcPath:'/Contacts'
          },
          {
            name:'PARTNERS',
            srcPath:'/Partners'
          }
        ]
      }
    },
    methods:{

      backToFirstPage(){
        this.$router.push('/');
      },

    }
  }
</script>

<style scoped>

</style>
