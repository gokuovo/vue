<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">视频列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="video" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
          <el-table-column prop="videoNameEn" label="视频标题"></el-table-column>
<!--        <el-table-column prop="videoNameChi" label="视频名字chi版"></el-table-column>-->
<!--        <el-table-column prop="videoNameJap" label="视频名字jap版"></el-table-column>-->
<!--        <el-table-column prop="videoNameSpa" label="视频名字spa版"></el-table-column>-->
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
<!--            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑名字</el-button>-->
            <el-button size="small" type="primary" @click="clickVideo(scope.row.videoUrl)">播放</el-button>
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">更换视频</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑页面 -->
    <video-file v-else @editClose="editClose" :editVideoId="editVideoId"></video-file>
    <Video-preview></Video-preview>

  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import Video from './video'
  // 引入视频预览组件
  import VideoPreview from '@/view/videoCommon/VideoPreview'
  import VideoFile from './video-file'

  export default {
    components: {
      VideoFile,
      Video,
      VideoPreview
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
      const video = ref([])
      const editVideoId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getVideo()
      })

      const getVideo = async () => {
        try {
          loading.value = true
          video.value = await get('/SaltOurService/getVideoList')
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            Video.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editVideoId.value = id
      }

      const editClose = () => {
        showEdit.value = false
        getVideo()
      }

      const indexMethod = index => index + 1

      return {
        video,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editVideoId,
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
