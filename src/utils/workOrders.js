export const WORK_ORDER_STORAGE_KEY = 'smart-park-work-orders'

const defaultWorkOrders = [
  {
    id: 'WO-001',
    title: '1号配电设备日常巡检',
    device: '1号配电设备',
    priority: '中',
    planDate: '2023-07-20',
    status: '待处理',
  },
  {
    id: 'WO-002',
    title: '3号配电设备告警检查',
    device: '3号配电设备',
    priority: '高',
    planDate: '2023-07-21',
    status: '处理中',
  },
  {
    id: 'WO-003',
    title: '园区配电设备台账核对',
    device: '5号配电设备',
    priority: '低',
    planDate: '2023-07-24',
    status: '待处理',
  },
]

export function createDefaultWorkOrders() {
  return defaultWorkOrders.map((order) => ({ ...order }))
}

export function isValidWorkOrder(order) {
  return (
    order &&
    typeof order === 'object' &&
    typeof order.id === 'string' &&
    typeof order.title === 'string' &&
    typeof order.device === 'string' &&
    typeof order.priority === 'string' &&
    typeof order.planDate === 'string' &&
    typeof order.status === 'string'
  )
}

export function loadWorkOrders(storage = localStorage) {
  try {
    const savedOrders = storage.getItem(WORK_ORDER_STORAGE_KEY)

    if (!savedOrders) return createDefaultWorkOrders()

    const parsedOrders = JSON.parse(savedOrders)
    const isValidData =
      Array.isArray(parsedOrders) &&
      parsedOrders.every(isValidWorkOrder)

    if (!isValidData) {
      storage.removeItem(WORK_ORDER_STORAGE_KEY)
      return createDefaultWorkOrders()
    }

    return parsedOrders
  } catch (error) {
    console.warn('工单缓存读取失败，已恢复默认数据', error)

    try {
      storage.removeItem(WORK_ORDER_STORAGE_KEY)
    } catch {
      
    }

    return createDefaultWorkOrders()
  }
}