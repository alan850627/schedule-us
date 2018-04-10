<template>
  <div class="test">
    <time-table id="LNxvLP8ahJdMyLFY1b5c"></time-table>
    <button v-on:click="submit()">New Table</button>
  </div>
</template>

<script>
import TimeTable from './calendar/TimeTable'
import db from '../firebaseInit'

export default {
  name: 'Test',

  components: {
    TimeTable
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
      let table = this.makeTable()
      console.log(table)
      db.collection('time-table').doc().set(table)
    },
    makeTable: function (table = {}, startTime = 1523336400000, length = 3600000, n = 72) {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
