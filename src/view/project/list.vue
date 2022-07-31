<template>
  <div class="container">
    <div class="title" v-if="!editListId">新增LIST信息{{ editListId }}</div>
    <div class="title" v-else>
      <span>修改LIST信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="list" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="标题En" prop="titleEn">
              <el-input v-model="list.titleEn" placeholder="请输入标题En"></el-input>
            </el-form-item>
            <el-form-item label="标题Chi" prop="titleChi">
              <el-input v-model="list.titleChi" placeholder="请输入标题Chi"></el-input>
            </el-form-item>
            <el-form-item label="标题Jap" prop="titleJap">
              <el-input v-model="list.titleJap" placeholder="请输入标题Jap"></el-input>
            </el-form-item>
            <el-form-item label="标题Spa" prop="titleSpa">
              <el-input v-model="list.titleSpa" placeholder="请输入标题Spa"></el-input>
            </el-form-item>
            <el-form-item label="发布时间En" prop="dateEn">
              <el-input v-model="list.dateEn" placeholder="请输入发布时间En"></el-input>
            </el-form-item>
            <el-form-item label="发布时间Chi" prop="dateChi">
              <el-input v-model="list.dateChi" placeholder="请输入发布时间Chi"></el-input>
            </el-form-item>
            <el-form-item label="发布时间Jap" prop="dateJap">
              <el-input v-model="list.dateJap" placeholder="请输入发布时间Jap"></el-input>
            </el-form-item>
            <el-form-item label="发布时间Spa" prop="dateSpa">
              <el-input v-model="list.dateSpa" placeholder="请输入发布时间Spa"></el-input>
            </el-form-item>
            <el-form-item label="公司En" prop="companyEn">
              <el-input v-model="list.companyEn" placeholder="请输入公司En"></el-input>
            </el-form-item>
            <el-form-item label="公司Chi" prop="companyChi">
              <el-input v-model="list.companyChi" placeholder="请输入公司Chi"></el-input>
            </el-form-item>
            <el-form-item label="公司Jap" prop="companyJap">
              <el-input v-model="list.companyJap" placeholder="请输入公司Jap"></el-input>
            </el-form-item>
            <el-form-item label="公司Spa" prop="companySpa">
              <el-input v-model="list.companySpa" placeholder="请输入公司Spa"></el-input>
            </el-form-item>
            <el-form-item label="平台En" prop="platformEn">
              <el-input v-model="list.platformEn" placeholder="请输入平台En"></el-input>
            </el-form-item>
            <el-form-item label="平台Chi" prop="platformChi">
              <el-input v-model="list.platformChi" placeholder="请输入平台Chi"></el-input>
            </el-form-item>
            <el-form-item label="平台Jap" prop="platformJap">
              <el-input v-model="list.platformJap" placeholder="请输入平台Jap"></el-input>
            </el-form-item>
            <el-form-item label="平台Spa" prop="platformSpa">
              <el-input v-model="list.platformSpa" placeholder="请输入平台Spa"></el-input>
            </el-form-item>
            <el-form-item label="list配图" prop="url" v-if="list.id">
              <img :src="list.url" style="width: 150px;height: 150px" />
            </el-form-item>
            <el-form-item label="list配图" prop="url" v-else>
              <upload-imgs ref="uploadEle8" :rules="rules" :multiple="true" :min-num="1" :max-num="1" :sortable="true" />
            </el-form-item>
            <el-form-item v-if="list.id">
              <el-upload :action="'localhost:5000/cms/file'">
                <el-button size="mini" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转链接" prop="image">
              <el-input v-model="list.link" placeholder="请输入跳转链接"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="image">
              <el-input v-model="list.sort" placeholder="请输入排序(1,2,3....)"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm">保 存</el-button>
              <el-button @click="resetForm">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import UploadImgs from '../../component/base/homepage/logo/index'

  export default {
    components: { UploadImgs },
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
      editListId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const form = ref(null)
      const loading = ref(false)
      const list = reactive({id:'',titleEn:'',titleChi:'',titleJap:'',titleSpa:'', dateEn:'',dateChi:'',dateJap:'',dateSpa:'',
        companyEn:'',companyChi:'',companyJap:'',companySpa:'',platformEn:'',platformChi:'',platformJap:'',platformSpa:'',url:'',link:'',sort:''})

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editListId) {
          getList()
        }
      })

      const getList = async () => {
        loading.value = true
        const res = await get("/SaltProject/getListOne?id="+props.editListId)
        listAssign(list, res)
        loading.value = false
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }

      const submitForm = async formName => {
        form.value.validate(async valid => {
          if (valid) {
            let res = {}
            if (props.editListId) {
              res = await post("/SaltProject/modifyList", list)
              context.emit('editClose')
            } else {
              res = await post("/SaltProject/addList", list)
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
        list,
        form,
        rules,
        resetForm,
        submitForm,
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

