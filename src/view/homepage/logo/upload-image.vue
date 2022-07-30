<template>
  <div class="lin-container">
    <div class="lin-title">logo上传</div>

    <div class="lin-wrap">
      <el-form label-width="220px">
        <el-form-item label="当前logo">
          <img :src="url" style="width: 180px;heigth:160px;" />
        </el-form-item>

        <el-form-item label="logo上传">
          <upload-imgs ref="uploadEle8" :rules="rules" :multiple="true" :min-num="1" :max-num="1" :sortable="true" />
<!--          <div><el-button @click="getValue('uploadEle8')">获取当前图像数据</el-button></div>-->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import UploadImgs from '@/component/base/homepage/logo'
import { get, post } from '../../../lin/plugin/axios'

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
      url: '',
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
  async created() { // created钩子
    await this.initPage()
  },
  // 当页面使用路由参数时, 参数部分变化触发的动作在本函数中操作
  // https://router.vuejs.org/zh/guide/advanced/navigation-guards.htmll#组件内的守卫
  // beforeRouteUpdate(to, from, next) {
  //   // this.name = to.params.name
  //   // this.init()
  //   // next()
  // },
  methods: {
    preview(index) {
      this.$imagePreview({
        images: this.url,
        index,
      })
    },
    // 页面初始化
    async initPage() {
      try {
        this.url = await get('/SaltHomepage/getLogo') // api请求
      } catch (err) {
        console.error(err)
      }
    },
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

<style lang="scss" scoped>
  .container {
    padding: 20px 30px;
    .imgs-upload-container {
      display: flex;
      flex-wrap: wrap;
      .img-box {
        border: 1px dashed #d9d9d9;
        border-radius: 3px;
        -webkit-transition: all 0.1s;
        transition: all 0.1s;
        color: #666666;
        margin-right: 1em;
        margin-bottom: 1em;
        width: 200px;
        height: 150px;
        cursor: pointer;
        font-size: 12px;
        text-align: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        line-height: 1.3;
        flex-direction: column;
        .el-image {
        }
        .control {
          display: flex;
          -webkit-box-align: center;
          -ms-flex-align: center;
          align-items: center;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          justify-content: center;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          background-color: rgba(0, 0, 0, 0.3);
          -webkit-transition: all 0.3s;
          transition: all 0.3s;
          -webkit-transition-delay: 0.1s;
          transition-delay: 0.1s;
          .preview {
            color: white;
            font-size: 2em;
            transition: all 0.2s;
          }
        }
        &:hover {
          .control {
            opacity: 1;
          }
        }
      }
    }
  }
  </style>
