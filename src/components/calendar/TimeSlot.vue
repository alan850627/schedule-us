<template>
  <div v-b-tooltip.rightbottom :title="hoverText"  placement="rightbottom" id="timeslot" class="time-slot noselect" :style="`background:${status}`" v-on:mouseover="updateStatusDrag" v-on:mousedown="updateStatusClick">
    {{ displayTime }}
  </div>
</template>

<script>
import moment from 'moment'
import invertBy from 'lodash/invertBy'
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

    hoverText: function () {
      let grouped = invertBy(this.response, (res) => {
        return res
      })
      let str = '[yes]- '
      if (grouped['yes']) {
        Object.keys(grouped['yes']).forEach((person) => {
          str += `${grouped['yes'][person]}; `
        })
      }
      str += '\n[maybe]- '
      if (grouped['maybe']) {
        Object.keys(grouped['maybe']).forEach((person) => {
          str += `${grouped['maybe'][person]}; `
        })
      }
      str += '\n[no]- '
      if (grouped['no']) {
        Object.keys(grouped['no']).forEach((person) => {
          str += `${grouped['no'][person]}; `
        })
      }
      return str
    },

    status: function () {
      let usernames = Object.keys(this.response)
      if (usernames.length === 0) {
        return 'white'
      }

      if (this.viewSingle) {
        let r = this.response[this.username]
        if (r === 'yes') {
          return 'rgb(0, 230, 0)'
        } else if (r === 'maybe') {
          return 'rgb(230, 230, 0)'
        } else {
          return 'white'
        }
      }

      let r = 0
      let g = 0
      let b = 0
      let step = 230 / usernames.length
      usernames.forEach(username => {
        if (this.response[username] === 'yes') {
          g += step
        } else if (this.response[username] === 'maybe') {
          g += step
          r += step
        } else if (this.response[username] === 'no') {
          r += step
        }
      })
      return `rgb(${r}, ${g}, ${b})`
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
