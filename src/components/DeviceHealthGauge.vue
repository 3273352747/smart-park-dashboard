<script setup>
import { ref,onMounted,onBeforeUnmount,watch } from 'vue'
import * as echarts from 'echarts'
import { formatter } from 'element-plus'

const props = defineProps({
    devices: {
        type: Array,
        default: () => [],
    },
})

const chartRef = ref(null)

let chartInstance = null

function getHealthScore(devices) {
    if(devices.length === 0) return 0

    const scoreMap = {
        运行中: 100,
        告警中: 0,
        离线: 20,
    }

    const totalScore = devices.reduce((sum,device) => {
        return sum + scoreMap[device.status]
    },0)

    return Math.round(totalScore / devices.length)
}

function renderChart() {
    if(!chartInstance){
        chartInstance = echarts.init(chartRef.value)
    }

    const healthScore = getHealthScore(props.devices)

    chartInstance.setOption({
        series: [
            {
                type: 'gauge',
                min: 0,
                max: 100,
                startAngle: 210,
                endAngle: -30,
                progress: {
                    show: true,
                    width: 16,
                },
                axisLine: {
                    lineStyle: {
                        width: 16,
                        color: [
                            [0.6,'#dc2626'],
                            [0.8,'#f59e0b'],
                            [1,'#16a34a'],
                        ],
                    },
                },
                pointer: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                },
                axisLabel: {
                    show: false,
                },
                detail: {
                    valueAnimation: true,
                    formatter: '{value} 分',
                    fontSize: 28,
                    color: '#0b2545',
                    offsetCenter: [0,'10%'],
                },
                title: {
                    fontSize: 14,
                    color: '#667085',
                    offsetCenter: [0,'42%'],
                },
                data: [
                    {
                        value: healthScore,
                        name: '设备健康度',
                    },
                ],
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
    { deep: true}
)

onMounted(() => {
    renderChart()
    window.addEventListener('resize',resizeChart)
})

onBeforeUnmount(() => {
    window.removeEventListener('resize',resizeChart)
    chartInstance?.dispoae()
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