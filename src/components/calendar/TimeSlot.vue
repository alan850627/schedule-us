<template>
  <div class="time-slot">
    {{ displayTime }}
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TimeSlot',

  components: {
  },

  props: {
    username: {
      type: String,
      default: ''
    },
    selectable: {
      type: Boolean,
      default: false
    },
    startTime: {
      required: true,
      type: Number,
      default: 0
    },
    length: {
      type: Number,
      default: 3600000
    },
    responses: {
      type: Object,
      default: () => { return {} }
    }
  },

  computed: {
    displayTime: function () {
      return moment(this.startTime).format('LT')
    },

    status: function () {
      let status = 'available'
      Object.keys(this.responses).forEach(username => {
        if (this.responses[username] === 'maybe') {
          status = 'maybe'
        } else if (this.responses[username] === 'no') {
          status = 'no'
        }
      })
      return status
    }
  },

  data () {
    return {
    }
  },

  methods: {
  },

  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
