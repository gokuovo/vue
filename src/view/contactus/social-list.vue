<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">social图标列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="social" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="connectType" label="social类型"></el-table-column>
        <el-table-column prop="imageUrl" label="social图标"></el-table-column>
        <el-table-column prop="contactUrl" label="social跳转地址"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button
                          plain
                          size="small"
                          type="danger"
                          @click="handleDelete(scope.row.id)"
                          v-permission="{ permission: '删除文字', type: 'disabled' }"
                        >删除</el-button
                        >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <social v-else @editClose="editClose" :editSocialId="editSocialId"></social>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import Social from './social'

  export default {
    components: {
      Social,
    },
    setup() {
      const social = ref([])
      const editSocialId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getSocial()
      })

      const getSocial = async () => {
        try {
          loading.value = true
          social.value = await get('/SaltContactUs/getSocial')
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            Social.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editSocialId.value = id
      }

      const handleDelete = id => {
        ElMessageBox.confirm('此操作将永久删除该段文字, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await post(`/SaltContactUs/deleteSocial?id=`+id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            getSocial()
            ElMessage.success(`${res.message}`)
          }
        })
      }


      const editClose = () => {
        showEdit.value = false
        getSocial()
      }

      const indexMethod = index => index + 1

      return {
        social,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editSocialId,
        indexMethod,
        handleDelete,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .container {
    padding: 0 30px;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        height: 59px;
        line-height: 59px;
        color: $parent-title-color;
        font-size: 16px;
        font-weight: 500;
      }
    }

    .pagination {
      display: flex;
      justify-content: flex-end;
      margin: 20px;
    }
  }
</style>
