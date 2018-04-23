<template>
  <div class="app-header">
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Schedule.us</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item href="/#/">Home</b-nav-item>
          <b-nav-item href="/#/new-event">New Event</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <slot name="buttons"></slot>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',

  components: {
  },

  props: {
    username: {
      type: String
    }
  },

  computed: {
  },

  data () {
    return {
    }
  },

  methods: {
  },

  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
