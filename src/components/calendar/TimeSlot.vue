<template>
  <div class="time-slot" :class="status" v-on:mouseover="updateStatusDrag" v-on:mousedown="updateStatusClick">
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
    mouseDown: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: ''
    },
    editable: {
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
    response: {
      type: Object,
      default: () => { return {} }
    }
  },

  computed: {
    displayTime: function () {
      return moment(this.startTime).format('LT')
    },

    status: function () {
      let usernames = Object.keys(this.response)
      if (usernames.length === 0) {
        return 'no'
      }

      let status = 'yes'
      usernames.forEach(username => {
        if (this.response[username] === 'maybe') {
          status = 'maybe'
        } else if (this.response[username] === 'no') {
          status = 'no'
        }
      })
      return status
    }
  },

  data () {
    return {
      changeFlag: false
    }
  },

  methods: {
    updateStatusClick: function () {
      if (this.editable) {
        this.cycleStatus()
      }
    },
    updateStatusDrag: function () {
      if (!this.changeFlag && this.editable && this.mouseDown) {
        this.cycleStatus()
      }
    },
    cycleStatus: function () {
      if (!this.response[this.username] || this.response[this.username] === 'no') {
        this.$set(this.response, this.username, 'yes')
      } else if (this.response[this.username] === 'yes') {
        this.$set(this.response, this.username, 'maybe')
      } else if (this.response[this.username] === 'maybe') {
        this.$set(this.response, this.username, 'no')
      }
      this.changeFlag = true
    }
  },

  watch: {
    mouseDown: function (newMouseDown, oldMouseDown) {
      if (!newMouseDown) {
        this.changeFlag = false
      }
    }
  },

  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.yes {
  background:green
}
.no {
  background:white
}
.maybe {
  background:yellow
}
</style>
