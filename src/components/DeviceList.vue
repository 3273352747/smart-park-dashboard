<script setup>
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
</script>

<template>
  <main>
    <h2 class="section-title">设备列表</h2>
    <p>设备总数：{{ deviceManager.length }}</p>

    <div class="filter-bar">
      <button v-for="status in statusOptions" :key="status" class="filter-button" :class="{active: activeStatus === status}" @click="activeStatus = status">{{status}}</button>
    </div>

    <p>当前筛选状态：{{ activeStatus }}</p>

    <ul>
        <li v-for="device in filteredDevices" :key="device.code">
            <strong>{{ device.name }}</strong>
            <span>编号：{{ device.code }}</span>
            <span>状态：{{ device.status }}</span>
            <span>能耗：{{ device.energy }} KWh</span>
            <span>告警：{{ device.alarmCount }} 条</span>
        </li>
    </ul>
  </main>
  </template>

  <style scoped>
  main {
    max-width: 800px;
    margin: 40px auto;
    font-family: Arial, sans-serif;
  }

li{
    display: flex;
    gap: 16px;
    margin: 10px 0;
    padding: 14px;
    border: 1px solid #ddd;
}

.section-title {
    margin: 0 0 8px;
    color: #0b2545;
    font-size: 24px;
    text-align: left;
}

.filter-bar{
  display: flex;
  gap: 10px;
  margin: 16px 0;
}

.filter-button{
  padding: 8px 14px;
  color: #475467;
  background: #fff;
  border: 1px solid #d0d5dd;
  border-radius: 4px;
  cursor: pointer;
}

.filter-button.active{
  color: #fff;
  background: #2e74b5;
  border-color: #2e74b5;
}
</style>