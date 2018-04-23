<template>
  <div class="test">
    <app-header></app-header>
    <time-table id="0atjTN4NdauTwMmFAPSg" :editable="false" username="alanolen"></time-table>
  </div>
</template>

<script>
import TimeTable from './calendar/TimeTable'
import ChatBox from './chat/ChatBox'
import AppHeader from './AppHeader'

export default {
  name: 'Test',

  components: {
    TimeTable,
    ChatBox,
    AppHeader
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
  },

  mounted () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
