<template>
  <div id="app">
    <app-header></app-header>
    <router-view/>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import cookies from 'browser-cookies'
import AppHeader from './components/AppHeader'

export default {
  name: 'App',

  components: {
    AppHeader
  },

  props: {
  },

  computed: {
    username: function () {
      if (!this.rawUsername) {
        return ''
      }
      return this.rawUsername.trim()
    }
  },

  data () {
    return {
      rawUsername: ''
    }
  },

  methods: {
  },

  mounted () {
    this.rawUsername = cookies.get('schedule.us.username')
  }
}
</script>

<style>

</style>
