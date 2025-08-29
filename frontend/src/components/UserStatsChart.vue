<template>
  <div>
    <BarChart v-if="chartData" :chart-data="chartData" :chart-options="chartOptions" />
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { defineComponent, computed } from 'vue'
import { Bar as BarChart } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: 'UserStatsChart',
  components: { BarChart },
  props: {
    totalUsers: Number,
    activeUsers: Number,
    admins: Number,
    inactiveUsers: Number
  },
  setup(props) {
    const chartData = computed(() => ({
      labels: ['Total', 'Active', 'Admins', 'Banned'],
      datasets: [
        {
          label: 'User Statistics',
          backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'],
          data: [props.totalUsers, props.activeUsers, props.admins, props.inactiveUsers]
        }
      ]
    }))

    const chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          labels: { color: '#9CA3AF' }
        },
        title: {
          display: true,
          text: 'User Distribution',
          color: '#111827'
        }
      },
      scales: {
        x: {
          ticks: { color: '#9CA3AF' },
          grid: { color: '#374151' }
        },
        y: {
          ticks: { color: '#9CA3AF' },
          grid: { color: '#374151' }
        }
      }
    }

    return { chartData, chartOptions }
  }
})
</script>