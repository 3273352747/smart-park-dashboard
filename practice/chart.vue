<script setup>
import { ref,onMounted,onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)

let chartInstance = null

function renderChart() {
    chartInstance = echarts.init(chartRef.value)

    chartInstance.setOption({
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: 10,
            right: 20,
            top: 24,
            bottom: 20,
        },
        xAxis: {
            type: 'categroy',
            data: devices.map((item) => item.name),
            axislabel: {
                interval: 0,
            },
        },
        yAxis: {
            type: 'value',
            name: 'kWh',
        },
        series: [
            {

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
    <div ref="chart" class="chart"></div>
</template>

<style scoped>
.chart {
    width: 100%;
    height: 520px;
}
</style>