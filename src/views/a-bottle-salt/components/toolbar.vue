<template>
    <div style="width: 100%;height: 100%">
      <table style="width: 100%;height: 100%">
        <tr>
          <td style="width: 15%;text-align: center" @click="backToFirstPage">
            <img style="width: 50%;height: 100%" :src="firstImg"/>
          </td>
          <td style="width: 65%">
            <el-breadcrumb separator="   ">
              <el-breadcrumb-item :to="{ path: '/ourServices' }">OUR SERVICE</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Projects' }">PROJECT</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Team' }">TEAM</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/News' }">NEWS</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Contacts' }">CONTACT US</el-breadcrumb-item>
              <el-breadcrumb-item :to="{ path: '/Partners' }">PARTNERS</el-breadcrumb-item>
            </el-breadcrumb>
          </td>
          <td style="width: 20%">
            <el-dropdown>
              <el-button type="primary">
                Language<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>EN</el-dropdown-item>
                <el-dropdown-item>CN</el-dropdown-item>
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
        firstImg: require('@/assets/404_images/404.png'),
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
