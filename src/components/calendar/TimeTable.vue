<template>
  <div class="time-table" v-on:mousedown="mouseDown=true" v-on:mouseup="mouseDown=false">
    <div v-for="(arr, day) in daySeparated" v-bind:key="day" class="column">
      <div v-for="timeSlot in arr" v-bind:key="timeSlot.startTime">
        <time-slot
          :username="username"
          :editable="editable"
          :mouseDown="mouseDown"
          :startTime="timeSlot.startTime"
          :length="timeSlot.length"
          :response="timeSlot.response">
        </time-slot>
      </div>
    </div>
    <button v-if="editable" v-on:click="submit()">Submit</button>
  </div>
</template>

<script>
import db from '../../firebaseInit'
import TimeSlot from './TimeSlot'
import moment from 'moment'

export default {
  name: 'TimeTable',

  components: {
    TimeSlot
  },

  props: {
    username: {
      type: String,
      default: ''
    },
    editable: {
      type: Boolean,
      default: false
    },
    id: {
      required: true,
      type: String,
      default: ''
    }
  },

  computed: {
    daySeparated: function () {
      let columns = {}
      Object.keys(this.timeTable).forEach(timestamp => {
        let timeslot = this.timeTable[timestamp]
        let key = moment(timeslot.startTime).format('L')
        if (columns[key]) {
          columns[key].push(timeslot)
        } else {
          columns[key] = []
          columns[key].push(timeslot)
        }
      })
      return columns
    }
  },

  data () {
    return {
      timeTable: {},
      mouseDown: false
    }
  },

  methods: {
    submit: function () {
      Object.keys(this.timeTable).forEach(timestamp => {
        if (!this.timeTable[timestamp].response[this.username]) {
          this.timeTable[timestamp].response[this.username] = 'no'
        }
      })
      db.collection('time-table').doc(this.id).set(this.timeTable)
    }
  },

  mounted () {
    this.$bind('timeTable', db.collection('time-table').doc(this.id))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.column {
  float: left;
  width: 10%;
}

</style>
