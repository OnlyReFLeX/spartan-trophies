<template lang="pug">
  .badge.q-my-lg(:class="badge.earned ? 'earned' : 'not-earned'")
    img(src="~/assets/Badge-Sprint.svg")
    .badge-title.text-uppercase {{badge.badge_name}}
</template>

<script>
export default {
  name: 'Badge',
  props: {
    badge: Object
  }
}
</script>

<style lang="scss">
  .badge {
    width: 160px;
    text-align: center;

    .badge-title {
      margin-top: 20px;
      font-size: 12px;
    }

    &.not-earned {
      opacity: 0.3;
    }
  }
</style>
