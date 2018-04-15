<template>
  <div class="new-event">
    <h1 style = "text-align:center;"> Create a new event!</h1>
    <br>
    <b-form @submit="onSubmit" @reset="onReset" v-if="true">
      <b-form-group id="exampleInputGroup1"
                    label="Event Name:"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      type="text"
                      v-model="form.eventname"
                      required>
        </b-form-input>
      </b-form-group>
       <b-form-group id="exampleInputGroup2"
                    label="Event Description:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="text"
                      v-model="form.descrip"
                      required>
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup3"
                    label="Your Name:"
                    label-for="exampleInput3">
        <b-form-input id="exampleInput3"
                      type="text"
                      v-model="form.name"
                      required>
        </b-form-input>
      </b-form-group>
       <b-form-group id="exampleInputGroup4"
                    label="Email:"
                    label-for="exampleInput4">
        <b-form-input id="exampleInput4"
                      type="email"
                      v-model="form.email"
                      required>
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <a v-if="eventLink" :href="eventLink">{{ eventLink }}</a>
  </div>
</template>

<script>
import db from '../firebaseInit'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

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
        email: ''
      },
      eventLink: ''
    }
  },

  methods: {
    onSubmit: function (evt) {
      let timeTableRef = this.makeTimeTable(Date.now(), 3600000, 3)
      let chatRef = this.makeChatBox()
      let event = {
        name: this.form.eventname,
        descirption: this.form.descrip,
        hostEmail: this.form.email,
        timeTableId: timeTableRef.id,
        chatId: chatRef.id
      }
      let eventRef = db.collection('events').doc()
      eventRef.set(event)
      this.eventLink = `/event/${eventRef.id}`
    },
    onReset: function (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.name = ''
      this.form.descrip = ''
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
