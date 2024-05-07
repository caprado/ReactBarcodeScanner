import{j as s,B as j,d as b,S as x}from"./Scanner-CwsWpVM5.js";import{I as B,v as A}from"./preview-errors-B42RpLod.js";import{r as a}from"./index-BwDkhjyp.js";import"./index-DrFu-skq.js";import"./_commonjsHelpers-BosuxZz1.js";const{addons:P}=__STORYBOOK_MODULE_PREVIEW_API__,{global:y}=__STORYBOOK_MODULE_GLOBAL__;var C="storybook/actions",T=`${C}/action-event`,V={depth:10,clearOnStoryChange:!0,limit:50},I=(e,r)=>{let n=Object.getPrototypeOf(e);return!n||r(n)?n:I(n,r)},N=e=>!!(typeof e=="object"&&e&&I(e,r=>/^Synthetic(?:Base)?Event$/.test(r.constructor.name))&&typeof e.persist=="function"),K=e=>{if(N(e)){let r=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));r.persist();let n=Object.getOwnPropertyDescriptor(r,"view"),o=n==null?void 0:n.value;return typeof o=="object"&&(o==null?void 0:o.constructor.name)==="Window"&&Object.defineProperty(r,"view",{...n,value:Object.create(o.constructor.prototype)}),r}return e},L=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?A():Date.now().toString(36)+Math.random().toString(36).substring(2);function f(e,r={}){let n={...V,...r},o=function(...t){var u,v;if(r.implicit){let m=(u="__STORYBOOK_PREVIEW__"in y?y.__STORYBOOK_PREVIEW__:void 0)==null?void 0:u.storyRenders.find(c=>c.phase==="playing"||c.phase==="rendering");if(m){let c=!((v=window==null?void 0:window.FEATURES)!=null&&v.disallowImplicitActionsInRenderV8),g=new B({phase:m.phase,name:e,deprecated:c});if(c)console.warn(g);else throw g}}let l=P.getChannel(),D=L(),E=5,p=t.map(K),w=t.length>1?p:p[0],R={id:D,count:0,data:{name:e,args:w},options:{...n,maxDepth:E+(n.depth||3),allowFunction:n.allowFunction||!1}};l.emit(T,R)};return o.isAction=!0,o}const d=({onChange:e})=>{const[r,n]=a.useState([]),o=async()=>{const t=await j.listVideoInputDevices()||[];return t&&t.length>0||console.warn("No video input devices found"),t};return a.useEffect(()=>{(async()=>n(await o()))()},[]),s.jsxs("select",{onChange:t=>e==null?void 0:e(t.target.value),children:[s.jsx("option",{value:"",children:"Select a device"}),r.map(t=>s.jsx("option",{value:t.deviceId,children:t.label},t.deviceId))]})};try{d.displayName="Devices",d.__docgenInfo={description:"",displayName:"Devices",props:{onChange:{defaultValue:null,description:"",name:"onChange",required:!1,type:{name:"((deviceId: string) => void)"}}}}}catch{}const h={container:{width:400,margin:"auto"},devices:{marginBottom:10}},W=e=>{const[r,n]=a.useState("");function o(t){console.log({deviceId:t}),n(t)}return s.jsxs("div",{style:h.container,children:[s.jsx("div",{style:h.devices,children:s.jsx(d,{onChange:o})}),s.jsx(x,{...e,enabled:!0,onResult:t=>{f("onResult")(t)},onError:t=>{f("onError")(t==null?void 0:t.message)},components:{count:!0,audio:!0,tracker:!0,torch:!0,onOff:!0},options:{deviceId:r,delayBetweenScanAttempts:100,delayBetweenScanSuccess:100}})]})},i=W.bind({});i.args={tracker:!0,count:!1,constraints:b,deviceId:""};const U={title:"Scanner"};var _,O,S;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`(args: ScannerProps): ReactElement => {
  const [deviceId, setDeviceId] = useState('');
  function handleOnChange(deviceId: string): void {
    console.log({
      deviceId
    });
    setDeviceId(deviceId);
  }
  return <div style={styles.container}>\r
      <div style={styles.devices}>\r
        <Devices onChange={handleOnChange} />\r
      </div>\r
      <ScannerComp {...args} enabled={true} onResult={text => {
      action('onResult')(text);
    }} onError={error => {
      action('onError')(error?.message);
    }} components={{
      count: true,
      audio: true,
      tracker: true,
      torch: true,
      onOff: true
    }} options={{
      deviceId,
      delayBetweenScanAttempts: 100,
      delayBetweenScanSuccess: 100
    }} />\r
    </div>;
}`,...(S=(O=i.parameters)==null?void 0:O.docs)==null?void 0:S.source}}};const $=["Scanner"];export{i as Scanner,$ as __namedExportsOrder,U as default};
