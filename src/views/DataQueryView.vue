<script setup>
import { reactive, computed,ref,watch,onMounted } from 'vue'
import { getDeviceRecords } from '../api/device'
import DashboardLayout from '../components/DashboardLayout.vue'

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
    <DashboardLayout>

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
        class="query-table" 
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
    </DashboardLayout>
</template>

<style scoped>
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

@media (max-width: 768px) {
  .page-title {
    font-size: 22px;
  }

    .query-card :deep(.el-card__body) {
    padding: 16px;
  }

  .query-card :deep(.el-form) {
    display: block;
  }

  .query-card :deep(.el-form-item) {
    display: flex;
    margin-right: 0;
    margin-bottom: 12px;
  }

  .query-card :deep(.el-form-item__label) {
    width: 72px;
    justify-content: flex-start;
  }

  .query-card :deep(.el-form-item__content) {
    min-width: 0;
    flex: 1;
  }

  .query-card :deep(.el-date-editor),
  .query-card :deep(.el-select) {
    width: 100% !important;
  }

  .query-card :deep(.el-form-item:last-child) {
    margin-bottom: 0;
  }

  .query-card :deep(.el-form-item:last-child .el-form-item__content) {
    margin-left: 72px;
  }

    .query-card :deep(.el-card__body) {
    padding: 16px;
  }

  .query-card :deep(.el-form-item) {
    display: flex;
    margin-right: 0;
    margin-bottom: 12px;
  }

  .query-card :deep(.el-form-item__label) {
    width: 72px;
    justify-content: flex-start;
  }

  .query-card :deep(.el-form-item__content) {
    min-width: 0;
    flex: 1;
  }

  .query-card :deep(.el-date-editor),
  .query-card :deep(.el-select) {
    width: 100% !important;
  }

  .query-card :deep(.el-form-item:last-child) {
    margin-bottom: 0;
  }

  .query-card :deep(.el-form-item:last-child .el-form-item__content) {
    margin-left: 72px;
  }

    .table-card {
    width: 100%;
  }

  .table-card :deep(.el-card__body) {
    overflow-x: auto;
    padding: 12px;
  }

  .query-table {
    min-width: 760px;
  }

  .pagination-wrapper {
    justify-content: flex-start;
    overflow-x: auto;
  }
}
</style>