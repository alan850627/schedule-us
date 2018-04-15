<!--<template>
  <div class="new-event">
    <h1>Create a new event!</h1>
    <form action="/action_page.php">
      Your Name:<br>
  <input type="text" name="firstname" value="">
</form>
    <br>
    <h2>Add Participants</h2>
    <button v-on:click="submit()">Submit</button>
  </div>
</template>
-->

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
        descrip: null,
        email: '',
        checked: []
      },
      show: true
    }
  },

  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset (evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.name = ''
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => { this.show = true })
    },
    submit: function () {
      let event = {
        time: Date.now()
      }
      db.collection('events').doc().set(event)
    },

    // May move/update this.
    newChatBox: function () {
      let chatBox = {}
      chatBox[`${Date.now()}`] = {
        username: 'System',
        message: 'Chat created.'
      }

      db.collection('chat-boxes').doc().set(chatBox)
    },

    // May move/update this.
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
<style scoped>

</style>
