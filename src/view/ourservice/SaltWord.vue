<template>
  <div>
    <el-form :inline="true" :model="dataForm" label-width="110px" :label-position="'right'">
      <el-row>
        <el-col :span="8">
          <el-form-item prop="codeType" :label="'标识类型'">
            <ISelect :url="'/agy/ldcode/listTpye'" v-model="dataForm.codeType" :placeholder="'请选择'" :wid="'100%'"></ISelect>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="code" :label="'标识码值'">
            <ISelect :url="'/agy/ldcode/listCode/'+dataForm.codeType" v-model="dataForm.code" :placeholder="'请选择'" :wid="'100%'"></ISelect>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="codeName" :label="'标识中文名称'">
            <el-input v-model="dataForm.codeName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <ld-code-table :dataForm="dataForm"></ld-code-table>
  </div>
</template>

<script>
  import SaltWordTable from './SaltWordTable';
  import ISelect from '@/view/common/select';
  import Tooltip from "@/view/common/tooltip";

  export default {
    data() {
      return {
        options: [],
        form: {},
        dataForm: {
          codeType: '',
          code: '',
          codeName: "",
          wid: '100%'
        }
      }
    },
    components: {
      SaltWordTable,
      ISelect,
      Tooltip
    },
  }
</script>
