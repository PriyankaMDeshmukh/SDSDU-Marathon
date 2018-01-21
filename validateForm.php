<?php

$bad_chars = array('$','%','?','<','>','php');

#create db connection
function get_db_handle() {
    $server = 'opatija.sdsu.edu:3306';
    $user = 'jadrn013';
    $password = 'simple';
    $database = 'jadrn013';
    if(!($db = mysqli_connect($server, $user, $password, $database))) {
        write_error_page('SQL ERROR: Connection failed: '.mysqli_error($db));
        }
    return $db;
  }
  # close connection
function close_connector($db) {
    mysqli_close($db);
}

#intruder trying to pry
function check_post_only() {
  if(!$_POST) {
    write_error_page("This scripts can only be called from a form.");
    exit;
  }
}


function validate_data($params) {
  $msg = "";
  if(strlen($params[0]) == 0)
  $msg .= " fname";
  if(strlen($params[2]) == 0)
  $msg .= " lname";
  if(strlen($params[3]) == 0)
  $msg .= " add1";
  if(strlen($params[5]) == 0)
  $msg .= " file";
  if(strlen($params[6]) == 0)
  $msg .= " gender";
  if(strlen($params[7]) == 0)
  $msg .= " city";
  if(strlen($params[8]) == 0)
  $msg .= " state";
  if(strlen($params[9]) == 0)
  $msg .= " zip";
  if(!ctype_digit((string)$params[9]))
  $msg .= " zchar";
  if(strlen($params[9])!=5 )
  $msg .= " zlen";
  if(strlen($params[10]) == 0)
  $msg .= " phone";
  if(!preg_match("/^\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/", $params[10])) {
        $msg .= " pin";
  }
  if(strlen($params[11]) == 0)
  $msg .= " email";
  if(!filter_var($params[11], FILTER_VALIDATE_EMAIL))
  $msg .= " inmail";
  if(strlen($params[12]) == 0)
  $msg .= " dob";


   // $dobInMDYformat = str_replace("/","-",$params[12]);

   if(strlen($params[12]) != 0)
   {
     list($mm,$dd,$yyyy) = explode('/',$params[12]);
     if (!checkdate($mm,$dd,$yyyy)) {
           $msg .= " ind";
     }
   }




  $age = date_diff(date_create($params[12]), date_create('today'))->y;
  if($age<13 || $age>100 ){

      $msg .= " Lage";
  }


    $types = array('image/png' ,'image/jpeg','image/jpg',  'image/gif' );
    if(($_FILES["fileupload"]["size"] == 0)) $msg .= " nfile";
    if(($_FILES['fileupload']['size'] >= 1000000) ) $msg .= " lfile";
    if(!in_array($_FILES['fileupload']['type'], $types) && (!empty($_FILES["fileupload"]["type"])))  $msg .= " tfile";


  if(strlen($params[13]) == 0)
  $msg .= " exp";
  if(strlen($params[14]) == 0)
  $msg .= " cat";
  if($msg) {
    echo "$msg";
    exit;
  }
}



function process_parameters() {
  global $bad_chars;
  $params = array();
  $params[] = trim(str_replace($bad_chars, "",$_POST['fname'])); #0
  $params[] = trim(str_replace($bad_chars, "",$_POST['mname'])); #1
  $params[] = trim(str_replace($bad_chars, "",$_POST['lname'])); #2
  $params[] = trim(str_replace($bad_chars, "",$_POST['address1'])); #3
  $params[] = trim(str_replace($bad_chars, "",$_POST['address2']));#4

  $temp = explode(".", $_FILES["fileupload"]["name"]);
  $newfilename = $_POST['phone'] . '.' . end($temp);

  $params[] = trim(str_replace($bad_chars, "",$newfilename)); #5


    if(!empty($_POST['gender'])) {
          $params[] = trim(str_replace($bad_chars, "",$_POST['gender'])); #6
        }
        else{
            $params[] = "";
        }


  $params[] = trim(str_replace($bad_chars, "",$_POST['city'])); #7
  $params[] = trim(str_replace($bad_chars, "",$_POST['state'])); #8
  $params[] = trim(str_replace($bad_chars, "",$_POST['zip'])); #9
  $params[] = trim(str_replace($bad_chars, "",$_POST['phone'])); #10
  $params[] = trim(str_replace($bad_chars, "",$_POST['email'])); #11
  $params[] = trim(str_replace($bad_chars, "",$_POST['dob'])); #12
  $params[] = trim(str_replace($bad_chars, "",$_POST['Experience'])); #13
  $params[] = trim(str_replace($bad_chars, "",$_POST['Category'])); #14
  $params[] = trim(str_replace($bad_chars, "",$_POST['medicalCondition'])); #15





  return $params;
}

function store_data_in_db($params) {
    $db = get_db_handle();
    $sql = "INSERT INTO runner(fname,mname,lname,address1 ,address2 ,fileupload, gender ,city ,state ,zip,phone,email ,  dob  ,Experience ,Category ,medicalCondition) ".
    "VALUES('$params[0]','$params[1]','$params[2]','$params[3]','$params[4]','$params[5]','$params[6]','$params[7]','$params[8]','$params[9]','$params[10]','$params[11]','$params[12]','$params[13]','$params[14]','$params[15]');";
    mysqli_query($db,$sql);
    $how_many = mysqli_affected_rows($db);
    mysqli_close($db);
    echo("There were $how_many rows affected");
      close_connector($db);
  }


  check_post_only();
  $params = process_parameters();
  validate_data($params);
  store_data_in_db($params);


  ?>
