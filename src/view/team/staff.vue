<template>
  <div class="container">
    <div class="title" v-if="!editStaffId">新增员工信息{{ editStaffId }}</div>
    <div class="title" v-else>
      <span>修改员工信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap" v-if="!showEdit">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="staff" status-icon ref="form" label-width="100px" @submit.prevent>
            <el-form-item label="员工姓名En" prop="staffNameEn">
              <el-input v-model="staff.staffNameEn" placeholder="请填写员工姓名En"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名Chi" prop="staffNameChi">
              <el-input v-model="staff.staffNameChi" placeholder="请填写员工姓名Chi"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名Jap" prop="staffNameJap">
              <el-input v-model="staff.staffNameJap" placeholder="请填写员工姓名Jap"></el-input>
            </el-form-item>
            <el-form-item label="员工姓名Spa" prop="staffNameSpa">
              <el-input v-model="staff.staffNameSpa" placeholder="请填写员工姓名Spa"></el-input>
            </el-form-item>
            <el-form-item label="员工职务En" prop="staffPostEn">
              <el-input v-model="staff.staffPostEn" placeholder="请填写员工职务En"></el-input>
            </el-form-item>
            <el-form-item label="员工职务Chi" prop="staffPostChi">
              <el-input v-model="staff.staffPostChi" placeholder="请填写员工职务Chi"></el-input>
            </el-form-item>
            <el-form-item label="员工职务Jap" prop="staffPostJap">
              <el-input v-model="staff.staffPostJap" placeholder="请填写员工职务Jap"></el-input>
            </el-form-item>
            <el-form-item label="员工职务Spa" prop="staffPostSpa">
              <el-input v-model="staff.staffPostSpa" placeholder="请填写员工职务Spa"></el-input>
            </el-form-item>
            <el-form-item label="员工表述En" prop="staffDescEn">
              <el-input v-model="staff.staffDescEn" placeholder="请填写员工表述En"></el-input>
            </el-form-item>
            <el-form-item label="员工表述Chi" prop="staffDescChi">
              <el-input v-model="staff.staffDescChi" placeholder="请填写员工表述Chi"></el-input>
            </el-form-item>
            <el-form-item label="员工表述Jap" prop="staffDescJap">
              <el-input v-model="staff.staffDescJap" placeholder="请填写员工表述Jap"></el-input>
            </el-form-item>
            <el-form-item label="员工表述Spa" prop="staffDescSpa">
              <el-input v-model="staff.staffDescSpa" placeholder="请填写员工表述Spa"></el-input>
            </el-form-item>
            <el-form-item label="员工图片" v-if="staff.id">
              <img :src="staff.staffImage" style="width: 150px;height: 150px" />
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="staff.sort"  placeholder="请填写排序(0,1,2...)"></el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button v-if="staff.id" type="primary" @click="submitForm">保 存</el-button>
              <el-button v-else type="primary" @click="submitForm">新 增</el-button>
              <el-button @click="resetForm">重 置</el-button>
              <el-button v-if="staff.id" plain type="primary" @click="handleEdit(staff.id)">更改配图</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <staff-file v-else @editClose="editClose" :editStaffId="editStaffId"></staff-file>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import { ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import staffFile from "./staff-file"


  export default {
    components: { staffFile },
    props: {
      editStaffId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const showEdit = ref(false)
      const editStaffId = ref(1)
      const form = ref(null)
      const loading = ref(false)
      const staff = reactive({ id: '',staffNameEn: '', staffNameChi: '', staffNameJap: '', staffNameSpa: '',
        staffPostEn: '',staffPostChi: '',staffPostJap: '',staffPostSpa: '',
        staffDescEn: '',staffDescChi: '',staffDescJap: '',staffDescSpa: '',
        staffImage: '',sort: ''})

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editStaffId) {
          getStaff()
        }
      })

      const getStaff = async () => {
        loading.value = true
        const res = await get('/SaltTeam/getStaffOne?id='+props.editStaffId)
        listAssign(staff, res)
        loading.value = false
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }

      const handleEdit = id => {
        showEdit.value = true
        editStaffId.value = id
      }


      const submitForm = async formName => {
        form.value.validate(async valid => {
          if (valid) {
            let res = {}
            if (props.editStaffId) {
              res = await post('/SaltTeam/modifyStaff',staff)
              context.emit('editClose')
            } else {
              res = await post('/SaltTeam/addStaff',staff)
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
        staff,
        form,
        rules,
        resetForm,
        submitForm,
        handleEdit,
        showEdit,
        editStaffId,
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
