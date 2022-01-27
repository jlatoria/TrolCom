

var socket = io();
var isErr = false;
var p = 1;

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

});

function ChangePage() {
    $('#p' + p).addClass('hidden');
    p++;
    $('#p' + p).removeClass('hidden');
}


$('#login').click(function () {
    $('#login').html('<div class="loader"></div>');
    var IP = $('#ip').val();
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

$('#controls').on('click', 'div.btn', function () {
    $(this).addClass('bactive');
});

