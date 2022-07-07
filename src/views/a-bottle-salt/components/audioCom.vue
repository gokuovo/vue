<template>
  <div class="myAudio">
    <audio
      @timeupdate="updateProgress"
      controls
      ref="audioRef"
      style="display: none"
      @canplay="getDuration"
    >
      <source :src="fileUrl.srcPath" type="audio/mpeg"/>
      您的浏览器不支持音频播放
    </audio>
    <table class="myAudio">
      <tr>
        <td style="vertical-align: bottom;">
          <div class="audioPanel">
            <div style="padding-top: 3%;padding-right: 1%" class="playBtn" @click="playAudio">
              <i style="color: #8c939d;" v-show="audioStatus == 1" class="el-icon-video-pause el-icon--right"></i>
              <i style="color: #8c939d;" v-show="audioStatus == 0" class="el-icon-video-play el-icon--right"></i>
            </div>
            <div class="slidList">
              <span class="songName" style="color: rgb(245, 245, 245);font-style: italic">{{fileUrl.name}}</span>
              <span class="timers">{{ videoStart }}/{{ transTime(duration) }}</span>
            </div>
          </div>
          <div class="duration">
            <input type="range" ref="range" @input="onChange" @change="onChange" min="0" max="100" :value="value">
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    props: {
      fileUrl: {
        srcPath: '',
        name: ''
      }

    },
    data: function() {
      return {
        audioStatus: 0,
        videoStart: '00:00',
        value: 0,
        duration: 0,
        isToPla: false
      }
    },
    mounted() {
      if (this.fileUrl && !this.isToPla) {
        this.$nextTick(() => {
          document.addEventListener(
            'touchstart',
            () => {
              if (this.isToPla) {
                return
              }
              this.$refs.audioRef.play()
              this.$refs.audioRef.pause()
            },
            false
          )
        })
      }
    },
    methods: {
      getDuration() {
        this.duration = this.$refs.audioRef.duration
      },
      //播放暂停控制
      playAudio() {
        this.isToPla = true
        let recordAudio = this.$refs.audioRef //获取audio元素
        if (recordAudio.paused) {
          recordAudio.play();
          this.audioStatus = 1
        } else {
          recordAudio.pause()
          this.audioStatus = 0
        }
      },
      pauseAudio(){
        let recordAudio = this.$refs.audioRef //获取audio元素
        recordAudio.pause()
      },
      //更新进度条与当前播放时间
      updateProgress(e) {
        let value = e.target.currentTime / this.duration
        this.value = value * 100
        if (e.target.currentTime > this.duration) {
          this.audioStatus = 0
          this.value = 0
          this.videoStart = this.transTime(0)
          return
        }
        this.value = value * 100
        if(this.$refs.audioRef) {
          this.videoStart = this.transTime(this.$refs.audioRef.currentTime)
        }
        if (e.target.ended) {//歌曲播放结束,重置状态
          this.audioStatus = 0
          this.videoStart = '00:00'
          this.value = 0
          this.duration = 0
          this.isToPla = false
        }
      },
      /**
       * 音频播放时间换算
       * @param {number} value - 音频当前播放时间，单位秒
       */
      transTime(value) {
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
      // 进度条
      onChange() {
        let recordAudio = this.$refs.audioRef //获取audio元素
        let val = this.$refs.range.value
        if (!recordAudio.paused || recordAudio.currentTime != 0) {
          recordAudio.currentTime = (recordAudio.duration * val) / 100
          this.videoStart = this.transTime((val / 100) * this.duration)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .myAudio{
    width: 100%;
    height: 100%;
  }
  .audioPanel {
    display: flex;
    align-items: center;
    height: 20px;

    .slidList {
      position: relative;
      flex: 1;

      .timers {
        color: #bdbdbd;
        font-family: PingFang SC;
        text-align: left;
        position: absolute;
        top: 5px;
        right: 0px;
      }
      .songName{
        position: absolute;
      }
    }
  }

  [type="range"] {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    outline: 0;
    background-color: transparent;
    width: 100%;
  }

  [type="range"]::-webkit-slider-runnable-track {
    height: 2px;
    background: #eee;
  }
  [type="range"]::-webkit-slider-runnable-track:hover {
    height: 5px;
    background: #eee;
  }

  [type="range" i]::-webkit-slider-container {
    height: 2px;
    overflow: hidden;
  }
  [type="range" i]::-webkit-slider-container:hover {
    height: 5px;
    overflow: hidden;
  }

  [type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 0px;
    height: 20px;
    border-radius: 50%;
    border: 1px solid transparent;
    margin-top: -8px;
    border-image: linear-gradient(#f44336, #f44336) 0 fill / 0 0 0 0 / 0 0 0 1000px;
  }
</style>
