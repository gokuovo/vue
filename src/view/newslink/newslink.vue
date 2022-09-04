<template>
  <div class="container">
    <div class="title" v-if="!editNewsId">新增NEWS信息{{ editNewsId }}</div>
    <div class="title" v-else>
      <span>修改NEWSLINK信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap" v-if="!showEdit">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="news" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="标题" prop="title">
              <el-input v-model="news.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" prop="date">
              <el-input v-model="news.date" placeholder="请输入发布时间"></el-input>
            </el-form-item>
            <el-form-item label="newslink配图01" prop="img01">
              <img :src="news.img01" style="width: 150px;height: 150px" />
              <el-button style="margin-left: 5em" plain type="primary" @click="handleEdit(news.id,news.imgId01)">更改配图</el-button>
            </el-form-item>

            <el-form-item label="newslink配图02" prop="img02">
              <img :src="news.img02" style="width: 150px;height: 150px" />
              <el-button style="margin-left: 5em" plain type="primary" @click="handleEdit(news.id,news.imgId02)">更改配图</el-button>
            </el-form-item>
            <el-form-item label="newslink配图03" prop="img03">
              <img :src="news.img03" style="width: 150px;height: 150px" />
              <el-button style="margin-left: 5em" plain type="primary" @click="handleEdit(news.id,news.imgId02)">更改配图</el-button>
            </el-form-item>
            <el-form-item label="文章01En" prop="textEn01">
              <el-input v-model="news.textEn01" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入文章01En"></el-input>
            </el-form-item>
            <el-form-item label="文章01Chi" prop="textChi01">
              <el-input v-model="news.textChi01" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入文章01Chi"></el-input>
            </el-form-item>
            <el-form-item label="文章01Jap" prop="textJap01">
              <el-input v-model="news.textJap01" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入文章01Jap"></el-input>
            </el-form-item>
            <el-form-item label="文章01Spa" prop="textSpa01">
              <el-input v-model="news.textSpa01" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入文章01Spa"></el-input>
            </el-form-item>
            <el-form-item label="文章02En" prop="textEn02">
              <el-input v-model="news.textEn02" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入文章02En"></el-input>
            </el-form-item>
            <el-form-item label="文章02Chi" prop="textChi02">
              <el-input v-model="news.textChi02" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入文章02Chi"></el-input>
            </el-form-item>
            <el-form-item label="文章02Jap" prop="textJap02">
              <el-input v-model="news.textJap02" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入文章02Jap"></el-input>
            </el-form-item>
            <el-form-item label="文章02Spa" prop="textSpa02">
              <el-input v-model="news.textSpa02" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请输入文章02Spa"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm">保 存</el-button>
              <el-button @click="resetForm">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <newslink-file v-else @editClose="editClose" :newsId="newsId" :imgId="imgId"></newslink-file>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import UploadImgs from '../../component/base/homepage/logo/index'
  import NewslinkFile from './newslink-file'

  export default {
    components: { NewslinkFile, UploadImgs },
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
      editNewsId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const newsId = ref(1)
      const imgId = ref(1)
      const showEdit = ref(false)
      const form = ref(null)
      const loading = ref(false)
      const news = reactive({id:'',title:'',date:'',img01:'',img02:'',img03:'',imgId01:'',imgId02:'',imgId03:'',textEn01:'',textChi01:'',
        textJap01:'',textSpa01:'',textEn02:'',textChi02:'',textJap02:'',textSpa02:'' })

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editNewsId) {
          getNews()
        }
      })

      const getNews = async () => {
        loading.value = true
        const res = await get("/SaltNewsLink/getNewsLinkOne?id="+props.editNewsId)
        listAssign(news, res[0])
        loading.value = false
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }
      const handleEdit = (id,img) => {
        showEdit.value = true
        newsId.value = id
        imgId.Value = img
      }

      const submitForm = async formName => {
        form.value.validate(async valid => {
          if (valid) {
            let res = {}
            if (props.editNewsId) {
              res = await post("/SaltNewsLink/modifyNewsLink", news)
              context.emit('editClose')
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
        news,
        form,
        rules,
        resetForm,
        submitForm,
        showEdit,
        handleEdit,
        newsId,
        imgId,

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

