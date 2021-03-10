<template lang="pug">
  .badge.col-md-3.col-sm-4.col-xs-6(:class="badge.earned ? 'earned' : 'not-earned'")
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
    width: 94px;
    text-align: center;

    .badge-title {
      margin-top: 20px;
      font-size: 12px;
    }

    &.not-earned {
      opacity: 0.3;
    }

    @media (min-width: $breakpoint-sm) {
      margin-bottom: 67px;
    }

    @media (max-width: $breakpoint-sm) {
      margin-bottom: 52px;
    }

    @media (max-width: $breakpoint-xs) {
      margin-bottom: 47px;
    }
  }
</style>
