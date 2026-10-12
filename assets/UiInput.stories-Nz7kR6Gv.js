import{r as l}from"./iframe-YqxpCQlV.js";import{U as s}from"./UiInput-ClwkWuvD.js";import"./preload-helper-DtJ2DzBH.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const i={title:"1. Primitive/UI Input",component:s,args:{modelValue:"",placeholder:"Search commands",disabled:!1},argTypes:{disabled:{control:"boolean"},placeholder:{control:"text"}},render:o=>({components:{UiInput:s},setup:()=>({args:o,value:l(o.modelValue)}),template:'<div><UiInput v-bind="args" v-model="value" aria-label="Search commands" /><p class="foundation-muted">Value: {{ value }}</p></div>'})},e={},a={args:{disabled:!0,modelValue:"Unavailable"}},r={args:{variant:"field",modelValue:"node-01",placeholder:"Display name"}},c=["Playground","Disabled","Field"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    disabled: true,
    modelValue: 'Unavailable'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'field',
    modelValue: 'node-01',
    placeholder: 'Display name'
  }
}`,...r.parameters?.docs?.source}}};export{a as Disabled,r as Field,e as Playground,c as __namedExportsOrder,i as default};
