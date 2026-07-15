<script setup>
import DeviceList from './components/DeviceList.vue'
import { ref } from 'vue'
const projectName = '智慧园区运营数据可视化平台'
const hasEnteredSystem = ref(false)

function enterSystem() {
  hasEnteredSystem.value = true
}

function backToHome() {
  hasEnteredSystem.value = false
}
</script>

<template>
  <main v-if="!hasEnteredSystem" class="page">
    <h1>{{ projectName }}</h1>
    <p>前端可视化学习项目</p>
    <button @click="enterSystem">进入系统 </button>
  </main>

  <section v-else class="dashboard">
    <header class="dashboard-header">
      <div>
        <h1>{{ projectName }}</h1>
        <p>运营总览/设备管理</p>
      </div>
      <button @click="backToHome">返回首页</button>
    </header>


    <DeviceList />
  </section>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 48px;
  background: #f4f7fb;
  text-align: center;
}

h1{
  color: #0b2545;
}

button {
  padding: 10px 16px;
  background: #2e74b5;
  color: #fff;
  border: 0;
  border-radius: 4px;
  cursor: pointer;
}

.dashboard {
  min-height: 100vh;
  padding: 32px 48px;
  background: #f4f7fb;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.dashboard-header h1,
.dashboard-header p {
  margin: 0;
}

.dashboard-header p{
  margin-top: 8px;
  color: #667085;
}
</style>