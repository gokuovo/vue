<template>
	<div>
		<Tooltip :content="content" :isTooltip="tooltipIs">
			<el-select v-model="svalue" :placeholder="$t('commom.choice')" :style="{width:wid}" :filter-method="dataFilter" :value="{v:va}" :disabled='isDisabled?true:false' @change="doSelect" filterable @focus='defaultValue' v-el-select-loadmore="loadmore">
				<i slot="prefix" v-if="chooseVisible"><img class="prevImg" src="../../assets/img/choose.png" alt=""></i>
				<!-- <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" width="280px"> -->
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					<!-- <span v-if="item.value" style="float: left;margin-right: 8px;">{{ item.value }}</span>
					<span v-if="item.label" style="float: right; color: purple ;">{{ item.label }}</span> -->
					<div style="display:flex;">
						<div v-if="item.value" v-bind:style="{width: widthData + 'px'}">{{ item.value }}</div>
						<div v-if="item.label" style="color: purple ;">{{ item.label }}</div>
					</div>
				</el-option>
			</el-select>
		</Tooltip>
	</div>
</template>

<script>
	import http from '@/utils/httpRequest'
	import Tooltip from './tooltip'
	export default {
		name: 'ISelect',
		directives: {
			'el-select-loadmore': {
				bind(el, binding) {
					// 获取element-ui定义好的scroll盒子
					const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown__wrap');
					// const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap');
					SELECTWRAP_DOM.addEventListener('scroll', function () {
						/**
						* scrollHeight 获取元素内容高度(只读)
						* scrollTop 获取或者设置元素的偏移值,常用于, 计算滚动条的位置, 当一个元素的容器没有产生垂直方向的滚动条, 那它的scrollTop的值默认为0.
						* clientHeight 读取元素的可见高度(只读)
						* 如果元素滚动到底, 下面等式返回true, 没有则返回false:
						* ele.scrollHeight - ele.scrollTop === ele.clientHeight;
						*/
						const condition = this.scrollHeight - this.scrollTop <= this.clientHeight;
						if (condition) {
							binding.value();
						}
					});
				}
			}
    },
		components:{
			Tooltip
		},
		data() {
			return {
				options: [],
				svalue: this.value,
				copyOptions: [], //用于存储已经从后台请求到的码表信息
				content: '',
				inputVal: '',
				tooltipIs: 'N',
				widthData: '120',
				chooseItem: {},
				ifApproval1: false,
				ifApproval2: false,
				ifApproval3: false,
				ifApproval4: false,
				ifSetAdd: false,
				alreadyFlag: false,
				valOptions: [],
				formData: {
					pageIndex: 1,
					pageSize: 20,
				}
			}
		},
		methods: {
			loadmore() {
				this.formData.pageIndex++;
				this.getList(this.formData);
			},
			getList(formData) {
				// 这里是接口请求数据, 带分页条件
				if (this.alreadyFlag) {
					this.showOptions(this.inputVal ? 'valOptions' : 'copyOptions')
				} else {
					this.getData()
				}
			},
			// 将options对应显示
			showOptions(item) {
        const prevArr = this[item]&&this[item].length>0 ? this[item] : []
				const arr = prevArr.filter((v, index) => (((this.formData.pageIndex-1)*this.formData.pageSize) <= index && index <= (this.formData.pageIndex*this.formData.pageSize-1)) )
				let brr = []
				if (this.svalue) {
					// 首先判断回显值是否在arr中
					let exitArr = this.judgeExit(arr)
					// 若在=》判断options中有无
					let exitOptions = this.judgeExit(this.options)
					if (exitArr && exitOptions) {
						// 两者都有将options中的数据删掉
						const index = this.options.findIndex(v => v.value === this.svalue)
						this.options.splice(index,1)
					} else if (!exitOptions && !exitArr) {
						brr = [this.chooseItem]
					}
				}
				// 当没有回显信息时 直接拼接；有回显信息，arr中有options中没有 或者 arr中没有options中有 也是直接拼接
				this.options = [...this.options, ...arr]
				// 两者都无 将数据线push到options中
				this.options = brr.length ? [...this.options, ...brr] : this.options
			},
			// 判断所选值是否在arr中
			judgeExit(list) {
        return list.length ? ((list.filter(v => v.value === this.svalue) == -1) ? false : true) : false
			},
			//转换下拉框下的字段
			_dataTransform(data) {
				let _label = this.rValue ? this.rValue : 'value'
				let _value = this.rLabel ? this.rLabel : 'label'
				var ft = {
					'value': this.rLabel ? this.rLabel : 'label',
					'label': this.rValue ? this.rValue : 'value'
				};
				let _data = [];
				_data[0] = {};
				if(data == null) {
					return;
				}
				for(let i = 0; i < data.length; i++) {
					_data[i + 1] = {};
					_data[i + 1].label = data[i][ft.label];
					_data[i + 1].value = data[i][ft.value];
				}
				return _data;
			},
			getData() {
				if(!this.url) {
					return;
				}
				//远程请求回来的数据
				http({
					url: http.adornUrl(this.url),
					method: this.method ? this.method : 'post',
					data: http.adornData(null, false)
				}).then(({
					data
				}) => {
					this.alreadyFlag = true
					//对于那种只读的，如果值在第20行之后，就无法找到，导致页面只显示编码，因此对于这种只读的，将pageSize改为1000
					//对于不是只读的，页面初始化有值的情况，如果值在第二页及以后，同样会出现只显示编码的情况
					if (this.formPageSize || this.isDisabled) {
						this.formData.pageSize=1000
					}
					// 如果是拿到二审审核类型 手动去除 01 02 03
					this.ifApproval1 = this.url == '/agyapp/Entry/baseinfoquery?msgType=10' // 复审的审核状态
					this.ifApproval2 = this.url == '/agyapp/Entry/baseinfoquery?msgType=17' // 加扣款的审核状态
					this.ifApproval3 = this.url == '/agyapp/Entry/baseinfoquery?msgType=18' // 加扣款的加扣款类型
					this.ifApproval4 = this.url == '/agyapp/Entry/baseinfoquery?msgType=19' // 加扣款的是否计税
					this.ifAgencyAdd = this.url.includes('?agencyAdd=true')
					this.ifSetAdd = this.url.includes('setAdd=true')
					let deleteList = ['01', '02', '03']
					if(this.ifApproval1){
						this.copyOptions = [{}]
						data.msg.approvalstatus.map(v => {
							if(deleteList.findIndex(i=>i==v.code)==-1){
								this.copyOptions.push({
									label: v.code_name,
									value: v.code
								})
							}
						})
					} else if(this.ifApproval2){
						this.copyOptions = [{}]
						data.msg.approvalstatuscode.map(v => {
							if(v.code != 1) {
								this.copyOptions.push({
									label: v.code_name,
									value: v.code
								})
							}
						})
					}else if(this.ifAgencyAdd) {
						this.copyOptions = [{}]
						data.list.map(v => {
							if(v.label != '04') {
								this.copyOptions.push({
									label: v.value,
									value: v.label
								})
							}
						})
					}else if(this.ifSetAdd) {
						this.copyOptions = [{}]
						data.list.map(v => {
							if((v.label != '04')&&(v.label != '05')) {
								this.copyOptions.push({
									label: v.value,
									value: v.label
								})
							}
						})
					}else{
            const list = this.rList ? this.rList : 'list'
						this.copyOptions = this._dataTransform(data[list]);
					}
					this.chooseItem = this.svalue ? (this.copyOptions.filter(v=>v.value == this.svalue)[0] ? this.copyOptions.filter(v=>v.value == this.svalue)[0] : {}) : {}
					this.options = []
					this.formData.pageIndex = 1
					this.showOptions('copyOptions')
				})
			},
			dataFilter(val) {
				this.inputVal = val;
				this.options = []
				this.formData.pageIndex = 1
				if(val) { //val存在
					this.valOptions = this.copyOptions.filter((item) => {
						if(item.label) {
							if(!!~item.label.indexOf(val) || !!~item.label.toUpperCase().indexOf(val.toUpperCase()) || !!~item.value.indexOf(val) || !!~item.value.indexOf(val)) {
								return true;
							}
						}
					})
					this.showOptions('valOptions')
				} else {
					//当输入框为空
					this.valOptions = []
					this.formData.pageIndex = 1
					this.showOptions('copyOtions')
				}
			},
			doSelect(type) {
				this.inputVal = ''
				this.options = []
				this.formData.pageIndex = 1
				this.chooseItem = this.copyOptions.filter(v => v.value == this.svalue)[0]
				this.showOptions('copyOptions')
				this.content = type ? ( this.options.length > 1 ? (this.options.filter(v=>v.value==type)[0] ? this.options.filter(v=>v.value==type)[0].label : '' ) : '') : '';
				this.$emit('change', type);
				this.$emit('changeIndex');
			},
			defaultValue() {
				//当输入框为空
				this.options = []
				this.inputVal = ''
				this.formData.pageIndex = 1
				this.showOptions('copyOptions')
			}
		},
		watch: { //判断下拉框的值是否有改变
			svalue(val, oldVal) {
				if(!this.svalue) {
					this.svalue = "";
				}
				this.chooseItem = this.svalue ? this.copyOptions.filter(v=>v.value == this.svalue)[0] : {}
				if(val != oldVal) {
					this.$emit('input', val);
					this.$emit('change', val);
					this.$emit('changeIndex');
				}
				this.content = (val&&(this.options.length>0)) ? (this.options[0].value ? (this.options.filter(v=>v.value==val)[0] ? this.options.filter(v=>v.value==val)[0].label : '' ) : '') : '';
			},
			'options'(e){
				if(e&&Array.isArray(e)&&e.length>0){
					this.content = this.svalue ? ( e[0].value ? ( e.filter(v=>v ? (v.value ? v.value==this.svalue : '') : '')[0] ? e.filter(v=>v.value ? v.value==this.svalue : '')[0].label : '' ) : '') : '';
				}
			},
			value(val, oldVal) {
				if(val != oldVal) {
					this.svalue = val;
				}
				this.chooseItem = this.svalue ? this.copyOptions.filter(v=>v.value == this.svalue)[0] : {}
			},
			url() {
				this.getData();
			}
		},
		props: {
			url: {
				type: String
			}, //导入的url地址
			value: {
				type: String
			}, //接受外部v-model传入的值
			fileType: {
				type: String
			}, //定义请求回来的json数据格式
			wid: {
				type: String
			}, //input框的宽度设置
			widvalue: {
				type: String
			}, //input框的宽度设置
			formPageSize: {}, //传过来的PageSize
			va: {
				type: String
			},
			isDisabled: {},
			chooseVisible: { // 是否出现前方的选择头像
				type: String
			},
			isTooltip: {}, // tooltip是否需要出现
			// 返回的数据
			rList: {},
			rValue: {},
			rLabel: {},
			method: {},
      manageCom2Plus: {}
		},
		mounted() {
			this.getData();
			if (this.widvalue) {
				this.widthData = this.widvalue;
			}
			if(this.isTooltip){
				this.tooltipIs = this.isTooltip
			}else{
				this.tooltipIs = 'N'
			}
		}
	}
</script>
