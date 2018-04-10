<template>
  <div class="time-table">
    <h1>Time-Table</h1>
  </div>
</template>

<script>
import db from '../../firebaseInit'

export default {
  name: 'TimeTable',

  components: {
  },

  props: {
    id: {
      required: true,
      type: String,
      default: ''
    }
  },

  computed: {
  },

  data () {
    return {
      timeTable: {}
    }
  },

  methods: {
  },

  mounted () {
    this.$bind('timeTable', db.collection('time-table').doc(this.id))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
