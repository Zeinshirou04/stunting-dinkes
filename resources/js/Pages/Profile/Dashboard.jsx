import React from 'react';
import Home from './Partials/Home';
import Data from './Partials/Data';
import Chat from './Partials/Chat';
import Device from './Partials/Device';
import DetailChild from './Partials/DetailChild';
import { Link, Head } from '@inertiajs/react';

export default function Dashboard(props) {
    return (
        <>
            <Head title={props.title} />
            <div className='w-full'>
                <div className='w-full h-full pt-3'>
                    {props.view == 'Home' ? Home(props) : null}
                    {props.view == 'Data' ? Data(props) : null}
                    {props.view == 'Chat' ? Chat(props) : null}
                    {/* {props.view == 'Daycare' ? Daycare(props) : null} */}
                    {props.view == 'Device' ? Device(props) : null}
                    {props.view == 'Detail' ? DetailChild(props) : null}
                </div>
                <div className="btm-nav">
                    <a href="/dashboard/home" className={props.view == 'Home' ? 'active' : null}>
                        <button className='flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            <span className="btm-nav-label">Home</span>
                        </button>
                    </a>
                    <a href="/dashboard/data" className={props.view == 'Data' ? 'active' : null}>
                        <button className='flex flex-col justify-center items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                            <span className="btm-nav-label">Data</span>
                        </button>
                    </a>
                    <a href="/dashboard/chat" className={props.view == 'Chat' ? 'active' : null}>
                        <button className='flex flex-col justify-center items-center'>
                            <i class="fa-solid fa-comments text-gray-400 h-5 w-5"></i>
                            <span className="btm-nav-label">Q&A</span>
                        </button>
                    </a>
                    <a href="/dashboard/device" className={props.view == 'Device' ? 'active' : null}>
                        <button className='flex flex-col justify-center items-center'>
                            <i className="fa-brands fa-bluetooth text-gray-400 text-lg font-light"></i>
                            <span className="btm-nav-label">Device</span>
                        </button>
                    </a>
                </div>
            </div>
        </>
    );
}