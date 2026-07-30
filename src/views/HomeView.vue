<template>
  <main class="page">
    <h1>智慧园区运营数据可视化平台</h1>
    <p>前端可视化学习项目</p>
    <RouterLink to="/devices" class="enter-button">进入系统</RouterLink>
  </main>
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

p {
    margin: 12px 0 24px;
    color: #667085;
}

.enter-button {
  display: inline-block;
  padding: 10px 16px;
  color: #fff;
  background: #2e74b5;
  border-radius: 4px;
  text-decoration: none;
}

@media (max-width: 768px) {
  .page {
    padding: 48px 16px 24px;
  }

  h1 {
    margin: 0;
    font-size: 32px;
    line-height: 1.35;
  }

  p {
    margin: 16px 0 24px;
  }
}
</style>