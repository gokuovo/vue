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
    <div class="audioPanel">
      <div style="padding-top: 1%;padding-right: 1%" class="playBtn" @click="playAudio">
        <i style="background-color: #8c939d" v-show="audioStatus == 1" class="el-icon-video-pause el-icon--right"></i>
        <i style="background-color: #8c939d" v-show="audioStatus == 0" class="el-icon-video-play el-icon--right"></i>
      </div>
      <div class="slidList">
        <span style="color: #8c939d">{{fileUrl.name}}</span>
        <span class="timers">{{ videoStart }}/{{ transTime(duration) }}</span>
      </div>
    </div>
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
      playAudio(e) {
        this.isToPla = true
        let recordAudio = this.$refs.audioRef //获取audio元素
        if (recordAudio.paused) {
          recordAudio.play()
          this.audioStatus = 1
        } else {
          recordAudio.pause()
          this.audioStatus = 0
        }
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
        this.videoStart = this.transTime(this.$refs.audioRef.currentTime)
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
      onChange(val) {
        let recordAudio = this.$refs.audioRef //获取audio元素
        if (!recordAudio.paused || recordAudio.currentTime != 0) {
          recordAudio.currentTime = (recordAudio.duration * val) / 100
          this.videoStart = this.transTime((val / 100) * this.duration)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .audioPanel {
    display: flex;
    align-items: center;
    height: 40px;

    .slidList {
      position: relative;
      flex: 1;

      .timers {
        color: #bdbdbd;
        font-family: PingFang SC;
        font-size: 12px;
        text-align: left;
        position: absolute;
        top: 10px;
        right: 0px;
      }
    }

    .slide {
      width: 100%;
    }

    .playBtn {
      height: 30px;

      img {
        height: 100%;
      }
    }
  }
</style>
