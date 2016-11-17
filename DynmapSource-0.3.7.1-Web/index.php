<?php 

$version = "0.3.6.3";
/*
* Original work from https://github.com/LinhyCZ/DynmapSource
* Original autor : LinhyCZ https://github.com/LinhyCZ
* Licence : GNU General Public License v2.0 
* http://choosealicense.com/licenses/gpl-2.0/
*
* Modified by AnthoDingo https://github.com/AnthoDingo
* Updated on 07/06/2016
* Version 0.3.6.1
* Repo : https://github.com/AnthoDingo/DynmapSource
*/

	if(!file_exists("config/config.php")){
		include "static/st_error.html";
		exit(1);
	}

	session_start();
	//include "dynmap-config.php";
	require_once("config/config.php");

	if(file_exists("config/users.php")){
		require_once("config/users.php");
	} else {
		$login = false;
	}
	$serverPort = $serverPort + 1;

	if(isset($_SESSION['token'])){
		if(isset($_POST['action'])){
			if($_POST['action'] == 'disconnect'){
				session_unset();
				session_destroy();
				session_start();
				include "static/st_login.php";
				exit();
			}
		}
		include "static/st_map.php";
	} else {
		if($login == true){
			$displayError = true;
			if(isset($_POST["username"])){
				foreach ($users as $user => $userdata) {
					if ($user == $_POST["username"]) {
						if ($userdata[0] == $_POST["password"]) {
							$_SESSION['token'] = crypt($userdata[0]);
							include "static/st_map.php";
							exit();
						}
					}
				}
			} else {
				$displayError = false;
			}
			include "static/st_login.php";
		} else {
			include "static/st_map.php";
		}
	}
?>