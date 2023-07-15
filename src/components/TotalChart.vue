<template>
  <div :v-if="loaded">
    <Pie 
    :chart-options="chartOptions" 
    :chart-data="chartData" 
    :width="width" 
    :height="height" 
    />
  </div>
</template>

<script>
import { Pie } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
} from "chart.js";
import axios from "axios";

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "TotalChart",
  components: { Pie },
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
  },
  data: function () {
    return {
      loaded: false,
      chartData: null,
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  mounted() {
    this.loaded = false;

    axios
      .get("http://localhost:8080/api/koordinat/q/data/?type=total")
      .then((r) => {
        const dataChart = {
          labels: r.data.map((item) => item.t_kejahatan),
          datasets: [
            {
              data: r.data.map((item) => item.crime_count),
              backgroundColor: ["#E9E900", "#D03F05", "#2095F3", "#00E924"],
            },
          ],
        };
        this.chartData = dataChart;

        this.loaded = true;
      })
      .catch((e) => {
        console.error(e);
      });
  },
};
</script>
<style lang=""></style>
