<script setup>
import { el } from "element-plus/es/locales.mjs"
import {ref,computed} from "vue"
const deviceManager = [
  { name: '1号配电设备', code: 'A-001', status: '运行中', energy: 85, alarmCount: 1 },
  { name: '2号配电设备', code: 'A-002', status: '离线', energy: 90, alarmCount: 0 },
  { name: '3号配电设备', code: 'A-003', status: '告警中', energy: 75, alarmCount: 2 },
  { name: '4号配电设备', code: 'A-004', status: '离线', energy: 80, alarmCount: 0 },
  { name: '5号配电设备', code: 'A-005', status: '运行中', energy: 95, alarmCount: 0 },
]
const activeStatus = ref('全部')
const statusOptions = ['全部','运行中','离线','告警中']

const filteredDevices = computed(() => {
  if(activeStatus.value === '全部'){
    return deviceManager
  }

  return deviceManager.filter((device) => {
    return device.status === activeStatus.value
  })
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

    <div class="toolbar">
      <span  class="toolbar-label">设备状态</span>
      <el-button v-for="status in statusOptions" :key="status" :type="activeStatus === status ? 'primary':'default'" @click="activeStatus = status">{{status}}</el-button>
    </div>

      <el-card class="table-card">
        <el-table :data="filteredDevices" border style="width:100%">
            <el-table-column prop="name" label="设备名称"/>
            <el-table-column prop="code" label="设备编号"/>
            <el-table-column prop="energy" label="能耗(kWh)"/>
            <el-table-column prop="alarmCount" label="告警数"/>

            <el-table-column label="状态">
              <template #default="{ row }">
                <el-tag :type="row.status === '运行中' ? 'success' : row.status === '离线' ? 'info' : 'danger'">
                  {{ row.status }}
                </el-tag>
              </template>
            </el-table-column>
        </el-table>
      </el-card>
        
    <p v-if="filteredDevices.length === 0" class="empty-text">暂无符合条件的设备</p> 
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

.toolbar{
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.toolbar-label {
  color: #344054;
  font-weight: 600;
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

.empty-text{
  margin-top: 24px;
  color: #98a2b3;
  text-align: center;
}
</style>