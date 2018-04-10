<template>
  <div class="chat-message">
    {{ username }}: {{ message }}
  </div>
</template>

<script>
export default {
  name: 'ChatMessage',

  components: {
  },

  props: {
    username: {
      type: String,
      default: 'Anonymous'
    },
    message: {
      type: String,
      default: 'Default Message.'
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
