<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div class="header">
        <div class="title">Word列表</div>
      </div>
      <!-- 表格 -->
      <el-table :data="word" v-loading="loading">
        <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
        <el-table-column prop="wordType" label="文字类型"></el-table-column>
        <el-table-column prop="wordTextEn" label="文字En版"></el-table-column>
        <el-table-column prop="wordTextChi" label="文字Chi版"></el-table-column>
        <el-table-column prop="wordTextJap" label="文字Jap版"></el-table-column>
        <el-table-column prop="wordTextSpa" label="文字Spa版"></el-table-column>
        <el-table-column prop="noti" label="备注"></el-table-column>
        <el-table-column label="操作" fixed="right" width="275">
          <template #default="scope">
            <el-button plain size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
<!--            <el-button-->
<!--              plain-->
<!--              size="small"-->
<!--              type="danger"-->
<!--              @click="handleDelete(scope.row.id)"-->
<!--              v-permission="{ permission: '删除文字', type: 'disabled' }"-->
<!--            >删除</el-button-->
<!--            >-->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑页面 -->
    <word v-else @editClose="editClose" :editWordId="editWordId"></word>
  </div>
</template>

<script>
  import { onMounted, ref } from 'vue'
  import { ElMessageBox, ElMessage } from 'element-plus'
  import Word from './word'
  import { get, post } from '../../lin/plugin/axios'

  export default {
    components: {
      Word,
    },
    setup() {
      const word = ref([])
      const editWordId = ref(1)
      const loading = ref(false)
      const showEdit = ref(false)

      onMounted(() => {
        getWord()
      })

      const getWord = async () => {
        try {
          loading.value = true
          word.value = await get('/SaltOurService/getWord')
          loading.value = false
        } catch (error) {
          loading.value = false
          if (error.code === 10020) {
            Word.value = []
          }
        }
      }

      const handleEdit = id => {
        showEdit.value = true
        editWordId.value = id
      }

      const handleDelete = id => {
        ElMessageBox.confirm('此操作将永久删除该段文字, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(async () => {
          const res = await post(`/SaltOurService/deleteWord?id=`+id)
          if (res.code < window.MAX_SUCCESS_CODE) {
            getWord()
            ElMessage.success(`${res.message}`)
          }
        })
      }


      const editClose = () => {
        showEdit.value = false
        getWord()
      }

      const indexMethod = index => index + 1

      return {
        word,
        loading,
        showEdit,
        editClose,
        handleEdit,
        editWordId,
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
