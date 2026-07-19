<script setup>
import devicelist from day03-app.vue
import {ref} from "vue"
const hasEntrySystem = ref(false)
const projectName = '智慧园区运营数据可视化平台'
function entrySystem(){
    hasEntrySystem.value = true
}
function toBackHome(){
    hasEntrySystem.value = false
}
</script>

<template>
    <main v-if="!hasEntrySystem" class="page">
        <h1>{{projectName}}</h1>
        <p>数据可视化平台</p>
        <button @click="entrySystem">进入系统</button>
    </main>

    <section v-else class="dashboard">
        <header class="dashboard-header">
            <div class="system-title">
                <h1>{{ projectName }}</h1>
            </div>
            <button @click="toBackHome">返回首页</button>
        </header>

        <div class="content-shell">
            <p class="breadcrumb">运营总览/设备管理</p>
            <day04-devicelist />
        </div>
    </section>
</template>

<style scoped>
.page {
    min-height: 100%;
    padding: 48px;
    background: #f4f7fb;
    text-align: center;

}

h1 {
    color: #0b2545;

}

.page p {
    color: #0b2545;
    margin: 12px 0 24px;

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
    min-height: 100%;
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

.dashboard-header button {
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

.dashboard-header h1 {
    margin: 0;
}
</style>