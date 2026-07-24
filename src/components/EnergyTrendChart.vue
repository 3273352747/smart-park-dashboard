<script setup>
import { ref,onMounted,onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import { energyTrendData } from '../data/energyTrend'

const chartRef = ref(null)

let chartInstance = null

function renderChart() {
    chartInstance = echarts.init(chartRef.value)

    chartInstance.setOption({
        tooltip: {
            trigger: 'axis',
        },
        grid: {
            left: 56,
            right: 28,
            top: 32,
            bottom: 40,
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: energyTrendData.map((item) => item.date),
        },
        yAxis: {
            type: 'value',
            name: 'kWh',
        },
        series: [
            {
                name: '园区总消耗',
                type: 'line',
                smooth: true,
                data: energyTrendData.map((item) => item.energy),
                symbol: 'circle',
                symbolSize: 8,
                lineStyle: {
                    width: 3,
                    color: '#2e74b5',
                },
                itemStyle: {
                    color: '#2e74b5',
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