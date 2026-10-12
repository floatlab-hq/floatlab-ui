import{U as r}from"./UiStatusBadge-BeXmiThe.js";import"./iframe-YqxpCQlV.js";import"./preload-helper-DtJ2DzBH.js";import"./createVueComponent-ByYTr702.js";import"./IconAlertTriangleFilled-CXRhF_B9.js";import"./IconPlayerPlayFilled-KN7BYiXU.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const m={title:"1. Primitive/Status Badge",component:r,args:{state:"Running"},argTypes:{state:{control:"select",options:["Running","Stopped","Failed","Provisioning","Starting","FailingOver","Restoring","Stopping","Updating","RollingBack"]}},parameters:{layout:"padded"},render:n=>({components:{UiStatusBadge:r},setup:()=>({args:n}),template:'<UiStatusBadge v-bind="args" />'})},t={},a={render:()=>({components:{UiStatusBadge:r},template:'<div class="foundation-row"><UiStatusBadge state="Running" /><UiStatusBadge state="Stopped" /><UiStatusBadge state="Failed" /><UiStatusBadge state="Starting" /></div>'})},e={args:{state:"Updating"}},s={args:{disabled:!0}},l=["Default","AllStates","Updating","ReadOnly"];t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:"{}",...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiStatusBadge
    },
    template: '<div class="foundation-row"><UiStatusBadge state="Running" /><UiStatusBadge state="Stopped" /><UiStatusBadge state="Failed" /><UiStatusBadge state="Starting" /></div>'
  })
}`,...a.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    state: 'Updating'
  }
}`,...e.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...s.parameters?.docs?.source}}};export{a as AllStates,t as Default,s as ReadOnly,e as Updating,l as __namedExportsOrder,m as default};
