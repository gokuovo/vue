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
        <el-table-column prop="album" label="所属专辑"></el-table-column>
        <el-table-column label="操作" fixed="right" width="350">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
            <el-button size="small" type="primary" @click="clickVideo(scope.row.url)">播放</el-button>
            <el-button plain size="small" type="primary" @click="handleEdit2(scope.row.id)">更换音乐</el-button>
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
    <AlbumMusic v-if="page==1" @editClose="editClose" :editAlbumMusicId="editAlbumMusicId"></AlbumMusic>
    <album-music-file v-else-if="page==2" @editClose="editClose" :editAlbumMusicId="editAlbumMusicId"></album-music-file>
    <video-preview></video-preview>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import AlbumMusic from './album-music'
  import { get, post } from '../../lin/plugin/axios'
  import AlbumMusicFile from './album-music-file'
  // 引入视频预览组件
  import VideoPreview from '../videoCommon/VideoPreview'

  export default {
    components: {
      VideoPreview,
      AlbumMusicFile,
      AlbumMusic,
    },
    methods: {
      clickVideo(url) {
        const data = {
          videoPreviewVisible: true,
          videoPreviewList: [
            {
              size: '123',
              fileUrl: url,
              downloadLink: '123',
              fileName: 'text',
              extendName: '123',
            },
          ],
          activeIndex: 0,
        }
        this.$store.commit('setVideoPreviewData', data)
      },
    },
    setup() {
      const page = ref(null)
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
          albumMusic.value = await get("/SaltProject/getProjectByType?type="+"0")
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
        page.value = 1
      }
      const handleEdit2 = id => {
        showEdit.value = true
        editAlbumMusicId.value = id
        page.value = 2
      }

      const handleDelete = id => {
        ElMessageBox.confirm('此操作将永久删除该友商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await post("/SaltProject/deleteMusic?id="+id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            getAlbumMusic()
            ElMessage.success(`${res.message}`)
          }
        })
      }

      const editClose = () => {
        showEdit.value = false
        page.value = null
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
        handleEdit2,
        page,
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

