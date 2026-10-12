import{r as o}from"./iframe-YqxpCQlV.js";import{U as r}from"./UiTextarea-BavF6RU5.js";import"./preload-helper-DtJ2DzBH.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const n={title:"1. Primitive/Textarea",component:r,render:()=>({components:{UiTextarea:r},setup:()=>({value:o(`services:
  postgres:
    image: postgres:17`)}),template:'<UiTextarea v-model="value" aria-label="Compose file" rows="6" />'})},e={},a={render:()=>({components:{UiTextarea:r},template:'<UiTextarea disabled aria-label="Unavailable" model-value="Read only preview" />'})},m=["Default","Disabled"];e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:"{}",...e.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => ({
    components: {
      UiTextarea
    },
    template: '<UiTextarea disabled aria-label="Unavailable" model-value="Read only preview" />'
  })
}`,...a.parameters?.docs?.source}}};export{e as Default,a as Disabled,m as __namedExportsOrder,n as default};
