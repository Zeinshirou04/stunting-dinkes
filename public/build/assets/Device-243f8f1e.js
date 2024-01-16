import{j as e}from"./app-7c369a65.js";function r(t){const s=document.querySelector('meta[name="csrf-token"]').getAttribute("content");var l="ClientID-"+parseInt(Math.random()*100);const a=e.jsx(e.Fragment,{children:e.jsxs("form",{className:"w-full flex flex-col justify-center items-center gap-3",action:"/dashboard/device/connect",method:"post",children:[e.jsx("input",{type:"hidden",name:"_token",value:s}),e.jsxs("label",{className:"form-control w-full max-w-xs",children:[e.jsx("div",{className:"label",children:e.jsxs("span",{className:"label-text text-xs",children:["ID Perangkat : ",l]})}),e.jsx("input",{type:"text",name:"deviceID",placeholder:"Masukkan ID Alat",className:"input input-bordered w-full max-w-xs text-xs p-2 h-10"}),e.jsxs("div",{className:"label flex-col justify-start items-start",children:[e.jsx("span",{className:"label-text-alt text-xs",children:"ID Alat = ESP-(Kode pada Alat)"}),e.jsx("span",{className:"label-text-alt text-xs",children:"Contoh : ESP-01"})]})]}),e.jsx("input",{className:"btn btn-primary",type:"submit",value:"Connect"})]})}),n=e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"label text-sm text-center",children:"Anda sekarang sudah terhubung dengan timbangan"}),e.jsx("div",{className:"overflow-x-auto max-w-sm",children:e.jsx("table",{className:"table",children:e.jsxs("tbody",{children:[e.jsxs("tr",{className:"border-y-2 border-black/20",children:[e.jsx("th",{children:"Client ID"}),e.jsx("td",{children:":"}),e.jsx("td",{children:l})]}),e.jsxs("tr",{className:"border-y-2 border-black/20",children:[e.jsx("th",{children:"Device ID"}),e.jsx("td",{children:":"}),e.jsx("td",{children:t.id_alat})]})]})})}),e.jsxs("form",{className:"w-full flex flex-col justify-center items-center gap-3 mt-3",action:"/dashboard/device/disconnect",method:"post",children:[e.jsx("input",{type:"hidden",name:"_token",value:s}),e.jsx("input",{className:"btn btn-error",type:"submit",value:"Disconnect"})]})]});return e.jsx(e.Fragment,{children:e.jsx("div",{className:"flex flex-col justify-center items-center gap-3 w-full h-full",children:e.jsxs("div",{className:"p-2 mt-8",children:[e.jsx("h1",{className:"text-6xl font-bold font-sans text-center",children:"Hubungkan Perangkat"}),e.jsxs("div",{className:"mt-12 w-full",children:[e.jsx("div",{className:"mt-3 w-full flex flex-col justify-center items-center",children:t.id_alat==null?a:n}),e.jsxs("div",{className:"mt-6 w-full flex flex-col justify-center items-center",children:[e.jsx("p",{className:"label text-sm text-center",children:"Ingin keluar? (Log Out)"}),e.jsx("a",{href:"/logout",children:e.jsx("button",{className:"btn btn-error",children:"Log Out"})})]})]})]})})})}export{r as default};