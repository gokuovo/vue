<template>
  <div class="myAudio">
    <audio
      @timeupdate="updateProgress"
      controls
      ref="audioRef"
      style="display: none"
      @canplay="getDuration"
    >
      <source :src="fileUrl.url" type="audio/mpeg"/>
      您的浏览器不支持音频播放
    </audio>
    <div class="myAudio" style="background-color: #252525;position: relative">
      <div @click="playAudio" style="width: 0.75rem;height: 0.75rem;left: 0.6875rem;top: 1.06rem;position: absolute">
        <img v-show="audioStatus == 1" src="../../../assets/images/play.png" style="width: 0.75rem;height: 0.75rem;object-fit: contain;">
        <img v-show="audioStatus == 0" src="../../../assets/images/pause.png" style="width: 0.75rem;height: 0.75rem;object-fit: contain;">
      </div>
      <div style="width: 22.5rem;height: 1.31rem;position: absolute;left: 2.5rem;bottom: 0.6rem;">
        <span class="songName BoldItalic" style="color: #E3E1DB;">{{fileUrl.title}}</span>
      </div>
      <div class="iterFont" style="width: 4.68rem;height: 0.8125rem;position: absolute;right: 0.75rem;top: 1rem;text-align: right">
        {{ videoStart }}/{{ transTime(duration) }}
      </div>
      <div class="duration" style="position: absolute;bottom: 0.7rem;width: 31.625rem;height: 0.5rem">
        <input type="range" ref="range" @input="onChange" @change="onChange" min="0" max="100" :value="value">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      fileUrl: {
        srcPath: '',
        title: ''
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
  .BoldItalic{
    font-family: DIN-BoldItalic;
    font-style: italic;
    font-size: 1rem;
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

  .myAudio{
    width: 31.62rem;
    height: 2.875rem
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
    height: 1px;
    background: #eee;
  }
  /*[type="range"]::-webkit-slider-runnable-track:hover {*/
  /*  height: 5px;*/
  /*  background: #eee;*/
  /*}*/

  [type="range" i]::-webkit-slider-container {
    height: 1px;
    overflow: hidden;
  }
  /*[type="range" i]::-webkit-slider-container:hover {*/
  /*  height: 5px;*/
  /*  overflow: hidden;*/
  /*}*/

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
