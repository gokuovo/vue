<template>
  <div class="lin-container">
    <div class="lin-title">logo上传</div>
    <div class="lin-wrap">
      <el-form label-width="220px">
        <el-form-item label="logo上传">
          <upload-imgs ref="uploadEle8" :rules="rules" :multiple="true" :min-num="1" :max-num="1" :sortable="true" />
<!--          <div><el-button @click="getValue('uploadEle8')">获取当前图像数据</el-button></div>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import UploadImgs from '@/component/base/homepage'

/** 生成随机字符串 */
function createId() {
  return Math.random()
    .toString(36)
    .substring(2)
}
export default {
  name: 'ImgsUploadStage1',
  components: {
    UploadImgs,
  },
  data() {
    return {
      remoteName: 'remoteFucAsync',
      remoteNameObj: {
        remoteFuc: this.remoteFuc,
        remoteFucAsync: this.remoteFucAsync,
        remoteFucSuccess: this.remoteFucSuccess,
        remoteFucSuccessAsync: this.remoteFucSuccessAsync,
      },
      fit: 'cover',
      rules: {
        maxSize: 5,
        minWidth: 100,
        minHeight: 100,
      },
      rules2: {
        minWidth: 100,
        maxWidth: 2000,
        allowAnimated: 1,
      },
      initData1: [
        {
          id: '123',
          display:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          src: '/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg',
          imgId: '123dk98',
        },
        {
          id: '12d3',
          display:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          src: '/images/index/Lin_cms_%E5%B0%81%E9%9D%A2.png',
          imgId: 'sd9873429',
        },
        {
          id: 'hahah',
          display:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          src: '/images/index/Lin_UI_%E5%B0%81%E9%9D%A2.png',
          imgId: 'ccsd2123',
        },
      ],
      initData: [
        {
          id: '123',
          display:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          src:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          imgId: '12381900',
        },
        {
          id: '12d3',
          display:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          src: '/images/index/Lin_cms_%E5%B0%81%E9%9D%A2.png',
          imgId: '238287',
        },
        {
          id: 'hahah',
          display:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          src: '/images/index/Lin_UI_%E5%B0%81%E9%9D%A2.png',
          imgId: '1232323',
        },
      ],
    }
  },
  // 当页面使用路由参数时, 参数部分变化触发的动作在本函数中操作
  // https://router.vuejs.org/zh/guide/advanced/navigation-guards.htmll#组件内的守卫
  // beforeRouteUpdate(to, from, next) {
  //   // this.name = to.params.name
  //   // this.init()
  //   // next()
  // },
  methods: {
    async beforeFuc() {
      this.$message.error('进入自定义校验函数, 并返回false终止上传')
      return false
    },
    async getValue(name) {
      console.log(await this.$refs[name].getValue())
      // eslint-disable-next-line
      alert('已获取数据, 打印在控制台中')
    },
    doClear() {
      this.$refs.uploadEle9.clear()
    },
    changeData() {
      this.initData1 = [
        {
          id: 'hahah',
          display:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          src: '/images/index/Lin_UI_%E5%B0%81%E9%9D%A2.png',
          imgId: '2477899809',
        },
        {
          id: '12d3',
          display:
            'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
          src: '/images/index/Lin_cms_%E5%B0%81%E9%9D%A2.png',
          imgId: '4dfg43234',
        },
      ]
    },
    remoteFucAsync() {
      return Promise.resolve(false)
    },
    remoteFuc(file, cb) {
      setTimeout(() => {
        cb(false)
      }, 3000)
    },
    remoteFucSuccessAsync() {
      return Promise.resolve({
        id: createId,
        url: 'http://dev.koa.7yue.pro/assets/2019/06/30/abc823a9-5ef4-48e1-bdf6-dd4f0ab92482.jpg',
      })
    },
    remoteFucSuccess(file, cb) {
      setTimeout(() => {
        cb({
          id: createId,
          url: 'http://dev.koa.7yue.pro/assets/2019/06/30/abc823a9-5ef4-48e1-bdf6-dd4f0ab92482.jpg',
        })
      }, 3000)
    },
  },
}
</script>

<style scoped lang="scss"></style>
