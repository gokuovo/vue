<template>
  <div class="container">
    <div class="title" v-if="!editPartnersId">新增友商信息{{ editPartnersId }}</div>
    <div class="title" v-else>
      <span>修改友商信息</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap">
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
            <el-form-item label="友商图标" prop="partnersUrl" v-else>
              <input class="fileUploaderClass" type='file' name="uploadBtn" ref="uploadBtn" @change="upLoadFile(partners.id)"/>
            </el-form-item>
            <el-form-item v-if="partners.id">
                <input class="fileUploaderClass" type='file' name="uploadBtn" ref="uploadBtn" @change="upLoadFile(partners.id)"/>
            </el-form-item>

            <el-form-item label="友商官网" prop="image">
              <el-input v-model="partners.partnerLink" placeholder="请输入友商官网"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="image">
              <el-input v-model="partners.sort" placeholder="请输入排序(1,2,3....)"></el-input>
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
  import {fileUpload} from '@/utils/saltFile'

  export default {
    components: { UploadImgs },
    methods:{
      upLoadFile(id) {
        let upLoadFileList = this.$refs.uploadBtn.files;
        if (upLoadFileList.length > 0) {//防止上次文件之后再次选择同样的文件，然后取消文件上传的bug
          this.sendFileUpload(id,upLoadFileList);
        }
      },

      sendFileUpload(id,upLoadFileList) {
        let formData = new window.FormData();
        formData.append('file', upLoadFileList[0]);
        formData.append('fileType', 'partners');
        formData.append('id', id);
        let that = this;
        //文件上传后台方法
        fileUpload(formData, {'Content-Type': 'multipart/form-data'}).then(resp => {
          that.$message.success("上传成功");
          console.log(resp.data[0].url)
        }).catch(error => {
          that.$message.error("上传文件失败! ! !");
        })
      },
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
    },
    setup(props, context) {
      const form = ref(null)
      const loading = ref(false)
      const partners = reactive({id:'', partnerName: '', partnerUrl: '', partnerLink: '', sort: '' })

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
              res = await post("/SaltPartners/addPartners", partners)
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

