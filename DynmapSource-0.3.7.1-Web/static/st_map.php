<!DOCTYPE html>
<html>
    <head>
        <title><?php echo $DynmapTitle; ?></title>
        <meta charset="UTF-8">
        <script type="text/javascript" src="http://code.jquery.com/jquery-2.1.4.min.js"></script>
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css" />
        <link rel="stylesheet" type="text/css" href="css/css_map.php" />     
    </head>
    <body>
        <div class="input">
        <label class="switch">
        <input type="checkbox" id="switched" checked>
        <div class="slider round"></div>
        </label>
        </div>
        <div id="playerListonoff"></div>
        
        <div id="main">
            <div id="info"></div>
            <img id="mainImage">
            <div id="positionFrame">
                <div id="positionFrameWrap"></div>
            </div>
        </div>
        <div id="loadinsg"></div>
        <div id="version">Version: <?php echo $version; ?>.
        <br />Developed by LinhyCZ, <a href="http://linhy.cz">http://linhy.cz</a>.
        <br />Modified by <a href="https://github.com/AnthoDingo">AnthoDingo</a>
        <br />Modified by <a href="https://github.com/Alec123445">Alec123445</a></div>
        <a href="steam://connect/<?php echo $serverIP . ":" . $serverPort; ?>">
            <div id="connect" class="menu">
                <img style="display:inline; height: 14px" src="https://cdn.rawgit.com/LinhyCZ/DynmapFiles/master/unturned.png">
                <font style="font-size: 20px">&nbsp;Join the server!</font>
            </div>
        </a>


        <form method="POST">
            <div id="disconnect" class="menu">
                <button type="submit" class="bnt bnt-default">
                    <i class="fa fa-sign-out"></i>
                    <font style="font-size: 20px">&nbsp;Disconnect</font>
                </button>
                <input type="hidden" name="action" id="action" value="disconnect" />
            </div>
        </form>
        <noscript>Javascript is required for runinng this application!</noscript>
        <script type="text/javascript">var syncinterval = <?php echo $syncinterval; ?>;</script>
        <script src="js/js_map.js"></script>
    </body>
</html>