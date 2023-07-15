<template>
  <div :v-if="loaded">
    <Bar
      :chart-options="chartOptions"
      :chart-data="chartData"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "LatestChart",
  components: { Bar },
  props: {
    width: {
      type: Number,
      default: 600,
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
        maintainAspectRatio: false,
        categoryPercentage: 0.5,
        barPercentage: 0.5,
        borderRadius: 17,
        scales: {
          x: {
            stacked: true, 
          },
          y: {
            stacked: true,
          },
        },
      },
    };
  },
  mounted() {
    this.loaded = false;

    axios
      .get("http://localhost:8080/api/koordinat/q/data/?type=latest")
      .then((response) => {
        const dataChart = {
          labels: response.data.map((item) => item.day_name),
          datasets: [
            {
              label: "Kemalingan",
              backgroundColor: "#00E924",
              data: response.data.map((item) => item.kemalingan),
            },
            {
              label: "Pembacokan",
              backgroundColor: "#D03F05",
              data: response.data.map((item) => item.pembacokan),
            },
            {
              label: "Pencurian",
              backgroundColor: "#E9E900",
              data: response.data.map((item) => item.pencurian),
            },
            {
              label: "Perampokan",
              backgroundColor: "#2095F3",
              data: response.data.map((item) => item.perampokan),
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
