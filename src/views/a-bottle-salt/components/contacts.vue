<template>
    <div ref="divTag" style="width: 100%;height: 100%;">
      <div style="width: 10%;height: 15%" v-for="(item) in contacts">
          <div>
            <img :src="item.image_url"/>
          </div>
      </div>
    </div>
</template>

<script>
  import {getSocialSix} from '../requestScript/Contacts'

  export default {
    name: 'contacts',
    data(){
      return {
        contacts:[
          {image_url:'2'},
          {image_url:'2'},
          {image_url:'2'},
          {image_url:'2'},
        ],
      }
    },
    created() {
      getSocialSix().then(resp =>{
        if(resp.data.list > 0){
          this.contacts = resp.data.list;
        }
      });
    },
    mounted() {
      //计算联系方式图标距上边距
      let size = this.contacts ? 10 - this.contacts.length : 6;
      this.$refs.divTag.style.paddingTop = 10*size+"%";


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
