console.log('client.js');

$(document).ready(function(){
    console.log('jquery is loaded');
    $.ajax({
        method: 'POST',
        url: '/shoes',
        data: {
            name: 'Nike Air Jordan',
            cost: '110'    
        },
        success: function(response) {
            console.log('response', response)
        }
    })
});