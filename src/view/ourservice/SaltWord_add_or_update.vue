<template>
    <div>
        <el-dialog
            :title="'新增'"
            width="70%"
            :close-on-click-modal="true"
            :visible.sync="visible"
            :before-close="clear"
            v-loading="loading"
        >
            <el-form>
                <el-row>
                    <el-col :span="8" style="margin-right: 10%;">
                        <el-form-item prop="codeType" :label="'标识类型'" label-width="140px">
                          <ISelect :url="'/agy/ldcode/listTpye'" v-model="dataForm.codeType" :placeholder="'请选择'" :wid="'100%'"></ISelect>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" style="margin-right: 10%;">
                        <el-form-item
                            prop="code"
                            :label="'标识码值'"
                            label-width="140px"
                        >
                            <el-input v-model="dataForm.code" :disabled="false" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8" style="margin-right: 10%;">
                        <el-form-item
                            prop="codeName"
                            :label="'标识中文名称'"
                            label-width="140px"
                        >
                            <el-input v-model="dataForm.codeName" />
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" icon="el-icon-close" @click="clear()">取 消</el-button>
                <el-button size="mini" type="primary" icon="el-icon-check" @click="save()">保 存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import ISelect from "@/view/common/select";
import Tooltip from "@/view/common/tooltip";

function requiredTip(info, trigger = "blur") {
    return [
        {
            required: true,
            message: info,
            trigger
        }
    ];
}

export default {
    data() {
        return {
            dataForm: {
              codeType: "",
              code: "",
              codeName: "",
            },
            dataRule: {
                // agentGrade: requiredTip("代理人类别必录！", "change"),
                // wageNo: requiredTip("年月必录！", "change"),
                // accidentMoney: requiredTip("意外险费用必录！", "change")

            },
            visible: false,
            loading: false,
        };
    },
    components: {
        ISelect,
        Tooltip
    },
    methods: {
        init() {
            this.clearDataForm();
            this.visible = true;
        },
        save(){
                this.$http({
                url: this.$http.adornUrl("/agy/ldcode/save"),
                method: "post",
                data: this.$http.adornData({
                    ...this.dataForm
                })
            }).then(({ data }) => {
                if (data && data.code == 0) {
                    this.$message({
                        type: "success",
                        message: data.msg,
                        duration: 1500,
                        onClose: () => {
                            this.clear();
                            this.$emit("refreshDataList");
                        }
                    });
                } else {
                    this.$message({
                        type: "error",
                        message: data.msg,
                        duration: 1500
                    });
                }
            });

        },
        clear() {
            this.visible = false;
            this.clearDataForm();
        },
        clearDataForm() {
            for (var a in this.dataForm) {
                    this.dataForm[a] = "";
                }
        }
    }
};
</script>

<style scoped>
</style>
