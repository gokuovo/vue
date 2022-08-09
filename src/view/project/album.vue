<template>
  <div class="container">
    <div class="title" v-if="!editAlbumId">新增专辑信息{{ editAlbumId }}</div>
    <div class="title" v-else>
      <span>修改专辑信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap" v-if="!showEdit">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="album" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="标题" prop="titleEn">
              <el-input v-model="album.titleEn" placeholder="请输入标题"></el-input>
            </el-form-item>
<!--            <el-form-item label="标题Chi" prop="titleChi">-->
<!--              <el-input v-model="album.titleChi" placeholder="请输入标题Chi"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="标题Jap" prop="titleJap">-->
<!--              <el-input v-model="album.titleJap" placeholder="请输入标题Jap"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="标题Spa" prop="titleSpa">-->
<!--              <el-input v-model="album.titleSpa" placeholder="请输入标题Spa"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="发布时间" prop="releaseEn">
              <el-input v-model="album.releaseEn" placeholder="请输入发布时间"></el-input>
            </el-form-item>
<!--            <el-form-item label="发布时间Chi" prop="releaseChi">-->
<!--              <el-input v-model="album.releaseChi" placeholder="请输入发布时间Chi"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="发布时间Jap" prop="releaseJap">-->
<!--              <el-input v-model="album.releaseJap" placeholder="请输入发布时间Jap"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="发布时间Spa" prop="releaseSpa">-->
<!--              <el-input v-model="album.releaseSpa" placeholder="请输入发布时间Spa"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="发布人" prop="developerEn">
              <el-input v-model="album.developerEn" placeholder="请输入发布人"></el-input>
            </el-form-item>
<!--            <el-form-item label="发布人Chi" prop="developerChi">-->
<!--              <el-input v-model="album.developerChi" placeholder="请输入发布人Chi"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="发布人Jap" prop="developerJap">-->
<!--              <el-input v-model="album.developerJap" placeholder="请输入发布人Jap"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="发布人Spa" prop="developerSpa">-->
<!--              <el-input v-model="album.developerSpa" placeholder="请输入发布人Spa"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="出版商" prop="publisherEn">
              <el-input v-model="album.publisherEn" placeholder="请输入出版商"></el-input>
            </el-form-item>
<!--            <el-form-item label="出版商Chi" prop="publisherChi">-->
<!--              <el-input v-model="album.publisherChi" placeholder="请输入出版商Chi"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="出版商Jap" prop="publisherJap">-->
<!--              <el-input v-model="album.publisherJap" placeholder="请输入出版商Jap"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="出版商Spa" prop="publisherSpa">-->
<!--              <el-input v-model="album.publisherSpa" placeholder="请输入出版商Spa"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="平台" prop="platformEn">
              <el-input v-model="album.platformEn" placeholder="请输入平台"></el-input>
            </el-form-item>
<!--            <el-form-item label="平台Chi" prop="platformChi">-->
<!--              <el-input v-model="album.platformChi" placeholder="请输入平台Chi"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="平台Jap" prop="platformJap">-->
<!--              <el-input v-model="album.platformJap" placeholder="请输入平台Jap"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="平台Spa" prop="platformSpa">-->
<!--              <el-input v-model="album.platformSpa" placeholder="请输入平台Spa"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item label="album配图" prop="imgSrc" v-if="album.id">
              <img :src="album.imgSrc" style="width: 150px;height: 150px" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="album.sort" placeholder="请输入排序(1,2,3....)"></el-input>
            </el-form-item>
            <el-form-item label="专辑类别" prop="type">
              <el-input v-model="album.type" v-if="album.id" disabled></el-input>
              <el-select v-else size="medium"  v-model="album.type" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="submit">
              <el-button v-if="album.id" type="primary" @click="submitForm">保 存</el-button>
              <el-button v-else type="primary" @click="submitForm">新增并添加封面</el-button>
              <el-button @click="resetForm">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <album-file v-else @editClose="editClose" :albumId="albumId"></album-file>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import UploadImgs from '../../component/base/homepage/logo/index'
  import AlbumFile from './album-file'

  export default {
    components: { AlbumFile, UploadImgs },
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
      editAlbumId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const albumId = ref(1)
      const showEdit = ref(false)
      const form = ref(null)
      const loading = ref(false)
      // const album = reactive({id:'',titleEn:'',titleChi:'',titleJap:'',titleSpa:'', releaseEn:'',releaseChi:'',releaseJap:'',releaseSpa:'',
      //   developerEn:'',developerChi:'',developerJap:'',developerSpa:'',publisherEn:'',publisherChi:'',publisherJap:'',publisherSpa:'',
      //   platformEn:'',platformChi:'',platformJap:'',platformSpa:'', imgSrc:'',sort:''})
      const album = reactive({id:'',titleEn:'', releaseEn:'',
        developerEn:'',publisherEn:'',
        platformEn:'', imgSrc:'',sort:'',type:''})

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editAlbumId) {
          getAlbum()
        }
      })

      const getAlbum = async () => {
        loading.value = true
        const res = await get("/SaltProject/getAlbumOne?id="+props.editAlbumId)
        listAssign(album, res)
        loading.value = false
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }
      const handleEdit = id => {
        showEdit.value = true
        albumId.value = id
      }

      const submitForm = async formName => {
        form.value.validate(async valid => {
          if (valid) {
            let res = {}
            if (props.editAlbumId) {
              res = await post("/SaltProject/modifyAlbum", album)
              context.emit('editClose')
            } else {
              res = await post("/SaltProject/addAlbum", album)
              console.log(res.id)
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
        album,
        form,
        rules,
        resetForm,
        submitForm,
        handleEdit,
        showEdit,
        albumId,
        options: [
          {
            value: '0',
            label: '音乐专辑',
          },
          {
            value: '1',
            label: '视频专辑',
          },
        ],
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


