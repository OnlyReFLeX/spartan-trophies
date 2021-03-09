<template lang="pug">
  q-page.trophies.q-py-lg(padding)
    .row
      .col-sm-3.q-pr-md.xs-hide
        .text-h5 Someone Verylongname
      .col-sm-9.col-xs-12
        .text-h4.text-uppercase Your Tropaion
        template(v-if="loading")
          .fixed-center.text-center.full-width
            q-spinner(color="negative" size="6em")
        template(v-else)
          .row.q-mt-md
            .col-xs-8
              .title.q-mb-md
                | Your Trophies
                span.numbers  {{earnedTrophies.length}}
                  span.text-grey-8 /{{filteredTrophies.length}}
            .col
              .float-right
                q-select.select-year(dark v-model="year" color="negative" :options="years" rounded outlined dense)
          .categories
            .category(v-for="badges, category in trophiesByCategories")
              .text-h5.text-italic.text-uppercase.text-weight-bold {{category}}
              hr
              .flex
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
  max-width: 902px;
  margin-left: auto;
  margin-right: auto;

  .select-year {
    width: 107px;
  }
  .title {
    font-size: 24px;
  }

  hr {
    opacity: 0.2;
  }
}
</style>
