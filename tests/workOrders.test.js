import { beforeEach, describe, expect, it } from 'vitest'
import {
  WORK_ORDER_STORAGE_KEY,
  loadWorkOrders,
} from '../src/utils/workOrders'

describe('loadWorkOrders', () => {
  beforeEach(() => localStorage.clear())

  it('没有缓存时返回默认工单', () => {
    expect(loadWorkOrders()).toHaveLength(3)
  })

  it('缓存结构错误时恢复默认工单', () => {
    localStorage.setItem(WORK_ORDER_STORAGE_KEY, '{}')

    expect(loadWorkOrders()).toHaveLength(3)
    expect(localStorage.getItem(WORK_ORDER_STORAGE_KEY)).toBeNull()
  })

  it('有效缓存能够正常读取', () => {
    const orders = [{
      id: 'WO-100',
      title: '测试工单',
      device: '1号配电设备',
      priority: '高',
      planDate: '2026-07-31',
      status: '待处理',
    }]

    localStorage.setItem(
      WORK_ORDER_STORAGE_KEY,
      JSON.stringify(orders)
    )

    expect(loadWorkOrders()).toEqual(orders)
  })
})