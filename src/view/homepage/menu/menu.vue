<template>
  <div class="container">
    <div class="title">
      <span>修改菜单名</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="menu" status-icon ref="form" label-width="100px" @submit.prevent>
            <el-form-item label="菜单名En版" prop="menuNameEn">
              <el-input v-model="menu.menuNameEn" placeholder="请填写文字En版"></el-input>
            </el-form-item>
            <el-form-item label="菜单名Chi版" prop="menuNameChi">
              <el-input v-model="menu.menuNameChi" placeholder="请填写文字Chi版"></el-input>
            </el-form-item>
            <el-form-item label="菜单名Jap版" prop="menuNameJap">
              <el-input v-model="menu.menuNameJap" placeholder="请填写文字Jap版"></el-input>
            </el-form-item>
            <el-form-item label="菜单名Spa版" prop="menuNameSpa">
              <el-input v-model="menu.menuNameSpa"  placeholder="请填写文字Spa版"></el-input>
            </el-form-item>
            <el-form-item label="关联网页" prop="url">
              <el-input v-model="menu.url" placeholder="请填写跳转url"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="menu.sort" placeholder="请填写拍寻(1,2,....)"></el-input>
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
  import { get, post } from '../../../lin/plugin/axios'

  export default {
    props: {
      editMenuId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const form = ref(null)
      const loading = ref(false)
      const menu = reactive({ id: '', menuNameEn: '', menuNameChi: '', menuNameJap: '',menuNameSpa: '',url:'',sort: '' })

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editMenuId) {
          getMenu()
        }
      })

      const getMenu = async () => {
        loading.value = true
        const res = await get('/SaltPortalMenu/menuById?id='+props.editMenuId)
        listAssign(menu, res)
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
            res = await post('/SaltPortalMenu/modifyMenu',menu)
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
        menu,
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
