<script setup>
import { computed } from "vue"
import { deviceManager } from "../data/devices"
import { RouterLink } from "vue-router"


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

const totalEnergy = computed(() => {
    return deviceManager.reduce((sum,device) => sum + device.energy,0)
})

const alarmDevices = computed(() => {
    return deviceManager.filter((device) => device.alarmCount > 0)
})
</script>

<template>
  <section class="dashboard">
    <header class="dashboard-header">
      <div class="system-title">
        <h1>智慧园区运营数据可视化平台</h1>
      </div>

      <RouterLink to="/" class="back-button">返回首页</RouterLink>
    </header>

    <main class="content-shell">
      <nav class="page-nav"><RouterLink to="/overview">运营总览</RouterLink> <RouterLink to="/devices"> 设备管理</RouterLink>
      </nav>

      <h2>运营总览</h2>

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

      <el-card class="alarm-card">
        <template #header>当前告警设备</template>

        <p v-if="alarmDevices.length === 0">当前没有告警设备</p>

        <div v-for="device in alarmDevices" :key="device.code" class="alarm-item">
            <span>{{ device.name }}</span>
            <el-tag type="danger">告警 {{ device.alarmCount }} 条</el-tag>
        </div>
      </el-card>
    </main>
  </section>
</template>
    

<style scoped>
.dashboard {
  min-height: 100vh;
  padding: 32px 48px;
  background: #f4f7fb;
}

.dashboard-header {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-header h1 {
    grid-column: 2;
    margin: 0;
    color: #0b2545;
    text-align: center;
}

.back-button {
    grid-column: 3;
    justify-self: end;
    padding: 10px 16px;
    color: #fff;
    background: #2e74b5;
    border-radius: 4px;
    text-decoration: none;
}

.content-shell {
  max-width: 980px;
  margin: 0 auto;
}

.page-nav a {
    color: #667085;
    text-decoration: none;
}

.page-nav .router-link-active {
    color: #2e74b5;
    font-weight: 600;
}

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

.alarm-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #e4e7ec;
}
</style>