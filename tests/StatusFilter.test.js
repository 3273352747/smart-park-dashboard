import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import StatusFilter from '../src/components/StatusFilter.vue'

describe('StatusFilter', () => {
  const statusOptions = ['全部', '运行中', '离线', '告警中']

  it('显示所有状态选项', () => {
    const wrapper = mount(StatusFilter, {
      props: {
        statusOptions,
        activeStatus: '全部',
      },
    })

    const buttons = wrapper.findAll('button')

    expect(buttons).toHaveLength(4)
    expect(buttons.map((button) => button.text())).toEqual(statusOptions)
  })

  it('点击状态后向父组件发送 change 事件', async () => {
    const wrapper = mount(StatusFilter, {
      props: {
        statusOptions,
        activeStatus: '全部',
      },
    })

    const buttons = wrapper.findAll('button')

    await buttons[2].trigger('click')

    expect(wrapper.emitted('change')).toEqual([
      ['离线'],
    ])
  })
})