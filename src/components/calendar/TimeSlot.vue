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
      let status = 'yes'
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
      if (!this.responses[this.username] || this.responses[this.username] === 'no') {
        this.$set(this.responses, this.username, 'yes')
      } else if (this.responses[this.username] === 'yes') {
        this.$set(this.responses, this.username, 'maybe')
      } else if (this.responses[this.username] === 'maybe') {
        this.$set(this.responses, this.username, 'no')
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
