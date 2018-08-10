<template>
  <b-alert
    class="position-fixed msg-alert"
    :variant="variant"
    :show="isShowing"
    dismissible
    @dismissed="close">{{ content }}</b-alert>
</template>

<script>
export default {
  computed: {
    isShowing: function() {
      return this.$store.state.isShowingAlert
    },
    content: function() {
      return this.isShowing ? this.$cacheData.alertContent : ''
    },
    variant: function() {
      return this.isShowing ? this.$cacheData.alertVariant : null
    }
  },
  methods: {
    close: function () {
      this.$store.dispatch({ type: 'hideAlert' })
    }
  }
}
</script>

<style>
.msg-alert {
  top: 60px;
  right: 20px;
  z-index: 1;
}
</style>
