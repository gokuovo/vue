<template>
  <div class="divBase">
    <div style="height: 10%;width: 100%">
      <toolbar></toolbar>
    </div>
    <div style="height: 90%;width: 100%">
      <table class="divBase">
        <tr >
          <td style="height: 100%;width: 80%;position: relative">
            <div v-if="!showLIST" style="height: 100%;width: 60%;display: inline-block;">
              <div v-if="showMusic" style="width: 100%;height: 80%;padding-left: 10%">
                <div style="width: 100%;height: 30%;color: #F5F5F5;font-size: 26px">
                  <div style="width: 100%;padding-top: 10%;font-style: italic">{{this.showingAlbum.key}}</div>
                </div>
                <div style="width: 100%;height: 60%;">
                  <div style="height: 12%;width: 80%;background-color: #383838">
                    <audioCom ref="children" :key="playingMusic.id" :fileUrl="playingMusic"></audioCom>
                  </div>
                  <div class="selfDefineScroll" style="overflow-y: auto;height: 85%;width: 80%;padding-top: 2%">
                    <ul>
                      <li style="width: 100%;height: 10%;margin-top: 1%" v-for="(item) in albumDetail.music">
                        <div class="musicItem" :ref="item.id" @click="musicItemClick(item)" style="color: #8c939d;position: relative">
                          <span style="font-size: 14px;font-style: italic">{{item.name}}</span>

                          <audio v-show="false" :ref="item.name+item.id" controls @canplay="getDuration(item.name+item.id)">
                            <source :src="item.srcPath" type="audio/mpeg"/>
                          </audio>
                          <span v-show="false" style="font-size: 14px;font-style: italic">
                            {{addMusicId(item.name+item.id)}}
                          </span>

                          <span style="font-size: 14px;font-style: italic;color: #8c939d;position: absolute;right: 1%">
                            {{getMusicTime(item.name+item.id)}}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-if="showSFX" style="position: relative;width: 100%;height: 80%;">
                <video style="position: absolute;width: 80%;height: 80%;margin: 5% 5%;left: 4%;" controls>
                  <source :src="albumDetail.video[0].srcPath"  type="video/mp4">
                </video>
              </div>
              <div style="width: 100%;height: 20%;color: #F5F5F5;font-size: 16px;padding-top: 5%">
                <el-button @click="showMusic = true;showSFX = false;showLIST = false" class="buttonStyle" type="danger">
                  <span style="font-style: italic">MUSIC</span>
                </el-button>
                <el-button @click="showMusic = false;showSFX = true;showLIST = false" class="buttonStyle" type="danger">
                  <span style="font-style: italic">SFX</span>
                </el-button>
                <el-button @click="showMusic = false;showSFX = false;showLIST = true" class="buttonStyle" type="danger">
                  <span style="font-style: italic">LIST</span>
                </el-button>
              </div>
            </div>

            <div v-if="!showLIST" style="height: 100%;width: 40%;display: inline-block;position: absolute">
              <div v-if="!showLIST" style="height: 25%;width: 80%;background-color: #383838;color: #F5F5F5;font-size: 16px;font-style: italic;padding-left: 5%">
                <div style="width: 100%;height: 25%;padding-top: 5%">{{showingAlbum.key}}</div>
                <div style="width: 100%;height: 75%;position: relative;padding-top: 2%">
                  <img style="width: 25%;height: 75%;position: absolute" :src="showingAlbum.srcPath"/>
                  <div style="width: 75%;height: 75%;position: absolute;left: 30%">
                    <div style="color: #F5F5F5;font-size: 14px;height: 25%;font-style: italic">RELEASE：<span style="font-size: 12px">{{showingAlbum.release}}</span></div>
                    <div style="color: #F5F5F5;font-size: 14px;height: 25%;font-style: italic">DEVELOPER：<span style="font-size: 12px">{{showingAlbum.developer}}</span></div>
                    <div style="color: #F5F5F5;font-size: 14px;height: 25%;font-style: italic">PUBLISHER：<span style="font-size: 12px">{{showingAlbum.publisher}}</span></div>
                    <div style="color: #F5F5F5;font-size: 14px;height: 25%;font-style: italic">PLATFORM：<span style="font-size: 12px">{{showingAlbum.platform}}</span></div>
                  </div>
                </div>
              </div>
              <div v-if="!showLIST" class="selfDefineScroll" style="overflow-y: scroll;height: 75%;width: 80%;">
                <ul>
                  <li style="width: 100%;height: 33.3%" v-for="(item) in albums">
                    <div @click="albumsClick(item)" class="divBase imgDiv"
                         :style="{backgroundImage: `url(${item.srcPath})`}">
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            <div v-if="showLIST" class="divBase">
              <div class="selfDefineScroll" style="width: 100%;height: 80%;overflow-y: auto;">
                <div v-for="(item) in albumList" style="width: 50%;height: 27%;display: inline-block;position: relative;padding-left: 6%;margin-top: 2%;">
                  <img style="width: 25%;height: 100%;position: absolute" :src="item.img" />
                  <div style="width: 60%;height: 100%;position: absolute;left: 40%">
                    <div style="width: 100%;height: 20%;color: #BAB9B6;font-size: 16px;font-style: italic;">{{item.name}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 14px;font-style: italic;">DATE:{{item.date}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 14px;font-style: italic;">COMPANY:{{item.company}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 14px;font-style: italic;">PLATFORM:{{item.platform}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-style: italic;">
                      <a :href="item.link" :target="item.link.indexOf('http') != -1 ? '_blank' : '_self' ">EXPLORE&emsp;<i style="color: red" class="el-icon-top-right"></i></a>
                    </div>
                  </div>
                </div>

              </div>
              <div style="width: 70%;height: 20%;color: #F5F5F5;font-size: 16px;padding-top: 3.5%">
                <el-button @click="showMusic = true;showSFX = false;showLIST = false" class="buttonStyle" type="danger">
                  MUSIC
                </el-button>
                <el-button @click="showMusic = false;showSFX = true;showLIST = false" class="buttonStyle" type="danger">
                  SFX
                </el-button>
                <el-button @click="showMusic = false;showSFX = false;showLIST = true" class="buttonStyle" type="danger">
                  LIST
                </el-button>
              </div>
            </div>


          </td>
          <td style="height: 100%;width: 20%;padding-left: 2%">
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
    components: { toolbar, contacts, audioCom },
    data() {
      return {
        albums: [
          {
            key: 'MORNING',
            release: '20 Feb,2022',
            developer:'Wild Kid Games',
            publisher:'Indienova',
            platform:'IOS,Android,Stream,Switch',
            srcPath: 'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            albumDetailId: ''
          },
          {
            key: 'CLOCK',
            release: '19 Feb,2022',
            developer:'Wild Kid Games',
            publisher:'Indienova',
            platform:'IOS,Android,Stream,Switch',
            srcPath: 'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            albumDetailId: ''
          },
          {
            key: 'MORNING',
            release: '18 Feb,2022',
            developer:'Wild Kid Games',
            publisher:'Indienova',
            platform:'IOS,Android,Stream,Switch',
            srcPath: 'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            albumDetailId: ''
          },
          {
            key: 'CLOCK',
            release: '17 Feb,2022',
            developer:'Wild Kid Games',
            publisher:'Indienova',
            platform:'IOS,Android,Stream,Switch',
            srcPath: 'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            albumDetailId: ''
          },
          {
            key: 'MORNING',
            release: '16 Feb,2022',
            developer:'Wild Kid Games',
            publisher:'Indienova',
            platform:'IOS,Android,Stream,Switch',
            srcPath: 'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            albumDetailId: ''
          }
        ],
        albumDetail: {
          music: [
            {
              id:1,
              name: 'PAST IN THE DREAM',
              srcPath: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/10/29/29c_cjl/01.mp3'
            },
            {
              id:2,
              name: 'SEE WEIRD THINGS',
              srcPath: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/11/17/17k_tx/01.mp3'
            },
            {
              id:3,
              name: 'PAST IN THE DREAM',
              srcPath: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/11/17/17k_tx/01.mp3'
            },
            {
              id:4,
              name: 'SEE WEIRD THINGS',
              srcPath: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/10/29/29c_cjl/01.mp3'
            },
            {
              id:5,
              name: 'PAST IN THE DREAM',
              srcPath: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/11/17/17k_tx/01.mp3'
            },
            {
              id:6,
              name: 'SEE WEIRD THINGS',
              srcPath: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/10/29/29c_cjl/01.mp3'
            },
            {
              id:7,
              name: 'PAST IN THE DREAM',
              srcPath: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/11/17/17k_tx/01.mp3'
            },
            {
              id:8,
              name: 'SEE WEIRD THINGS',
              srcPath: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/10/29/29c_cjl/01.mp3'
            }
          ],
          video:[
            {
              name: 'SEE WEIRD THINGS_Video',
              srcPath: 'https://video.kekedj.com/video_kekedj_com/2021/202104/20210401/%E6%9C%80%E5%BC%BA%E7%94%B5%E9%9F%B3%E9%A5%95%E9%A4%AE%E7%9B%9B%E5%AE%B4-Alan%20Walker%20@%20Parookaville%20Festival%202019-%E8%89%BE%E4%BC%A6%E6%B2%83%E5%85%8B%E7%8E%B0%E5%9C%BA%E8%B6%85%E5%97%A8%E8%87%B3%E5%B0%8A%E6%94%B6%E8%97%8F%E7%89%88.mp4'
            }
          ]
        },
        albumList:[
          {
            id:1,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            name:'INFINITE LAGRANGE',
            date:'20 Jan,2022',
            company:'infinity',
            platform:'IOS,Android,Stream,Switch',
            link:'http://www.baidu.com'
          },
          {
            id:2,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            name:'INFINITE LAGRANGE',
            date:'20 Jan,2022',
            company:'infinity',
            platform:'IOS,Android,Stream,Switch',
            link:'/ourServices'
          },
          {
            id:3,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            name:'INFINITE LAGRANGE',
            date:'20 Jan,2022',
            company:'infinity',
            platform:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:4,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            name:'INFINITE LAGRANGE',
            date:'20 Jan,2022',
            company:'infinity',
            platform:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:5,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            name:'INFINITE LAGRANGE',
            date:'20 Jan,2022',
            company:'infinity',
            platform:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:6,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            name:'INFINITE LAGRANGE',
            date:'20 Jan,2022',
            company:'infinity',
            platform:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:7,
            img:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            name:'INFINITE LAGRANGE',
            date:'20 Jan,2022',
            company:'infinity',
            platform:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:8,
            img:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            name:'INFINITE LAGRANGE',
            date:'20 Jan,2022',
            company:'infinity',
            platform:'IOS,Android,Stream,Switch',
            link:''
          }
        ],
        showMusic: true,
        showSFX: false,
        showLIST: false,
        playingMusic:{},
        showingAlbum: {},
        musicTimes:[],
      }
    },
    created() {
      if (null != this.albums && this.albums.length > 0) {
        this.showingAlbum = this.albums[0]
      }
      this.playingMusic = this.albumDetail.music[0];
    },
    mounted(){
      for(let i = 0;i < this.musicTimes.length;i++){
        this.musicTimes[i].value = this.transTime(this.musicTimes[i].key);
      }
    },
    methods: {
      albumsClick(data) {
        this.showingAlbum = data;
      },

      musicItemClick(item){
        this.playingMusic = item;
        let that = this;
        window.setTimeout(function() {
          that.$refs.children.playAudio();
        },500);
      },

      transTime(value) {
          if(isNaN(value)){
            return "00:00";
          }
          let time = ''
          let h = parseInt(value / 3600)
          value %= 3600
          let m = parseInt(value / 60)
          m = m < 10 ? '0' + m : m
          let s = parseInt(value % 60)
          s = s < 10 ? '0' + s : s
          time = m + ':' + s
          return time
      },

      getDuration(refId){
        for(let i = 0;i < this.musicTimes.length;i++){
          if(this.musicTimes[i].key == refId){
            this.musicTimes[i].value = this.transTime(this.$refs[refId][0].duration);
          }
        }
      },

      addMusicId(refId){
        for(let i = 0;i < this.musicTimes.length;i++){
          if(this.musicTimes[i].key == refId){
            return;
          }
        }
        this.musicTimes.push({key:refId,value:""});
      },

      getMusicTime(key){
        for(let i = 0;i < this.musicTimes.length;i++){
          if(this.musicTimes[i].key == key){
            return this.musicTimes[i].value;
          }
        }
        return "00:00";
      },
    }
  }
</script>

<style scoped>
  .divBase {
    width: 100%;
    height: 100%;
  }

  .musicItem:hover{
    color: rgb(245, 245, 245)!important;
  }

  .imgDiv {
    background-size: cover;
    background-repeat: no-repeat;
  }

  .buttonStyle {
    padding: 5px 5px;
    margin-left: 10%
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

  audio {

  }
</style>
