<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">专辑列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="album" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="titleEn" label="标题En"></el-table-column>
        <el-table-column prop="titleChi" label="标题Chi"></el-table-column>
        <el-table-column prop="titleJap" label="标题Jap"></el-table-column>
        <el-table-column prop="titleSpa" label="标题Spa"></el-table-column>
        <el-table-column prop="releaseEn" label="发布日期En"></el-table-column>
        <el-table-column prop="releaseChi" label="发布日期Chi"></el-table-column>
        <el-table-column prop="releaseJap" label="发布日期Jap"></el-table-column>
        <el-table-column prop="releaseSpa" label="发布日期Spa"></el-table-column>
        <el-table-column prop="developerEn" label="发布人En"></el-table-column>
        <el-table-column prop="developerChi" label="发布人Chi"></el-table-column>
        <el-table-column prop="developerJap" label="发布人Jap"></el-table-column>
        <el-table-column prop="developerSpa" label="发布人Spa"></el-table-column>
        <el-table-column prop="publisherEn" label="出版商En"></el-table-column>
        <el-table-column prop="publisherChi" label="出版商Chi"></el-table-column>
        <el-table-column prop="publisherJap" label="出版商Jap"></el-table-column>
        <el-table-column prop="publisherSpa" label="出版商Spa"></el-table-column>
        <el-table-column prop="platformEn" label="平台En"></el-table-column>
        <el-table-column prop="platformChi" label="平台Chi"></el-table-column>
        <el-table-column prop="platformJap" label="平台Jap"></el-table-column>
        <el-table-column prop="platformSpa" label="平台Spa"></el-table-column>
        <el-table-column label="专辑封面">
          <template v-slot="scope" >
            <el-image :src="scope.row.imgSrc" style="width: 60px;height: 60px;"
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
    <album v-else @editClose="editClose" :editAlbumId="editAlbumId"></album>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import Album from './album'

  export default {
    components: {
      Album,
    },
    setup() {
      const album = ref([])
      const editAlbumId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getAlbum()
      })

      const getAlbum = async () => {
        try {
          loading.value = true
          album.value = await get('/SaltProject/getAlbum')
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            Album.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editAlbumId.value = id
      }

      const handleDelete = id => {
        ElMessageBox.confirm('此操作将永久删除该员工信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await post(`/SaltProject/deleteAlbum?id=`+id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            getAlbum()
            ElMessage.success(`${res.message}`)
          }
        })
      }


      const editClose = () => {
        showEdit.value = false
        getAlbum()
      }

      const indexMethod = index => index + 1

      return {
        album,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editAlbumId,
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
