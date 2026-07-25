<script setup>
import { ref,onMounted,onBeforeUnmount,watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)

const props = defineProps({
  devices: {
    type: Array,
    default: () => [],
  },
})

let chartInstance = null

function renderChart() {
    const statusData = [
        {
            name: '运行中',
            value: props.devices.filter((device) => device.status === '运行中').length,
            itemStyle: { color: '#16a34a' },
        },
        {
            name: '离线',
            value: props.devices.filter((device) => device.status === '离线').length,
            itemStyle: { color: '#98a2b3' },
        },
        {
            name: '告警中',
            value: props.devices.filter((device) => device.status === '告警中').length,
            itemStyle: { color: '#dc2626' },
        },
    ]

    if (!chartInstance) {
  chartInstance = echarts.init(chartRef.value)
}

    chartInstance.setOption({
        tooltip: {
            trigger: 'item',
        },
        legend: {
            bottom: 0,
        },
        series: [
            {
                name: '设备状态',
                type: 'pie',
                radius: ['48%','72%'],
                label: {
                    formatter: '{b}: {c}',
                },
                data: statusData,
            },
        ],
    })
}

function resizeChart() {
    chartInstance?.resize()
}

watch(
  () => props.devices,
  () => {
    renderChart()
  },
  { deep: true }
)

onMounted(() => {
    renderChart()
    window.addEventListener('resize',resizeChart)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize',resizeChart)
    chartInstance?.dispose()
})
</script>

<template>
    <div ref="chartRef" class="chart"></div>
</template>

<style scoped>
.chart {
    width: 100%;
    height: 320px;
}
</style>