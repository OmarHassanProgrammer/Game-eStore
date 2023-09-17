<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\MyEmail;

class MailController extends Controller
{
    public function send(Request $request) {
        Mail::to('ziadsorour10@gmail.com')->send(new MyEmail($request->name, $request->email, $request->msg));

        return response()->json(['msg' => 'done']);
    }
}
