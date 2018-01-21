// Deshmukh, Priyanka
// Assignment 3
// Class Account: jadrn013
// Red id: 822066226
var htmlModal ;
var confirmationPage ='<div class="confirmation">            <h1 >Thanks for Registration</h1>            <h2>You will get a confirmation mail as well as a reminder shortly before the Marathon.</h2>            <h2>Stay Healthy!!</h2>            <div class=" slidebar "><h3>Connect with us for latest news!</h3><img src="insta.png" alt=""><img src="fb.png" alt=""><img src="g+.png" alt=""><img src="twitter.png" alt=""></div></div>';
$(function () {
  htmlModal = $('#myModal .modal-body').html();


  //countdown timer
  //learned countdown timer from https://www.w3schools.com/howto/howto_js_countdown.asp
  var marathondate = new Date("Dec 3, 2017 08:00:00").getTime();
  var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = marathondate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    $('.day :first-child').html(days);
    $('.hours :first-child').html(hours);
    $('.minutes :first-child').html(minutes);
    $('.seconds :first-child').html(seconds);
    if (distance < 0) {
      $('.flexItemMain3').hide();
    }
  }, 1000);



  function clearErrors() {
    $(".required+span,.requiredDropDown+span").css("display","none");
    $(".ageLimit").hide();
    $(".invalidDob").hide();
    $('.invalidPhone').hide();
    $(".genderNotSel").hide();
    $(".validZip").hide();
    $(".invalidEmail").hide();
    $(".noUpload").hide();
    $(".invalidFile").hide();
    $(".size").hide();
    $(".dubPhone").hide();
    $(".dubEmail").hide();

  }


  //clear data on modal close click
  $('#myModal').on('hidden.bs.modal', function () {
    $('#reset').trigger("click");

    clearErrors();
  });

  $(document).on('click', '#closeMyModal', changeModalContentBackToForm);
  // $('#closeMyModal').on('click', function (e) {

  // });
  // change content of modal to form from confirmation modal

  // clear all error and data

  $('#reset').click(function () {
    clearErrors();
  });

  $("#getting-started button").click(function () {
    $('#reset').trigger("click");
  });

  //to increase decrease navbar elements length on scroll
  $(window).scroll(function() {
    if ($(document).scrollTop() > 50) {
      $('.sdsu-header').addClass('shrink');
      $('.sdsu-marathon-header').addClass('grow');
    } else {
      $('.sdsu-header').removeClass('shrink');
      $('.sdsu-marathon-header').removeClass('grow');
    }
  });


  // change interval of carousal
  $(".carousel").carousel({ interval: 2000 });

  //  change profile pic with respect to gender function validateFile() {
    $("input[name='gender']").change(function(){
      var gender = $("input[name=gender]:checked").val();
      if(gender=='Female'){
        $("#profilePicF").css('display','block');
        $("#profilePicM").css('display','none');
        $(".genderNotSel").hide();
      }
      else if(gender=='Male'){
        $("#profilePicF").css('display','NONE');
        $("#profilePicM").css('display','block');
        $(".genderNotSel").hide();
      }
    });

    $("input[name='fileupload']").on("blur change",function () {

      if($("input[name='fileupload']").val()==""){

        $(".noUpload").show();
      }
      else {
        validateFile();
      }
    });

    //check uploaded file
    function validateFile() {
      $(".invalidFile").hide();
      $(".noUpload").hide();
      $(".size").hide();
      var file = $("input[name='fileupload']")[0].files[0];
      var fileType = file["type"].toLowerCase(); //to allow PNG,JPEG,GIF
      var imageTypesAllowed = [ "image/jpeg", "image/png","image/gif"];
      if ($.inArray(fileType, imageTypesAllowed) < 0) {
        $(".invalidFile").show();
        return false;
      }
      else if(file.size>1000000){
        $(".size").show();
        return false;
      }
      if($("input[name='fileupload']").val()==""){

        $(".noUpload").show();
        return false;
      }
      return true;
    }


    // phone number shoud be number and in correct format

    $('#phone').keydown(function(key) {
      if(key.keyCode==8||key.keyCode==46||key.keyCode==37||key.keyCode==39) return true;
      if(key.keyCode==8||key.keyCode==46||key.keyCode==189||key.keyCode==173) return true;
      if(key.keyCode>95&&key.keyCode<106) return true;
      //enable arrows and delete backspace
      if(key.keyCode < 48 || key.keyCode > 57) return false; //allow only numbers
    });

    $('#phone').blur(function () {
      validatePhone();
    });

    function validatePhone() {
      $(this).siblings('span').hide();
      $('.invalidPhone').hide();
      phoneNumber  = $('#phone').val().length;
      if(phoneNumber==0){
        $(this).siblings('span').show();
        $('.invalidPhone').hide();
        return false;
      }
      else{
        var phoneRegex = new RegExp(/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/);
        var userPhone =$("#phone").val();
        if (!phoneRegex.test(userPhone)&phoneRegex.length!=0) {
          $(".invalidPhone").show();
          return false;
        }
        else if($('#phone').val().replace(/[^0-9]/g,"").length==10){
          $(this).siblings('span').hide();
          $('.invalidPhone').hide();
          return true;
        }
      }
      return true;
    }

    //validate email
    $("#email").blur(function () {
      $("#email").next('span').hide();
      $(".invalidEmail").hide();
      validateEmail();

    });
    function validateEmail() {

      var emailRegex = new RegExp(/^[._%+-A-Za-z0-9]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/);
      var userEmail =$("#email").val().toLowerCase();

      if (!emailRegex.test(userEmail)&userEmail.trim().length!=0) {
        $(".invalidEmail").show();
        return false;
      }
      else if(userEmail.trim().length==0){
        $("#email").next('span').show();
        $(".invalidEmail").hide();
        return false;
      }
      else if(emailRegex.test(userEmail)){
        $(".invalidEmail").hide();
        $("#email").next('span').hide();
        return true;
      }
    }

    //zip should be number
    $('#zip').keydown(function(key) {
      if(key.keyCode==8||key.keyCode==46||key.keyCode==37||key.keyCode==39) return true;
      if(key.keyCode>95&&key.keyCode<106) return true;
      if(key.keyCode < 48 || key.keyCode > 57) return false;
    });

    $("#zip").blur(function () {
      validateZip();
    });

    function validateZip() {
      if($('#zip').val().replace(/[^0-9]/g,"").length==5){
        $(".validZip").hide();
        $("#zip+span").hide();
        return true;
      }

      if($('#zip').val().replace(/[^0-9]/g,"").length!=5 && $("#zip").val().length!=0){
        $("#zip+span").hide();
        $(".validZip").show();
        return false;
      }

      if($("#zip").val().length==0){
        $("#zip+span").show();
        return false;
      }

    }

    // dob should be in number and correct format
    $('#dob').keydown(function(key) {
      $(".ageLimit").hide();
      $(".invalidDob").hide();
      if(key.keyCode>95&&key.keyCode<106) return true;
      if(key.keyCode==8||key.keyCode==46||key.keyCode==37||key.keyCode==39||key.keyCode==191) return true;
      //if(key.keyCode==8||key.keyCode==46) return true;
      doblength= $('#dob').val().length;
      if(doblength==2){
        $('#dob').val(  $('#dob').val()+"/");
      }
      else if(doblength==5){
        $('#dob').val(  $('#dob').val()+"/");
      }
      if(key.keyCode < 48 || key.keyCode > 57) return false;
    });


    $("#dob").blur(function () {
      validateDob();
    });

    function validateDob() {
      $(".ageLimit").hide();
      $(".invalidDob").hide();
      if ($('#dob').val().length==10) {
        var date= $('#dob').val();
        var userDob=new Date(date);
        if ( isNaN(userDob.valueOf()) ) {
          $(".invalidDob").show();
          return false;
        }
        var todaysDate=new Date();
        var year = todaysDate.getFullYear() - userDob.getFullYear();
        var day =Math.abs(todaysDate.getDay() - userDob.getDay());
        if((year==0 & day<0) ||(year<0 )){
          $(".invalidDob").show();
          return false;
        }

        else if(year>99||year<12){
          $(".ageLimit").show();
          return false;
        }
      }
      else if($('#dob').val().length<10&&$('#dob').val().length!=0){
        $(".invalidDob").show();
        return false;

      }
      return true;

    }
    // validation for all required fields - give error message in span
    $(".required").blur(function () {
      length = $(this).val().trim().length;
      if(length==0)
      $(this).next('span').show();
      else {
        $(this).siblings('span').hide;
      }
    });


    $('.required').keydown(function(key) {
      length = $(this).val().trim().length;
      if(length==0){
        $(this).siblings('span').hide();
      }
    });

    // check for dropdowns
    $('.requiredDropDown').on("focus blur",function () {
      if(  $(this).val()=="" ){
        $(this).next('span').show();
      }
    });

    $('.requiredDropDown').change(function () {
      if(  $(this).val()!="" ){
        $(this).next('span').hide();
      }
    });


    //register button
    $('#getting-started button').mouseenter(function functionName() {

      $('#getting-started button').html('Register!  >');
    });

    $('#getting-started button').mouseout(function functionName() {

      $('#getting-started button').html('Register');
    });

    // $(document).on('click', '#submit', changeModalContentBackToForm);



    // all validations on submit
    // $('#submit').on('click', function (e) {
    $(document).on('click', '#submit',function (e) {


      $(".dubPhone").hide();
      $(".dubEmail").hide();

      //
      //all blank validations
      if($("#fname").val().trim()==""){

        $("#fname+span").show();
        return false;
      }
      else if($("#lname").val().trim()==""){

        $("#lname+span").show();
        return false;
      }

      else if(!$('.male').is(':checked')&&!$('.female').is(':checked')){

        $(".genderNotSel").css("display","block");
        return false;
      }
      else if($("input[name='fileupload']").val()==""){
        $(".noUpload").show();
        return false;


      }
      else if(!validateFile()){

        return false;
      }
      //https://stackoverflow.com/questions/29805909/jquery-how-to-check-if-uploaded-file-is-an-image-without-checking-extensions
      else if($("#address1").val().trim()==""){

        $("#address1+span").show();
        return false;
      }
      else if($("#city").val().trim()==""){

        $("#city+span").show();
        return false;
      }
      else if($("#state").val().trim()==""){

        $("#state+span").show();
        return false;
      }
      else if($("#zip").val().trim()==""){

        $("#zip+span").show();
        return false;
      }
      else if(!validateZip()){

        return false;
      }



      else if($("#phone").val().trim()==""){

        $("#phone+span").show();
        return false;
      }
      else if(!validatePhone()){

        return false;
      }
      else  if($("#email").val().trim()==""){

        $("#email+span").show();
        return false;
      }
      else if(!validateEmail()){

        return false;
      }
      else if($("#dob").val().trim()==""){

        $("#dob+span").show();
        return false;
      }
      else if(!validateDob()){

        return false;
      }

      else if($("#Experience").val().trim()==""){

        $("#Experience+span").show();
        return false;
      }
      else if($("#Category").val().trim()==""){

        $("#Category+span").show();
        return false;
      }

      e.preventDefault();
      var params = "email="+$('#email').val()+"&phone="+$('#phone').val();
      var url = "check_dup.php?"+params;
      var responseabc= $.get(url, dup_handler);
      function dup_handler(response) {
      
        $('#myFormloader').show();
        clearErrors();
        if(response == "email"){
          $(".dubPhone").hide();
          $(".dubEmail").show();
          $('#myFormloader').hide();
        }
        else if(response=="phone"){
          $(".dubEmail").hide();
          $(".dubPhone").show();
          $('#myFormloader').hide();
        }
        else if(response == "OK") {
          validateForm();
        }
        else {
          $(".dubPhone").show();
          $(".dubEmail").show();
          $('#myFormloader').hide();

        }
      }

      function upload() {
        var form_data = new FormData($('form')[0]);
        form_data.append("image", document.getElementById("fileupload").files[0]);
        $.ajax( {
          url: "ajax_file_upload.php",
          type: "post",
          data: form_data,
          processData: false,
          contentType: false,
          success: function(response) {
            if(response.startsWith("Success")) {




              $("#myModal .modal-body").html(confirmationPage);
              $('#myFormloader').hide();
              // once everything is done correctly change modal content from FORM to confirmation
            }
            else {
              $('#myFormloader').hide();
            }
          },
          error: function(response) {
            $('#myFormloader').hide(); }
          });

        }

        function validateForm() {

          var form_data = new FormData($('form')[0]);
          $.ajax( {
            url: "validateForm.php",
            type: "post",
            data: form_data,
            processData: false,
            contentType: false,
            success: function(response) {
              showPhpErrors(response);
              if(response.startsWith("There")) {
                // upload file only when data inserted in DB. Save space
                upload();
              }
              else{
                $('#myFormloader').hide();
              }
            },
            error: function(response) {
              $('#myFormloader').hide();}
            });
          }

          function showPhpErrors(response) {

            clearErrors();

            if (response.indexOf("fname") >=0)  $("#fname+span").show();

            if (response.indexOf("lname") >=0) $("#lname+span").show();

            if (response.indexOf("add1") >=0) $("#address1+span").show();

            if (response.indexOf("gender") >=0)  $(".genderNotSel").show();

            if (response.indexOf("city") >=0) $("#city+span").show();

            if (response.indexOf("state") >=0)  $("#state+span").show();

            if (response.indexOf("nfile") >=0)  $(".noUpload").show();
            else if (response.indexOf("tfile") >=0)  $(".invalidFile").show();
            else if (response.indexOf("lfile") >=0) $(".size").show();


            if (response.indexOf("zip") >=0)  $("#zip+span").show();
            else if (response.indexOf("zchar") >=0)  $(".validZip").show();
            else if (response.indexOf("zlen") >=0) $(".validZip").show();

            if (response.indexOf("phone") >=0) $("#phone+span").show();
            else if (response.indexOf("pin") >=0)  $(".invalidPhone").show();

            if (response.indexOf("email") >=0)  $("#email+span").show();
            else if (response.indexOf("inmail") >=0)  $(".invalidEmail").show();

            if (response.indexOf("dob") >=0)   $("#dob+span").show();
            else if (response.indexOf("ind") >=0)  $(".invalidDob").show();
            else if (response.indexOf("Lage") >=0) $(".ageLimit").show();
            if (response.indexOf("exp") >=0)  $("#Experience+span").show();
            if (response.indexOf("cat") >=0)  $("#Category+span").show();
            $('#myFormloader').show();
          }

          return false;

        });


      });// document.ready function

      function changeModalContentBackToForm() {


        $('#myModal .modal-body').html(htmlModal);

      }
