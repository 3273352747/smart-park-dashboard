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
      <div class="system-title">
        <h1>{{ projectName }}</h1>
      </div>
      <button @click="backToHome">返回首页</button>
    </header>

    <div class="content-shell">
      <p class="breadcrumb">运营总览 <span></span>设备管理</p>
      <DeviceList />
    </div>
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
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: 24px;
}

.system-title {
  grid-column: 2;
  text-align: center;
}

.system-title h1 {
  margin: 0;
}

.dashboard-header button{
  grid-column: 3;
  justify-self: end;
}

.content-shell {
  max-width: 980px;
  margin: 0 auto;
}

.breadcrumb {
  margin: 0 0 16px;
  color: #667085;
  text-align: left;
}

.breadcrumb span {
  margin: 0 8px;
  color: #98a2b3;
}

.dashboard-header h1,
.dashboard-header p {
  margin: 0;
}

.dashboard-header p{
  margin-top: 30px;
  color: #667085;
}
</style>