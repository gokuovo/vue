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
                  <div style="width: 100%;padding-top: 10%;font-style: italic">{{this.showingAlbum['title'+$store.getters.getLanguage]}}</div>
                </div>
                <div style="width: 100%;height: 60%;">
                  <div class="selfDefineScroll" style="overflow-y: auto;height: 85%;width: 80%;">
                    <ul>
                      <li style="width: 100%;height: 15%;" v-for="(item) in albumDetail.music">
                        <div :ref="item.id+'_audio'" class="audioDiv" style="width: 100%;height :100%;display: none;max-height: 50px">
                          <audioCom style="background-color: #383838;margin-bottom: 5%" :ref="item.id+'_children'" :key="item.id" :fileUrl="item"></audioCom>
                        </div>

                        <div class="musicItem" :ref="item.id" @click="musicItemClick(item)" style="color: #8c939d;position: relative;padding-top: 2%;">
                          <span style="font-size: 14px;font-style: italic">{{item.title}}</span>
                          <audio v-show="false" :ref="item.title+item.id" controls @canplay="getDuration(item.title+item.id)">
                            <source :src="item.url" type="audio/mpeg"/>
                          </audio>
                          <span v-show="false" style="font-size: 14px;font-style: italic">
                            {{addMusicId(item.title+item.id)}}
                          </span>
                          <span style="font-size: 14px;font-style: italic;color: #8c939d;position: absolute;right: 1%">
                            {{getMusicTime(item.title+item.id)}}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-if="showSFX" style="position: relative;width: 100%;height: 80%;">
                <video style="position: absolute;width: 80%;height: 80%;margin: 5% 5%;left: 4%;" controls>
                  <source :src="albumDetail.video[0].url"  type="video/mp4">
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
                <div style="width: 100%;height: 25%;padding-top: 5%">{{showingAlbum['title'+$store.getters.getLanguage]}}</div>
                <div style="width: 100%;height: 75%;position: relative;padding-top: 2%">
                  <img style="width: 25%;height: 75%;position: absolute" :src="showingAlbum['imgSrc'+$store.getters.getLanguage]"/>
                  <div style="width: 75%;height: 75%;position: absolute;left: 30%">
                    <div style="color: #F5F5F5;font-size: 14px;height: 25%;font-style: italic">RELEASE：<span style="font-size: 12px">{{showingAlbum['release'+$store.getters.getLanguage]}}</span></div>
                    <div style="color: #F5F5F5;font-size: 14px;height: 25%;font-style: italic">DEVELOPER：<span style="font-size: 12px">{{showingAlbum['developer'+$store.getters.getLanguage]}}</span></div>
                    <div style="color: #F5F5F5;font-size: 14px;height: 25%;font-style: italic">PUBLISHER：<span style="font-size: 12px">{{showingAlbum['publisher'+$store.getters.getLanguage]}}</span></div>
                    <div style="color: #F5F5F5;font-size: 14px;height: 25%;font-style: italic">PLATFORM：<span style="font-size: 12px">{{showingAlbum['platform'+$store.getters.getLanguage]}}</span></div>
                  </div>
                </div>
              </div>
              <div v-if="!showLIST" class="selfDefineScroll" style="overflow-y: scroll;height: 75%;width: 80%;">
                <ul>
                  <li style="width: 100%;height: 33.3%" v-for="(item,index) in albums">
                    <div :ref="'imgDiv_'+index" @click="albumsClick(item,index)" class="divBase imgDiv"
                         :style="{backgroundImage: `url(${item['imgSrc'+$store.getters.getLanguage]})`}">
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            <div v-if="showLIST" class="divBase">
              <div class="selfDefineScroll" style="width: 100%;height: 80%;overflow-y: auto;">
                <div v-for="(item) in albumList" style="width: 50%;height: 27%;display: inline-block;position: relative;padding-left: 6%;margin-top: 2%;">
                  <img style="width: 25%;height: 100%;position: absolute" :src="item.url" />
                  <div style="width: 60%;height: 100%;position: absolute;left: 40%">
                    <div style="width: 100%;height: 20%;color: #BAB9B6;font-size: 16px;font-style: italic;">{{item['title'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 14px;font-style: italic;">DATE:{{item['date'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 14px;font-style: italic;">COMPANY:{{item['company'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 14px;font-style: italic;">PLATFORM:{{item['platform'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-style: italic;">
                      <a class="linkHover" :href="item.link" :target="item.link.indexOf('http') != -1 ? '_blank' : '_self' "><span style="font-size: 13px">EXPLORE</span>&emsp;<i style="color: red" class="el-icon-top-right"></i></a>
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

  import {getAlbum,getProject,getList} from './requestScript/Project'

  export default {
    name: 'Projects',
    components: { toolbar, contacts, audioCom },
    data() {
      return {
        albums: [
          {
            titleEn: 'MORNING',
            releaseEn: '20 Feb,2022',
            developerEn:'Wild Kid Games',
            publisherEn:'Indienova',
            platformEn:'IOS,Android,Stream,Switch',
            imgSrcEn: 'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            id: '1'
          },
          {
            titleEn: 'CLOCK',
            releaseEn: '19 Feb,2022',
            developerEn:'Wild Kid Games',
            publisherEn:'Indienova',
            platformEn:'IOS,Android,Stream,Switch',
            imgSrcEn: 'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            id: '2'
          },
          {
            titleEn: 'MORNING',
            releaseEn: '18 Feb,2022',
            developerEn:'Wild Kid Games',
            publisherEn:'Indienova',
            platformEn:'IOS,Android,Stream,Switch',
            imgSrcEn: 'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            id: '3'
          },
          {
            titleEn: 'CLOCK',
            releaseEn: '17 Feb,2022',
            developerEn:'Wild Kid Games',
            publisherEn:'Indienova',
            platformEn:'IOS,Android,Stream,Switch',
            imgSrcEn: 'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            id: '4'
          },
          {
            titleEn: 'MORNING',
            releaseEn: '16 Feb,2022',
            developerEn:'Wild Kid Games',
            publisherEn:'Indienova',
            platformEn:'IOS,Android,Stream,Switch',
            imgSrcEn: 'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            id: '5'
          }
        ],
        albumDetail: {
          music: [
            {
              id:1,
              title: 'PAST IN THE DREAM',
              url: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/10/29/29c_cjl/01.mp3'
            },
            {
              id:2,
              title: 'SEE WEIRD THINGS',
              url: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/11/17/17k_tx/01.mp3'
            },
            {
              id:3,
              title: 'PAST IN THE DREAM',
              url: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/11/17/17k_tx/01.mp3'
            },
            {
              id:4,
              title: 'SEE WEIRD THINGS',
              url: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/10/29/29c_cjl/01.mp3'
            },
            {
              id:5,
              title: 'PAST IN THE DREAM',
              url: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/11/17/17k_tx/01.mp3'
            },
            {
              id:6,
              title: 'SEE WEIRD THINGS',
              url: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/10/29/29c_cjl/01.mp3'
            },
            {
              id:7,
              title: 'PAST IN THE DREAM',
              url: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/11/17/17k_tx/01.mp3'
            },
            {
              id:8,
              title: 'SEE WEIRD THINGS',
              url: 'https://96.f.1ting.com/local_to_cube_202004121813/96kmp3/2021/10/29/29c_cjl/01.mp3'
            }
          ],
          video:[
            {
              title: 'SEE WEIRD THINGS_Video',
              url: 'https://video.kekedj.com/video_kekedj_com/2021/202104/20210401/%E6%9C%80%E5%BC%BA%E7%94%B5%E9%9F%B3%E9%A5%95%E9%A4%AE%E7%9B%9B%E5%AE%B4-Alan%20Walker%20@%20Parookaville%20Festival%202019-%E8%89%BE%E4%BC%A6%E6%B2%83%E5%85%8B%E7%8E%B0%E5%9C%BA%E8%B6%85%E5%97%A8%E8%87%B3%E5%B0%8A%E6%94%B6%E8%97%8F%E7%89%88.mp4'
            }
          ]
        },
        albumList:[
          {
            id:1,
            url:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            titleEn:'INFINITE LAGRANGE',
            dateEn:'20 Jan,2022',
            companyEn:'infinity',
            platformEn:'IOS,Android,Stream,Switch',
            link:'http://www.baidu.com'
          },
          {
            id:2,
            url:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            titleEn:'INFINITE LAGRANGE',
            dateEn:'20 Jan,2022',
            companyEn:'infinity',
            platformEn:'IOS,Android,Stream,Switch',
            link:'/ourServices'
          },
          {
            id:3,
            url:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            titleEn:'INFINITE LAGRANGE',
            dateEn:'20 Jan,2022',
            companyEn:'infinity',
            platformEn:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:4,
            url:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            titleEn:'INFINITE LAGRANGE',
            dateEn:'20 Jan,2022',
            companyEn:'infinity',
            platformEn:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:5,
            url:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            titleEn:'INFINITE LAGRANGE',
            dateEn:'20 Jan,2022',
            companyEn:'infinity',
            platformEn:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:6,
            url:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            titleEn:'INFINITE LAGRANGE',
            dateEn:'20 Jan,2022',
            companyEn:'infinity',
            platformEn:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:7,
            url:'https://img2.baidu.com/it/u=1881155221,3484897707&fm=253&fmt=auto&app=138&f=JPEG?w=790&h=444',
            titleEn:'INFINITE LAGRANGE',
            dateEn:'20 Jan,2022',
            companyEn:'infinity',
            platformEn:'IOS,Android,Stream,Switch',
            link:''
          },
          {
            id:8,
            url:'https://img1.baidu.com/it/u=3098127009,1379997600&fm=253&fmt=auto&app=138&f=JPEG?w=1179&h=500',
            titleEn:'INFINITE LAGRANGE',
            dateEn:'20 Jan,2022',
            companyEn:'infinity',
            platformEn:'IOS,Android,Stream,Switch',
            link:''
          }
        ],
        showMusic: true,
        showSFX: false,
        showLIST: false,
        playingMusic:{},
        showingAlbum: {},
        musicTimes:[],
        showAudio:false,
      }
    },
    created() {
      if (null != this.albums && this.albums.length > 0) {
        this.showingAlbum = this.albums[0]
      }

      getAlbum().then(resp =>{
        if(resp.data.length > 0){
          this.albums = resp.data;
          this.showingAlbum = this.albums[0];
          //默认显示第一张专辑下面的音乐和视频
          let id = this.albums[0].id;
          getProject(id).then(resp =>{
            resp = resp.data;
            if(resp.length > 0){
              let musicList = [];
              let videoList = [];
              for(let i = 0;i < resp.length;i++){
                if(resp[i].type == 0){
                  musicList.push(resp[i]);
                }else{
                  videoList.push(resp[i]);
                }
              }
              this.albumDetail.music = musicList;
              this.albumDetail.video = videoList;
            }
          });
        }
      });

      getList().then(resp =>{
        if(resp.data.length > 0){
          this.albumList = resp.data;
        }
      });
    },
    mounted(){
      for(let i = 0;i < this.musicTimes.length;i++){
        this.musicTimes[i].value = this.transTime(this.musicTimes[i].key);
      }
      let audioDiv = document.getElementsByClassName("audioDiv");
      let musicItem = document.getElementsByClassName("musicItem");
      if(audioDiv.length > 0 && musicItem.length > 0) {
        audioDiv[0].style.display = 'block';
        musicItem[0].style.display = 'none';
      }

      for(let i = 0;i < this.albums.length;i++){
        if(i != 0) {
          this.$refs["imgDiv_" + i][0].style.filter = "grayscale(1)";
        }
      }

    },
    methods: {
      albumsClick(data,index) {
        this.showingAlbum = data;
        for(let i = 0;i < this.albums.length;i++){
          if(i != index) {
            this.$refs["imgDiv_" + i][0].style.filter = "grayscale(1)";
          }else{
            this.$refs["imgDiv_" + i][0].style.filter = "grayscale(0)";
          }
        }

        let id = data.id;
        getProject(id).then(resp =>{
          resp = resp.data;
          if(resp.length > 0){
            let musicList = [];
            let videoList = [];
            for(let i = 0;i < resp.length;i++){
              if(resp[i].type == 0){
                musicList.push(resp[i]);
              }else{
                videoList.push(resp[i]);
              }
            }
            this.albumDetail.music = musicList;
            this.albumDetail.video = videoList;
          }
        });
      },

      musicItemClick(item){
        let audioDiv = document.getElementsByClassName("audioDiv");
        for(let i = 0;i < audioDiv.length;i++){
          audioDiv[i].style.display = 'none';
        }
        let musicItem = document.getElementsByClassName("musicItem");
        for(let i = 0;i < musicItem.length;i++){
          musicItem[i].style.display = 'block';
        }
        this.$refs[item.id+"_audio"][0].style.display = 'block';
        this.$refs[item.id][0].style.display = 'none';

        for(let i = 0;i < this.albumDetail.music.length;i++){
          let pauseItem = this.albumDetail.music[i].id;
          this.$refs[pauseItem+"_children"][0].pauseAudio();
        }
        this.$refs[item.id+"_children"][0].playAudio();
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

  .linkHover:hover{
    background-color:rgba(115,178,230,0.4);
    border: #0a76a4 1px solid;
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
    width: 5px !important;
    height: 5px !important;
    background-color: #b5b1b1;
  }

  .selfDefineScroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: black;

  }

  .selfDefineScroll::-webkit-scrollbar-thumb {
    opacity: 0.8;
    height: 20px;
    background: #d1d8e6;
    border-radius: 19px;
    border: 2px solid transparent;
    background-clip: content-box;
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
