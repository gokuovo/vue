<template>
    <div ref="divTag" style="width: 100%;height: 100%;">
      <div style="width: 100%;height: 100%;padding-left: 30%">
        <div style="width: 15%;height: 15%" v-for="(item) in contacts">
            <div>
              <a :href="item.contactUrl" target="_blank"><img :src="item.imageUrl"/></a>
            </div>
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
        ],
      }
    },
    created() {
      getSocialSix().then(resp =>{
        if(resp.data.length > 0){
          this.contacts = resp.data;
          //计算联系方式图标距上边距
          let size = this.contacts ? 10 - this.contacts.length : 6;
          this.$refs.divTag.style.paddingTop = 10*size+"%";
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
