<template>
  <div class="chat-message hanging-indent" :title="timeAgo">
    <b>{{ username }}</b>: {{ message }}
    <sup><small> {{timeAgo}}</small></sup>
  </div>
</template>

<script>
// import moment from 'moment'
// export default {
//   name: 'ChatMessage',

//   components: {
//   },

//   props: {
//     username: {
//       type: String,
//       default: 'Anonymous'
//     },
//     message: {
//       type: String,
//       default: 'Default Message.'
//     },
//     timestamp: {
//       type: String,
//       default: `${Date.now()}`
//     }
//   },

//   computed: {
//     timeAgo: function () {
//       return moment(Number(this.timestamp)).fromNow()
//     }
//   },

//   data () {
//     return {
//     }
//   },

//   methods: {
//   },

//   mounted () {
//   }
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hanging-indent {
  padding-left: 25px ;
  text-indent: -25px ;
}
</style>
