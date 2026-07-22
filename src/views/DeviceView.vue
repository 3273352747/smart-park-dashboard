<script setup>
import DeviceList from '../components/DeviceList.vue'
</script>

<template>
  <section class="dashboard">
    <header class="dashboard-header">
      <div class="system-title">
        <h1>智慧园区运营数据可视化平台</h1>
      </div>

      <RouterLink to="/" class="back-button">返回首页</RouterLink>
    </header>

    <div class="content-shell">
      <nav class="page-nav">
        <RouterLink to="/overview">运营总览</RouterLink>
        <RouterLink to="/devices">设备管理</RouterLink>
        <RouterLink to="/work-order">工单管理</RouterLink>
        <RouterLink to="/data-query">数据查询</RouterLink>
      </nav>
      <DeviceList />
    </div>
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

.system-title {
  grid-column: 2;
  text-align: center;
}

.system-title h1 {
  margin: 0;
  color: #0b2545;
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

.page-nav {
    display: flex;
    gap: 24px;
    margin: 0 0 24px;
}

.page-nav a {
    color: #667085;
    text-decoration: none;
}

.page-nav .router-link-active {
    color: #2e74b5;
    font-weight: 600;
}
</style>