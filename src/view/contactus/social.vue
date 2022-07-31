<template>
  <div class="container">
    <div class="title" v-if="!editSocialId">新增social{{ editSocailId }}</div>
    <div class="title" v-else>
      <span>修改social</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>

    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="social" status-icon ref="form" label-width="100px" @submit.prevent>
            <el-form-item label="social名称" prop="connectType">
              <el-input v-model="social.connectType" placeholder="请填写social名称"></el-input>
            </el-form-item>
            <el-form-item label="图片地址" prop="imageUrl" v-if="social.connectType">
              <img :src="social.imageUrl" style="width: 150px;height: 150px" />
            </el-form-item>
            <el-form-item label="图片地址" prop="imageUrl" v-else>
              <upload-imgs ref="uploadEle8" :rules="rules" :multiple="true" :min-num="1" :max-num="1" :sortable="true" />
            </el-form-item>
            <el-form-item v-if="social.connectType">
              <el-upload>
                <el-button size="mini" type="primary">选取文件</el-button>
              </el-upload>
            </el-form-item>
            <el-form-item label="跳转地址" prop="contactUrl">
              <el-input v-model="social.contactUrl"  placeholder="请填写跳转地址"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="sort">
              <el-input v-model="social.sort"  placeholder="请填写排序(0,1,2...)"></el-input>
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
    props: {
      editSocialId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const form = ref(null)
      const loading = ref(false)
      const social = reactive({ id: '',connectType: '', imageUrl: '', contactUrl: '', sort: '' })
      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()
      onMounted(() => {
        if (props.editSocialId) {
          getSocial()
        }
      })
      const getSocial = async () => {
        loading.value = true
        const res = await get('/SaltContactUs/getSocialOne?id='+props.editSocialId)
        listAssign(social, res)
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
            if (props.editSocialId) {
              res = await post('/SaltContactUs/modifySocial',social)
              context.emit('editClose')
            } else {
              res = await post('/SaltContactUs/addSocial',social)
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
        social,
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

  function tableBianji(row) {
    this.changeTanchuang = true;
    this.changeId = row.id;
    let form = { id: row.id };
    let _this = this;
    //这是 我自己封装的方法，不用理会，只看图片路径处理即可
    this.request("url", "GET", form, function (res) {
      if (res.code == 1) {
        _this.changeTanchuangForm = res.data;
        //将字符串转成数组
        let arr = _this.changeTanchuangForm.up_file.split(",");
        for (let i = 0; i < arr.length; i++) {
          //创建对象，并将路径进行ip地址拼接
          let obj = {
            url: _this.requestUrl + arr[i],
          };
          //放进图片列表
          _this.fileList2.push(obj);
        }

      } else {
        _this.$message({
          message: res.msg,
          type: "error",
        });
      }
    });
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
