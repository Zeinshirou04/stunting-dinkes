import React, {useState} from 'react';
import { Link, Head } from '@inertiajs/react';

// function hashNik() {
//     var nik = 123;
//     var hash = crypto.createHash('sha256').update(nik).digest('hex');
//     return hash;
// }

export default function Chat(props) {
    var data = props.data;
    var result;
    const recognition = new webkitSpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.interimResults = true;
    const voice = 'Indonesian Female'

    function question() {
        recognition.start();
        recognition.addEventListener('result', (e) => {
            const transcript = Array.from(e.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join('');
            if(e.results[0].isFinal) {
                result = transcript.replace(/\.$/, '');
                console.log(result)
                answer(result);
            }
        })
    }

    function answer(result) {
        var endpoint = 'https://api.openai.com/v1/chat/completions';
        const data = {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'system',
                    content: 'Kamu adalah Lintang, Robot Stunting yang dibuat oleh Dinas Kesehatan Kota Semarang bersama dengan Fakultas Teknik Universitas Dian Nuswantoro. Kamu dapat membantu dalam penimbangan anak dengan robot yang telah dibuat, mampu dalam menghitung Berat Badan, Tinggi Badan, dan Z-Scores. Kamu juga memiliki interface web, dalam mempermudah pendataan anak stunting di Kota Semarang. Juga, kamu bisa menjadi asisten dalam tanya jawab perihal Stunting. Tetapi kamu tidak boleh menjawab atau membicarakan konteks diluar topik kesehatan, stunting dan sebagainya yang tidak ada hubungan sama sekali dengan stunting ataupun dirimu'
                },
                {
                    role: 'user',
                    content: result + '. (Cukup jawab secara normal saja, tidak perlu menjelaskan dirimu ataupun sebagainya)'
                }]
        }
        axios.post(endpoint, data, {
            headers: {
                'Authorization': `Bearer ${props.gpt_token}`,
                'Content-Type': 'application/json'
            }
        }).then(response => {

            response = response.data.choices[0].message.content;
            console.log(response);

            responsiveVoice.speak(response, voice, {
                pitch: 1.4,
                rate: 1,
                onend: () => {
                    recognition.stop();
                }
            });
        }).catch(error => {
            console.error(error);
        })
    }


    return (
        <>
            <div className='flex flex-col justify-center items-center gap-3 w-full h-full'>
                <div className="p-2 mt-8 mx-4">
                    <h1 className='text-4xl font-bold font-sans text-center'>Selamat Datang di Q&A</h1>
                    <h1 className='text-xl font-bold font-sans text-center'>Question and Answer</h1>
                    <div className="mt-12 w-full">
                        <div className='mt-6 w-full flex flex-col justify-center items-center'>
                            <div className="w-2/3 flex flex-col justify-center items-center">
                                <p className='label text-sm text-center'>Untuk bertanya, silahkan tekan tombol dibawah</p>
                                <button className='btn bg-white rounded-full text-xl' onClick={question}>🎙️</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}