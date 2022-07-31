<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">news列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="news" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="titleEn" label="标题En"></el-table-column>
        <el-table-column prop="titleChi" label="标题Chi"></el-table-column>
        <el-table-column prop="titleJap" label="标题Jap"></el-table-column>
        <el-table-column prop="titleSpa" label="标题Spa"></el-table-column>
        <el-table-column prop="dateEn" label="发布日期En"></el-table-column>
        <el-table-column prop="dateChi" label="发布日期Chi"></el-table-column>
        <el-table-column prop="dateJap" label="发布日期Jap"></el-table-column>
        <el-table-column prop="dateSpa" label="发布日期Spa"></el-table-column>
        <el-table-column label="news配图">
          <template v-slot="scope" >
            <el-image :src="scope.row.url" style="width: 60px;height: 60px;"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="link" label="跳转链接"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button
              plain
              size="small"
              type="danger"
              @click="handleDelete(scope.row.id)"
              v-permission="{ permission: '删除友商', type: 'disabled' }"
            >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <News v-else @editClose="editClose" :editNewsId="editNewsId"></News>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import News from './news'
  import { get, post } from '../../lin/plugin/axios'

  export default {
    components: {
      News,
    },
    setup() {
      const news = ref([])
      const editNewsId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getNews()
      })

      const getNews = async () => {
        try {
          loading.value = true
          news.value = await get("/SaltNews/getNews")
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            news.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editNewsId.value = id
      }

      const handleDelete = id => {
        ElMessageBox.confirm('此操作将永久删除该友商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await post("/SaltNews/deleteNews?id="+id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            getNews()
            ElMessage.success(`${res.message}`)
          }
        })
      }

      const editClose = () => {
        showEdit.value = false
        getNews()
      }

      const indexMethod = index => index + 1

      return {
        news,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editNewsId,
        indexMethod,
        handleDelete,
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

