<template>
  <div v-loading.fullscreen.lock="loading">
<!--    <el-button-->
<!--      type="primary"-->
<!--      size="mini"-->
<!--      icon="el-icon-edit"-->
<!--      @click="save()"-->
<!--      :disabled="dataListSelections.length <= 0"-->
<!--    >保存</el-button>-->
    <el-button
      type="primary"
      size="mini"
      @click="add()"
    >{{'保存'}}</el-button>
    <el-button
      icon="el-icon-search"
      size="mini"
      type="primary"
      @click="pageIndex=1;getDataList()"
    >查询</el-button>
    <div style="margin-top: 20px"></div>
    <el-table :data="dataList" border tooltip-effect="dark">
      <el-table-column
        prop="codeType"
        label="标识类型"

        align="center"
        width="85"
      ></el-table-column>
      <el-table-column
        prop="code"
        label="标识码值"
        :show-overflow-tooltip="true"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        prop="codeName"
        label="标识中文名称"
        :show-overflow-tooltip="true"
        align="center"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="makeTime"
        label="创建时间"
        :show-overflow-tooltip="true"
        align="center"
        width="110"
      ></el-table-column>
      <el-table-column
        prop="operator"
        label="操作人"
        align="center"
        width="150"
      ></el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="curPage"
      :page-sizes="[3, 10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
     <!-- <accident-rate-config-add ref="addOrUpdate" v-if="addOrUpdateVisible" @refreshDataList="getDataList()" /> -->
      <ld-code-add-or-update ref="addOrUpdate" v-if="addOrUpdateVisible" @refreshDataList="getDataList()" />
  </div>

</template>

<script>
import SaltWordAddOrUpdate from "./SaltWord_add_or_update"
  export default {
    data() {
      return {
        dataList: [],
        curPage: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        loading: false,
        dataListSelections: [],
        showEdit: [], //显示编辑框
        showBtn: [],
        showBtnOrdinary: true,
        addOrUpdateVisible:false
      };
    },
    components: {
      SaltWordAddOrUpdate
  },
    props: ["dataForm"],
    methods: {
      getDataList() {
        this.dataListLoading = true;
        this.$http({
          url: this.$http.adornUrl("/agy/ldcode/list"),
          method: "post",
          params: this.$http.adornParams({
            curPage: this.curPage,
            pageSize: this.pageSize,
          }),
          data: this.$http.adornData({
            ...this.dataForm,
          }),
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list;
            this.totalPage = data.page.totalCount;
          } else {
            this.dataList = [];
            this.totalPage = 0;
          }
          this.dataListLoading = false;
        });
      },
      //新增
        add() {
            this.addOrUpdateVisible = true;
            this.$nextTick(()=>{
                this.$refs.addOrUpdate.init();
            })
        },
      // save() {
      //   this.$confirm("确定保存修改记录？", this.$t("prompt.title"), {
      //     confirmButtonText: this.$t("确定"),
      //     cancelButtonText: this.$t("取消"),
      //     type: "warning",
      //   }).then(() => {
      //     this.loading = true;
      //     this.$http({
      //       url: this.$http.adornUrl("/agy/ldcode/save"),
      //       method: "post",
      //       data: this.$http.adornData({
      //         formList: this.dataListSelections,
      //       }),
      //     }).then(({ data }) => {
      //       if (data && data.code === 0) {
      //         this.$message({
      //           message: this.$t("prompt.success"),
      //           type: "success",
      //           duration: 1500,
      //           onClose: () => {
      //             this.getDataList();
      //           },
      //         });
      //       } else {
      //         this.$message.error(data.msg);
      //       }
      //       this.loading = false;
      //     });
      //   });
      // },
      // 每页数
      sizeChangeHandle(val) {
        this.pageSize = val;
        this.curPage = 1;
        this.getDataList();
      },
      // 当前页
      currentChangeHandle(val) {
        this.curPage = val;
        this.getDataList();
      },
      clearPage() {
        this.curPage = 1;
      },
      // 多选
      selectionChangeHandle(val) {
        console.log(val);
        this.dataListSelections = val;
      },

    },
  };
</script>
