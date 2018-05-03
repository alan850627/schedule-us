<template>
  <b-container class="time-table" v-on:mousedown="mouseDown=true" v-on:mouseup="mouseDown=false">
    <b-pagination align="center" size="md" :total-rows="weekSeparated.length" v-model="currentPage" :per-page="1"></b-pagination>
    <b-row class="justify-content-md-center">
      <b-col v-for="(arr, day) in weekDisplayed" v-bind:key="day" cols="12" md="auto">
        <b>
          <div>{{ getDayOfWeek(arr[0].startTime) }}</div>
          <div>{{ getDate(arr[0].startTime) }}</div>
        </b>
        <div v-for="timeSlot in arr" v-bind:key="timeSlot.startTime">
          <time-slot
            :username="username"
            :editable="editable"
            :mouseDown="mouseDown"
            :startTime="timeSlot.startTime"
            :length="timeSlot.length"
            :response="timeSlot.response"
            :view-single="viewSingle">
          </time-slot>
        </div>
      </b-col>
    </b-row>
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
    },
    viewSingle: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    daySeparated: function () {
      let columns = {}
      // Object.keys(this.timeTable).forEach(timestamp => {
      //   let timeslot = this.timeTable[timestamp]
      //   let key = moment(timeslot.startTime).format('L')
      //   if (columns[key]) {
      //     columns[key].push(timeslot)
      //   } else {
      //     columns[key] = []
      //     columns[key].push(timeslot)
      //   }
      // })
      return columns
    },
    weekSeparated: function () {
      let weeks = [[]]
      // let i = 0
      // Object.keys(this.daySeparated).forEach((day) => {
      //   let weekday = moment(this.daySeparated[day][0].startTime).isoWeekday()
      //   weeks[i].push(this.daySeparated[day])
      //   if (weekday === 6) {
      //     i += 1
      //     weeks.push([])
      //   }
      // })
      // // Edge case where last day is a Saturday... a new entry would be added.
      // if (weeks[i].length === 0) {
      //   weeks.pop()
      // }
      return weeks
    },
    weekDisplayed: function () {
      return this.weekSeparated[this.currentPage - 1]
    }
  },

  data () {
    return {
      timeTable: {},
      mouseDown: false,
      currentPage: 1
    }
  },

  methods: {
    submit: function () {
      // Object.keys(this.timeTable).forEach(timestamp => {
      //   if (!this.timeTable[timestamp].response[this.username]) {
      //     this.$set(this.timeTable[timestamp].response, this.username, 'no')
      //   }
      // })
      // db.collection('time-table').doc(this.id).set(this.timeTable)
    },
    allGood: function () {
      // Object.keys(this.timeTable).forEach(timestamp => {
      //   this.$set(this.timeTable[timestamp].response, this.username, 'yes')
      // })
    },
    markRange: function (start, end) {
      // Object.keys(this.timeTable).forEach(timestamp => {
      //   if (start <= timestamp && end >= timestamp) {
      //     this.$set(this.timeTable[timestamp].response, this.username, 'no')
      //   }
      // })
    },
    clear: function () {
      // Object.keys(this.timeTable).forEach(timestamp => {
      //   this.$set(this.timeTable[timestamp].response, this.username, 'no')
      // })
    },
    getDate: function (timestamp) {
      // return moment(timestamp).format('MMMM DD')
    },
    getDayOfWeek: function (timestamp) {
      let str = ''
      // let day = moment(timestamp).isoWeekday()
      // if (day === 1) {
      //   str = 'Mon'
      // } else if (day === 2) {
      //   str = 'Tues'
      // } else if (day === 3) {
      //   str = 'Wed'
      // } else if (day === 4) {
      //   str = 'Thur'
      // } else if (day === 5) {
      //   str = 'Fri'
      // } else if (day === 6) {
      //   str = 'Sat'
      // } else if (day === 7) {
      //   str = 'Sun'
      // }
      return str
    }
  },

  mounted () {
    // this.$bind('timeTable', db.collection('time-table').doc(this.id))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
