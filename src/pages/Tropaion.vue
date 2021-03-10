<template lang="pug">
  q-page.trophies.q-py-lg
    .row
      .col.q-pr-md.xs-hide.md-hide.sm-hide
        .text-h7.text-druk Someone Verylongname
      .col-lg-10.col-md-12.main
        .section-title.title.text-uppercase.text-druk Your Tropaion
        template(v-if="loading")
          .fixed-center.text-center.full-width
            q-spinner(color="negative" size="6em")
        template(v-else)
          .row
            .col-xs-8
              .title.text-bold
                span(style="padding-right: 26px;") Your Trophies
                span.numbers  {{earnedTrophies.length}}
                  span.text-grey-8 /{{filteredTrophies.length}}
            .col
              .float-right
                q-select.select-year(
                  dark
                  v-model="year"
                  color="negative"
                  :options="years"
                  input-style="max-height: 44px"
                  dropdown-icon="keyboard_arrow_down"
                  rounded
                  outlined
                  dense
                  behavior="menu"
                  menu-anchor="top left"
                  popup-content-class="select-year-menu")
          .categories
            .category(v-for="badges, category in trophiesByCategories")
              .category-title.text-italic.text-uppercase.text-weight-bold.text-druk {{category}}
              hr
              .row.flex.badges.fit.wrap.justify-start.items-start.content-start
                badge(:badge="badge" v-for="badge in badges")
</template>

<script>
import Badge from 'components/Badge'

export default {
  components: { Badge },
  data () {
    return {
      loading: true,
      years: [],
      year: new Date().getFullYear()
    }
  },
  computed: {
    filteredTrophies: function () {
      return this._.filter(this.$store.getters['trophies/trophies'], { badge_year: this.year })
    },
    trophiesByCategories: function () {
      return this._.groupBy(this.filteredTrophies, 'badge_category')
    },
    earnedTrophies: function () {
      return this._.filter(this.filteredTrophies, { earned: true })
    }
  },
  methods: {
    getTrophies () {
      this.loading = true
      this.$store.dispatch('trophies/getTrophies').then(() => {
        // Get years
        const years = this._.uniq(this._.map(this.$store.getters['trophies/trophies'], 'badge_year'))
        this.years = this._.orderBy(years, [], 'desc')
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          message: 'Error, refresh your page.'
        })
      }).finally(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.getTrophies()
  }
}
</script>

<style lang="scss">
.trophies {
  padding-top: 72px;
  padding-left: 24px;
  padding-right: 24px;
  max-width: 902px;
  margin-left: auto;
  margin-right: auto;

  .select-year {
    width: 107px;

    .q-field__control {
      min-height: 44px;
      padding-left: 23px;
      padding-right: 13px
    }

    .q-field__native {
      font-size: 14px;
    }

    .q-field__marginal {
      height: 44px;
      color: white;

      i {
        font-weight: bold;
      }
    }
  }

  .categories {
    margin-top: 44px;
  }

  .title {
    font-size: 24px;

    .numbers {
      font-size: 18px;
    }
  }

  .section-title {
    font-size: 24px;
    margin-bottom: 44px;
  }

  hr {
    opacity: 0.2;
    margin-block-end: 30px;
  }

  .category {
    &-title {
      line-height: 33px;
      font-size: 28px;
      letter-spacing: 0.05em;
    }
  }

  .main {
    max-width: 670px;
    margin-left: auto;
    margin-right: auto;
  }

  @media (max-width: $breakpoint-xs) {
    .section-title {
      word-spacing: 30px;
    }
  }
}

.select-year-menu {
  border: 0.5px solid #4F4F4F;
  box-sizing: border-box;
  box-shadow: 0px 10px 14px rgba(0, 0, 0, 0.5);
  border-radius: 18px;
  text-align: center;
  padding: 20px 0px;

  .q-item {
    min-height: 35px;
  }
}
</style>
