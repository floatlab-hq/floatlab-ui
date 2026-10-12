import{c as t,A as o}from"./index-CpIeRRVK.js";import{r as m}from"./iframe-YqxpCQlV.js";import"./UiInput-ClwkWuvD.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./UiTextarea-BavF6RU5.js";import"./UiSwitch-Dispu4ou.js";import"./UiSelect-CNNbgf97.js";import"./UiButton-BFtT1Y4_.js";import"./preload-helper-DtJ2DzBH.js";const h={title:"2. Pattern/API Form",component:o,argTypes:{onSubmit:{action:"submit"}},parameters:{layout:"fullscreen"},render:e=>({components:{ApiForm:o},setup(){return{args:e,values:m({}),schema:t.NodeCreate}},template:'<ApiForm v-bind="args" v-model="values" :schema="schema" /><pre>{{ values }}</pre>'})},r={},a={render:e=>({components:{ApiForm:o},setup:()=>({args:e,values:m({}),schema:t.AlertRuleCreate}),template:'<ApiForm v-bind="args" v-model="values" :schema="schema" />'})},s={render:e=>({components:{ApiForm:o},setup:()=>({args:e,values:m({}),schema:t.StackCreate}),template:'<ApiForm v-bind="args" v-model="values" :schema="schema" />'})},g=["Default","AlertRule","AddApp"];r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:"{}",...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ApiForm
    },
    setup: () => ({
      args,
      values: ref({}),
      schema: coreForms.AlertRuleCreate
    }),
    template: '<ApiForm v-bind="args" v-model="values" :schema="schema" />'
  })
}`,...a.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      ApiForm
    },
    setup: () => ({
      args,
      values: ref({}),
      schema: coreForms.StackCreate
    }),
    template: '<ApiForm v-bind="args" v-model="values" :schema="schema" />'
  })
}`,...s.parameters?.docs?.source}}};export{s as AddApp,a as AlertRule,r as Default,g as __namedExportsOrder,h as default};
