<template>
    <div style="width: 100%;height: 100%;padding-top: 60%">
      <el-tooltip class="item" effect="dark" :content="contacts.twitter" placement="top-start">
        <div style="width: 10%;height: 15%">
          <img :src="require('@/assets/images/twitter.jpeg')"/>
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="contacts.facebook" placement="top-start">
        <div style="width: 10%;height: 15%">
          <img :src="require('@/assets/images/twitter.jpeg')"/>
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="contacts.ins" placement="top-start">
        <div style="width: 10%;height: 15%">
          <img :src="require('@/assets/images/twitter.jpeg')"/>
        </div>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="contacts.weChat" placement="top-start">
        <div style="width: 10%;height: 15%">
          <img :src="require('@/assets/images/twitter.jpeg')"/>
        </div>
      </el-tooltip>
    </div>
</template>

<script>
  export default {
    name: 'contacts',
    data(){
      return {
        contacts:{
          twitter:'推特联系方式',
          facebook:'脸书联系方式',
          ins:'ins联系方式',
          weChat:'微信联系方式'
        },
      }
    }
  }
</script>

<style scoped>
  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    display:block;
  }
</style>
