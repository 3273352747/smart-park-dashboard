<script setup>
const projectName = '智慧园区运营数据可视化平台'
</script>

<template>
  <main class="page">
    <h1>{{ projectName }}</h1>
    <p>前端可视化学习项目</p>
    <button>进入系统 </button>
  </main>
</template>

<style scoped>
.page {
  min-height: 100vh;
  padding: 48px;
  background: #f4f7fb;
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
</style>