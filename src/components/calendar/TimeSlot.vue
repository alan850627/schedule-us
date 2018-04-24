<template>
  <div class="time-slot noselect" :class="status" v-on:mouseover="updateStatusDrag" v-on:mousedown="updateStatusClick">
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
    viewSingle: {
      type: Boolean,
      default: false
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

      if (this.viewSingle) {
        return this.response[this.username]
      }

      let status = 'yes'
      usernames.forEach(username => {
        if (this.response[username] === 'maybe') {
          status = 'maybe'
        } else if (this.response[username] === 'no') {
          return 'bad'
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
  background:#D4EDDA
}

.no {
  background:white
}

.bad {
  background:#F7D7DA
}

.maybe {
  background:#FFF3CD
}

.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
</style>
