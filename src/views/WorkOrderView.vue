<script setup>
import { ref, reactive,watch } from 'vue'
import { ElMessage,ElMessageBox } from 'element-plus'
import { deviceManager } from '../data/devices'
import DashboardLayout from '../components/DashboardLayout.vue'
import {
  loadWorkOrders,
  WORK_ORDER_STORAGE_KEY,
} from '../utils/workOrders'

const workOrders = ref(loadWorkOrders())

const nextOrderNumber = ref(
    Math.max(
        0,
        ...workOrders.value.map((order) => {
            return Number(order.id.replace('WO-','')) || 0
        })
    ) + 1
)

watch(
    workOrders,
    (orders) => {
        try {
            localStorage.setItem(WORK_ORDER_STORAGE_KEY,JSON.stringify(orders))
        } catch (error) {
            console.warn('工单数据保存失败：', error)
        }
    },
    { deep: true }
)

const deviceOptions = deviceManager.map((device) => device.name)
const priorityOptions = ['高','中','低']

const dialogVisible = ref(false)
const formRef = ref()

const editingId = ref(null)
const dialogTitle = ref('新建工单')

const workOrderForm = reactive({
    title: '',
    device: '',
    priority: '',
    planDate: '',
})

const rules = {
    title: [
        { required: true,message: '请输入工单标题',trigger: 'blur'},
    ],
    device: [
        { required: true,message: '请输入关联设备',trigger: 'change'},
    ],
    priority: [
        { required: true,message: '请输入优先级',trigger: 'change'},
    ],
    planDate: [
        { required: true,message: '请选择计划日期',trigger: 'change'},
    ],
}

function resetForm() {
    Object.assign(workOrderForm,{
        title: '',
        device: '',
        priority: '',
        planDate: '',
    })
    formRef.value?.clearValidate()
}

function openEditDialog(row) {
    editingId.value = row.id
    dialogTitle.value = '编辑工单'

    Object.assign(workOrderForm,{
        title: row.title,
        device: row.device,
        priority: row.priority,
        planDate: row.planDate,
    })

    formRef.value?.clearValidate()
    dialogVisible.value = true
}

function openCreateDialog() {
    editingId.value = null
    dialogTitle.value = '新建工单'

    resetForm()
    dialogVisible.value = true
}

async function handleSubmit() {
    const valid = await formRef.value.validate().catch(() => false)

    if(!valid) return

    if(editingId.value){
    const targetOrder = workOrders.value.find((order) => {
        return order.id === editingId.value
    })

    Object.assign(targetOrder,workOrderForm)
    ElMessage.success('工单编辑成功')
    } else{
        const newOrder = {
        id: `WO-${String(nextOrderNumber.value).padStart(3,'0')}`,
        ...workOrderForm,
        status: '待处理',
    }
    
    workOrders.value.unshift(newOrder)
    nextOrderNumber.value+=1
    ElMessage.success('工单创建成功')    
    }
    dialogVisible.value = false
}

function getPriorityTagType(priority){
    if(priority === '高') return 'danger'
    if(priority === '中') return 'warning'
    return 'info'
}

async function handleDelete(row) {
    try{
        await ElMessageBox.confirm(
            `确定删除工单“${row.title}”吗？`,
            '删除确认',
            {
                confirmButtonText: '删除',
                cancelButtonText: '取消',
                type: 'warning',
            },
        )

        workOrders.value = workOrders.value.filter((order) => {
            return order.id !== row.id
        })

        ElMessage.success('工单已删除')
    } catch{

    }
}
</script>
<template>
    <DashboardLayout>

      <div class="page-title-row">
        <h2>工单管理</h2>
        <el-button type="primary" @click="openCreateDialog">
            新建工单
        </el-button>
      </div>

      <el-card class="table-card">
        <el-table class="work-order-table" :data="workOrders" border style="width: 100%" empty-text="暂无工单，请点击“新建工单”添加">
            <el-table-column prop="id" label="工单编号" width="110" />
            <el-table-column prop="title" label="工单标题" min-width="220" />
            <el-table-column prop="device" label="关联设备" min-width="160" />

            <el-table-column label="优先级" width="100">
                <template #default="{row}">
                    <el-tag :type="getPriorityTagType(row.priority)">{{ row.priority }}</el-tag>
                </template>
            </el-table-column>

        <el-table-column prop="planDate" label="计划日期" width="130" />

        <el-table-column label="状态" width="110">
            <template #default="{row}">
                <el-tag :type="row.status === '处理中' ? 'primary' : 'warning'">
                    {{ row.status }}
                </el-tag>
            </template>
        </el-table-column>

        <el-table-column label="操作" width="130">
            <template #default="{row}">
                <el-button
                type="primary"
                link
                size="small"
                @click="openEditDialog(row)"
                >编辑</el-button>
                <el-button
                type="danger"
                link
                size="small"
                @click="handleDelete(row)"
                >删除</el-button>
            </template>
        </el-table-column>

        </el-table>
      </el-card>

      <el-dialog class="work-order-dialog" v-model="dialogVisible" :title="dialogTitle" width="520px">
        <el-form
        ref="formRef"
        :model="workOrderForm"
        :rules="rules"
        label-width="90px"
        >
        <el-form-item label="工单标题" prop="title">
            <el-input
            v-model="workOrderForm.title"
            placeholder="请输入工单标题"
            />
        </el-form-item>

        <el-form-item label="关联设备" prop="device">
            <el-select
            v-model="workOrderForm.device"
            placeholder="请选择设备"
            style="width: 100%"
            >
            <el-option
            v-for="device in deviceOptions"
            :key="device"
            :label="device"
            :value="device"
            />
        </el-select>
        </el-form-item>

        <el-form-item label="优先级" prop="priority">
            <el-select
            v-model="workOrderForm.priority"
            placeholder="请选择优先级"
            style="width:100%"
            >
            <el-option
            v-for="priority in priorityOptions"
            :key="priority"
            :label="priority"
            :value="priority"
            />
        </el-select>
        </el-form-item>

        <el-form-item label="计划日期" prop="planDate">
            <el-date-picker
            v-model="workOrderForm.planDate"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="请选择计划日期"
            style="width: 100%"
            />
        </el-form-item>
    </el-form>

    <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">{{ editingId ? '保存修改' : '确定创建' }}</el-button>
    </template>
      </el-dialog>
      </DashboardLayout>
</template>

<style scoped>
.page-title-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
}

.page-title-row h2 {
    margin: 0;
    color: #0b2545;
}

.table-card {
    margin-top: 16px;
}

@media (max-width: 768px) {
    .page-title-row {
    gap: 12px;
    margin-bottom: 12px;
  }

  .page-title-row h2 {
    font-size: 22px;
  }

  .page-title-row :deep(.el-button) {
    flex: 0 0 auto;
  }

  :global(.work-order-dialog) {
    width: calc(100% - 32px) !important;
  }

    .table-card {
    width: 100%;
    margin-top: 12px;
  }

  .table-card :deep(.el-card__body) {
    overflow-x: auto;
    padding: 12px;
  }

  .work-order-table {
    min-width: 980px;
  }
}
</style>