import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Home(props) {
    var data = props.data;
    var i = 1;
    const length = Object.keys(data).length;
    data = props.data_view;
    console.log(Object.entries(data))
    return (
        <>
            <div className='flex flex-col gap-4 items-center my-8 mx-4'>
                <div className="w-full">
                    <h1 className='font-bold text-2xl'>Selamat Datang, {props.nama_user}</h1>
                </div>
                <div className='flex flex-row gap-4 flex-wrap justify-center items-center w-full'>
                    <div className="stats bg-slate-700 shadow w-full">
                        <div className="stat">
                            <div className="stat-title">Anak</div>
                            <div className="stat-value">{length} Anak</div>
                            <div className="stat-desc">Jumlah anak yang terdaftar di {props.puskesmas}</div>
                        </div>
                    </div>
                </div>
                <div className="pt-2 w-full">
                    <p className='text-sm text-left'>
                        Data 5 Anak Pertama
                    </p>
                </div>
                <div className='w-full'>
                    <div className="overflow-x-auto">
                        <table className="table table-xs table-pin-rows table-pin-cols">
                            <thead>
                                <tr className='border-b-slate-700'>
                                    <th></th> 
                                    <td>Nama</td> 
                                    <td>Usia</td> 
                                    <td>Jenis Kelamin</td>  
                                    <td>Puskesmas</td> 
                                </tr>
                            </thead> 
                            <tbody>
                            {Object.entries(data).map(([key, value]) => (
                                <tr className='border-b-slate-700'>
                                    <th className='py-2'>{i++}</th> 
                                    <td className='py-2'>{value.nama_anak}</td> 
                                    <td className='py-2'>{value.usia}</td> 
                                    <td className='py-2'>{value.jenis_kelamin == 'L' ? 'Laki-Laki' : 'Perempuan'}</td> 
                                    <td className='py-2'>{value.puskesmas}</td> 
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