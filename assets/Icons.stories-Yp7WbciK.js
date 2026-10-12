import{c as e}from"./createVueComponent-ByYTr702.js";import{I as a}from"./IconXFilled-B0YQ9fUR.js";import{I as i}from"./IconAlertTriangleFilled-CXRhF_B9.js";import{I as o}from"./IconChevronDownFilled-DkgIZ6I7.js";import{I as c}from"./IconPlusFilled-DcaOsi96.js";import"./iframe-YqxpCQlV.js";import"./preload-helper-DtJ2DzBH.js";var s=e("filled","check-filled","CheckFilled",[["path",{d:"M20.707 6.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1 -1.414 0l-5 -5a1 1 0 0 1 1.414 -1.414l4.293 4.293l9.293 -9.293a1 1 0 0 1 1.414 0",key:"svg-0"}]]);var t=e("filled","database-filled","DatabaseFilled",[["path",{d:"M3 15.731c1.968 1.507 5.234 2.269 9 2.269c3.76 0 7.025 -.76 9 -2.252v2.252c0 2.425 -3.895 3.936 -8.693 3.998l-.307 .002c-4.938 0 -9 -1.523 -9 -4z",key:"svg-0"}],["path",{d:"M3 9.731c1.968 1.507 5.234 2.269 9 2.269c3.76 0 7.025 -.76 9 -2.252v2.252c0 2.477 -4.062 4 -9 4c-4.798 0 -8.77 -1.438 -8.979 -3.795l-.016 -.101l-.005 -.104z",key:"svg-1"}],["path",{d:"M12 2c1.041 0 2.044 .068 2.977 .198l.469 .071q .84 .14 1.586 .348l.44 .131l.075 .024a11 11 0 0 1 .805 .3l.199 .086q .535 .242 .967 .53q .165 .11 .313 .225a3.8 3.8 0 0 1 .669 .668l.091 .128q .07 .105 .129 .211l.07 .139q .163 .35 .2 .73l.01 .211c0 2.477 -4.062 4 -9 4c-4.798 0 -8.77 -1.438 -8.979 -3.795a1 1 0 0 1 -.021 -.205l.005 -.104l.016 -.1c.205 -2.306 4.01 -3.733 8.667 -3.794z",key:"svg-2"}]]);var d=e("filled","moon-filled","MoonFilled",[["path",{d:"M12 1.992a10 10 0 1 0 9.236 13.838c.341 -.82 -.476 -1.644 -1.298 -1.31a6.5 6.5 0 0 1 -6.864 -10.787l.077 -.08c.551 -.63 .113 -1.653 -.758 -1.653h-.266l-.068 -.006l-.06 -.002z",key:"svg-0"}]]);var r=e("filled","search-filled","SearchFilled",[["path",{d:"M14 3.072a8 8 0 0 1 2.32 11.834l5.387 5.387a1 1 0 0 1 -1.414 1.414l-5.388 -5.387a8 8 0 1 1 -.905 -13.249",key:"svg-0"}]]);var p=e("filled","settings-filled","SettingsFilled",[["path",{d:"M14.647 4.081a.724 .724 0 0 0 1.08 .448c2.439 -1.485 5.23 1.305 3.745 3.744a.724 .724 0 0 0 .447 1.08c2.775 .673 2.775 4.62 0 5.294a.724 .724 0 0 0 -.448 1.08c1.485 2.439 -1.305 5.23 -3.744 3.745a.724 .724 0 0 0 -1.08 .447c-.673 2.775 -4.62 2.775 -5.294 0a.724 .724 0 0 0 -1.08 -.448c-2.439 1.485 -5.23 -1.305 -3.745 -3.744a.724 .724 0 0 0 -.447 -1.08c-2.775 -.673 -2.775 -4.62 0 -5.294a.724 .724 0 0 0 .448 -1.08c-1.485 -2.439 1.305 -5.23 3.744 -3.745a.722 .722 0 0 0 1.08 -.447c.673 -2.775 4.62 -2.775 5.294 0zm-2.647 4.919a3 3 0 1 0 0 6a3 3 0 0 0 0 -6",key:"svg-0"}]]);const I={title:"1. Primitive/Icons"},n={args:{size:20},argTypes:{size:{control:{type:"range",min:12,max:48,step:2}}},render:l=>({setup:()=>({args:l,icons:{IconSearchFilled:r,IconSettingsFilled:p,IconPlusFilled:c,IconChevronDownFilled:o,IconCheckFilled:s,IconAlertTriangleFilled:i,IconXFilled:a,IconDatabaseFilled:t,IconMoonFilled:d}}),template:`<section class="foundation"><h1>Tabler filled icons</h1>
      <p>Filled icons are the FloatLab default and inherit the current text color. Adjust size in Controls. Initial sample: 20px; component choices will follow Figma.</p>
      <div class="foundation-grid"><div v-for="(icon, name) in icons" :key="name" class="foundation-card">
        <component :is="icon" :size="args.size" aria-hidden="true" /><code class="foundation-label">{{ name }}</code>
      </div></div>
    </section>`})},z=["Tabler"];n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    size: 20
  },
  argTypes: {
    size: {
      control: {
        type: 'range',
        min: 12,
        max: 48,
        step: 2
      }
    }
  },
  render: args => ({
    setup: () => ({
      args,
      icons: {
        IconSearchFilled,
        IconSettingsFilled,
        IconPlusFilled,
        IconChevronDownFilled,
        IconCheckFilled,
        IconAlertTriangleFilled,
        IconXFilled,
        IconDatabaseFilled,
        IconMoonFilled
      }
    }),
    template: \`<section class="foundation"><h1>Tabler filled icons</h1>
      <p>Filled icons are the FloatLab default and inherit the current text color. Adjust size in Controls. Initial sample: 20px; component choices will follow Figma.</p>
      <div class="foundation-grid"><div v-for="(icon, name) in icons" :key="name" class="foundation-card">
        <component :is="icon" :size="args.size" aria-hidden="true" /><code class="foundation-label">{{ name }}</code>
      </div></div>
    </section>\`
  })
}`,...n.parameters?.docs?.source}}};export{n as Tabler,z as __namedExportsOrder,I as default};
