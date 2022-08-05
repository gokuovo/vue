<template>
  <div class="container">
    <div class="title" v-if="!editWorklogId">新增WORKLOG信息{{ editWorklogId }}</div>
    <div class="title" v-else>
      <span>修改WORKLOG信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap" v-if="!showEdit">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="worklog" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="标题En" prop="titleEn">
              <el-input v-model="worklog.titleEn" placeholder="请输入标题En"></el-input>
            </el-form-item>
            <el-form-item label="标题Chi" prop="titleChi">
              <el-input v-model="worklog.titleChi" placeholder="请输入标题Chi"></el-input>
            </el-form-item>
            <el-form-item label="标题Jap" prop="titleJap">
              <el-input v-model="worklog.titleJap" placeholder="请输入标题Jap"></el-input>
            </el-form-item>
            <el-form-item label="标题Spa" prop="titleSpa">
              <el-input v-model="worklog.titleSpa" placeholder="请输入标题Spa"></el-input>
            </el-form-item>
            <el-form-item label="发布时间En" prop="dateEn">
              <el-input v-model="worklog.dateEn" placeholder="请输入发布时间En"></el-input>
            </el-form-item>
            <el-form-item label="发布时间Chi" prop="dateChi">
              <el-input v-model="worklog.dateChi" placeholder="请输入发布时间Chi"></el-input>
            </el-form-item>
            <el-form-item label="发布时间Jap" prop="dateJap">
              <el-input v-model="worklog.dateJap" placeholder="请输入发布时间Jap"></el-input>
            </el-form-item>
            <el-form-item label="发布时间Spa" prop="dateSpa">
              <el-input v-model="worklog.dateSpa" placeholder="请输入发布时间Spa"></el-input>
            </el-form-item>
            <el-form-item label="worklog配图" prop="url" v-if="worklog.id">
              <img :src="worklog.url" style="width: 150px;height: 150px" />
            </el-form-item>
            <el-form-item label="跳转链接" prop="image">
              <el-input v-model="worklog.link" placeholder="请输入跳转链接"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="image">
              <el-input v-model="worklog.sort" placeholder="请输入排序(1,2,3....)"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button v-if="worklog.id" type="primary" @click="submitForm">保 存</el-button>
              <el-button v-else type="primary" @click="submitForm">新 增</el-button>
              <el-button @click="resetForm">重 置</el-button>
              <el-button v-if="worklog.id" plain type="primary" @click="handleEdit(worklog.id)">更改配图</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <worklog-file v-else @editClose="editClose" :editWorklogId="editWorklogId"></worklog-file>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import UploadImgs from '../../component/base/homepage/logo/index'
  import worklogFile from "./worklog-file"

  export default {
    components: { worklogFile,UploadImgs },
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
      editWorklogId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const showEdit = ref(false)
      const editWorklogId = ref(1)
      const form = ref(null)
      const loading = ref(false)
      const worklog = reactive({id:'',titleEn:'',titleChi:'',titleJap:'',titleSpa:'', dateEn:'',dateChi:'',dateJap:'',dateSpa:'', url:'',link:'',sort:''})

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editWorklogId) {
          getWorklog()
        }
      })

      const getWorklog = async () => {
        loading.value = true
        const res = await get("/SaltNews/getWorklogOne?id="+props.editWorklogId)
        listAssign(worklog, res)
        loading.value = false
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }

      const handleEdit = id => {
        showEdit.value = true
        editWorklogId.value = id
      }

      const submitForm = async formName => {
        form.value.validate(async valid => {
          if (valid) {
            let res = {}
            if (props.editWorklogId) {
              res = await post("/SaltNews/modifyWorklog", worklog)
              context.emit('editClose')
            } else {
              res = await post("/SaltNews/addWorklog", worklog)
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
        worklog,
        form,
        rules,
        resetForm,
        submitForm,
        handleEdit,
        showEdit,
        editWorklogId,
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

