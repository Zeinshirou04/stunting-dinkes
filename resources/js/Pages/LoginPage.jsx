import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Login(props) {
    return (
        <>
            <Head>
                <title>
                    {props.title}
                </title>
            </Head>
            <div className="h-full w-full">
                <div className="mx-auto w-4/5 py-6">
                    <div className='w-full mx-auto'>
                        <form action="#" method="post">
                            <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};