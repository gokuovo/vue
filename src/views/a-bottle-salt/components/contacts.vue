<template>
    <div style="width: 100%;height: 100%;position: relative">
        <div style="width: 15%;height: 15%;position: absolute;right: 5rem;margin-top: 57%" v-for="(item,index) in contacts" :style="{top : `${(index+1) * 10}%`}">
            <a :href="item.contactUrl" target="_blank"><img style="position: absolute;top: 0;" :src="item.imageUrl"/></a>
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
        ],
      }
    },
    created() {
      getSocialSix().then(resp =>{
        if(resp.data.length > 0){
          this.contacts = resp.data;
          //计算联系方式图标距上边距
          // let size = this.contacts ? 10 - this.contacts.length : 6;
          // this.$refs.divTag.style.paddingTop = 10*size+"%";
        }
      });
    },
    mounted() {


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
