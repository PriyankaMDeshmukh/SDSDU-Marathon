<?php
$adminOrIntruder = $_POST['response'];
if($adminOrIntruder==="admin"){
  $server = 'opatija.sdsu.edu:3306';
  $user = 'jadrn013';
  $password = 'simple';
  $database = 'jadrn013';
  if(!($db = mysqli_connect($server,$user,$password,$database)))
  echo "ERROR in connection ".mysqli_error($db);
  else {
  $sql =  "select Category,concat(lname,', ',fname),fileupload,dob,Experience from runner order by CASE
         WHEN Category='Teen' THEN 1
         WHEN  Category='Adult' THEN 2
         WHEN  Category='Senior' THEN 3
         END, lname asc;";
     // $sql = "select Category,concat(lname,',',fname),fileupload,dob,Experience from runner order by Category asc,lname asc;";
    $result = mysqli_query($db, $sql);
    if(!$result) echo "ERROR in query".mysqli_error($db);



    echo "<h1 class='center'>Teen</h1>\n";
    echo "<h3 class='NT center'>No Teens participating</h3>\n";
    echo "<table  class=\"table table-striped tableTeen table-bordered \">\n";
    echo "<tr><td>Name</td><td>Image</td><td>Age</td><td>Experience</td></tr>";
    echo "<tr>";

    $tempCat="Teen";



    while($row=mysqli_fetch_row($result)) {
      $i=1;
      foreach(array_slice($row,0) as $item){
        if($i==1){
          if($tempCat==="Teen"&&$item==="Adult"){
              echo "</table>";
            echo "<h1 class='center'>Adults</h1>\n";
            echo "<h3 class='NA center'>No Adults participating</h3>\n";
            echo "<table  class='table table-striped tableAdult table-bordered '>\n";
            echo "<tr><td>Name</td><td>Image</td><td>Age</td><td>Experience</td></tr>";
            echo "<tr>";
              echo "<tr>";
            $tempCat = "Adult";


          } else if ($tempCat==="Teen"&&$item==="Senior"){

  echo "</table>";
            echo "</table>";
            echo "<h1 class='center'>Seniors</h1>\n";
            echo "<h3 class='NS center'>No Seniors participating</h3>\n";
            echo "<table  class=\"table table-striped tableSenior table-bordered \">\n";
            echo "<tr><td>Name</td><td>Image</td><td>Age</td><td>Experience</td></tr>";
            echo "<tr>";


            $tempCat="Senior";





          } else if($tempCat==="Adult"&&$item==="Senior"){

                        echo "</table>";
                        echo "<h1 class='center'>Seniors</h1>\n";
                        echo "<h3 class='NS center'>No Seniors participating</h3>\n";
                        echo "<table  class=\"table table-striped tableSenior table-bordered \">\n";
                        echo "<tr><td>Name</td><td>Image</td><td>Age</td><td>Experience</td></tr>";
                        echo "<tr>";


                        $tempCat="Senior";

          }

        }
        else if($i===3){
          echo "<td><img alt='Profile pic' src=\"_uploadDIR_/".$item."\"></td>";
        }
        else if($i===4){
          $dobInMDYformat = str_replace("/","-",$item);
          echo "<td>".date_diff(date_create($item), date_create('today'))->y."</td>";
        }
        else {
          echo "<td>$item</td>";
        }
        $i++;
      }
      echo "</tr>\n";
    }
    echo "</table>";
    mysqli_close($db);
  }
}
else {
  exit;
}
?>
