<template>
  <div class="time-selector">
    <div v-for="timeSlot in timeTable" v-bind:key="timeSlot.startTime">
      <time-slot
        :startTime="timeSlot.startTime"
        :length="timeSlot.length"
        :responses="timeSlot.reponses">
      </time-slot>
    </div>
  </div>
</template>

<script>
import db from '../../firebaseInit'
import TimeSlot from './TimeSlot'

export default {
  name: 'TimeSelector',

  components: {
    TimeSlot
  },

  props: {
  },

  computed: {
  },

  data () {
    return {
      timeTable: {}
    }
  },

  methods: {
    makeTable: function (table = {}, startTime = 1523336400000, length = 3600000, days = 3) {
      let n = 86400000 * days / length
      for (let i = 0; i < n; i += 1) {
        table[startTime] = {
          startTime: startTime,
          length: length,
          response: {}
        }
        startTime += length
      }
      return table
    }
  },

  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
