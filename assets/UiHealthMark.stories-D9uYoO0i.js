import{U as t}from"./UiHealthMark-BlNqfHfQ.js";import"./iframe-YqxpCQlV.js";import"./preload-helper-DtJ2DzBH.js";import"./IconPlayerPlayFilled-KN7BYiXU.js";import"./createVueComponent-ByYTr702.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const l={title:"1. Primitive/Health Mark",component:t,args:{state:"ready"},argTypes:{state:{control:"select",options:["ready","stopped","standby","degraded","unknown"]}},parameters:{layout:"padded"},render:r=>({components:{UiHealthMark:t},setup:()=>({args:r}),template:'<UiHealthMark v-bind="args" />'})},e={},a={render:()=>({components:{UiHealthMark:t},template:'<div class="foundation-row"><UiHealthMark state="ready" /> Ready <UiHealthMark state="stopped" /> Stopped <UiHealthMark state="standby" /> Standby <UiHealthMark state="degraded" /> Degraded <UiHealthMark state="unknown" /> Unknown</div>'})},m=["Default","AllStates"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiHealthMark
    },
    template: '<div class="foundation-row"><UiHealthMark state="ready" /> Ready <UiHealthMark state="stopped" /> Stopped <UiHealthMark state="standby" /> Standby <UiHealthMark state="degraded" /> Degraded <UiHealthMark state="unknown" /> Unknown</div>'
  })
}`,...a.parameters?.docs?.source}}};export{a as AllStates,e as Default,m as __namedExportsOrder,l as default};
