<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">背景图列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="background" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column label="背景图">
          <template v-slot="scope" >
            <el-image :src="scope.row.imageUrl" style="width: 60px;height: 60px;" :preview-src-list="scope.row.imageUrl"
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
    <Background v-else @editClose="editClose" :editBackgroundId="editBackgroundId"></Background>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import Background from './background'
  import { get } from '../../../lin/plugin/axios'

  export default {
    components: {
      Background,
    },
    setup() {
      const background = ref([])
      const editBackgroundId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getBackground()
      })

      const getBackground = async () => {
        try {
          loading.value = true
          background.value = await get("/SaltHomepage/getBackgroundUnder")
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            background.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editBackgroundId.value = id
      }

      const editClose = () => {
        showEdit.value = false
        getBackground()
      }

      const indexMethod = index => index + 1

      return {
        background,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editBackgroundId,
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
