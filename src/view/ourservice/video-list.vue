<template>
  <div v-for="(item,i) in adminList" :key="i">
    <div class="mr30 mt10">
      <span class="link-color fontExtraLarge">{{i+1}}、{{item.title}}</span>
      <video
        ref='video'
        :id="'myVideos'+i"
        class="video-js vjs-default-skin vjs-big-play-centered mt10"
      >
        <source :src="item.src" type="video/mp4" />
      </video>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'video',
  }
</script>

<style scoped>

</style>
