<template>
  <div class="time-table">
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
  name: 'TimeTable',

  components: {
    TimeSlot
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
