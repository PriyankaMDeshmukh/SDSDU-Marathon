// Deshmukh, Priyanka
// Assignment 3
// Class Account: jadrn013
// Red id: 822066226
$(function ()  {







  $(':submit').on('click', function (e) {
    e.preventDefault();
    var form_data = new FormData($('form')[0]);
    $.ajax( {
      url: "process_login.php",
      type: "post",
      data: form_data,
      processData: false,
      contentType: false,
      success: function(response) {
        if(response == "intruder"){
          $('.invalidpwd').show();
        }
        else if(response == "admin") {
            $('.invalidpwd').show();
          form_data.append('response',response);
          $.ajax( {
            url: "reportAjaxinAjax.php",
            type:"POST",
            data: form_data ,
            processData: false,
            contentType: false,
            success: function(response) {
              $('.footer').css('position','static');
              $('.prompt').hide();
              $('form').hide();
              $('#report').html(response);
              $('.invalidpwd').hide();
              if($(".tableAdult tr td").length<=4){
                $('.tableAdult').hide();
                $('.NA').show();
              }
              if($(".tableSenior tr td").length<=4){
                $('.tableSenior').hide();
                  $('.NS').show();
              }
              if($(".tableTeen tr td").length<=4){

                $('.tableTeen').hide();
                  $('.NT').show();
              }
            },
            error: function(response) { }
          });
        }
      },
      error: function(response) { }
    });
  });
});// document.ready function
