<?php
    include "../config/config.php";
    header('content-type: text/css');
    ob_start('ob_gzhandler');
?>
html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: url("<?php echo $loginbackground; ?>");	
    background-size: cover;	
}

form {
    height: 150px;
    width: 500px;
    color: black;
    border-radius: 20px;
    border: 5px #1A1A1A solid;
    font-family: Garamond;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -75px;
    margin-left: -250px;
    background: white;
    text-align: center;
    padding: 20px;
}

#error {
    background: red;
    padding: 20px;
    display: block;
    text-align: center;
    font-family: Garamond;
    font-weight: bold;
    font-size: 20px;
}

button[type=submit]{
    margin-top: 20px;
}

#version{
    width: 100%;
    bottom: 10px;
    position: absolute;
    text-align: center;
    color: white;
}