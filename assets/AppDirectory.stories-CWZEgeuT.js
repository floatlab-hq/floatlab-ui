import{A as p}from"./AppDirectory-Bp5JMph-.js";import{a as n}from"./fixtures-O73B-Es4.js";import"./iframe-YqxpCQlV.js";import"./preload-helper-DtJ2DzBH.js";import"./UiButton-BFtT1Y4_.js";import"./UiNodePlate-BH5AYsRF.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiStatusBadge-BeXmiThe.js";import"./createVueComponent-ByYTr702.js";import"./IconAlertTriangleFilled-CXRhF_B9.js";import"./IconPlayerPlayFilled-KN7BYiXU.js";import"./UiAssetIcon-BAQ6Ojjb.js";import"./IconChevronDownFilled-DkgIZ6I7.js";const O={title:"2. Pattern/App Directory",component:p,args:{apps:n},argTypes:{onState:{action:"state"},onTools:{action:"tools"},onOpen:{action:"open"},onNetwork:{action:"network"},onColumns:{action:"columns"}},parameters:{layout:"padded"},render:o=>({components:{AppDirectory:p},setup:()=>({args:o}),template:'<AppDirectory v-bind="args" />'})},r={},e={args:{apps:[]}},a={args:{apps:n.slice(0,4).map((o,s)=>({...o,state:["Running","Stopped","Failed","Starting"][s],tls:s!==2}))}},t={args:{readonly:!0}},R=["Default","Empty","MixedStates","ReadOnly"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    apps: []
  }
}`,...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    apps: apps.slice(0, 4).map((app, index) => ({
      ...app,
      state: (['Running', 'Stopped', 'Failed', 'Starting'] as const)[index]!,
      tls: index !== 2
    }))
  }
}`,...a.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    readonly: true
  }
}`,...t.parameters?.docs?.source}}};export{r as Default,e as Empty,a as MixedStates,t as ReadOnly,R as __namedExportsOrder,O as default};
