import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';

export default function DetailChild(props) {
    const data = props.data;
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    const endpoint = 'https://robotlintang.id/api/api.php?data=realtime'
    // const endpoint = 'https://127.0.0.1:8000/data/getall';
    // axios.get(endpoint)
    //     .then((response) => {
    //         console.log(response.data)
    //     });
    // console.log(document.getElementById('measureTable'));
    const measureTable = document.getElementById('measureTable');
    // console.log(data);

    const [inputValue, setInputValue] = useState('');
    var beratBadan = document.getElementById('beratBadan');
    var tinggiBadan = document.getElementById('tinggiBadan');
    var posisi = document.getElementById('posisi');

    // console.log(beratBadan);

    beratBadan.value = inputValue.sensor_1;
    tinggiBadan.value = inputValue.sensor_2;
    posisi.innerHTML = inputValue.posisi == 'T' ? 'Terlentang' : 'Berdiri';
    
    // Fetch data from the API and update inputValue
    const fetchData = async () => {
        try {
            const response = await axios.get(endpoint);
            console.log(response.data.data[0]);
            setInputValue(response.data.data[0]);
        } catch (error) {
            console.error(error);
        }
    };
    
    // Set up an effect that runs whenever endpoint changes
    useEffect(() => {
        fetchData();
    }, [endpoint]);  // Dependency array includes endpoint
    return (
        <>
            <div className='flex flex-col gap-4 items-center mb-4 mx-4'>
                <div className='w-full'>
                    <div>
                        <h1 className='font-extrabold text-3xl'>Detail Anak</h1>
                        <h4>Adek {toTitleCase(data.nama_anak)}</h4>
                    </div>
                    <div className='w-full max-w-full overflow-x-auto'>
                        <table className="table static" id='biodataAnak'>
                            <thead>
                                <tr className='border-b-slate-700'>
                                    <th>###</th>
                                    <td>###</td>
                                    <td>###</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b-slate-700'>
                                    <th>NIK</th>
                                    <td>:</td>
                                    <td>{data.nik_anak}</td>
                                    <th>Tempat Lahir</th>
                                    <td>:</td>
                                    <td>{data.tempat_lahir == null ? 'Belum Terdata' : data.tempat_lahir}</td>
                                </tr>
                                <tr className='border-b-slate-700'>
                                    <th>Nama</th>
                                    <td>:</td>
                                    <td>{data.nama_anak}</td>
                                    <th>Tanggal Lahir</th>
                                    <td>:</td>
                                    <td>{data.tanggal_lahir == null ? 'Belum Terdata' : data.tanggal_lahir}</td>
                                </tr>
                                <tr className='border-b-slate-700'>
                                    <th>Usia</th>
                                    <td>:</td>
                                    <td>{data.usia}</td>
                                    <th>Nama Wali</th>
                                    <td>:</td>
                                    <td>{data.nama_ibu != null ? data.nama_ibu : data.nama_ayah != null ? data.nama_ayah : 'Belum Terdata'}</td>
                                </tr>
                                <tr className='border-b-slate-700'>
                                    <th>Jenis Kelamin</th>
                                    <td>:</td>
                                    <td>{data.jenis_kelamin == 'L' ? 'Laki-Laki' : 'Perempuan'}</td>
                                    <th>No. HP Wali</th>
                                    <td>:</td>
                                    <td>{data.no_hp_ortu == null ? 'Belum Terdata' : data.no_hp_ortu}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-row gap-2 mt-4'>
                        <button className="btn btn-accent" onClick={toggleMeasureView}>Meassure</button>
                    </div>
                </div>
            </div>
        </>
    );
}