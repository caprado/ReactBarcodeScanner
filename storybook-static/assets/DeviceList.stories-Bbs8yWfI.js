import{B as u,j as p}from"./Scanner-CwsWpVM5.js";import{r}from"./index-BwDkhjyp.js";import"./_commonjsHelpers-BosuxZz1.js";const v=()=>{const[s,o]=r.useState([]),a=async()=>{const t=await u.listVideoInputDevices(!0)||[];return t&&t.length>0||console.warn("No video input devices found"),t};return r.useEffect(()=>{(async()=>o(await a()))()},[]),s},d=()=>{const s=v();return p.jsx("pre",{children:JSON.stringify(s,null,2)})},e=d.bind({}),x={title:"Device List"};var i,n,c;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`(): ReactElement => {
  const state = useDeviceList();
  return <pre>\r
      {JSON.stringify(state, null, 2)}\r
    </pre>;
}`,...(c=(n=e.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const L=["DeviceList"];export{e as DeviceList,L as __namedExportsOrder,x as default};
