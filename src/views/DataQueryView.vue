<script setup>
import { reactive, computed,ref,watch,onMounted } from 'vue'
import { getDeviceRecords } from '../api/device'

const queryForm = reactive({
    dateRange: [],
    status: '全部',
})

const queryParams = reactive({
    dateRange: [],
    status: '全部',
})

const currentPage = ref(1)
const pageSize = 3

const deviceRecords = ref([])
const loading = ref(false)
const errorMessage = ref('')

async function loadDeviceRecords(shouldFail = false) {
    loading.value = true
    errorMessage.value = ''

    try{
        deviceRecords.value = await getDeviceRecords(shouldFail)
    } catch(error){
        deviceRecords.value = []
        errorMessage.value = error.message || '数据加载失败，请稍后重试'
    } finally{
        loading.value = false
    }
}

onMounted(() => {
    loadDeviceRecords()
})

const filteredDevices = computed(() => {
    let result = deviceRecords.value

    if(queryParams.status !== '全部'){
        result = result.filter((device) => {
            return device.status === queryParams.status
        })
    }

    if(queryParams.dateRange.length === 2){
        const [startDate,endDate] = queryParams.dateRange

        result = result.filter((device) => {
            return device.recordDate >= startDate && device.recordDate <= endDate
        })
    }
    return result
})

const paginatedDevices = computed(() => {
    const start = (currentPage.value-1)*pageSize
    const end = start + pageSize

    return filteredDevices.value.slice(start,end)
})

function handleQuery() {
    queryParams.status = queryForm.status

    queryParams.dateRange = queryForm.dateRange
    ? [...queryForm.dateRange] : []
}

function handleReset() {
    queryForm.status = '全部'
    queryForm.dateRange = []

    handleQuery()
}

function getStatusTagType(status) {
    if(status === '运行中') return 'success'
    if(status === '离线') return 'info'
    return 'danger'
}

watch(
    () => [
        queryParams.status,
        queryParams.dateRange.join('|'),
    ],
    () => {
        currentPage.value = 1
    },
)
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
      <nav class="page-nav">
        <RouterLink to="/overview">运营总览</RouterLink>
        <RouterLink to="/devices">设备管理</RouterLink>
        <RouterLink to="/work-order">工单管理</RouterLink>
        <RouterLink to="/data-query">数据查询</RouterLink>
      </nav>

      <h2 class="page-title">数据查询</h2>

      <el-card class="query-card">
        <el-form :inline="true">
            <el-form-item label="查询日期">
                <el-date-picker
                v-model="queryForm.dateRange"
                type="daterange"
                value-format="YYYY-MM-DD"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                />
            </el-form-item>

            <el-form-item label="设备状态">
                <el-select v-model="queryForm.status" placeholder="请选择状态" style="width: 140px">
                    <el-option label="全部" value="全部" />
                    <el-option label="运行中" value="运行中" />
                    <el-option label="离线" value="离线" />
                    <el-option label="告警中" value="告警中" />
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="handleQuery">查询</el-button>
                <el-button @click="handleReset">重置</el-button>
            </el-form-item>
        </el-form>
      </el-card>

      <el-card class="table-card">

        <template #header>查询结果</template>

        <el-result
        v-if="errorMessage"
        icon="error"
        title="数据加载失败"
        :sub-title="errorMessage"
        >
        <template #extra>
            <el-button type="primary" @click="loadDeviceRecords()">重新加载</el-button>
        </template>
    </el-result>
        <template v-if="!errorMessage">
        <el-table 
        v-loading="loading"
        element-loading-text="数据加载中..."
        :data="paginatedDevices"
         border 
         style="width: 100%"
         >
            <el-table-column prop="name" label="设备名称" />
            <el-table-column prop="code" label="设备编号" />
            <el-table-column prop="recordDate" label="数据日期" />
            <el-table-column prop="energy" label="当前能耗(kWh)" />

            <el-table-column label="状态">
                <template #default="{row}">
                    <el-tag :type="getStatusTagType(row.status)">
                        {{ row.status }}
                    </el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="alarmCount" label="告警数" />
        </el-table>

    <div class="pagination-wrapper">
        <el-pagination
        v-model:current-page="currentPage"
        :page-size="pageSize"
        :total="filteredDevices.length"
        layout="total,prev,pager,next"
        />
    </div>
    </template>

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

.page-title {
    margin: 0 0 16px;
    color: #0b2545;
}

.query-card,
.table-card {
    margin-bottom: 16px;
}

.pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
}
</style>