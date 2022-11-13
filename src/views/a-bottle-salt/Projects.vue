<template>
  <div ref="alignCenter" class="alignCenter" style="width: 90rem;height: 100%">
    <div ref="backGroundBox" class="box">
      <div class="image-wrap">
        <div class="image" :style="{backgroundImage: `url(${firstImg})`}"></div>
      </div>
    </div>

    <div style="width: 90rem;height: 10%;">
      <toolbar></toolbar>
    </div>

    <div v-loading="loading"
         element-loading-background="rgba(0, 0, 0, 0.85)"
         style="height: 90%;width: 90rem;">

      <div v-if="!showLIST && showMusic" class="BoldItalic" style="color: #E3E1DB;font-size: 2.625rem;width: 31.62rem;height: 3.43rem;position: absolute;left: 6rem;top: 11rem;">
        {{this.showingAlbum['title'+$store.getters.getLanguage]}}
      </div>

      <div v-if="!showLIST && showMusic" style="width: 31.62rem;height: 28.8rem;position: absolute;left: 6rem;top: 16.31rem">

        <div class="selfDefineScroll" style="overflow-y: auto;overflow-x: hidden;height: 100%;width: 100%;">
          <ul>
            <li style="width: 31.62rem;height: 2.375rem;" v-for="(item) in showAlbumMusic">
              <div style="width: 100%;height: 100%;position: relative">
                <div :ref="item.id+'_audio'" class="audioDiv" style="width: 100%;height :100%;display: none;">
                  <audioCom :class="item.id+'_children'" :ref="item.id+'_children'" :key="item.id" :fileUrl="item"></audioCom>
                </div>

                <div class="musicItem" :ref="item.id" @click="musicItemClick(item)"
                     style="color: #E3E1DB;position: absolute;font-size: 0.875rem;height: 1.125rem;width: 31.62rem;bottom: 0rem">
                  <span class="BoldItalic">{{item.title}}</span>
                  <audio :src="item.url" v-show="false" :ref="item.title+item.id" controls @canplay="getDuration(item.title+item.id)">
                    <source type="audio/mpeg"/>
                  </audio>
                  <span class="BoldItalic" v-show="false">
                    {{addMusicId(item.title+item.id)}}
                  </span>
                  <span class="iterFont" style="position: absolute;right: 0.75rem">
                    {{getMusicTime(item.title+item.id)}}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>

      <div v-if="showSFX" style="position: relative;width: 100%;height: 80%;">
        <video :src="showAlbumVideo != undefined ? (showAlbumVideo[0] != undefined ? showAlbumVideo[0].url.replaceAll('\\','\/') : '') : ''"
               style="position: absolute;width: 45.75rem;height: 24.875em;top: 10.06rem;object-fit: fill;" controls>
          <source type="video/mp4">
        </video>
      </div>

      <div v-if="!showLIST" style="width: 100%;height: 1.875rem;color: #E3E1DB;font-size: 1rem;position: absolute;bottom: 5rem;left: 6rem">
        <el-button @click="clickMusic(0)" class="buttonStyle anation buttonStyle1" type="danger">
          <span style="font-size: 0.875rem;width: 4.785714285714286em;height: 2.142857142857143em" class="BoldItalic">MUSIC</span>
        </el-button>
        <el-button style="margin-left: 1.4285714285714286em;" @click="clickSfx(1)" class="buttonStyle anation buttonStyle2" type="danger">
          <span style="font-size: 0.875rem;width: 4.785714285714286em;height: 2.142857142857143em" class="BoldItalic">SFX</span>
        </el-button>
        <el-button style="margin-left: 1.4285714285714286em;" @click="clickList(2)" class="buttonStyle anation buttonStyle2" type="danger">
          <span style="font-size: 0.875rem;width: 4.785714285714286em;height: 2.142857142857143em" class="BoldItalic">LIST</span>
        </el-button>
      </div>

      <div v-if="!showLIST" style="height: 50em;width: 31.625em;display: inline-block;position: absolute;left: 45.75em;top: 7.4375rem;">
        <div v-if="!showLIST" style="height: 12.5rem;width: 31.625rem;background-color: #252525;color: #E3E1DB;font-size: 1rem;font-style: italic;padding-left: 1.5rem">
          <div class="BoldItalic" style="width: 100%;height: 1.4375rem;padding-top: 1.25rem">{{showingAlbum['title'+$store.getters.getLanguage]}}</div>
          <div style="width: 100%;height: 75%;position: relative;padding-top: 2.875rem">
            <img v-if="showSFX || showMusic" src="../../assets/images/videoPlay.png" style="width: 1.875rem;height: 1.875rem;position: absolute;z-index: 2;left: 2.1875rem;top: 5.06rem;">
            <img style="width: 6.25rem;height: 6.25rem;position: absolute;font-size: 1rem;object-fit: cover;" :src="undefined == showingAlbum.imgSrc ? '' : showingAlbum.imgSrc.replaceAll('\\','\/')"/>
            <div class="BoldItalic" style="width: 7.1rem;height: 7.1rem;position: absolute;left: 8rem">
              <div style="font-weight:100;opacity: 0.8;color: #E3E1DB;font-size: 0.875rem;height: 1.125rem;width: 33.5rem;font-style: italic;margin-bottom: 0.625rem;letter-spacing: 0.8px">RELEASE：<span style="letter-spacing: 0.8px;font-size: 0.875rem">{{showingAlbum['release'+$store.getters.getLanguage]}}</span></div>
              <div style="font-weight:100;opacity: 0.8;color: #E3E1DB;font-size: 0.875rem;height: 1.125rem;width: 33.5rem;font-style: italic;margin-bottom: 0.625rem;letter-spacing: 0.8px">DEVELOPER：<span style="letter-spacing: 0.8px;font-size: 0.875rem">{{showingAlbum['developer'+$store.getters.getLanguage]}}</span></div>
              <div style="font-weight:100;letter-spacing: 0.8px;opacity: 0.8;color: #E3E1DB;font-size: 0.875rem;height: 1.125rem;width: 33.5rem;font-style: italic;margin-bottom: 0.625rem">PUBLISHER：<span style="letter-spacing: 0.8px;font-size: 0.875rem">{{showingAlbum['publisher'+$store.getters.getLanguage]}}</span></div>
              <div style="font-weight:100;letter-spacing: 0.8px;opacity: 0.8;color: #E3E1DB;font-size: 0.875rem;height: 1.125rem;width: 33.5rem;font-style: italic;">PLATFORM：<span style="letter-spacing: 0.8px;font-size: 0.875rem">{{showingAlbum['platform'+$store.getters.getLanguage]}}</span></div>
            </div>
          </div>
        </div>

        <div v-if="!showLIST" style="height: 37.5rem;width: 33.06rem;">
          <vue-custom-scrollbar ref="childScrollbar" class="scroll-area musicList" :settings="settings" style="height: 37.5rem;width: 33.06rem;">
            <ul>
              <li style="width: 31.625rem;height: 12.5rem;position: relative" v-for="(item,index) in albums">
                <div :ref="'imgDiv_'+index" @click="albumsClick(item,index)" class="divBase imgDiv" @mouseout="imgDivOut($event)" @mouseover="imgDivOver($event)"
                     :style="{
                     background:`linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${undefined == item.imgSrc ? '' : item.imgSrc.replaceAll('\\','\/')}) no-repeat`
                     }">
                </div>
                <div class="titleFont" style="position: absolute;height: 1.43rem;top: 1.25rem;left: 1.875rem">
                  {{item['title'+$store.getters.getLanguage]}}
                </div>
                <div class="titleDateFont" style="position: absolute;height: 1.43rem;top: 3.3rem;left: 1.875rem">
                  {{item['release'+$store.getters.getLanguage]}}
                </div>
              </li>
            </ul>
          </vue-custom-scrollbar>
        </div>

      </div>

      <div v-if="showLIST" class="divBase">

        <div style="width: 78rem;height: 40rem;">
          <vue-custom-scrollbar ref="childScrollbar2" class="scroll-area justList" :settings="settings" style="width: 78rem;height: 40rem;">
            <div v-for="(item) in albumList"
                 style="width: 31.625rem;height: 8.75rem;display: inline-block;position: relative;margin-left: 6rem;margin-top: 4.125rem;">
              <img style="width: 8.75rem;height: 8.75rem;position: absolute" :src="item.url" />

              <div class="BoldItalic" style="width: 49%;height: 8.75rem;position: absolute;left: 10.625rem;font-family: DIN-BoldItalic">
                <div style="font-weight: 500;width: 21rem;height: 1.4375rem;color: #B7B5B0;font-size: 1.125rem;font-style: italic;text-transform: uppercase;">{{item['title'+$store.getters.getLanguage]}}</div>
                <div style="opacity: 0.8;margin-top: 0.625rem;width: 21rem;;height: 1.125rem;color: #B7B5B0;font-size: 0.875rem;font-style: italic;">DATE:{{item['date'+$store.getters.getLanguage]}}</div>
                <div style="opacity: 0.8;margin-top: 0.625rem;width: 21rem;;height: 1.125rem;color: #B7B5B0;font-size: 0.875rem;font-style: italic;">COMPANY:{{item['company'+$store.getters.getLanguage]}}</div>
                <div style="opacity: 0.8;margin-top: 0.625rem;width: 21rem;;height: 1.125rem;color: #B7B5B0;font-size: 0.875rem;font-style: italic;">PLATFORM:{{item['platform'+$store.getters.getLanguage]}}</div>
                <div style="margin-top: 0.93rem;width: 21rem;;height: 1.125rem;color: #B7B5B0;font-style: italic;">
                  <a :href="item.link" :target="null != item.link ? (item.link.indexOf('http') != -1 ? '_blank' : '_self') : '_blank' "><span style="font-size: 0.75rem;text-decoration: underline;font-weight: 500;opacity: 0.5;" @mouseout="mouseOut($event)" @mouseover="mouseOver($event)">EXPLORE</span>&emsp;<img style="width: 0.75rem;height: 0.75rem" src="../../assets/images/jiantou.png"/></a>
                </div>
              </div>
            </div>
          </vue-custom-scrollbar>
        </div>

        <div style="width: 100%;height: 1.875rem;color: #E3E1DB;font-size: 1rem;position: absolute;bottom: 5rem;left: 6rem">
          <el-button @click="clickMusic(0)" class="buttonStyle anation buttonStyle1" type="danger">
            <span style="font-size: 0.875rem;width: 4.785714285714286em;height: 2.142857142857143em" class="BoldItalic">MUSIC</span>
          </el-button>
          <el-button style="margin-left: 1.4285714285714286em;" @click="clickSfx(1)" class="buttonStyle anation buttonStyle2" type="danger">
            <span style="font-size: 0.875rem;width: 4.785714285714286em;height: 2.142857142857143em" class="BoldItalic">SFX</span>
          </el-button>
          <el-button style="margin-left: 1.4285714285714286em;" @click="clickList(2)" class="buttonStyle anation buttonStyle2" type="danger">
            <span style="font-size: 0.875rem;width: 4.785714285714286em;height: 2.142857142857143em" class="BoldItalic">LIST</span>
          </el-button>
        </div>

      </div>

      <table class="divBase">
        <tr >
          <td style="height: 100%;width: 80%;">

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
  import boxes from './commonScripts/moveBackground'
  import vueCustomScrollbar from 'vue-custom-scrollbar'
  import "vue-custom-scrollbar/dist/vueScrollbar.css"

  import {getAlbum,getProject,getList,getImagesByImageCode} from './requestScript/Project'

  export default {
    name: 'Projects',
    components: { toolbar, contacts, audioCom,vueCustomScrollbar },
    data() {
      return {
        selfOpacity:0.4,
        musicNums:0,
        loading:true,
        firstImg:'',
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
        settings: {
          suppressScrollY: false,
          suppressScrollX: true,
          wheelPropagation: false,
          maxScrollbarLength:50,
        },
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

      getImagesByImageCode({imageCode:'05'}).then(resp =>{
        if(resp.data.length > 0){
          this.firstImg = resp.data[0].imageUrl.replaceAll('\\','\/');
        }
      })
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

      let boxElement = this.$refs.backGroundBox;
      boxes.push({
        el: boxElement,
        targetX: 0,
        targetY: 0,
        x: 0,
        y: 0,
        left: boxElement.offsetLeft,
        top: boxElement.offsetTop,
        size: boxElement.offsetWidth
      });

      let that = this;
      window.addEventListener('resize', function() {
        if(that.$refs.childScrollbar){
          that.$refs.childScrollbar.__init();
        }
        if(that.$refs.childScrollbar2){
          that.$refs.childScrollbar2.__init();
        }
      });
    },
    methods: {
      imgDivOut(event){
        // if(event.target.classList.contains("imgDivGary")) {
          event.target.style.background = event.target.style.background.replaceAll('0.2','0.4');
          event.target.classList.remove("imgDivAni");
          event.target.classList.add("imgDivAniOut");
        // }
      },
      imgDivOver(event){
        event.target.style.background = event.target.style.background.replaceAll('0.4','0.2');
        // if(event.target.classList.contains("imgDivGary")) {
          event.target.classList.remove("imgDivAniOut");
          event.target.classList.add("imgDivAni");
        // }
      },

      mouseOut(event){
        event.target.classList.remove("xiaoshi1");
        event.target.classList.remove("chuxian1");

        event.target.classList.add("xiaoshi1");
      },
      mouseOver(event){
        event.target.classList.remove("xiaoshi1");
        event.target.classList.remove("chuxian1");

        event.target.classList.add("chuxian1");
      },

      fullStyle(index){
        let that = this;
        window.setTimeout(function() {
          let audioDiv = document.getElementsByClassName("audioDiv");
          let musicItem = document.getElementsByClassName("musicItem");
          if(audioDiv.length > 0 && musicItem.length > 0) {
            audioDiv[0].style.display = 'block';
            musicItem[0].style.display = 'none';
            audioDiv[0].parentElement.parentElement.style.marginBottom = '0.375rem';
          }

          for(let i = 0;i < that.albums.length;i++){
            // if(i != 0) {
              that.$refs["imgDiv_" + i][0].classList.add("imgDivGary");
            // }
          }
          for(let i = 0;i < that.albums.length;i++){
            if(i != index) {
              that.$refs["imgDiv_" + i][0].classList.add("imgDivGary");
            }else{
              that.$refs["imgDiv_" + i][0].classList.remove("imgDivAni");
              // that.$refs["imgDiv_" + i][0].classList.remove("imgDivGary");
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
            this.fullStyle(index);
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
            document.getElementsByClassName(pauseItem+"_children")[0].parentElement.parentElement.parentElement.style.marginBottom = '0rem';
            document.getElementsByClassName(pauseItem+"_children")[0].parentElement.parentElement.parentElement.style.marginTop = '0rem';
          }
        }
        if(undefined != this.$refs[item.id+"_children"] && this.$refs[item.id+"_children"].length > 0) {
          this.$refs[item.id + "_children"][0].playAudio();
          document.getElementsByClassName(item.id+"_children")[0].parentElement.parentElement.parentElement.style.marginBottom = '0.375rem';
          document.getElementsByClassName(item.id+"_children")[0].parentElement.parentElement.parentElement.style.marginTop = '1.25rem';
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
        this.loading = false;
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
  @import './commonCSS/moveBackground.scss';

  /*新滚动条样式*/
  >>> .ps--active-y>.ps__rail-y{
    background-color: #383838!important;
  }

  >>> .ps__rail-y{
    width: 3px;
    opacity: 1;
  }

  .musicList >>> .ps__rail-y{
    margin: 0 0 20rem 0;
  }

  .justList >>> .ps__rail-y{
    margin: 14rem 0 10.5rem 0;
  }

  >>> .ps .ps__rail-y:focus, >>> .ps .ps__rail-y:hover{
    background-color: #383838;
    opacity: 1;
  }

  >>> .ps:hover>.ps__rail-y{
    opacity: 1;
  }

  >>> .ps__thumb-y {
    background: #d1d8e6;
    border-radius: 19px;
    background-clip: content-box;
    position: absolute;
    width: 3px;
    right: 0;
  }

  >>> .ps__rail-y.ps--clicking .ps__thumb-y, >>> .ps__rail-y:focus>.ps__thumb-y, >>> .ps__rail-y:hover>.ps__thumb-y {
    background-color: #d1d8e6;
    width: 3px;
  }
  /*新滚动条样式*/

  >>> .el-loading-spinner .path{
    stroke: #8c939d;
  }

  .chuxian1{
    animation: chuxian1 0.3s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes chuxian1{
    0%{
      color: #B7B5B0;
      opacity: 0.5;
    }
    100%{
      color: #F24E1E;
      opacity: 1;
    }
  }

  .xiaoshi1{
    animation: xiaoshi1 0.3s ease-in 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes xiaoshi1{
    0%{
      color: #F24E1E;
      opacity: 1;
    }
    100%{
      color: #B7B5B0;
      opacity: 0.5;
    }
  }

  .iterFont{
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 0.893rem;
    text-transform: capitalize;
    color: #D9D4D2;
    opacity: 0.5;
  }



  .titleFont{
    font-family: 'DIN-BoldItalic';
    font-style: italic;
    font-weight: 500;
    font-size: 1.125rem;
    line-height: 130%;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #E3E1DB;
    pointer-events: none;
  }

  .titleDateFont{
    font-family: 'DIN-BoldItalic';
    font-style: italic;
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 110%;
    letter-spacing: 0.05em;
    text-transform: capitalize;
    color: #E3E1DB;
    opacity: 0.8;
    pointer-events: none;

  }

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
    animation: change 0.3s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }

  @keyframes change {
    0% {
      color: #E3E1DB;
    }
    100% {color: #BE4123;}
  }

  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic
  }

  .divBase {
    width: 100%;
    height: 100%;
  }

  .musicItem:hover{
    color: rgb(245, 245, 245)!important;
  }

  .imgDiv {
    background-size: cover !important;
  }

  .imgDivGary{
    filter: grayscale(1);
  }

  .imgDivAni{
    animation: imgDivAni 0.3s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes imgDivAni {
    0% {
      filter: grayscale(1);
    }
    100% {
      filter: grayscale(0);
    }
  }

  .imgDivAniOut{
    animation: imgDivAniOut 0.3s linear 0s;
    animation-iteration-count: 1;
    animation-fill-mode:forwards;
  }
  @keyframes imgDivAniOut {
    0% {
      filter: grayscale(0);
    }
    100% {
      filter: grayscale(1);
    }
  }

  .buttonStyle1 {
    width: 4.1875rem;
    height: 1.875rem;
    padding: 0.375rem 0.75rem;
    gap: 0.5rem;
    border-radius: 0.3125rem;
  }

  .buttonStyle2 {
    width: 3.125rem;
    height: 1.875rem;
    padding: 0.375rem 0.75rem;
    gap: 0.5rem;
    border-radius: 0.3125rem;
  }

  .selfDefineScroll::-webkit-scrollbar {
    width: 3px;
    background-color: #b5b1b1;
  }

  .selfDefineScroll::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #383838;
  }

  .selfDefineScroll::-webkit-scrollbar-thumb {
    opacity: 0.8;
    height: 20px;
    background: #d1d8e6;
    border-radius: 19px;
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
    text-align: left;
  }

  audio {

  }
</style>
