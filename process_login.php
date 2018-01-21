<?php
$pass = $_POST['pass'];
$valid = false;
$raw = file_get_contents('passwords.dat');
$data = explode("\n",$raw);
foreach($data as $item) {
  if( crypt($pass,$item) === $item){
    $valid = true;
  }
}
if($valid)
echo "admin";
else
echo "intruder";
?>
