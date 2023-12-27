import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Device(props) {

    // Declare Global Variables
    var deviceID;
    var host;
    var port;
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    // Creating or Declaring client ID
    var clientID = "ClientID-" + parseInt(Math.random() * 100);

    const formView = 
    <>
        <form className='w-full flex flex-col justify-center items-center gap-3' action="/dashboard/device/connect" method='post'>
            <input type="hidden" name="_token" value={token} />
            <label className="form-control w-full max-w-xs">
                <div className="label">
                    <span className="label-text text-xs">ID Perangkat : {clientID}</span>
                </div>
                <input type="text" name='deviceID' placeholder="Masukkan ID Alat" className="input input-bordered w-full max-w-xs text-xs p-2 h-10" />
                <div className="label flex-col justify-start items-start">
                    <span className="label-text-alt text-xs">ID Alat = ESP-(Kode pada Alat)</span>
                    <span className='label-text-alt text-xs'>Contoh : ESP-01</span>
                </div>
            </label>
            <input className='btn btn-primary' type="submit" value='Connect' />
        </form>
    </>

    // let options = {
    //     acceptAllDevices: true,
    //     optionalServices: ['battery_service'] // Required to access service later.
    // };
  
    // function connect() {
    //     navigator.bluetooth
    //         .requestDevice(options)
    //         .then(device => device.gatt.connect())
    //         .then(server => {
    //             // Getting Battery Service…
    //             return server.getPrimaryService('battery_service');
    //         })
    //         .then(service => {
    //             // Getting Battery Level Characteristic…
    //             return service.getCharacteristic('battery_level');
    //         })
    //         .then(characteristic => {
    //             // Reading Battery Level…
    //             return characteristic.readValue();
    //         })
    //         .then(value => {
    //             console.log(`Battery percentage is ${value.getUint8(0)}`);
    //         })
    //         .catch(error => { console.error(error); });
    // }

    const connectedView = 
    <> 
        <p className='label text-sm text-center'>Anda sekarang sudah terhubung dengan timbangan</p>
        <div className="overflow-x-auto max-w-sm">
            <table className="table">
                <tbody>
                    <tr className='border-y-2 border-black/20'>
                        <th>Client ID</th>
                        <td>:</td>
                        <td>{clientID}</td>
                    </tr>
                    <tr className='border-y-2 border-black/20'>
                        <th>Device ID</th>
                        <td>:</td>
                        <td>{props.id_alat}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <form className='w-full flex flex-col justify-center items-center gap-3 mt-3' action="/dashboard/device/disconnect" method='post'>
            <input type="hidden" name="_token" value={token} />
            <input className='btn btn-error' type="submit" value='Disconnect' />
        </form>
    </>
    
    
    return (
        <>
            <div className='flex flex-col justify-center items-center gap-3 w-full h-full'>
                <div className="p-2 mt-8">
                    <h1 className='text-6xl font-bold font-sans text-center'>Hubungkan Perangkat</h1>
                    <div className="mt-12 w-full">
                        <div className="mt-3 w-full flex flex-col justify-center items-center">
                            {props.id_alat == null ? formView : connectedView}
                        </div>
                        <div className='mt-6 w-full flex flex-col justify-center items-center'>
                            <p className='label text-sm text-center'>Ingin keluar? (Log Out)</p>
                            <a href="/logout">
                                <button className='btn btn-error'>Log Out</button>
                            </a>
                        </div>
                        {/* <button className='btn btn-link' onClick={connect}>Connect</button> */}
                    </div>
                </div>
            </div>
        </>
    );
}