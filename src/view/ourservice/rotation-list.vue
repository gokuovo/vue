<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">轮播图列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="ratation" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column label="轮播图">
          <template v-slot="scope" >
            <el-image :src="scope.row.imageUrl"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="imageCode" label="图片类型"></el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <Rotation v-else @editClose="editClose" :editRotationId="editRotationId"></Rotation>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import Rotation from './rotation'
  import { get } from '../../lin/plugin/axios'

  export default {
    components: {
      Rotation,
    },
    setup() {
      const ratation = ref([])
      const editRotationId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getRotation()
      })

      const getRotation = async () => {
        try {
          loading.value = true
          ratation.value = await get("/SaltOurService/getRotationList")
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            ratation.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editRotationId.value = id
      }

      const editClose = () => {
        showEdit.value = false
        getRotation()
      }

      const indexMethod = index => index + 1

      return {
        ratation,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editRotationId,
        indexMethod,
      }
    },
    methods: {
      preview(url) {
        this.$imagePreview({
          images: url,
        })
      },
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
