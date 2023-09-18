<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Chat;
use App\Models\ClosedChat;
use Illuminate\Support\Facades\Mail;
use App\Mail\ChatNotification;

class ChatController extends Controller
{
    public function sendMsg(Request $request) {
        if($request->msg != "") {
            $msg = Chat::create([
                'to' => $request->id,
                'from' => Auth::user()->id,
                'msg' => $request->msg
            ]);
            Mail::to(User::find($request->id)->email)->send(new ChatNotification(Auth::user()->name, $request->msg));
            return response()->json(['msg' => 'done', 'message' => $msg]);
        } else {
            return response()->json(['msg' => 'err']);
        }
    }

    public function getChat($id) {
        $chat = Chat::where("to", Auth::user()->id)->where("from", $id)
                            ->orWhere("from", Auth::user()->id)->where("to", $id)->get();
        
        $closed = ClosedChat::where("to", Auth::user()->id)->where("from", $id)
            ->orWhere("from", Auth::user()->id)->where("to", $id)->get();


        return response()->json(['msg' => 'done', 'chat' => $chat, 'closed' => count($closed)]);
    } 

    public function getChatAdmin($ids) {
        $chat = Chat::where("to", explode('-', $ids)[0])->where("from", explode('-', $ids)[1])
                            ->orWhere("from", explode('-', $ids)[0])->where("to", explode('-', $ids)[1])->get();
        
        $closed = ClosedChat::where("to", explode('-', $ids)[0])->where("from", explode('-', $ids)[1])
            ->orWhere("from", explode('-', $ids)[1])->where("to", explode('-', $ids)[0])->get();

        
        return response()->json(['msg' => 'done', 'chat' => $chat, 'closed' => count($closed)]);
    } 
    
    public function close($ids) {
        $closed = ClosedChat::where("to", explode('-', $ids)[0])->where("from", explode('-', $ids)[1])
            ->orWhere("from", explode('-', $ids)[1])->where("to", explode('-', $ids)[0])->get();

        if(count($closed) == 0) {
            ClosedChat::create([
                'to' => explode('-', $ids)[0],
                'from' => explode('-', $ids)[1]
            ]);
        }
        
        return response()->json(['msg' => 'done']);
    } 
    
    public function open($ids) {
        $closed = ClosedChat::where("to", explode('-', $ids)[0])->where("from", explode('-', $ids)[1])
        ->orWhere("from", explode('-', $ids)[1])->where("to", explode('-', $ids)[0])->get();

        if(count($closed) == 1) {
            $closed[0]->delete();
        }
        
        return response()->json(['msg' => 'done']);
    } 
}
