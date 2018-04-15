<template>
  <div class="event-created">
    <h1>Event Created!</h1>
    Copy this link to share with your friends:
    <a :href="link">{{ baseURL }}{{ link }}</a>
  </div>
</template>

<script>
export default {
  name: 'EventCreated',

  components: {
  },

  props: {
  },

  computed: {
    baseURL: function () {
      return `${window.location.host}`
    },
    link: function () {
      // TODO: CHANGE IT TO ACTUAL BASE URL
      return `/#/event/${this.eventId}`
    }
  },

  data () {
    return {
      eventId: ''
    }
  },

  methods: {
  },

  watch: {
    '$route' (to, from) {
      // react to route changes...
      this.eventId = to.params.eventId
    }
  },

  mounted () {
    this.eventId = this.$route.params.eventId
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
