<template>
  <div class="container">
    <div class="title">
      <span>修改轮播图</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="lin-wrap">
      <el-form label-width="220px">
        <el-form-item label="当前轮播图">
          <img :src="rotation.imageUrl" />
        </el-form-item>
        <el-form-item label="logo上传">
          <upload-imgs ref="uploadEle8" :rules="rules" :multiple="true" :min-num="1" :max-num="1" :sortable="true" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  import UploadImgs from '@/component/base/homepage/background'
  import { reactive, ref, onMounted } from 'vue'
  import { get, post } from '../../lin/plugin/axios'

  export default {
    components: {
      UploadImgs,
    },
    methods:{
      //图片回显
      handleAvatarSuccess(res, file) {
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
      editRotationId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const form = ref(null)
      const loading = ref(false)
      const rotation = reactive({id:'', imageCode: '', imageUrl: ''})

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
        if (props.editRotationId) {
          getRotation()
        }
      })

      const getRotation = async () => {
        loading.value = true
        const res = await get("/SaltHomepage/getBackgroundById?id="+props.editRotationId)
        listAssign(rotation, res)
        loading.value = false
      }

      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }

      const back = () => {
        context.emit('editClose')
      }

      return {
        back,
        rotation,
        form,
        rules,
        resetForm,
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

