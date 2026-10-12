import{f as F,r as m,g as I,q as r,w as y,o as C,m as N,j as H,D as L}from"./iframe-YqxpCQlV.js";import{A as $,c as x}from"./index-CpIeRRVK.js";import{S as T}from"./SplitView-DiSBpW00.js";import{D as j}from"./DetailPanel-CZCQQSHP.js";import{_,L as M}from"./LabDashboard-BKYXmSQU.js";import{D as R}from"./DashboardNavigation-DJCd9O9Y.js";import{H as U}from"./HostDetail-C9is_IkV.js";import{_ as z}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{e as p,a as i,h as l}from"./fixtures-O73B-Es4.js";import"./preload-helper-DtJ2DzBH.js";import"./UiInput-ClwkWuvD.js";import"./UiTextarea-BavF6RU5.js";import"./UiSwitch-Dispu4ou.js";import"./UiSelect-CNNbgf97.js";import"./UiButton-BFtT1Y4_.js";import"./LabEventLog-NqQyDL2q.js";import"./UiNodePlate-BH5AYsRF.js";import"./IconSparklesFilled-CUll1BkX.js";import"./createVueComponent-ByYTr702.js";import"./HostDirectory-BEE5tYNX.js";import"./UiHealthMark-BlNqfHfQ.js";import"./IconPlayerPlayFilled-KN7BYiXU.js";import"./UiTelemetry-BTgn5PWr.js";import"./ResourceTrack-CZBqJdaU.js";import"./IconXFilled-B0YQ9fUR.js";import"./AppDirectory-Bp5JMph-.js";import"./UiStatusBadge-BeXmiThe.js";import"./IconAlertTriangleFilled-CXRhF_B9.js";import"./UiAssetIcon-BAQ6Ojjb.js";import"./IconChevronDownFilled-DkgIZ6I7.js";import"./IconPlusFilled-DcaOsi96.js";import"./UiTabs-D8ko8WEe.js";const G={class:"dashboard-workspace"},g=F({__name:"DashboardWorkspace",props:{hosts:{},apps:{},events:{},initialPanel:{default:""}},emits:["action","submit"],setup(s,{emit:V}){const f=s,D=V,t=m(f.initialPanel),w=m(f.hosts[0]?.id??""),k=H(()=>f.hosts.find(o=>o.id===w.value)),A=m({}),S=m(!1);let W=null;const q=[{id:"add-host",label:"Add host",shortcut:"H"},{id:"add-app",label:"Add app",shortcut:"A"},{id:"settings",label:"Settings",shortcut:"S"}],O=H(()=>t.value==="add-host"?x.NodeCreate:t.value==="add-app"?x.StackCreate:x.AlertRuleCreate),P=H(()=>t.value==="add-host"?"Add host":t.value==="add-app"?"Add app":"Alert settings");function d(o,e){if(D("action",o,e),["host-inspect","host-tools"].includes(o))w.value=e??"",t.value="host";else if(["settings","add-host","add-app"].includes(o))t.value=o,A.value={};else return;W=document.activeElement instanceof HTMLElement?document.activeElement:null}async function E(){t.value="",await L(),W?.focus({preventScroll:!0})}function B(){W?.focus({preventScroll:!0})}return(o,e)=>(C(),I("div",G,[r(R,{onCommand:e[0]||(e[0]=a=>S.value=!0),onSettings:e[1]||(e[1]=a=>d("settings"))}),r(T,{open:!!t.value,onClosed:B},{detail:y(()=>[t.value==="host"&&k.value?(C(),N(U,{key:k.value.id,host:k.value,apps:s.apps,onClose:E,onAction:d,onSave:e[2]||(e[2]=a=>D("submit","host",a))},null,8,["host","apps"])):(C(),N(j,{key:t.value,title:P.value,onClose:E},{default:y(()=>[r($,{modelValue:A.value,"onUpdate:modelValue":e[3]||(e[3]=a=>A.value=a),schema:O.value,"submit-label":t.value==="settings"?"Save alert rule":"Create",onSubmit:e[4]||(e[4]=a=>D("submit",t.value,a))},null,8,["modelValue","schema","submit-label"])]),_:1},8,["title"]))]),default:y(()=>[r(M,{hosts:s.hosts,apps:s.apps,events:s.events,embedded:"",onAction:d},null,8,["hosts","apps","events"])]),_:1},8,["open"]),r(_,{open:S.value,commands:q,onClose:e[5]||(e[5]=a=>S.value=!1),onSelect:e[6]||(e[6]=a=>d(a))},null,8,["open"])]))}}),n=z(g,[["__scopeId","data-v-58bc4386"]]);g.__docgenInfo=Object.assign({displayName:g.name??g.__name},{exportName:"default",displayName:"DashboardWorkspace",description:"",tags:{},props:[{name:"hosts",required:!0,type:{name:"Array",elements:[{name:"HostItem"}]}},{name:"apps",required:!0,type:{name:"Array",elements:[{name:"DirectoryApp"}]}},{name:"events",required:!0,type:{name:"Array",elements:[{name:"LabEvent"}]}},{name:"initialPanel",required:!1,type:{name:"string"},defaultValue:{func:!1,value:"''"}}],events:[{name:"action",type:{names:["string"]}},{name:"submit",type:{names:["string"]}}],sourceFiles:["/home/chris/.codex/worktrees/4b31/floatlab-core/ui/src/components/dashboard/DashboardWorkspace.vue"]});const He={title:"2. Pattern/Dashboard Workspace",component:n,argTypes:{onAction:{action:"action"},onSubmit:{action:"submit"}},parameters:{layout:"fullscreen"},render:s=>({components:{DashboardWorkspace:n},setup(){return{args:s,hosts:l,apps:i,events:p}},template:'<DashboardWorkspace v-bind="args" :hosts="hosts" :apps="apps" :events="events" />'})},c={},u={render:s=>({components:{DashboardWorkspace:n},setup:()=>({args:s,hosts:l,apps:i,events:p}),template:'<DashboardWorkspace v-bind="args" :hosts="hosts" :apps="apps" :events="events" initial-panel="host" />'})},v={render:s=>({components:{DashboardWorkspace:n},setup:()=>({args:s,hosts:l,apps:i,events:p}),template:'<DashboardWorkspace v-bind="args" :hosts="hosts" :apps="apps" :events="events" initial-panel="add-host" />'})},h={render:s=>({components:{DashboardWorkspace:n},setup:()=>({args:s,hosts:l,apps:i,events:p}),template:'<DashboardWorkspace v-bind="args" :hosts="hosts" :apps="apps" :events="events" initial-panel="add-app" />'})},b={render:s=>({components:{DashboardWorkspace:n},setup:()=>({args:s,hosts:l,apps:i,events:p}),template:'<DashboardWorkspace v-bind="args" :hosts="hosts" :apps="apps" :events="events" initial-panel="settings" />'})},xe=["Default","HostDetailOpen","AddHost","AddApp","Settings"];c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:"{}",...c.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      DashboardWorkspace
    },
    setup: () => ({
      args,
      hosts,
      apps,
      events
    }),
    template: '<DashboardWorkspace v-bind="args" :hosts="hosts" :apps="apps" :events="events" initial-panel="host" />'
  })
}`,...u.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      DashboardWorkspace
    },
    setup: () => ({
      args,
      hosts,
      apps,
      events
    }),
    template: '<DashboardWorkspace v-bind="args" :hosts="hosts" :apps="apps" :events="events" initial-panel="add-host" />'
  })
}`,...v.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      DashboardWorkspace
    },
    setup: () => ({
      args,
      hosts,
      apps,
      events
    }),
    template: '<DashboardWorkspace v-bind="args" :hosts="hosts" :apps="apps" :events="events" initial-panel="add-app" />'
  })
}`,...h.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      DashboardWorkspace
    },
    setup: () => ({
      args,
      hosts,
      apps,
      events
    }),
    template: '<DashboardWorkspace v-bind="args" :hosts="hosts" :apps="apps" :events="events" initial-panel="settings" />'
  })
}`,...b.parameters?.docs?.source}}};export{h as AddApp,v as AddHost,c as Default,u as HostDetailOpen,b as Settings,xe as __namedExportsOrder,He as default};
