import{j as s}from"./app-7c369a65.js";function n(e){var a=e.data,t=1;const c=Object.keys(a).length;return a=e.data_view,console.log(Object.entries(a)),s.jsx(s.Fragment,{children:s.jsxs("div",{className:"flex flex-col gap-4 items-center my-8 mx-4",children:[s.jsx("div",{className:"w-full",children:s.jsxs("h1",{className:"font-bold text-2xl",children:["Selamat Datang, ",e.nama_user]})}),s.jsx("div",{className:"flex flex-row gap-4 flex-wrap justify-center items-center w-full",children:s.jsx("div",{className:"stats bg-slate-700 shadow w-full",children:s.jsxs("div",{className:"stat",children:[s.jsx("div",{className:"stat-title",children:"Anak"}),s.jsxs("div",{className:"stat-value",children:[c," Anak"]}),s.jsxs("div",{className:"stat-desc",children:["Jumlah anak yang terdaftar di ",e.puskesmas]})]})})}),s.jsx("div",{className:"pt-2 w-full",children:s.jsx("p",{className:"text-sm text-left",children:"Data 5 Anak Pertama"})}),s.jsx("div",{className:"w-full",children:s.jsx("div",{className:"overflow-x-auto",children:s.jsxs("table",{className:"table table-xs table-pin-rows table-pin-cols",children:[s.jsx("thead",{children:s.jsxs("tr",{className:"border-b-slate-700",children:[s.jsx("th",{}),s.jsx("td",{children:"Nama"}),s.jsx("td",{children:"Usia"}),s.jsx("td",{children:"Jenis Kelamin"}),s.jsx("td",{children:"Puskesmas"})]})}),s.jsx("tbody",{children:Object.entries(a).map(([i,l])=>s.jsxs("tr",{className:"border-b-slate-700",children:[s.jsx("th",{className:"py-2",children:t++}),s.jsx("td",{className:"py-2",children:l.nama_anak}),s.jsx("td",{className:"py-2",children:l.usia}),s.jsx("td",{className:"py-2",children:l.jenis_kelamin=="L"?"Laki-Laki":"Perempuan"}),s.jsx("td",{className:"py-2",children:l.puskesmas})]}))})]})})})]})})}export{n as default};