<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $DynmapTitle; ?></title>
        <meta charset="UTF-8">
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="css/css_login.php" />
    </head>
    <body>
        <div id="error" <?php if($displayError == false){ echo 'style="display: none;"';} ?>>Password or username was incorrect! Try again.</div>
        <form action="" method="post">
            <font style="font-size: 25px; font-weight: bold">Please login to see Unturned Dynmap<br /><br/>
                Your username: <input type="text" name="username"><br>
                Your password: <input type="password" name="password"><br>
                <button type="submit"><i class="fa fa-sign-in" aria-hidden="true"></i> Login !</button>
                <br />
            </font>
        </form>
        <div id="version">
        Version : <?php echo $version; ?>
        </div>
    </body>
</html>