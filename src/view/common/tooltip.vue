<template>
    <el-tooltip :content="content" :disabled="isDisabled" effect="dark" placement="top-start" :hide-after="2000">
        <slot></slot>
    </el-tooltip>
</template>

<script>
export default {
  data() {
    return {
      isDisabled: false
    }
  },
  watch: {
    'content'(e) {
      this.initCon(e)
    }
  },
  mounted(){
    this.initCon(this.content)
  },
  methods:{
    initCon(e){
      if(e){
        if(this.isTooltip!='N'){
          // 判断是否是中文字符
          var cnText = /[\u4E00-\u9FA5\\s]+/;
          if(cnText.test(e)){
            this.isDisabled = e.length >= 6 ? false : true
          }else{
            this.isDisabled = e.length >= 6 ? false : true
          }
        }else{
          this.isDisabled = true
        }
      }else{
        this.isDisabled = true
      }
    }
  },
  props: {
    content: {
      type: String
    },
    isTooltip: {}
  }
};
</script>
