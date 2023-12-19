import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function DetailChild(props) {
    const data = props.data;
    function toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
    return (
        <>
            <div className='flex flex-col gap-4 items-center m-4'>
                <div className='w-full mb-12'>
                    <h1 className='font-extrabold text-3xl'>Detail Anak</h1>
                    <h4>Adek {toTitleCase(data.nama_anak)}</h4>
                </div>
            </div>
        </>
    );
}