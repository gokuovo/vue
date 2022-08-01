<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">音乐列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="albumMusic" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="title" label="音乐名"></el-table-column>
<!--        <el-table-column label="友商图标">-->
<!--          <template v-slot="scope" >-->
<!--            <el-image :src="scope.row.partnerUrl" style="width: 60px;height: 60px;" :preview-src-list="scope.row.partnerUrl"-->
<!--            ></el-image>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column prop="album" label="所属专辑"></el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <audio ref="music" src="">
              <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">播放</el-button>
            </audio>
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
    <AlbumMusic v-else @editClose="editClose" :editAlbumMusicId="editAlbumMusicId"></AlbumMusic>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import AlbumMusic from './album-music'
  import { get, post } from '../../lin/plugin/axios'

  export default {
    components: {
      AlbumMusic,
    },
    setup() {
      const albumMusic = ref([])
      const editAlbumMusicId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getAlbumMusic()
      })

      const getAlbumMusic = async () => {
        try {
          loading.value = true
          albumMusic.value = await get("/SaltProject/getProjecteByAlbum?album="+"0")
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            albumMusic.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editAlbumMusicId.value = id
      }

      const handleDelete = id => {
        ElMessageBox.confirm('此操作将永久删除该友商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await post("/SaltProject/deletePartners?id="+id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            getAlbumMusic()
            ElMessage.success(`${res.message}`)
          }
        })
      }

      const editClose = () => {
        showEdit.value = false
        getAlbumMusic()
      }

      const indexMethod = index => index + 1

      return {
        albumMusic,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editAlbumMusicId,
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

