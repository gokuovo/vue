<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">员工列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="staff" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="staffNameEn" label="员工名字en版"></el-table-column>
        <el-table-column prop="staffNameChi" label="员工名字chi版"></el-table-column>
        <el-table-column prop="staffNameJap" label="员工名字jap版"></el-table-column>
        <el-table-column prop="staffNameSpa" label="员工名字spa版"></el-table-column>
        <el-table-column prop="staffPostEn" label="职务en版"></el-table-column>
        <el-table-column prop="staffPostChi" label="职务chi版"></el-table-column>
        <el-table-column prop="staffPostJap" label="职务jap版"></el-table-column>
        <el-table-column prop="staffPostSpa" label="职务spa版"></el-table-column>
        <el-table-column prop="staffDescEn" label="表述en版"></el-table-column>
        <el-table-column prop="staffDescChi" label="表述chi版"></el-table-column>
        <el-table-column prop="staffDescJap" label="表述jap版"></el-table-column>
        <el-table-column prop="staffDescSpa" label="表述spa版"></el-table-column>
        <el-table-column label="员工图片">
          <template v-slot="scope" >
            <el-image :src="scope.row.staffImage" style="width: 60px;height: 60px;" :preview-src-list="scope.row.staffImage"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
                        <el-button
                          plain
                          size="small"
                          type="danger"
                          @click="handleDelete(scope.row.id)"
                          v-permission="{ permission: '删除员工信息', type: 'disabled' }"
                        >删除</el-button
                        >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <staff v-else @editClose="editClose" :editStaffId="editStaffId"></staff>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import Staff from './staff'

  export default {
    components: {
      Staff,
    },
    setup() {
      const staff = ref([])
      const editStaffId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getStaff()
      })

      const getStaff = async () => {
        try {
          loading.value = true
          staff.value = await get('/SaltTeam/getStaff')
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            Staff.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editStaffId.value = id
      }

      const handleDelete = id => {
        ElMessageBox.confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await post(`/SaltTeam/deleteStaff?id=`+id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            getStaff()
            ElMessage.success(`${res.message}`)
          }
        })
      }


      const editClose = () => {
        showEdit.value = false
        getStaff()
      }

      const indexMethod = index => index + 1

      return {
        staff,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editStaffId,
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
