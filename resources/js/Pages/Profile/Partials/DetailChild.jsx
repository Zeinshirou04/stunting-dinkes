import React, { useState, useEffect } from 'react';
import { Link, Head } from '@inertiajs/react';

export default function DetailChild(props) {
    const data = props.data;
    // console.log(typeof data.usia, data.usia);
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function calculateAge(dateString) {
        const birthDate = new Date(dateString);
        const today = new Date();
        const differenceInTime = today.getTime() - birthDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return Math.floor(differenceInDays);
    }

    const [birthDate, setBirthDate] = useState(data.tanggal_lahir);
    const ageInDays = calculateAge(birthDate);
    // console.log(ageInDays);
    
    
    const endpoint = 'https://robotlintang.id/api/api.php?data=realtime';
    
    const [inputValue, setInputValue] = useState('');
    var beratBadan = document.getElementById('beratBadan');
    var tinggiBadan = document.getElementById('tinggiBadan');
    var posisi = document.getElementById('posisi');
    var tb_koreksi = document.getElementById('tb-koreksi');
    var z_score = document.getElementById('z-score');
    var kategori = document.getElementById('kategori');
    // console.log(ageInDays);
    // console.log(props.zScores);
    
    // console.log(beratBadan);
    
    beratBadan.value = inputValue.sensor_1;
    tinggiBadan.value = inputValue.sensor_2;
    posisi.innerHTML = inputValue.posisi == 'T' ? 'Terlentang' : inputValue.posisi == 'B' ? 'Berdiri' : 'Tak Terdefinisi';
    
    // Fetch data from the API and update inputValue
    const fetchData = async () => {
        try {
            const response = await axios.get(endpoint);
            setInputValue(response.data.data[0]);
        } catch (error) {
            console.error(error);
        }
    };
    
    if(ageInDays < 730) {
        if(inputValue.posisi == 'T') {
            tb_koreksi.innerHTML = inputValue.sensor_2;
        } else if(inputValue.posisi == 'B') {
            tb_koreksi.innerHTML = inputValue.sensor_2 + 0.7;
        } else {
            tb_koreksi.innerHTML = 'Tak Terdefinisi';
        }
    } else if(ageInDays >= 730) {
        if(inputValue.posisi == 'B') {
            tb_koreksi.innerHTML = inputValue.sensor_2;
        } else if(inputValue.posisi == 'T') {
            tb_koreksi.innerHTML = inputValue.sensor_2 - 0.7;
        } else {
            tb_koreksi.innerHTML = 'Tak Terdefinisi';
        }
    }
    
    var tb_koreksi = parseFloat(tb_koreksi.innerHTML);

    var z_score_tbu_a = (tb_koreksi - props.zScores[0].SD0) / (props.zScores[0].SD0 - props.zScores[0].SD1neg);
    var z_score_tbu_b = (tb_koreksi - props.zScores[0].SD0) / (props.zScores[0].SD1 - props.zScores[0].SD0);
    // console.log(props.zScores[0]);
    z_score.innerHTML = tb_koreksi <= props.zScores[0].SD0 ? parseFloat(z_score_tbu_a).toFixed(2) : parseFloat(z_score_tbu_b).toFixed(2);

    /*
    
        Hilangkan Komentar pada baris-baris dibawah untuk kategori TB/U

    */

    if(tb_koreksi <= props.zScores[0].SD3neg) {
        kategori.innerHTML = "Sangat Pendek";
    } else if(tb_koreksi >= props.zScores[0].SD3neg && tb_koreksi < props.zScores[0].SD2neg) {
        kategori.innerHTML = "Pendek";
    } else if(tb_koreksi >= props.zScores[0].SD2neg && tb_koreksi <= props.zScores[0].SD2) {
        kategori.innerHTML = "Normal";
    } else if(tb_koreksi > props.zScores[0].SD2) {
        kategori.innerHTML = "Tinggi";
    }
    
    /*
    
        Hilangkan Komentar pada baris-baris dibawah untuk kategori BB/TB

    */

    // if(inputValue.sensor_1 <= props.zScores[0].SD3neg) {
    //     kategori.innerHTML = "Gizi Buruk";
    // } else if(inputValue.sensor_1 >= props.zScores[0].SD3neg && inputValue.sensor_1 <= props.zScores[0].SD2neg) {
    //     kategori.innerHTML = "Gizi Kurang";
    // } else if(inputValue.sensor_1 >= props.zScores[0].SD2neg && inputValue.sensor_1 <= props.zScores[0].SD1) {
    //     kategori.innerHTML = "Normal";
    // } else if(inputValue.sensor_1 >= props.zScores[0].SD1 && inputValue.sensor_1 <= props.zScores[0].SD2) {
    //     kategori.innerHTML = "Risiko Gizi Lebih";
    // } else if(inputValue.sensor_1 >= props.zScores[0].SD2 && inputValue.sensor_1 <= props.zScores[0].SD3) {
    //     kategori.innerHTML = "Gizi Lebih";
    // } else if(inputValue.sensor_1 >= props.zScores[0].SD3) {
    //     kategori.innerHTML = "Obesitas";
    // }
    
    // Set up an effect that runs whenever endpoint changes
    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 2000);
        return () => clearInterval(interval);
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