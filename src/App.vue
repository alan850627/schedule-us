<template>
  <div id="app">
    <app-header :username="username">
      <span slot="buttons">
        <b-button v-if="username" size="sm" class="my-2 my-sm-0" @click="handleLogout">Logout</b-button>
        <b-button v-else size="sm" class="my-2 my-sm-0" v-b-modal.loginModal>Login</b-button>
      </span>
    </app-header>
    <b-modal id="loginModal"
             ref="modal"
             title="What's your name?"
             @ok="handleOk">
      <form @submit.stop.prevent="handleSubmit">
        <b-form-input type="text" slot="input"
          placeholder="Enter your name"
          v-model="rawUsername">
        </b-form-input>
      </form>
    </b-modal>
    <router-view :username="username"></router-view>
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
  },

  data () {
    return {
      rawUsername: '',
      username: ''
    }
  },

  methods: {
    handleLogout () {
      this.rawUsername = ''
      this.username = ''
      cookies.set('schedule.us.username', '', {expires: 1825})
    },
    handleOk (evt) {
      // Prevent modal from closing
      evt.preventDefault()
      if (!this.rawUsername) {
        alert('Please enter your name')
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit () {
      this.username = this.rawUsername.trim()
      cookies.set('schedule.us.username', this.username, {expires: 1825})
      this.$refs.modal.hide()
    }
  },

  mounted () {
    this.rawUsername = cookies.get('schedule.us.username')
    this.username = this.rawUsername.trim()
  }
}
</script>

<style>

</style>
