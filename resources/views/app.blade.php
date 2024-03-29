<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Robot Stunting - Dinkes Kota Semarang & Udinus</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
        <script src="https://kit.fontawesome.com/ba0903e616.js" crossorigin="anonymous"></script>
        <link rel="icon" href="https://semarangkota.go.id/assets/img/favicon.png" type="image/x-icon">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="w-screen">
        <script src="https://code.responsivevoice.org/responsivevoice.js?key=G2tYg4eu"></script>
        <div id="measureTable" class='h-full w-full absolute hidden'>
            <div class="w-full h-full relative flex flex-col justify-center items-center">
                <div id="measureFront" class="w-4/5 absolute z-20">
                    <div class="w-full bg-slate-800 rounded-lg">
                        <div class="w-full h-full p-4">
                            <h1 class="text-lg font-bold mb-4">Ukur Data Anak</h1>
                            <form action='/dashboard/data/measure' method="post">
                                @csrf
                                <p class="text-sm text-gray-500">Berat Badan</p>
                                <input type="text" id="beratBadan" name="beratBadan" placeholder="Masukkan berat badan..." class="input input-bordered w-full max-w-xs mb-3" />
                                <div class="mb-3">
                                    <p class="text-sm text-gray-500">Tinggi Badan</p>
                                    <input type="text" id="tinggiBadan" name="tinggiBadan" placeholder="Masukkan tinggi badan..." class="input input-bordered w-full max-w-xs mb-3" />
                                    <input type="number" style="display: none;" id="kodeAnak" name="kodeAnak" class="">
                                    <p class="text-sm text-gray-500">Usia Anak: <span id="usia-anak"></span></p>
                                    <p class="text-sm text-gray-500">Tinggi Badan Koreksi: <span id="tb-koreksi"></span></p>
                                    <p class="text-sm text-gray-500">Metode Penimbangan : <span id="posisi"></span></p>
                                    <p class="text-sm text-gray-500">Z-Score Anak : <span id="z-score"></span></p>
                                    <p class="text-sm text-gray-500">Kategori TB/U : <span id="kategori"></span></p>
                                    <input type="text" style="display: none;" id="posisiInput" name="posisi" class="">
                                    <input type="text" style="display: none;" id="zs_tbu" name="zs_tbu" class="">
                                    <input type="text" style="display: none;" id="tbu" name="tbu" class="">
                                </div>
                                <input type="submit" class="btn btn-accent" value="Kirim">
                            </form>
                        </div>
                    </div>
                </div>
                <div id="measureBack" onclick="toggleMeasureView()" class="h-full w-full bg-black/80 absolute z-10"></div>
            </div>
        </div>
        @inertia
        <script>
            function toggleMeasureView() {
                if(measureTable.classList.contains('hidden')) {
                    return measureTable.classList.remove('hidden');
                }
                return measureTable.classList.add('hidden');
            }
        </script>
    </body>
</html>
