<template>
  <div class="container">
    <div class="title" v-if="!editAlbumVideoId">新增专辑视频信息{{ editAlbumVideoId }}</div>
    <div class="title" v-else>
      <span>修改专辑视频信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap" v-if="!showEdit">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="albumVideo" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="标题" prop="titleEn">
              <el-input v-model="albumVideo.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="所属专辑" prop="album">
              <el-select size="medium"  v-model="albumVideo.album" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="submit">
              <el-button v-if="albumVideo.id" type="primary" @click="submitForm">保 存</el-button>
              <el-button v-else type="primary" @click="submitForm">新增并添加视频</el-button>
              <el-button @click="resetForm">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <album-video-file v-else @editClose="editClose" :albumVideoId="albumVideoId"></album-video-file>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import UploadImgs from '../../component/base/homepage/logo/index'
  import AlbumVideoFile from './album-video-file'

  export default {
    components: { AlbumVideoFile, UploadImgs },
    methods:{
      //图片回显
      handleAvatarSuccess(res, file) {
        console.log(res)
        this.imageUrl = res.data.final_fileName
        sessionStorage.setItem("imgUrl",this.imageUrl)
        alert(this.imageUrl)
      },
      //图片上传大小限制
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
    },
    props: {
      editAlbumVideoId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const albumVideoId = ref(1)
      const options = ref([])
      const showEdit = ref(false)
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
        if (props.editAlbumVideoId) {
          getAlbumVideo()
        }
        getOption()
      })

      const getAlbumVideo = async () => {
        loading.value = true
        const res = await get("/SaltProject/getMusicOne?id="+props.editAlbumVideoId)
        listAssign(albumVideo, res)
        loading.value = false
      }

      const getOption = async () => {
        try {
          loading.value = true
          options.value = await get("/SaltProject/getAlbumVideoList")
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            albumVideo.value = []
          }
        }
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }
      const handleEdit = id => {
        showEdit.value = true
        albumVideoId.value = id
      }

      const submitForm = async formName => {
        form.value.validate(async valid => {
          if (valid) {
            let res = {}
            if (props.editAlbumVideoId) {
              res = await post("/SaltProject/modifyVideo", albumVideo)
              context.emit('editClose')
            } else {
              res = await post("/SaltProject/addVideo", albumVideo)
              handleEdit(res.id)
              resetForm(formName)
            }
            if (res.code < window.MAX_SUCCESS_CODE) {
              ElMessage.success(`${res.message}`)
            }
          } else {
            console.error('error submit!!')
            ElMessage.error('请将信息填写完整')
          }
        })
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
        submitForm,
        showEdit,
        options,
        albumVideoId,
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

