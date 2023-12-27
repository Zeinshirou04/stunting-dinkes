<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Patient\AdminController;
use App\Http\Controllers\Patient\ChildController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function() {
    return redirect()->route('login');
});

Route::middleware('login')->group(function () {
    Route::get('/login', [AuthController::class, 'index'])->name('login');
});

Route::middleware('dashboard')->group(function () {
    Route::get('/dashboard/home', [AdminController::class, 'index'])->name('dashboard-home');
    Route::get('/dashboard/data', [AdminController::class, 'data'])->name('dashboard-data');
    Route::get('/dashboard/data/show', [ChildController::class, 'index'])->name('dashboard-show');
    Route::post('/dashboard/data/measure', [ChildController::class, 'measure'])->name('dashboard-show-measure');
    Route::get('/dashboard/device', [AdminController::class, 'device'])->name('dashboard-device');
    Route::post('/dashboard/device/connect', [AdminController::class, 'connect'])->name('dashboard-device-connnect');
    Route::post('/dashboard/device/disconnect', [AdminController::class, 'disconnect'])->name('dashboard-device-disconnnect');
});



Route::post('/login/verify', [AuthController::class, 'authenticate'])->name('authenticate');
Route::get('/data/getall', [AdminController::class, 'getall']);
// Route::get('/dashboard/home', [AdminController::class, 'index'])->name('dashboard-home');
// Route::get('/dashboard/data', [AdminController::class, 'data'])->name('dashboard-data');
// Route::get('/dashboard/data/show', [ChildController::class, 'index'])->name('dashboard-show');
// Route::get('/dashboard/chat', [AdminController::class, 'chat'])->name('dashboard-chat');

Route::get('/welcome', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

require __DIR__.'/auth.php';
