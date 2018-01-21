<?php
$UPLOAD_DIR = '_uploadDIR_/';
$COMPUTER_DIR = '/home/jadrn013/public_html/ajax_file_upload/_uploadDIR_/';
$message = "";
if($_FILES['fileupload']['error'] > 0) {
  $err = $_FILES['photograph']['error'];
  $message .= "Error Code: $err ";
}
else {
  $temp = explode(".", $_FILES["fileupload"]["name"]);
  $newfilename = $_POST['phone'] . '.' . end($temp);
  move_uploaded_file($_FILES["fileupload"]["tmp_name"], "$UPLOAD_DIR". $newfilename);
  $message = "Success! Your file has been uploaded to the server</br >\n";
}
echo $message;
?>
