<template>
  <div class="container">
    <div class="title">
      <span>友商信息填写</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap" v-if="!showEdit">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="partners" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="友商名" prop="partnerName">
              <el-input v-model="partners.partnerName" placeholder="请输入友商名"></el-input>
            </el-form-item>
<!--            <el-form-item label="友商图标" prop="partner_url">-->
<!--              <el-input v-model="partners.partner_url" placeholder="请输入友商图标"></el-input>-->
<!--            </el-form-item>-->

            <el-form-item label="友商图标" prop="partnersUrl" v-if="partners.id">
              <img :src="partners.partnerUrl" style="width: 150px;height: 150px" />
            </el-form-item>

            <el-form-item label="友商官网" prop="image">
              <el-input v-model="partners.partnerLink" placeholder="请输入友商官网"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="image">
              <el-input v-model="partners.sort" placeholder="请输入排序(1,2,3....)"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm">保存并添加logo</el-button>
              <el-button @click="resetForm">重 置</el-button>
              <el-button v-if="partners.id" plain type="primary" @click="handleEdit(partners.id)">更改配图</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <partners-file v-else @editClose="editClose" :editPartnersId="editPartnersId"></partners-file>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import UploadImgs from '../../component/base/homepage/logo/index'
  import {fileUpload} from '@/utils/saltFile'
  import PartnersFile from './partners-file'

  export default {
    components: { PartnersFile, UploadImgs },
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
      editPartnersId: {
        type: Number,
        default: null,
      },
      partnersUrl: '',
    },
    setup(props, context) {
      const form = ref(null)
      const loading = ref(false)
      let partners = reactive({id:'', partnerName: '', partnerUrl: '', partnerLink: '', sort: '' })
      const showEdit = ref(false)

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editPartnersId) {
          getPartners()
        }
      })

      const getPartners = async () => {
        loading.value = true
        const res = await get("/SaltPartners/selectPartner?id="+props.editPartnersId)
        listAssign(partners, res)
        loading.value = false
      }

      const handleEdit = id => {
        showEdit.value = true
        editPartnersId.value = id
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }

      const submitForm = async formName => {
        form.value.validate(async valid => {
          if (valid) {
            let res = {}
            if (props.editPartnersId) {
              res = await post("/SaltPartners/modifyPartners", partners)
              context.emit('editClose')
            } else {
              partners.partnerUrl = props.partnersUrl
              res = await post("/SaltPartners/addPartners", partners)
              console.log(res)
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
        partners,
        form,
        rules,
        resetForm,
        submitForm,
        showEdit,
        handleEdit,
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

