<template>
    <div style="width: 100%;height: 100%;">
      <div v-for="(item,index) in contacts">
        <a :href="item.contactUrl" target="_blank">
          <div class="contactsImg" :style="{top : `${13.07+(index+1) * 4.89}rem`,
                width: `${index == 0 ? 1.218 : (index == 1 ? 1.125 : (index == 2 ? 0.777 : 0.656)) }rem`,
                height: `${index == 0 ? 0.99 : (index == 1 ? 0.687 : (index == 2 ? 1.119 : 1.5)) }rem`}">
              <img :src="item.imageUrl" style="object-fit: contain;"/>
          </div>
        </a>
      </div>
    </div>
</template>

<script>
  import {getSocialFour} from '../requestScript/Contacts'

  export default {
    name: 'contacts',
    data(){
      return {
        contacts:[
        ],
      }
    },
    created() {
      getSocialFour().then(resp =>{
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

  .contactsImg{
    width: 1.218rem;
    height: 1rem;
    position: absolute;
    right: 6.06rem;
  }

  img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    display:block;
  }
</style>
