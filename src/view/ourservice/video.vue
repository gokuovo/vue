<template>
  <div class="container">
    <div class="title">
      <span>编辑名字</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="word" status-icon ref="form" label-width="100px" @submit.prevent>
            <el-form-item label="名字En版" prop="wordTextEn">
              <el-input v-model="word.wordTextEn" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请填写文字En版"></el-input>
            </el-form-item>
            <el-form-item label="名字Chi版" prop="wordTextChi">
              <el-input v-model="word.wordTextChi" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请填写文字Chi版"></el-input>
            </el-form-item>
            <el-form-item label="名字Jap版" prop="wordTextJap">
              <el-input v-model="word.wordTextJap" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请填写文字Jap版"></el-input>
            </el-form-item>
            <el-form-item label="名字Spa版" prop="wordTextSpa">
              <el-input v-model="word.wordTextSpa" type="textarea" :autosize="{ minRows: 4, maxRows: 8 }" placeholder="请填写文字Spa版"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="wordTextChi">
              <el-input v-model="word.noti" placeholder="请填写备注"></el-input>
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
      editWordId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const images = ref([])
      const form = ref(null)
      const loading = ref(false)
      const word = reactive({ id: '', wordTextEn: '', wordTextChi: '', wordTextJap: '',wordTextSpa: '',noti: '' })

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editWordId) {
          getWord()
        }
      })

      const getWord = async () => {
        loading.value = true
        const res = await get('/SaltOurService/getWordOne?id='+props.editWordId)
        listAssign(word, res)
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
            res = await post('/SaltOurService/modifyWord',word)
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
        word,
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
