<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">联系方式列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="contactus" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="tel" label="电话"></el-table-column>
        <el-table-column prop="addressEn" label="地址En版"></el-table-column>
        <el-table-column prop="addressChi" label="地址Chi版"></el-table-column>
        <el-table-column prop="addressJap" label="地址Jap版"></el-table-column>
        <el-table-column prop="addressSpa" label="地址Spa版"></el-table-column>
        <el-table-column prop="mail" label="电子邮箱"></el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <contactus v-else @editClose="editClose" :editContactusId="editContactusId"></contactus>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import Contactus from './contactus'

  export default {
    components: {
      Contactus,
    },
    setup() {
      const contactus = ref([])
      const editContactusId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getContactus()
      })

      const getContactus = async () => {
        try {
          loading.value = true
          contactus.value = await get('/SaltContactUs/getContactList')
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            Contactus.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editContactusId.value = id
      }

      const handleDelete = id => {
        ElMessageBox.confirm('此操作将永久删除该段文字, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await post(`/SaltOurService/deleteContactus?id=`+id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            getContactus()
            ElMessage.success(`${res.message}`)
          }
        })
      }


      const editClose = () => {
        showEdit.value = false
        getContactus()
      }

      const indexMethod = index => index + 1

      return {
        contactus,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editContactusId,
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
