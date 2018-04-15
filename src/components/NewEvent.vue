<template>
  <div class="new-event">
    <h1 style = "text-align:center;"> Create a new event!</h1>
    <br>
    <b-form @submit="onSubmit" @reset="onReset" v-if="true">
      <b-form-group id="" label="Event Name:" label-for="eventNameForm">
        <b-form-input id="eventNameForm" type="text" v-model="form.eventname" required></b-form-input>
      </b-form-group>
      <b-form-group id="" label="Event Description:" label-for="eventDescriptionForm">
        <b-form-input id="eventDescriptionForm" type="text" v-model="form.descrip" required></b-form-input>
      </b-form-group>
      <b-form-group id="" label="Possible Event Start Date:" label-for="eventStartDateForm">
        <b-form-input id="eventStartDateForm" type="date" v-model="form.start" required></b-form-input>
      </b-form-group>
      <b-form-group id="" label="Possible Event Start Date:" label-for="eventEndDateForm">
        <b-form-input id="eventEndDateForm" type="date" v-model="form.end" required></b-form-input>
      </b-form-group>
      <b-form-group id="" label="Your Name:" label-for="exampleInput3">
        <b-form-input id="exampleInput3" type="text" v-model="form.name" required></b-form-input>
      </b-form-group>
      <b-form-group id="" label="Email:" label-for="exampleInput4">
        <b-form-input id="exampleInput4" type="email" v-model="form.email" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import db from '../firebaseInit'
import moment from 'moment'

export default {
  name: 'NewEvent',

  components: {
  },

  props: {
  },

  computed: {
  },

  data () {
    return {
      form: {
        eventname: '',
        descrip: '',
        email: '',
        name: '',
        start: '',
        end: ''
      }
    }
  },

  methods: {
    onSubmit: function (evt) {
      let startTimeStamp = moment(this.form.start, 'YYYY-MM-DD').valueOf()
      let endTimeStamp = moment(this.form.end, 'YYYY-MM-DD').valueOf()
      if (startTimeStamp > endTimeStamp) {
        alert('Invalid date range!')
        return
      }
      let numDays = Math.floor((endTimeStamp - startTimeStamp) / 86400000) + 1
      let timeTableRef = this.makeTimeTable(startTimeStamp, 3600000, numDays)
      let chatRef = this.makeChatBox()
      let event = {
        name: this.form.eventname,
        descirption: this.form.descrip,
        hostEmail: this.form.email,
        hostName: this.form.name,
        timeTableId: timeTableRef.id,
        chatId: chatRef.id
      }
      let eventRef = db.collection('events').doc()
      eventRef.set(event)
      this.$router.push(`/event-created/${eventRef.id}`)
    },
    onReset: function (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.name = ''
      this.form.descrip = ''
      this.form.eventname = ''
      this.form.start = ''
      this.form.end = ''
    },

    // May move/update this.
    makeChatBox: function () {
      let chatBox = {}
      chatBox[`${Date.now()}`] = {
        username: 'System',
        message: 'Chat created.'
      }

      let chatref = db.collection('chat-boxes').doc()
      chatref.set(chatBox)
      return chatref
    },

    // May move/update this.
    makeTimeTable: function (startTime, length = 3600000, days = 3) {
      let table = {}
      let n = 86400000 * days / length
      for (let i = 0; i < n; i += 1) {
        table[startTime] = {
          startTime: startTime,
          length: length,
          response: {}
        }
        startTime += length
      }
      let timeref = db.collection('time-table').doc()
      timeref.set(table)
      return timeref
    }
  },

  mounted () {
  }
}
</script>
<style scoped>

</style>
