<script setup>
import { ref,onMounted,onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { deviceManager } from '../data/devices'

const chartRef = ref(null)
let chartInstance = null

function renderChart() {
    const devices = [...deviceManager]

    chartInstance = echarts.init(chartRef.value)

    chartInstance.setOption({
        tooltip: {
            trigger: 'axis',
        },

        grid: {
            left: 48,
            right: 24,
            top: 32,
            bottom: 48,
        },

        xAxis: {
            type: 'category',
            data: devices.map((device) => device.name),
            axisLabel: {
                interval: 0,
            },
        },

        yAxis: {
            type: 'value',
            name: 'kWh',
        },

        series: [
            {
               name: '当前能耗',
               type: 'bar',
               data: devices.map((device) => device.energy),
               barWidth: 36,
               itemStyle: {
                color: '#2e74b5',
                borderRadius: [4,4,0,0],
               },
            },
        ],
    })
}

function resizeChart() {
    chartInstance?.resize()
}

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