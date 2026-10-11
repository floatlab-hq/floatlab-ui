import { enableAutoUnmount, mount } from '@vue/test-utils'
import { afterEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import App from './App.vue'
import CommandPalette from './components/CommandPalette.vue'
import DashboardHeader from './components/DashboardHeader.vue'
import ServerPanel from './components/ServerPanel.vue'
import { apps, commands, server } from './data'

enableAutoUnmount(afterEach)

describe('App', () => {
  it('renders the complete dashboard fixture', () => {
    const wrapper = mount(App)

    expect(wrapper.getComponent(DashboardHeader).props()).toMatchObject({
      version: 'v1.43',
      uptime: '24d',
    })
    expect(wrapper.getComponent(ServerPanel).props()).toEqual({ server, apps })
    expect(wrapper.getComponent(CommandPalette).props()).toEqual({ open: false, commands })
    expect(wrapper.text()).toContain('Cavs Server')
    expect(wrapper.text()).toContain('Minecraft')
  })

  it('opens the command palette from the header', async () => {
    const wrapper = mount(App)

    await wrapper.get('.search-trigger').trigger('click')

    expect(wrapper.getComponent(CommandPalette).props('open')).toBe(true)
  })

  it('handles Cmd/Ctrl + / but ignores editable targets', async () => {
    const wrapper = mount(App)
    const palette = wrapper.getComponent(CommandPalette)
    const metaEvent = new KeyboardEvent('keydown', {
      key: '/',
      metaKey: true,
      cancelable: true,
    })

    window.dispatchEvent(metaEvent)
    await nextTick()
    expect(metaEvent.defaultPrevented).toBe(true)
    expect(palette.props('open')).toBe(true)

    palette.vm.$emit('close')
    await nextTick()

    const input = document.createElement('input')
    document.body.append(input)
    const inputEvent = new KeyboardEvent('keydown', {
      key: '/',
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    })
    input.dispatchEvent(inputEvent)
    await nextTick()
    input.remove()
    expect(inputEvent.defaultPrevented).toBe(false)
    expect(palette.props('open')).toBe(false)

    window.dispatchEvent(new KeyboardEvent('keydown', { key: '/', ctrlKey: true }))
    await nextTick()
    expect(palette.props('open')).toBe(true)
  })

  it('closes when Escape causes the palette close event', async () => {
    const wrapper = mount(App)

    await wrapper.get('.search-trigger').trigger('click')
    await wrapper.get('dialog').trigger('cancel')

    expect(wrapper.getComponent(CommandPalette).props('open')).toBe(false)
  })
})
