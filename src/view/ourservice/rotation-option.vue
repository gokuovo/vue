<template>
  <div class="container">
    <div class="title" v-if="!showEdit">新增轮播图</div>
    <div class="wrap" v-if="!showEdit">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="rotation" status-icon ref="form" label-width="100px" @submit.prevent :rules="rules">
            <el-form-item label="所属类别" prop="type">
              <el-select size="medium"  v-model="rotation" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="handleEdit(rotation)">新增并上传轮播图</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <rotation-add v-else @editClose="editClose" :rotation="rotation"></rotation-add>
  </div>
</template>

<script>
  import { reactive, ref, onMounted } from 'vue'
  import UploadImgs from '../../component/base/homepage/logo/index'
  import RotationAdd from './rotation-add'

  export default {
    components: { RotationAdd, UploadImgs },
    props: {
      editAlbumVideoId: {
        type: Number,
        default: null,
      },
    },
    setup(props, context) {
      const rotation = ref(null)
      const showEdit = ref(false)
      const form = ref(null)
      const loading = ref(false)

      const listAssign = (a, b) => Object.keys(a).forEach(key => {
        a[key] = b[key] || a[key]
      })

      /**
       * 表单规则验证
       */
      const { rules } = getRules()

      onMounted(() => {
      })


      // 重置表单
      const resetForm = () => {
        form.value.resetFields()
      }
      async function handleEdit(type) {
        showEdit.value = true
        rotation.value = type
      }


      const back = () => {
        context.emit('editClose')
      }

      return {
        back,
        form,
        rules,
        resetForm,
        showEdit,
        rotation,
        handleEdit,
        options: [
          {
            value: '12',
            label: 'music轮播图',
          },
          {
            value: '13',
            label: 'SoundDesign轮播图',
          },
          {
            value: '14',
            label: 'VoiceActing轮播图',
          },
          {
            value: '15',
            label: 'GameAudioPipeline轮播图',
          },
        ],
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

