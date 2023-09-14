<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Chat;

class ChatController extends Controller
{
    public function sendMsg(Request $request) {
        if($request->msg != "") {
            $msg = Chat::create([
                'to' => $request->id,
                'from' => Auth::user()->id,
                'msg' => $request->msg
            ]);
            return response()->json(['msg' => 'done', 'message' => $msg]);
        } else {
            return response()->json(['msg' => 'err']);
        }
    }

    public function getChat($id) {
        $chat = Chat::where("to", Auth::user()->id)->where("from", $id)
                            ->orWhere("from", Auth::user()->id)->where("to", $id)->get();
        
        return response()->json(['msg' => 'done', 'chat' => $chat]);
    } 
}
