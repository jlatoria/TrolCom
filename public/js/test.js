

var socket = io();
var isErr = false;
var p = 1;
var IP;

var relay = false;

$(document).ready(function () {
    

});

socket.on('log-error',function (msg) {
    isErr = true;
    $('#ip').addClass('err');
    $('#err').html("<b>ERROR:</b> " + msg);
    $('#login').html('Connect');
});

socket.on('log-success',function (msg, ip) {
    $('#login').html('Connect');
    ChangePage();
    $('#dip').html(ip);
    
    if(msg == "0") {
        relay = false;
    } else {
        relay = true;

    }

    if(relay) {
        $('#btn-0').addClass('bactive');
    } else {
        $('#btn-0').removeClass('bactive');
    }

    $('#btn-0').html('<i class="icon ri-shut-down-line"></i> <p>Relay</p>');

});

socket.on('success',function (msg) {
    if(msg == "0") {
        $('#btn-0').html('<i class="icon ri-shut-down-line"></i> <p>Relay</p>');
        $('#btn-0').removeClass('bactive');
    } else {
        $('#btn-0').html('<i class="icon ri-shut-down-line"></i> <p>Relay</p>');
        $('#btn-0').addClass('bactive');
    }

});

function ChangePage() {
    $('#p' + p).addClass('hidden');
    p++;
    $('#p' + p).removeClass('hidden');
}


$('#login').click(function () {
    $('#login').html('<div class="loader"></div>');
    IP = $('#ip').val();
    console.log(IP);
    if(IP != "") {
        socket.emit('login', IP);
    } else {
        isErr = true;
        $('#ip').addClass('err');
        $('#err').html("<b>ERROR:</b> Please Enter An IP Address");
        $('#login').html('Connect');
    }

});


$('#ip').on('input', function () {
   
    if(isErr) {
        isErr = false;
        $('#ip').removeClass('err');
        $('#err').html("");
    }
});

$('#btn-0').on('click', function () {
    $('#btn-0').html('<div class="loader-blk"></div><p>Loading</p>');
    socket.emit('toggle', IP);
});

