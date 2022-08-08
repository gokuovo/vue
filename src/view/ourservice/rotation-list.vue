<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">轮播图列表</div>
      </div>
      <div>
        <div class="title">
          <el-form>
            <el-form-item label="根据轮播图类型查询">
              <el-select size="medium" filterable  v-model="imageType" placeholder="请选择">
               <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
              </el-select>
              <el-button @click="search(imageType)">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 表格 -->
      <el-table :data="ratation" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column label="轮播图">
          <template v-slot="scope" >
            <el-image :src="scope.row.imageUrl" @click="imgClick()" style="width: 320px;height: 180px"></el-image>
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

    <div>
      <ImgPreview></ImgPreview>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import Rotation from './rotation'
  import { get } from '../../lin/plugin/axios'
  import ImgPreview from '@/view/videoCommon/ImgPreview'

  export default {
    components: {
      Rotation,
      ImgPreview
    },
    setup() {
      const imageType = ref(null)
      let ratation = ref([])
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

      const search = imageType => {
        try {console.log(get("/SaltOurService/getRotationByType?type="+imageType))
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            ratation.value = []
          }
        }
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
        imageType,
        search,
        options: [
          {
            value: '12',
            label: 'music轮播图',
          },
          {
            value: '13',
            label: 'SoundDesign轮播图',
          },
          {
            value: '14',
            label: 'VoiceActing轮播图',
          },
          {
            value: '15',
            label: 'GameAudioPipeline轮播图',
          },
        ],
      }
    },
    methods: {
      // preview(url) {
      //   this.$imagePreview({
      //     images: url,
      //   })
      // },
      imgClick(){
        let data = {
          imgPreviewVisible: true,
          imgPreviewList: this.ratation.map((row) => {
            return {
              fileUrl: row.imageUrl,
              downloadLink: row.imageUrl,
              fileName: row.imageCode,
              extendName: row.imageCode
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
