<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">Menu列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="menu" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="menuNameEn" label="菜单名En版"></el-table-column>
        <el-table-column prop="menuNameChi" label="菜单名Chi版"></el-table-column>
        <el-table-column prop="menuNameJap" label="菜单名Jap版"></el-table-column>
        <el-table-column prop="menuNameSpa" label="菜单名Spa版"></el-table-column>
        <el-table-column prop="url" label="跳转网页"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <Menu v-else @editClose="editClose" :editMenuId="editMenuId"></Menu>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import Menu from './menu'
  import { get, post } from '../../../lin/plugin/axios'

  export default {
    components: {
      Menu,
    },
    setup() {
      const menu = ref([])
      const editMenuId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getMenu()
      })

      const getMenu = async () => {
        try {
          loading.value = true
          menu.value = await get('/SaltPortalMenu/listMenu')
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            Menu.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editMenuId.value = id
      }

      const editClose = () => {
        showEdit.value = false
        getMenu()
      }

      const indexMethod = index => index + 1

      return {
        menu,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editMenuId,
        indexMethod,
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
