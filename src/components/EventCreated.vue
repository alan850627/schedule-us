<template>
  <b-container class="new-event">
    <b-row align-h="center">
      <b-col cols="8">
        <b-card class="text-center">
          <h1>Event Created!</h1>
          <p>Copy this link to share with your friends:
          <br><a :href="link">{{ baseURL }}{{ link }}</a></p>
       </b-card>
      </b-col>
    </b-row>
  </b-container>
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
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
