<?php
$server = 'opatija.sdsu.edu:3306';
$user = 'jadrn013';
$password = 'simple';
$database = 'jadrn013';
if(!($db = mysqli_connect($server,$user,$password,$database)))
    echo "ERROR in connection ".mysqli_error($db);
$email =$_GET['email'];
$phone =$_GET['phone'];
$sql = "select email,phone from runner where email='$email'or phone='$phone';";
$result = mysqli_query($db, $sql);
$how_many = mysqli_affected_rows($db);
mysqli_close($db);
if($how_many > 0){
  while($row=mysqli_fetch_row($result)) {
    $i=1;
    $j="";
      foreach(array_slice($row,0) as $item){
        if($i===1&&$email===$item){

          $j="email";
        }
        else if($i==2&&$phone===$item){

          $j=$j."phone";
        }
          $i++;
      }
      }
  echo "$j";

}
else if($how_many == 0)
    echo "OK";
else
    echo "ERROR, failure ".$how_many;
?>
