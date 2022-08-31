<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">
    <div style="width: 90rem;height: 10%;">
      <toolbar></toolbar>
    </div>

    <div style="height: 90%;width: 90rem;">
      <table class="divBase">
        <tr >
          <td style="height: 100%;width: 80%;position: relative">
            <div v-if="!showLIST" style="height: 100%;width: 60%;display: inline-block;">
              <div v-if="showMusic" style="width: 100%;height: 80%;position: relative">
                <div style="width: 100%;height: 30%;color: #F5F5F5;font-size: 2.625rem;position: absolute;left: 7rem;top: 4rem">
                  <div class="BoldItalic" style="width: 100%;">{{this.showingAlbum['title'+$store.getters.getLanguage]}}</div>
                </div>
                <div style="width: 100%;height: 60%;position: absolute;left: 7rem;top: 10rem">
                  <div class="selfDefineScroll" style="overflow-y: auto;height: 85%;width: 80%;">
                    <ul>
                      <li style="width: 100%;height: 12%;position: relative" v-for="(item) in showAlbumMusic">
                        <div style="width: 100%;height: 100%;position: absolute;top: 0rem">
                          <div :ref="item.id+'_audio'" class="audioDiv" style="width: 100%;height :100%;display: none;">
                            <audioCom :ref="item.id+'_children'" :key="item.id" :fileUrl="item"></audioCom>
                          </div>

                          <div class="musicItem" :ref="item.id" @click="musicItemClick(item)" style="color: #8c939d;position: relative;margin-top: 1.25rem;font-size: 0.875rem">
                            <span class="BoldItalic">{{item.title}}</span>
                            <audio :src="item.url" v-show="false" :ref="item.title+item.id" controls @canplay="getDuration(item.title+item.id)">
                              <source type="audio/mpeg"/>
                            </audio>
                            <span class="BoldItalic" v-show="false">
                              {{addMusicId(item.title+item.id)}}
                            </span>
                            <span class="BoldItalic" style="color: #8c939d;position: absolute;right: 0.5rem">
                              {{getMusicTime(item.title+item.id)}}
                            </span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div v-if="showSFX" style="position: relative;width: 100%;height: 80%;">
                <video :src="showAlbumVideo != undefined ? (showAlbumVideo[0] != undefined ? showAlbumVideo[0].url.replaceAll('\\','\/') : '') : ''"
                       style="position: absolute;width: 50rem;height: 80%;top: 3rem;object-fit: fill;" controls>
                  <source type="video/mp4">
                </video>
              </div>

              <div style="width: 100%;height: 20%;color: #E3E1DB;font-size: 1rem;padding-top: 1rem">
                <el-button style="margin-left: 7rem;" @click="clickMusic(0)" class="buttonStyle anation" type="danger">
                  <span style="font-size: 0.875rem;" class="BoldItalic">MUSIC</span>
                </el-button>
                <el-button style="margin-left: 2.75rem;" @click="clickSfx(1)" class="buttonStyle anation" type="danger">
                  <span style="font-size: 0.875rem;" class="BoldItalic">SFX</span>
                </el-button>
                <el-button style="margin-left: 2.75rem;" @click="clickList(2)" class="buttonStyle anation" type="danger">
                  <span style="font-size: 0.875rem;" class="BoldItalic">LIST</span>
                </el-button>
              </div>

            </div>

            <div v-if="!showLIST" style="height: 100%;width: 40%;display: inline-block;position: absolute;left: 50rem;">
              <div v-if="!showLIST" style="height: 25%;width: 90%;background-color: #383838;color: #F5F5F5;font-size: 16px;font-style: italic;padding-left: 1.5rem">
                <div class="BoldItalic" style="width: 100%;height: 25%;padding-top: 5%">{{showingAlbum['title'+$store.getters.getLanguage]}}</div>
                <div style="width: 100%;height: 75%;position: relative;padding-top: 2%">
                  <img style="width: 30%;height: 70%;position: absolute" :src="undefined == showingAlbum.imgSrc ? '' : showingAlbum.imgSrc.replaceAll('\\','\/')"/>
                  <div class="BoldItalic" style="width: 75%;height: 75%;position: absolute;left: 40%">
                    <div style="color: #F5F5F5;font-size: 14px;height: 24%;font-style: italic">RELEASE：<span style="font-size: 12px">{{showingAlbum['release'+$store.getters.getLanguage]}}</span></div>
                    <div style="color: #F5F5F5;font-size: 14px;height: 24%;font-style: italic">DEVELOPER：<span style="font-size: 12px">{{showingAlbum['developer'+$store.getters.getLanguage]}}</span></div>
                    <div style="color: #F5F5F5;font-size: 14px;height: 24%;font-style: italic">PUBLISHER：<span style="font-size: 12px">{{showingAlbum['publisher'+$store.getters.getLanguage]}}</span></div>
                    <div style="color: #F5F5F5;font-size: 14px;height: 24%;font-style: italic">PLATFORM：<span style="font-size: 12px">{{showingAlbum['platform'+$store.getters.getLanguage]}}</span></div>
                  </div>
                </div>
              </div>
              <div v-if="!showLIST" class="selfDefineScroll" style="overflow-y: scroll;height: 75%;width: 90%;">
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
                <div v-for="(item) in albumList" style="width: 50%;height: 27%;display: inline-block;position: relative;padding-left: 7rem;margin-top: 2%;">
                  <img style="width: 24.5%;height: 80%;position: absolute" :src="item.url" />
                  <div class="BoldItalic" style="width: 49%;height: 100%;position: absolute;left: 18rem">
                    <div style="font-weight: 500;width: 100%;height: 16.5%;color: #BAB9B6;font-size: 1.125rem;font-style: italic;">{{item['title'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 15%;color: rgb(140 140 140);font-size: 0.875rem;font-style: italic;">DATE:{{item['date'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 15%;color: rgb(140 140 140);font-size: 0.875rem;font-style: italic;">COMPANY:{{item['company'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-size: 0.875rem;font-style: italic;">PLATFORM:{{item['platform'+$store.getters.getLanguage]}}</div>
                    <div style="width: 100%;height: 20%;color: rgb(140 140 140);font-style: italic;">
                      <a class="linkHover" :href="item.link" :target="null != item.link ? (item.link.indexOf('http') != -1 ? '_blank' : '_self') : '_blank' "><span style="font-size: 0.75rem">EXPLORE</span>&emsp;<i style="color: #F24E1E;font-size: 1.2rem;font-weight: 900" class="el-icon-top-right"></i></a>
                    </div>
                  </div>
                </div>

              </div>
              <div class="BoldItalic" style="width: 70%;height: 20%;color: #E3E1DB;font-size: 1rem;padding-top: 1rem">
                <el-button style="margin-left: 7rem;" @click="clickMusic(0)" class="buttonStyle anation" type="danger">
                  <span style="font-size: 0.875rem;" class="BoldItalic">MUSIC</span>
                </el-button>
                <el-button style="margin-left: 2.75rem;" @click="clickSfx(1)" class="buttonStyle anation" type="danger">
                  <span style="font-size: 0.875rem;" class="BoldItalic">SFX</span>
                </el-button>
                <el-button style="margin-left: 2.75rem;" @click="clickList(2)" class="buttonStyle anation" type="danger">
                  <span style="font-size: 0.875rem;" class="BoldItalic">LIST</span>
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
    watch:{
      "$store.state.fontFamily.maxHeight":function() {
        this.$refs.alignCenter.style.maxHeight = this.$store.getters.geMaxHeight+'px';
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
      let elements = document.getElementsByClassName("buttonStyle");
      elements[0].style.backgroundColor = "#BE4123";
      elements[0].classList.remove("anation");
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
      buttonStyle(index){
        window.setTimeout(function() {
          let elements = document.getElementsByClassName("buttonStyle");
          for(let i = 0;i < 3;i++){
            if(i == index) {
              elements[i].style.backgroundColor = "#BE4123";
              if(elements[i].classList.contains("anation")){
                elements[i].classList.remove("anation");
              }
            }else{
              elements[i].style.backgroundColor = "unset";
              if(!elements[i].classList.contains("anation")){
                elements[i].classList.add("anation");
              }
            }
          }
        },100);
      },

      clickMusic(index){
        this.showMusic = true;this.showSFX = false;this.showLIST = false
        this.albums = this.musicAlbum;
        this.showingAlbum = this.albums[0];
        this.albumsClick(this.albums[0],0);
        this.musicItemClick(this.showAlbumMusic);
        this.buttonStyle(index);
      },
      clickSfx(index){
        this.showMusic = false;this.showSFX = true;this.showLIST = false;
        this.albums = this.videoAlbum;
        this.showingAlbum = this.albums[0];
        this.albumsClick(this.albums[0],0);
        this.buttonStyle(index);
      },
      clickList(index){
        this.showMusic = false;
        this.showSFX = false;
        this.showLIST = true
        this.buttonStyle(index);
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
          audioDiv[i].parentElement.parentElement.style.marginTop = '0rem';
        }
        let musicItem = document.getElementsByClassName("musicItem");
        for(let i = 0;i < musicItem.length;i++){
          musicItem[i].style.display = 'block';
        }
        if(this.$refs[item.id+"_audio"]) {
          this.$refs[item.id + "_audio"][0].style.display = 'block';
          if(this.$refs[item.id + "_audio"][0].parentElement.parentElement.parentElement.firstChild !== this.$refs[item.id+"_audio"][0].parentElement.parentElement) {
            this.$refs[item.id + "_audio"][0].parentElement.parentElement.style.marginTop = '1rem';
          }
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

  .alignCenter{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    min-width: 1100px;
    min-height: 687px;
  }

  >>>.el-button--danger{
    background-color: unset;
    border: none;
    color: #E3E1DB;
  }

  .anation:hover {
    animation: change 1s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }

  @keyframes change {
    0% {
      color: rgba(189,187,183,0.1)
    }
    30%{
      color:rgba(248,197,182,0.3)
    }
    50% {
      color: rgba(247,149,123,0.5)
    }
    80% {
      color: rgba(255,101,59,0.8)
    }
    100% {color: rgba(248,81,35,1);}
  }

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

  .imgDiv:hover {
    filter: grayscale(0)!important;
  }

  .buttonStyle {
    padding: 5px 5px;
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
