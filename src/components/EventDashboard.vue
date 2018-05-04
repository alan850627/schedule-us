<template>
  <div class="event-dashboard">
    <b-container v-if="validEvent">
      <b-row>
        <b-col sm="8">
          <b-card>
            <time-table
              :id="event.timeTableId"
              :editable="false"
              :username="viewUsername"
              :view-single="viewUsername.length > 0">
            </time-table>
          </b-card>
        </b-col>
        <b-col sm="4">
          <b-button :href="`/#/edit-calendar/${eventId}`">Edit Availability</b-button>
          <b-button @click="emailModal=true">Email Everyone</b-button>
          <b-card class="my-4" >
            <h2> {{event.name}} </h2>
            <p> {{event.description}} </p>
          </b-card>
          <b-card title="Responses" class="my-4">
            <span v-if="Object.keys(event.response).length > 0">
              <div v-for="(res, name) in event.response" v-bind:key="name"
                v-on:mouseover="updateView(name)" v-on:mouseleave="updateView('')">
                {{ name }}
              </div>
            </span>
            <span v-else>
              none
            </span>
          </b-card>
          <chat-box
            class="my-4"
            :id="event.chatId"
            :username="username">
          </chat-box>
        </b-col>
      </b-row>
    </b-container>
    <b-modal v-model="emailModal" id="emailModal" size="lg" title="Email Everyone">
      <p>Warning: Emails only sent to those who opt in and provided emails in their responses.</p>
      <b-input-group prepend="Your Email">
        <b-form-input v-model="replyToEmail" type="email" placeholder="Enter your email" required></b-form-input>
      </b-input-group>
      <b-input-group prepend="Subject">
        <b-form-input v-model="emailSubject" type="text" placeholder="Enter your email subject here" required></b-form-input>
      </b-input-group>
      <b-input-group prepend="Additional Recipients">
        <b-form-input v-model="additionalEmails" type="text" placeholder="Separate emails by commas"></b-form-input>
      </b-input-group>
      <b-input-group prepend="Email content">
        <b-form-textarea id="textarea1" v-model="emailContent" placeholder="We've decided to schedule our event at..." :rows="8" required></b-form-textarea>
      </b-input-group>
      <div slot="modal-footer" class="w-100">
        <b-btn class="float-right px-3 ml-2" variant="primary" @click="sendEmail">
          Send
        </b-btn>
        <b-btn class="float-right" @click="emailModal=false">
          Cancel
        </b-btn>
      </div>
    </b-modal>
  </div>
</template>

<script>
import db from '../firebaseInit'
import TimeTable from './calendar/TimeTable'
import ChatBox from './chat/ChatBox'

export default {
  name: 'EventDashboard',

  components: {
    TimeTable,
    ChatBox
  },

  props: {
    username: {
      type: String,
      default: ''
    }
  },

  computed: {
    validEvent: function () {
      return Object.keys(this.event).length > 0
    }
  },

  data () {
    return {
      eventId: '',
      viewUsername: '',
      emailSubject: '',
      emailContent: '',
      replyToEmail: '',
      emailModal: false,
      additionalEmails: '',
      event: {}
    }
  },

  methods: {
    updateView: function (name) {
      this.viewUsername = name
    },
    sendEmail: function () {
      // let emailRef = db.collection('emails').doc()
      // let resp = this.additionalEmails
      // Object.keys(this.event.response).forEach((user) => {
      //   resp += `,${this.event.response[user].email}`
      // })
      // let emailObj = {
      //   bcc: resp,
      //   subject: this.emailSubject,
      //   text: this.emailContent,
      //   replyTo: this.replyToEmail,
      //   eventId: this.eventId
      // }
      // emailRef.set(emailObj).then(() => {
      //   this.emailSubject = ''
      //   this.emailContent = ''
      //   this.replyToEmail = ''
      //   this.emailModal = false
      // }).catch((error) => {
      //   alert('Problem with server... Try again. \nError: ' + error)
      // })
    }
  },

  watch: {
    // '$route' (to, from) {
    //   react to route changes...
    //   this.eventId = to.params.eventId
    //   this.$bind('event', db.collection('events').doc(this.eventId))
    // }
  },

  mounted () {
    // this.eventId = this.$route.params.eventId
    // this.$bind('event', db.collection('events').doc(this.eventId))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
