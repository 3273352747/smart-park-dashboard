<script setup>
import {ref,computed,watch} from "vue"
import { useRoute } from 'vue-router'
import { deviceManager } from "../data/devices"
import StatusFilter from "./StatusFilter.vue"
const activeStatus = ref('全部')
const keyword = ref('')
const statusOptions = ['全部','运行中','离线','告警中']

const detailVisible = ref(false)
const selectedDevice = ref(null)

const route = useRoute()

watch(
  () => route.query.status,
  (status) => {
    activeStatus.value = statusOptions.includes(status) ? status : '全部'
  },
  { immediate: true }
)

const filteredDevices = computed(() => {
  let result = deviceManager

  if(activeStatus.value !== '全部'){
    result = result.filter((device) => {
      return device.status === activeStatus.value
    })
  }

  const searchText = keyword.value.trim().toLowerCase()

  if(searchText) {
    result = result.filter((device) => {
      return (
        device.name.toLocaleLowerCase().includes(searchText) ||
        device.code.toLocaleLowerCase().includes(searchText)
      )
    })
  }

  return result
})

const totalDevices = computed(() => deviceManager.length)

const runningCount = computed(() => {
  return deviceManager.filter((device) => device.status === '运行中').length
})

const offlineCount = computed(() => {
  return deviceManager.filter((device) => device.status === '离线').length
})

const alarmingCount = computed(() =>{
  return deviceManager.filter((device) => device.status === '告警中').length
})

function handleStatusChange(status){
  activeStatus.value = status
}

function openDeviceDetail(device) {
  selectedDevice.value = device
  detailVisible.value = true
}

function getStatusTagType(status) {
  const typeMap = {
    运行中: 'success',
    离线: 'info',
    告警中: 'danger',
  }

  return typeMap[status] || 'info'
}
</script>

<template>
  <main>
    <h2 class="section-title">设备列表</h2>
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

      <el-input
      v-model="keyword"
      clearable
      placeholder="请输入设备名称或编号"
      class="search-input"
      />

    <StatusFilter
      :status-options="statusOptions"
      :active-status="activeStatus"
      @change="handleStatusChange"
      />

      <el-card class="table-card">
        <el-table class="device-table" :data="filteredDevices" border empty-text="暂无符合条件的设备" style="width:100%">
            <el-table-column prop="name" label="设备名称"/>
            <el-table-column prop="code" label="设备编号"/>
            <el-table-column prop="energy" label="能耗(kWh)"/>
            <el-table-column prop="alarmCount" label="告警数"/>

            <el-table-column label="状态">
              <template #default="{ row }">
                <el-tag :type="getStatusTagType(row.status)">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作" width="100">
              <template #default="{ row }">
                <el-button link type="primary" @click="openDeviceDetail(row)">
                  详情
                </el-button>
              </template>
            </el-table-column>
        </el-table>
      </el-card>

      <el-drawer v-model="detailVisible" title="设备详情" size="90%" style="max-width: 380px;">
        <el-descriptions v-if="selectedDevice" :column="1" border>
          <el-descriptions-item label="设备名称">
            {{ selectedDevice.name }}
          </el-descriptions-item>

        <el-descriptions-item label="设备编号">
          {{ selectedDevice.code }}
        </el-descriptions-item>

        <el-descriptions-item label="运行状态">
          <el-tag :type="getStatusTagType(selectedDevice.status)">
            {{ selectedDevice.status }}
          </el-tag>
        </el-descriptions-item>

        <el-descriptions-item label="当前能耗">
          {{ selectedDevice.energy }} kWh
        </el-descriptions-item>

        <el-descriptions-item label="告警数量">
          {{ selectedDevice.alarmCount }} 条
        </el-descriptions-item>
        </el-descriptions>
      </el-drawer>

  </main>
  </template>

  <style scoped>
  main {
    max-width: 800px;
    margin: 40px auto;
    font-family: Arial, sans-serif;
  }

.section-title {
    margin: 0 0 8px;
    color: #0b2545;
    font-size: 24px;
    text-align: left;
}

.table-card {
  margin-top: 16px;
}

.stats-grid{
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 12px;
  margin: 16px 0;
}

.stat-card{
  padding: 16px;
  background: #fff;
  border: 1px solid #e4e7ec;
  border-radius: 6px;
}

.stat-card span{
  display: block;
  color: #667085;
  font-size: 14px;
}

.stat-card strong{
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

.search-input {
  width: 280px;
  margin-top: 16px;
}

@media (max-width: 768px) {
  main {
    width: 100%;
    margin: 24px 0 0;
  }

  .section-title {
    font-size: 22px;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin: 12px 0;
  }

  .stat-card {
    padding: 0;
  }

  :deep(.stat-card .el-card__body) {
    padding: 14px;
  }

  .stat-card strong {
    font-size: 24px;
  }

  .search-input {
    width: 100%;
    margin-top: 12px;
  }

    .table-card {
    width: 100%;
    margin-top: 12px;
  }

  .table-card :deep(.el-card__body) {
    overflow-x: auto;
    padding: 12px;
  }

  .device-table {
    min-width: 720px;
  }
}
</style>