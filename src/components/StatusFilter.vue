<script setup>
const props = defineProps({
    statusOptions: {
        type: Array,
        required: true,
    },
    activeStatus: {
        type: String,
        required: true,
    },
})

const emit = defineEmits(['change'])
</script>

<template>
<div class="toolbar">
      <span  class="toolbar-label">设备状态</span>
      <el-button v-for="status in props.statusOptions" :key="status" :type="props.activeStatus === status ? 'primary':'default'" @click="emit('change',status)">{{status}}</el-button>
    </div>
  </template>

<style scoped>
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

@media (max-width: 768px) {
  .toolbar {
    flex-wrap: wrap;
    align-items: flex-start;
    gap: 8px;
    margin: 16px 0;
  }

  .toolbar-label {
    flex: 0 0 100%;
  }

  .toolbar :deep(.el-button + .el-button) {
    margin-left: 0;
  }
}
</style>