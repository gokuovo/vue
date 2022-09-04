<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">List列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="list" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="titleEn" label="标题"></el-table-column>
<!--        <el-table-column prop="titleChi" label="标题Chi"></el-table-column>-->
<!--        <el-table-column prop="titleJap" label="标题Jap"></el-table-column>-->
<!--        <el-table-column prop="titleSpa" label="标题Spa"></el-table-column>-->
        <el-table-column prop="dateEn" label="发布日期"></el-table-column>
<!--        <el-table-column prop="dateChi" label="发布日期Chi"></el-table-column>-->
<!--        <el-table-column prop="dateJap" label="发布日期Jap"></el-table-column>-->
<!--        <el-table-column prop="dateSpa" label="发布日期Spa"></el-table-column>-->
        <el-table-column prop="companyEn" label="公司名"></el-table-column>
<!--        <el-table-column prop="companyChi" label="公司名Chi"></el-table-column>-->
<!--        <el-table-column prop="companyJap" label="公司名Jap"></el-table-column>-->
<!--        <el-table-column prop="companySpa" label="公司名Spa"></el-table-column>-->
        <el-table-column prop="platformEn" label="平台"></el-table-column>
<!--        <el-table-column prop="platformChi" label="平台Chi"></el-table-column>-->
<!--        <el-table-column prop="platformJap" label="平台Jap"></el-table-column>-->
<!--        <el-table-column prop="platformSpa" label="平台Spa"></el-table-column>-->
        <el-table-column label="list配图">
          <template v-slot="scope" >
            <el-image @click="imgClick()" :src="scope.row.url" style="width: 60px;height: 60px;"></el-image>
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
            <el-button plain size="small" type="primary" @click="handleEdit2(scope.row.id)">更换配图</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <List v-if="page==1" @editClose="editClose" :editListId="editListId"></List>
    <list-file v-else-if="page==2" @editClose="editClose" :listId="listId"></list-file>

    <div>
      <ImgPreview></ImgPreview>
    </div>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import { get, post } from '../../lin/plugin/axios'
  import List from './list'
  import ListFile from './list-file'
  import ImgPreview from '@/view/videoCommon/ImgPreview'

  export default {
    components: {
      ListFile,
      List,
      ImgPreview
    },
    setup() {
      const listId = ref(1)
      const page = ref(null)
      const list = ref([])
      const editListId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getList()
      })

      const getList = async () => {
        try {
          loading.value = true
          list.value = await get("/SaltProject/getList")
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            list.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editListId.value = id
        page.value = 1
      }
      const handleEdit2 = id => {
        showEdit.value = true
        listId.value = id
        page.value = 2
      }

      const handleDelete = id => {
        ElMessageBox.confirm('此操作将永久删除该友商, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await post("/SaltProject/deleteList?id="+id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            getList()
            ElMessage.success(`${res.message}`)
          }
        })
      }

      const editClose = () => {
        showEdit.value = false
        page.value = null
        getList()
      }

      const indexMethod = index => index + 1

      return {
        list,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editListId,
        indexMethod,
        handleDelete,
        handleEdit2,
        page,
        listId,
      }
    },
    methods: {
      imgClick(){
        let data = {
          imgPreviewVisible: true,
          imgPreviewList: this.list.map((row) => {
            return {
              fileUrl: row.url,
              downloadLink: row.url,
              fileName: row.companyEn,
              extendName: row.companyEn
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


