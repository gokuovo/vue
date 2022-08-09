<template>
  <div class="container">
    <div class="title">
      <span>上传音乐</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>


    <div class="lin-wrap">
      <el-form label-width="220px">
        <el-form-item label="视频上传">
          <input class="fileUploaderClass" type='file' name="uploadBtn" ref="uploadBtn" @change="upLoadFile(albumVideo.id)"/>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import UploadImgs from '@/component/base/homepage/background'
  import { reactive, ref, onMounted } from 'vue'
  import { get, post } from '../../lin/plugin/axios'
  import {fileUpload} from '@/utils/saltFile'

  export default {
    components: {
      UploadImgs,
    },
    methods:{
      upLoadFile(id) {
        let upLoadFileList = this.$refs.uploadBtn.files;
        if (upLoadFileList.length > 0) {//防止上次文件之后再次选择同样的文件，然后取消文件上传的bug
          this.sendFileUpload(id,upLoadFileList);
        }
      },

      sendFileUpload(id,upLoadFileList) {
        console.log(id)
        let formData = new window.FormData();
        formData.append('file', upLoadFileList[0]);
        formData.append('fileType', 'albumVideo');
        formData.append('id', id);
        let that = this;
        //文件上传后台方法
        fileUpload(formData, {'Content-Type': 'multipart/form-data'}).then(resp => {
          that.$message.success("上传成功");
          console.log(resp.data[0].relativeId)
          location.reload()
        }).catch(error => {
          that.$message.error("上传文件失败! ! !");
        })
      },
    },
    props: {
      albumVideoId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const form = ref(null)
      const loading = ref(false)
      const albumVideo = reactive({id:'',title:'',url:'',album:'',type:''})
      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.albumVideoId) {
          getAlbumVideo()
        }
      })

      const getAlbumVideo = async () => {
        loading.value = true
        const res = await get('/SaltProject/getMusicOne?id='+props.albumVideoId)
        listAssign(albumVideo, res)
        loading.value = false
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }

      const back = () => {
        context.emit('editClose')
      }

      return {
        back,
        albumVideo,
        form,
        rules,
        resetForm,
      }
    },
  }

  /**
   * 表单验证规则
   */
  function getRules() {
    /**
     * 验证回调函数
     */
    const checkInfo = (rule, value, callback) => {
      if (!value) {
        callback(new Error('信息不能为空'))
      }
      callback()
    }
    const rules = {
      // title: [{ validator: checkInfo, trigger: 'blur', required: true }],
      // author: [{ validator: checkInfo, trigger: 'blur', required: true }],
      // summary: [{ validator: checkInfo, trigger: 'blur', required: true }],
      // image: [{ validator: checkInfo, trigger: 'blur', required: true }],
    }
    return { rules }
  }
</script>

<style lang="scss" scoped>
  .container {
    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
      text-indent: 40px;
      border-bottom: 1px solid #dae1ec;

      .back {
        float: right;
        margin-right: 40px;
        cursor: pointer;
      }
    }

    .wrap {
      padding: 20px;
    }

    .submit {
      float: left;
    }
  }
</style>


