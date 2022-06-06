<template>
  <div class="divBase">
    <div style="height: 10%;width: 100%">
      <toolbar></toolbar>
    </div>
    <div style="height: 90%;width: 100%">
      <table class="divBase">
        <tr>
          <td style="height: 100%;width: 50%">
            <div style="width: 100%;height: 20%;color: #F5F5F5;font-size: 26px">
              <div style="width: 100%;padding-top: 10%">{{this.showingAlbum.key}}</div>
            </div>
            <div style="width: 100%;height: 60%;">
              <div class="selfDefineScroll" style="overflow-y: auto;height: 100%;width: 80%">
                <ul>
                  <li style="width: 100%;height: 15%" v-for="(item) in albumDetail">
                    <div>
                      <audioCom :fileUrl="item"></audioCom>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div style="width: 100%;height: 20%;color: #F5F5F5;font-size: 16px">
              <el-button type="danger">MUSIC</el-button>
              <el-button type="danger">SFX</el-button>
              <el-button type="danger">LIST</el-button>
            </div>
          </td>
          <td style="height: 100%;width: 30%">
            <div class="selfDefineScroll" style="overflow-y: scroll;height: 100%;width: 80%">
              <ul>
                <li style="width: 100%;height: 25%" v-for="(item) in albums">
                  <div @click="albumsClick(item)" class="divBase imgDiv" :style="{backgroundImage: `url(${item.srcPath})`}">
                  </div>
                </li>
              </ul>
            </div>
          </td>
          <td style="height: 100%;width: 20%">
            <contacts></contacts>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import toolbar from './components/toolbar'
  import contacts from './components/contacts'
  import audioCom from './components/audioCom'

  export default {
    name: 'Projects',
    components: { toolbar, contacts, audioCom},
    data() {
      return {
        albums: [
          {
            key: 'MORNING',
            srcPath: 'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            albumDetailId: ''
          },
          {
            key: 'CLOCK',
            srcPath: 'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            albumDetailId: ''
          },
          {
            key: 'MORNING',
            srcPath: 'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            albumDetailId: ''
          },
          {
            key: 'CLOCK',
            srcPath: 'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            albumDetailId: ''
          },
          {
            key: 'MORNING',
            srcPath: 'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            albumDetailId: ''
          },
        ],
        albumDetail: [
          {
            name: 'PAST IN THE DREAM',
            srcPath: 'https://other-web-ri01-sycdn.kuwo.cn/9a9547fd9dca4afb1e99c3f3d83de486/629c769a/resource/n2/57/58/3204734942.mp3'
          },
          {
            name: 'SEE WEIRD THINGS',
            srcPath: 'https://gx-sycdn.kuwo.cn/928f61dc2538435b7ab3f3dbd78b5f04/629c76c8/resource/n2/52/13/273410370.mp3'
          },
          {
            name: 'PAST IN THE DREAM',
            srcPath: 'https://other-web-ri01-sycdn.kuwo.cn/9a9547fd9dca4afb1e99c3f3d83de486/629c769a/resource/n2/57/58/3204734942.mp3'
          },
          {
            name: 'SEE WEIRD THINGS',
            srcPath: 'https://gx-sycdn.kuwo.cn/928f61dc2538435b7ab3f3dbd78b5f04/629c76c8/resource/n2/52/13/273410370.mp3'
          },
          {
            name: 'PAST IN THE DREAM',
            srcPath: 'https://other-web-ri01-sycdn.kuwo.cn/9a9547fd9dca4afb1e99c3f3d83de486/629c769a/resource/n2/57/58/3204734942.mp3'
          },
          {
            name: 'SEE WEIRD THINGS',
            srcPath: 'https://gx-sycdn.kuwo.cn/928f61dc2538435b7ab3f3dbd78b5f04/629c76c8/resource/n2/52/13/273410370.mp3'
          },
        ],
        showingAlbum:{}
      }
    },
    created() {
      if(null != this.albums && this.albums.length > 0){
        this.showingAlbum = this.albums[0];
      }
    },
    methods:{
      albumsClick(data){
        this.showingAlbum = data;
        console.log(data);
      }
    }
  }
</script>

<style scoped>
  .divBase {
    width: 100%;
    height: 100%;
  }

  .imgDiv {
    background-size: cover;
    background-repeat: no-repeat;
  }

  .selfDefineScroll::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    background-color: #b5b1b1;
  }

  .selfDefineScroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: black;

  }

  .selfDefineScroll::-webkit-scrollbar-thumb {
    width: 20px;
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #b5b1b1;
  }

  * {
    padding: 0;
    margin: 0;
  }

  >>> .el-breadcrumb__inner {
    color: #BDBBB7 !important;
  }

  >>> .el-button--primary {
    color: #FFFFFF;
    background-color: #0D0D0D;
    border-color: #0D0D0D;
  }

  ul {
    list-style-type: none;
    height: 100%;
    width: 100%;
    text-align: left;
  }

  audio{

  }
</style>
