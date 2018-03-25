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
                      type="email"
                      v-model="form.eventname"
                      required>
        </b-form-input>
      </b-form-group>
       <b-form-group id="exampleInputGroup2"
                    label="Event Description:"
                    label-for="exampleInput2">
        <b-form-input id="exampleInput2"
                      type="email"
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
                      type="text"
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
import db from '../firebaseInit';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
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
    }
  }
}
</script>

<!-- b-form-1.vue -->
<!--
<script>

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
    }
  },

  methods: {
    submit: function () {
      let event = {
        time: Date.now()
      }
      db.collection('events').doc().set(event)
    },

    submit2: function () {

    }
  },

  mounted () {
  }
}
</script>
-->
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
