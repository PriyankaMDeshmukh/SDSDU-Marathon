<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script type="myJs.js"></script>
  <script src="myReport.js"></script>
  <link rel="stylesheet" href="myCss.css">
  <link rel="stylesheet" href="report.css">
</head>
<body>
  <div class="navbar-fixed-top">
    <div class="sdsu-header">
      <p>San Diego State University Marathon</p>
    </div>
    <div class="sdsu-marathon-header">
      <p>Aztecs Run For A Cause</p>
    </div>
  </div>
  <div class="catchphrase">
    <p >LEADERSHIP STARTS HERE </p>
  </div>
  <div class="container ">
    <div class="row center">
      <h1 class="prompt">Please login to view the report</h1>
    </div>
    <form method="post"
    name="login">
    <div class="row ">
      <div class="form-group col-md-6">
        <label for="password">Password<span>*</span></label>
        <input class="form-control required" type="password" name="pass"  id="pass" size="25" />
        <span>Please Enter Password</span>
      </div>
    </div>
    <div class="invalidpwd">
      Please enter valid password
    </div>
    <div class="row">
      <div class="form-group col-md-3">
        <input class="btn btn-primary reset" type="reset" value="Clear" />
      </div>
      <div class="form-group col-md-3">
        <input class="btn btn-success submit" type="submit" value="Log In" />
      </div>
    </div>
  </form>
  <div class="row">
    <div id="report"></div>
  </div>
  <div class="footer">
    <div class="  slidebar ">
      <img src="insta.png" alt="">
      <img src="fb.png" alt="">
      <img src="g+.png" alt="">
      <img src="twitter.png" alt="">
    </div>
    <p>© Copyright 2017 PriyankaDeshmukh Inc.</p>
    <p>All rights reserved.</p>
  </div>
</div>
</body>
</html>
