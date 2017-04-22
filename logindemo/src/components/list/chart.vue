<template>
  <div class="chart">

  </div>
</template>

<script>

export default {
  name: 'chart',
  data() {
      return {
        linChart: null,
      }
  },
  methods: {
    drawChart: function () {
    },
  },
  created: function () {
    this.$nextTick(this.drawChart, 100);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .chart {
    width: 100%;
    height: 100%;
    padding: 20px;
  }

</style>
