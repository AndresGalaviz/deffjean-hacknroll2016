$(document).ready(function(){

    console.log("hello");

    setInterval(function(){ 

        $.ajax({
            url: 'http://87cb01ce.ngrok.io/',
            dataType: "jsonp",
            jsonpCallback: "_data",
            cache: false,
            timeout: 5000,
            success: function(data) {
                var data = $.parseJSON(data)
                $('#robot-image').attr("src", data.message);                
            },
            error: function(jqXHR, textStatus, errorThrown) {
                //console.log('error ' + textStatus + " " + errorThrown);
            }
        });

    }, 1000)

});