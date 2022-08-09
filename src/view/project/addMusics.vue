<template>
  <div>
    <div>
      请选择此次歌曲所属的专辑目录
      <el-select size="medium"  v-model="album" placeholder="请选择">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
    </div>
    <input class="fileUploaderClass" type='file' name="uploadDirBtn" ref="uploadDirBtn" webkitdirectory
           @change="upLoadFiles"/>
  </div>
</template>

<script>
  import {fileUploads,getAlbumList} from '@/utils/saltFile'

  export default {
    name: "addMusics",
    data() {
      return {
        album: '',
        options: [],
      }
    },
    created(){
      getAlbumList().then(resp =>{
        this.options = resp.data;
      });
    },
    methods: {
      upLoadFiles() {
        if(this.album == ''){
          this.$message.info("请选择所属专辑! ! !");
          return;
        }
        let upLoadFileList = this.$refs.uploadDirBtn.files;
        console.log(upLoadFileList);
        if (upLoadFileList.length > 0) {
          let formData = new window.FormData()
          for (let i = 0; i < upLoadFileList.length; i++) {  // 每个file append到formData里
            formData.append('files', upLoadFileList[i]);
            formData.append('album', this.album);
            formData.append('fileType', 'musics');
            formData.append('id', '');
          }
          fileUploads(formData, {'Content-Type': 'multipart/form-data'}).then(resp => {
            console.log(resp);
            this.$message.success("上传文件夹成功! ! !");
          }).catch(error => {
            this.$message.error("上传文件夹失败! ! !");
          })
        }

      },
    }
  }
</script>

<style scoped>

</style>
