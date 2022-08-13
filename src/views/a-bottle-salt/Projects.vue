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
                  <div class="BoldItalic" style="width: 100%;padding-top: 10%;">{{this.showingAlbum['title'+$store.getters.getLanguage]}}</div>
                </div>
                <div style="width: 100%;height: 60%;">
                  <div class="selfDefineScroll" style="overflow-y: auto;height: 85%;width: 80%;">
                    <ul>
                      <li style="width: 100%;height: 15%;" v-for="(item) in showAlbumMusic">
                        <div :ref="item.id+'_audio'" class="audioDiv" style="width: 100%;height :100%;display: none;max-height: 50px">
                          <audioCom style="background-color: #383838;margin-bottom: 5%" :ref="item.id+'_children'" :key="item.id" :fileUrl="item"></audioCom>
                        </div>

                        <div class="musicItem" :ref="item.id" @click="musicItemClick(item)" style="color: #8c939d;position: relative;padding-top: 2%;">
                          <span class="BoldItalic" style="font-size: 14px;">{{item.title}}</span>
                          <audio :src="item.url" v-show="false" :ref="item.title+item.id" controls @canplay="getDuration(item.title+item.id)">
                            <source type="audio/mpeg"/>
                          </audio>
                          <span class="BoldItalic" v-show="false" style="font-size: 14px;">
                            {{addMusicId(item.title+item.id)}}
                          </span>
                          <span class="BoldItalic" style="font-size: 14px;color: #8c939d;position: absolute;right: 1%">
                            {{getMusicTime(item.title+item.id)}}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div v-if="showSFX" style="position: relative;width: 100%;height: 80%;">
                <video :src="showAlbumVideo != undefined ? (showAlbumVideo[0] != undefined ? showAlbumVideo[0].url.replaceAll('\\','\/') : '') : ''" style="position: absolute;width: 80%;height: 80%;margin: 5% 5%;left: 4%;" controls>
                  <source type="video/mp4">
                </video>
              </div>
              <div style="width: 100%;height: 20%;color: #F5F5F5;font-size: 16px;padding-top: 5%">
                <el-button @click="clickMusic()" class="buttonStyle" type="danger">
                  <span class="BoldItalic">MUSIC</span>
                </el-button>
                <el-button @click="clickSfx()" class="buttonStyle" type="danger">
                  <span class="BoldItalic">SFX</span>
                </el-button>
                <el-button @click="showMusic = false;showSFX = false;showLIST = true" class="buttonStyle" type="danger">
                  <span class="BoldItalic">LIST</span>
                </el-button>
              </div>
            </div>

            <div v-if="!showLIST" style="height: 100%;width: 40%;display: inline-block;position: absolute">
              <div v-if="!showLIST" style="height: 25%;width: 80%;background-color: #383838;color: #F5F5F5;font-size: 16px;font-style: italic;padding-left: 5%">
                <div class="BoldItalic" style="width: 100%;height: 25%;padding-top: 5%">{{showingAlbum['title'+$store.getters.getLanguage]}}</div>
                <div style="width: 100%;height: 75%;position: relative;padding-top: 2%">
                  <img style="width: 25%;height: 75%;position: absolute" :src="undefined == showingAlbum.imgSrc ? '' : showingAlbum.imgSrc.replaceAll('\\','\/')"/>
                  <div class="BoldItalic" style="width: 75%;height: 75%;position: absolute;left: 30%">
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
                         :style="{backgroundImage: `url(${undefined == item.imgSrc ? '' : item.imgSrc.replaceAll('\\','\/')})`}">
                    </div>
                  </li>
                </ul>
              </div>

            </div>

            <div v-if="showLIST" class="divBase">
              <div class="selfDefineScroll" style="width: 100%;height: 80%;overflow-y: auto;">
                <div v-for="(item) in albumList" style="width: 50%;height: 27%;display: inline-block;position: relative;padding-left: 6%;margin-top: 2%;">
                  <img style="width: 25%;height: 100%;position: absolute" :src="item.url" />
                  <div class="BoldItalic" style="width: 60%;height: 100%;position: absolute;left: 40%">
                    <div style="width: 100%;height: 20%;color: #BAB9B6;font-size: 16px;font-style: italic;">{{item['title'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 14px;font-style: italic;">DATE:{{item['date'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 14px;font-style: italic;">COMPANY:{{item['company'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 14px;font-style: italic;">PLATFORM:{{item['platform'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-style: italic;">
                      <a class="linkHover" :href="item.link" :target="null != item.link ? (item.link.indexOf('http') != -1 ? '_blank' : '_self') : '_blank' "><span style="font-size: 13px">EXPLORE</span>&emsp;<i style="color: red" class="el-icon-top-right"></i></a>
                    </div>
                  </div>
                </div>

              </div>
              <div style="width: 70%;height: 20%;color: #F5F5F5;font-size: 16px;padding-top: 3.5%">
                <el-button @click="clickMusic()" class="buttonStyle" type="danger">
                  MUSIC
                </el-button>
                <el-button @click="clickSfx()" class="buttonStyle" type="danger">
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
        ],
        albumDetail: {
          music: [
          ],
          video:[
          ]
        },
        showAlbumMusic:[],
        showAlbumVideo:[],
        albumList:[
        ],
        showMusic: true,
        showSFX: false,
        showLIST: false,
        playingMusic:{},
        showingAlbum: {},
        musicTimes:[],
        showAudio:false,
        musicAlbum: [],
        videoAlbum: [],
      }
    },
    created() {
      if (null != this.albums && this.albums.length > 0) {
        this.showingAlbum = this.albums[0]
      }

      getAlbum().then(resp =>{
        if(resp.data.length > 0){
          //过滤出来音乐专辑
          for(let i = 0; i < resp.data.length;i++){
            if(resp.data[i].type == "音乐专辑"){
              this.musicAlbum.push(resp.data[i]);
            }else{
              this.videoAlbum.push(resp.data[i]);
            }
          }
          this.albums = this.musicAlbum;
          this.showingAlbum = this.albums[0];
          //默认显示第一张专辑下面的音乐
          let id = this.albums[0].id;
          getProject(id).then(resp =>{
            resp = resp.data;
            if(resp.length > 0){
              let musicList = [];
              for(let i = 0;i < resp.length;i++){
                musicList.push(resp[i]);
              }
              this.showAlbumMusic = musicList;
              //样式补全
              this.fullStyle(0);
              this.musicItemClick(this.showAlbumMusic);
            }
          });
          //获取视频专辑的视频
          let vId = this.videoAlbum[0].id;
          getProject(vId).then(resp =>{
            resp = resp.data;
            if(resp.length > 0){
              let videoList = [];
              for(let i = 0;i < resp.length;i++){
                videoList.push(resp[i]);
              }
              this.showAlbumVideo = videoList;
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
    },
    methods: {
      fullStyle(index){
        let that = this;
        window.setTimeout(function() {
          let audioDiv = document.getElementsByClassName("audioDiv");
          let musicItem = document.getElementsByClassName("musicItem");
          if(audioDiv.length > 0 && musicItem.length > 0) {
            audioDiv[0].style.display = 'block';
            musicItem[0].style.display = 'none';
          }

          for(let i = 0;i < that.albums.length;i++){
            if(i != 0) {
              that.$refs["imgDiv_" + i][0].style.filter = "grayscale(1)";
            }
          }
          for(let i = 0;i < that.albums.length;i++){
            if(i != index) {
              that.$refs["imgDiv_" + i][0].style.filter = "grayscale(1)";
            }else{
              that.$refs["imgDiv_" + i][0].style.filter = "grayscale(0)";
            }
          }
        },100);
      },

      clickMusic(){
        this.showMusic = true;this.showSFX = false;this.showLIST = false
        this.albums = this.musicAlbum;
        this.showingAlbum = this.albums[0];
        this.albumsClick(this.albums[0],0);
        this.musicItemClick(this.showAlbumMusic);
      },
      clickSfx(){
        this.showMusic = false;this.showSFX = true;this.showLIST = false;
        this.albums = this.videoAlbum;
        this.showingAlbum = this.albums[0];
        this.albumsClick(this.albums[0],0);
      },

      albumsClick(data,index) {
        this.showingAlbum = data;
        let id = data.id;
        getProject(id).then(resp =>{
          resp = resp.data;
          if(resp.length > 0){
            let musicList = [];
            let videoList = [];
            for(let i = 0;i < resp.length;i++){
              if(resp[i].type == 0){
                musicList.push(resp[i]);
                this.showAlbumVideo = [];
              }else{
                videoList.push(resp[i]);
                this.showAlbumMusic = [];
              }
            }
            this.showAlbumMusic = musicList;
            this.showAlbumVideo = videoList;
            this.musicItemClick(this.showAlbumMusic);
            this.fullStyle(index);
          }else{
            this.showAlbumMusic = [];
            this.showAlbumVideo = [];
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
        if(this.$refs[item.id+"_audio"]) {
          this.$refs[item.id + "_audio"][0].style.display = 'block';
        }
        if(this.$refs[item.id]) {
          this.$refs[item.id][0].style.display = 'none';
        }

        for(let i = 0;i < this.showAlbumMusic.length;i++){
          let pauseItem = this.showAlbumMusic[i].id;
          if(undefined != this.$refs[pauseItem+"_children"] && this.$refs[pauseItem+"_children"].length > 0) {
            this.$refs[pauseItem + "_children"][0].pauseAudio();
          }
        }
        if(undefined != this.$refs[item.id+"_children"] && this.$refs[item.id+"_children"].length > 0) {
          this.$refs[item.id + "_children"][0].playAudio();
        }
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

      getMusicTime(refId){
        for(let i = 0;i < this.musicTimes.length;i++){
          if(this.musicTimes[i].key == refId){
            return this.musicTimes[i].value;
          }
        }
        return "00:00";
      },
    }
  }
</script>

<style scoped>
  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic
  }

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
