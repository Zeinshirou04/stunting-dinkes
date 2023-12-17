import React from 'react';
import { Link, Head } from '@inertiajs/react';

export default function Login(props) {

    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    return (
        <>
            <Head>
                <title>
                    {props.title}
                </title>
            </Head>
            <div className="h-full w-full py-8 flex flex-col sm:flex-row sm:px-8">
                <figure className='w-1/4 my-8 mx-auto sm:mx-4 flex flex-col justify-center'>
                    <img src="/assets/img/dinkes-logo.png" alt="Lambang Dinas Kesehatan Hijau Biru" />
                </figure>
                <div className="mx-auto w-4/5 py-12 px-8 bg-slate-700 rounded-xl">
                    <div className='w-full mx-auto'>
                        <form action="/login/verify" className='text-center w-full' method="post">
                            <input type="hidden" name="_token" value={token} />
                            <input type="text" name='Username' id='Username' placeholder="Type Your Username Here..." className="input input-bordered rounded-full w-full mb-4 text-sm" />
                            <label className="form-control w-full my-4 mx-auto">
                                <input type="password" name='Password' id='Password'  placeholder="Type Your Password Here..." className="input input-bordered rounded-full w-full text-sm" />
                                <div className="label">
                                    <label className="cursor-pointer">
                                        <input type="checkbox"className="checkbox checkbox-xs mr-2" />
                                        <span className="label-text text-xs">Remember me</span> 
                                    </label>
                                    <a href="#">
                                        <span className="label-text-alt text-xs">Forgot your password?</span>
                                    </a>
                                </div>
                            </label>
                            <input type="submit" className='btn btn-primary mx-auto rounded-full px-16' value="Login" />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};