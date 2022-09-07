<template>
  <div id="app">
    <transition :name="animate" mode="out-in">
      <router-view v-if="isRouterAlive"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true,
      animate:""
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.animate = "slide-left";
      } else {
        this.animate = "slide-right";
      }
    }
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => (this.isRouterAlive = true))
    }
  }
}
</script>

<style lang="scss" scoped>
  .Router {
    position: absolute;
    left: 0;
    right: 0;
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 200ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>
