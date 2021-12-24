import {mount} from '@vue/test-utils'
import docxexport from '@v/docxexport/index.vue'
// import ElementUI  from 'element-plus'
// const localVue = createLocalVue()
// localVue.use(ElementUI)

describe('docxexport test',()=>{
  test('button click',async ()=>{
    const wrapper = mount(docxexport);
    expect(wrapper.find('.button').exists()).toBe(true)
    const btn = wrapper.find(".button");
    await btn.trigger("click");
    expect(wrapper.emitted().click).toBeTruthy()
    // await wrapper.vm.$nextTick();
    // expect(wrapper.html()).toMatchSnapshot();
  })
})