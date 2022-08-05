<template>
  <div class="container">
    <div class="title" v-if="!editAlbumMusicId">新增LIST信息{{ editAlbumMusicId }}</div>
    <div class="title" v-else>
      <span>修改专辑音乐信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap" v-if="!showEdit">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="albumMusic" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="标题" prop="titleEn">
              <el-input v-model="albumMusic.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="所属专辑" prop="album">
              <el-input v-model="albumMusic.album" placeholder="请输入公司"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button v-if="albumMusic.id" type="primary" @click="submitForm">保 存</el-button>
              <el-button v-else type="primary" @click="submitForm">新 增</el-button>
              <el-button @click="resetForm">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <album-music-file v-else @editClose="editClose" :editAlbumMusicId="editAlbumMusicId"></album-music-file>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import UploadImgs from '../../component/base/homepage/logo/index'
  import AlbumMusicFile from './album-music-file'

  export default {
    components: { AlbumMusicFile, UploadImgs },
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
      editAlbumMusicId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const showEdit = ref(false)
      const editAlbumMusicId = ref(1)
      const form = ref(null)
      const loading = ref(false)
      const albumMusic = reactive({id:'',title:'',url:'',album:'',type:''})

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editAlbumMusicId) {
          getAlbumMusic()
        }
      })

      const getAlbumMusic = async () => {
        loading.value = true
        const res = await get("/SaltProject/getMusicOne?id="+props.editAlbumMusicId)
        listAssign(albumMusic, res)
        loading.value = false
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }
      const handleEdit = id => {
        showEdit.value = true
        editAlbumMusicId.value = id
      }

      const submitForm = async formName => {
        form.value.validate(async valid => {
          if (valid) {
            let res = {}
            if (props.editAlbumMusicId) {
              res = await post("/SaltProject/modifyList", albumMusic)
              context.emit('editClose')
            } else {
              res = await post("/SaltProject/addList", albumMusic)
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
        albumMusic,
        form,
        rules,
        resetForm,
        submitForm,
        showEdit,
        editAlbumMusicId,
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

