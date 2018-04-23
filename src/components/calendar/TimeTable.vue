<template>
  <b-container class="time-table" v-on:mousedown="mouseDown=true" v-on:mouseup="mouseDown=false">
    <b-row class="text-center">
      <b-col v-for="(arr, day) in daySeparated" v-bind:key="day" cols="12" md="auto">
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
      </b-col>
    </b-row>
    <button v-if="editable" v-on:click="submit()">Submit</button>
  </b-container>
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
</style>
