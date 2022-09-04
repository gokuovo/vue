<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">news内容查看</div>
      </div>
      <!-- 表格 -->
      <el-table :data="newslink" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="titleEn"  label="相关新闻名"></el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <newslink v-else @editClose="editClose" :editNewsId="editNewsId"></newslink>

    <div>
      <ImgPreview></ImgPreview>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import ImgPreview from '@/view/videoCommon/ImgPreview'
  import Newslink from './newslink'

  export default {
    components: {
      Newslink,
      ImgPreview
    },
    setup() {
      const newslink = ref([])
      const editNewsId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getNews()
      })

      const getNews = async () => {
        try {
          loading.value = true
          newslink.value = await get("/SaltNewsLink/getNewsLink")
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            newslink.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editNewsId.value = id
      }


      const editClose = () => {
        showEdit.value = false
        getNews()
      }

      const indexMethod = index => index + 1

      return {
        newslink,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editNewsId,
        indexMethod,
      }
    },
    methods: {
      imgClick(){
        let data = {
          imgPreviewVisible: true,
          imgPreviewList: this.news.map((row) => {
            return {
              fileUrl: row.url,
              downloadLink: row.url,
              fileName: row.titleEn,
              extendName: row.titleEn
            }
          }),
          activeIndex: 0
        }
        this.$store.commit('setImgPreviewData', data);
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

