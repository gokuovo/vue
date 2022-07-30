<template>
  <div class="container">
    <div class="title">
      <span>修改联系方式</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="contactus" status-icon ref="form" label-width="100px" @submit.prevent>
            <el-form-item label="电话" prop="tel">
              <el-input v-model="contactus.tel" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请填写电话"></el-input>
            </el-form-item>
            <el-form-item label="地址En版" prop="addressEn">
              <el-input v-model="contactus.addressEn" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请填写地址En版"></el-input>
            </el-form-item>
            <el-form-item label="地址Chi版" prop="addressChi">
              <el-input v-model="contactus.addressChi" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请填写地址Chi版"></el-input>
            </el-form-item>
            <el-form-item label="地址Jap版" prop="addressJap">
              <el-input v-model="contactus.addressJap" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请填写地址Jap版"></el-input>
            </el-form-item>
            <el-form-item label="地址Spa版" prop="addressSpa">
              <el-input v-model="contactus.addressSpa" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请填写地址Spa版"></el-input>
            </el-form-item>
            <el-form-item label="mail" prop="mail">
              <el-input v-model="contactus.mail" placeholder="请填写邮箱"></el-input>
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

  export default {
    props: {
      editContactusId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const form = ref(null)
      const loading = ref(false)
      const contactus = reactive({ id: '',tel: '', addressEn: '', addressChi: '', addressJap: '',addressSpa: '',mail: '' })

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editContactusId) {
          getContactus()
        }
      })

      const getContactus = async () => {
        loading.value = true
        const res = await get('/SaltContactUs/getContact')
        listAssign(contactus, res)
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
            res = await post('/SaltContactUs/modifyContact',contactus)
            context.emit('editClose')
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
        contactus,
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
      title: [{ validator: checkInfo, trigger: 'blur', required: true }],
      author: [{ validator: checkInfo, trigger: 'blur', required: true }],
      summary: [{ validator: checkInfo, trigger: 'blur', required: true }],
      image: [{ validator: checkInfo, trigger: 'blur', required: true }],
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
