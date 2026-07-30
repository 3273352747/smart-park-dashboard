<script setup>
import { ref,onMounted,onBeforeUnmount,watch } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref(null)
let chartInstance = null

const props = defineProps({
    devices: {
        type: Array,
        default: () => [],
    },
})

function renderChart() {

    if(!chartInstance){
        chartInstance = echarts.init(chartRef.value)
    }

    chartInstance.setOption({
        tooltip: {
            trigger: 'axis',
        },

        grid: {
            left: 48,
            right: 24,
            top: 32,
            bottom: 64,
        },

        xAxis: {
            type: 'category',
            data: props.devices.map((device) => device.name),
            axisLabel: {
                interval: 0,
                fontSize: 11,
                lineHeight: 16,
                formatter(value) {
                    return value.replace(
                        '配电设备',
                        '\n配电设备'
                    )
                },
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
               data: props.devices.map((device) => device.energy),
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