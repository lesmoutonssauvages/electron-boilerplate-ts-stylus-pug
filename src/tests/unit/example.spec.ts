import { shallowMount } from '@vue/test-utils'
import Home from '@/views/About.vue'

describe('About.vue.vue', () => {
  it('renders props.msg when passed', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.text()).toMatch('This is an about page')
  })
})
