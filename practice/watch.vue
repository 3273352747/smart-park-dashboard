<script setup>
import {ref,watch} from 'vue'

const status = ref('全部')

watch(status,(newStatus,oldStatus) => {
    console.log('旧状态：',oldStatus)
    console,log('新状态：',newStatus)
})
</script>

<template>
    <button @click="status = '运行中'">运行中</button>
    <button @click="status = 离线">离线</button>

    <p>当前状态：{{ status }}</p>
</template>