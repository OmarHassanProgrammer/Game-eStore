<div>
    <h2>{{ $name }} sent a message to you</h2>
    <div><label>Msg: </label> {{ $msg }}</div>
    <div>Reply to him <a href={{ env('APP_URL') . '/games' }}>here</a><div>
</div>