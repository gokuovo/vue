<template>
  <div>
    <div style="height: 10%;width: 100%">
      <toolbar></toolbar>
    </div>
  </div>
</template>

<script>
  import toolbar from './components/toolbar'
  import contacts from './components/contacts'

  export default {
    name: 'Partners',
    components: { toolbar,contacts },
    data(){
      return {

      }
    }
  }
</script>

<style scoped>
  >>> .el-breadcrumb__inner{
    color: #BDBBB7!important;
  }

  >>> .el-button--primary{
    color: #FFFFFF;
    background-color: #0D0D0D;
    border-color: #0D0D0D;
  }
</style>
