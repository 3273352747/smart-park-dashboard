<script setup>
import { computed,ref } from "vue"
import { deviceManager } from "../data/devices"
import { useRouter } from "vue-router"
import EnergyBarChart from "../components/EnergyBarChart.vue"
import DeviceStatusChart from "../components/DeviceStatusChart.vue"
import EnergyTrendChart from "../components/EnergyTrendChart.vue"
import DeviceHealthGauge from "../components/DeviceHealthGauge.vue"
import DashboardLayout from "../components/DashboardLayout.vue"

const router = useRouter()

const selectedRegion = ref('全部')
const selectedType = ref('全部')

const regionOptions = ['全部','东区','西区']
const typeOptions = ['全部','配电设备','空调设备','安防设备']

const filteredOverviewDevices = computed(() => {
  return deviceManager.filter((device) => {
    const regionMatched = selectedRegion.value === '全部' || device.region === selectedRegion.value

    const typeMatched = selectedType.value === '全部' || device.type === selectedType.value

    return regionMatched && typeMatched
  })
})

function goToAlarmDevices() {
  router.push({
    path: '/devices',
    query: {
      status: '告警中',
    },
  })
}

const totalDevices = computed(() => filteredOverviewDevices.value.length)

const runningCount = computed(() => {
  return filteredOverviewDevices.value.filter((device) => device.status === '运行中').length
})

const offlineCount = computed(() => {
  return filteredOverviewDevices.value.filter((device) => device.status === '离线').length
})

const alarmingCount = computed(() =>{
  return filteredOverviewDevices.value.filter((device) => device.status === '告警中').length
})

const totalEnergy = computed(() => {
    return filteredOverviewDevices.value.reduce((sum,device) => sum + device.energy,0)
})

const alarmDevices = computed(() => {
    return filteredOverviewDevices.value.filter((device) => {
      return device.status === '告警中'
    })
})
</script>

<template>
    <DashboardLayout>

      <h2>运营总览</h2>

      <el-card class="filter-card">
        <el-form inline>
          <el-form-item label="园区区域">
            <el-select v-model="selectedRegion" style="width: 140px">
              <el-option
              v-for="region in regionOptions"
              :key="region"
              :label="region"
              :value="region"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="设备类型">
            <el-select v-model="selectedType" style="width: 140px">
              <el-option
              v-for="type in typeOptions"
              :key="type"
              :label="type"
              :value="type"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="stats-grid">
    <el-card class="stat-card">
        <span>设备总数</span>
        <strong>{{ totalDevices }}</strong>
      </el-card>

      <el-card class="stat-card running">
        <span>运行中</span>
        <strong>{{ runningCount }}</strong>
      </el-card>

      <el-card class="stat-card offline">
        <span>离线</span>
        <strong>{{ offlineCount }}</strong>
      </el-card>

      <el-card class="stat-card alarming">
        <span>告警中</span>
        <strong>{{ alarmingCount }}</strong>
      </el-card>
      </div>

      <el-card class="energy-card">
        <span>园区累计能耗</span>
        <strong>{{ totalEnergy }}</strong>
      </el-card>

      <div class="chart-grid">
      <el-card>
        <template #header><span>设备能耗对比</span></template>
        <EnergyBarChart :devices="filteredOverviewDevices" />
      </el-card>

      <el-card>
        <template #header><span>设备状态分布</span></template>
        <DeviceStatusChart :devices="filteredOverviewDevices" />
      </el-card>
    </div>

    <div class="lower-chart-grid">
      <el-card>
      <template #header>
        <span>近 7 日园区总能耗趋势（全园区）</span>
      </template>
      <EnergyTrendChart />
    </el-card>

    <el-card>
      <template #header>
        <span>设备健康度</span>
      </template>
      <DeviceHealthGauge :devices="filteredOverviewDevices" />
    </el-card>
    </div>

      <el-card class="alarm-card">
        <template #header>当前告警设备</template>

        <p v-if="alarmDevices.length === 0">当前没有告警设备</p>

        <div v-for="device in alarmDevices" :key="device.code" type="button" class="alarm-item" @click="goToAlarmDevices">
            <span>{{ device.name }}</span>
            <el-tag type="danger">告警 {{ device.alarmCount }} 条</el-tag>
        </div>
      </el-card>
    </DashboardLayout>
</template>
    

<style scoped>
.stats-grid{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 12px;
  margin: 16px 0;
}

.stat-card span,
.energy-card span{
  display: block;
  color:#667085 ;
}

.stat-card strong,
.energy-card strong{
  display: block;
  margin-top: 8px;
  color: #0b2545;
  font-size: 28px;
}

.running strong{
  color: #16a34a;
}

.offline strong{
  color: #667085;
}

.alarming strong{
  color: #dc2626;
}

.energy-card,
.alarm-card {
  margin-top: 16px;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(2,minmax(0,1fr));
  gap: 16px;
  margin-top: 16px;
}

.lower-chart-grid {
  display: grid;
  grid-template-columns: minmax(0,2fr) minmax(280px,1fr);
  gap: 16px;
  margin-top: 16px;
}

.alarm-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e4e7ec;
    cursor: pointer;
    width: 100%;
    color: inherit;
    font: inherit;
    text-align: left;
    background: transparent;
    border-top: 0;
    border-right: 0;
    border-left: 0;
}

.alarm-item:focus-visible {
  outline: 2px solid #2e74b5;
  outline-offset: 2px;
}

.alarm-item:hover {
  background: #f8fafc;
}

.filter-card {
  margin: 16px 0;
}

@media (max-width: 768px) {
    h2 {
    font-size: 22px;
  }

  .filter-card :deep(.el-card__body) {
    padding: 16px;
  }

  .filter-card :deep(.el-form-item) {
    display: flex;
    margin-right: 0;
    margin-bottom: 12px;
  }

  .filter-card :deep(.el-form-item:last-child) {
    margin-bottom: 0;
  }

  .filter-card :deep(.el-form-item__label) {
    width: 72px;
    justify-content: flex-start;
  }

  .filter-card :deep(.el-form-item__content) {
    min-width: 0;
    flex: 1;
  }

  .filter-card :deep(.el-select) {
    width: 100% !important;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin: 12px 0;
  }

  .stat-card strong,
  .energy-card strong {
    font-size: 24px;
  }

  .stat-card :deep(.el-card__body),
  .energy-card :deep(.el-card__body) {
    padding: 14px;
  }

    .chart-grid,
  .lower-chart-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    margin-top: 12px;
  }

  .chart-grid :deep(.el-card__body),
  .lower-chart-grid :deep(.el-card__body) {
    padding: 12px;
  }

  .chart-grid :deep(.chart),
  .lower-chart-grid :deep(.chart) {
    height: 280px;
  }
}
</style>