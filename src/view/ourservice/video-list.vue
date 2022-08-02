<template>
  <!--  <div v-for="(item,i) in adminList" :key="i">-->
  <!--    <div class="mr30 mt10">-->
  <!--      <span class="link-color fontExtraLarge">{{i+1}}、{{item.title}}</span>-->
  <!--      <video-->
  <!--        ref='video'-->
  <!--        :id="'myVideos'+i"-->
  <!--        class="video-js vjs-default-skin vjs-big-play-centered mt10"-->
  <!--      >-->
  <!--        <source :src="item.src" type="video/mp4" />-->
  <!--      </video>-->
  <!--    </div>-->
  <!--  </div>-->

  <div>
    <button @click="clickVideo">按钮</button>
    <Video-preview></Video-preview>
  </div>
</template>

<script>
// 引入视频预览组件
import VideoPreview from '@/view/videoCommon/VideoPreview'

export default {
  components: { VideoPreview },
  name: 'video',
  methods: {
    clickVideo() {
      const data = {
        videoPreviewVisible: true,
        videoPreviewList: [
          {
            size: '123',
            fileUrl:
              'https://video.kekedj.com/video_kekedj_com/2021/202104/20210401/%E6%9C%80%E5%BC%BA%E7%94%B5%E9%9F%B3%E9%A5%95%E9%A4%AE%E7%9B%9B%E5%AE%B4-Alan%20Walker%20@%20Parookaville%20Festival%202019-%E8%89%BE%E4%BC%A6%E6%B2%83%E5%85%8B%E7%8E%B0%E5%9C%BA%E8%B6%85%E5%97%A8%E8%87%B3%E5%B0%8A%E6%94%B6%E8%97%8F%E7%89%88.mp4',
            downloadLink: '123',
            fileName: 'text',
            extendName: '123',
          },
        ],
        activeIndex: 0,
      }
      this.$store.commit('setVideoPreviewData', data)
    },
  },
}
</script>

<style scoped></style>
