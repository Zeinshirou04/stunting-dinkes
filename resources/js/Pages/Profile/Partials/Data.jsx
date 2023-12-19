import React from 'react';
import crypto from 'crypto';
import { Link, Head } from '@inertiajs/react';

// function hashNik() {
//     var nik = 123;
//     var hash = crypto.createHash('sha256').update(nik).digest('hex');
//     return hash;
// }

export default function Data(props) {
    var data = props.data;
    var i = 1;
    function searchData() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("cari");
        filter = input.value.toUpperCase();
        table = document.getElementById("dataAnak");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          }       
        }
    }
    // hashNik();
    return (
        <>
            <div className='flex flex-col gap-4 items-center m-4'>
                <div className='w-full mb-12'>
                    <label className="form-control w-2/4 max-w-xs">
                        <div className="label">
                            <span className="label-text text-sm">Cari Nama</span>
                        </div>
                        <input type="text" name='cari' id='cari' placeholder="Ketik disini..." onKeyUp={searchData} className="input input-bordered w-full max-w-xs text-sm" />
                    </label>
                    <div className="overflow-x-auto mt-2">
                        <table className="table" id='dataAnak'>
                            <thead>
                            <tr>
                                <th></th>
                                {/* <th>NIK</th> */}
                                <th>Nama Anak</th>
                                <th>Aksi</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(data).map(([key, value]) => (
                                <tr className='border-b-slate-700'>
                                    <th>{i++}</th>
                                    {/* <td>{value.nik_anak}</td> */}
                                    <td>{value.nama_anak}</td>
                                    <td>
                                        <a href={'/dashboard/data/show?nik=' + value.nik_anak}>
                                            <button className="btn btn-info">Detail</button>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}