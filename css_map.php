<?php
	require_once("../config/config.php");
	header('content-type: text/css');
    ob_start('ob_gzhandler');
?>
* {
	visibility: hidden;
}

html, body {
	margin: 0;
	padding: 0;
	height: 100%;
	width: 100%;
	overflow: hidden;
	background: black;

}

#main {
	height: 100%;
	width: 100%;
	background: ' . $backgroundColor . '
}

#mainImage {
	display: block;
	margin: 0 auto;
}

#info {
	padding-right: 20px;
	padding-left: 20px;
	border-radius: 20px;
	border: 2px #1A1A1A solid;
	background: rgba(232, 232, 232, 0.2);
	position: fixed;
	left: 10px;
	top: 10px;
	font-family: Garamond;
	font-size: 20px;
	text-align: center;
	color: white;
}

#positionFrame {
	margin: 0 auto;
	z-index: 99999;
	position: absolute;
	top: 0;
	left: 50%;
}

#positionFrameWrap {
	width: inherit;
	height: inherit;
	z-index: 999999;
	position: relative;
}

.playerName {
	display: table;
}

.playerInfo {
	display: table;
	margin-top: -20px;
	margin-left: 24px;
	padding-right: 10px;
	padding-left: 10px;
	border-radius: 5px;
	border: 2px #1A1A1A solid;
	background: rgba(232, 232, 232, 0.2);
	font-family: Garamond;
	font-size: 13px;
	text-align: center;
	color: white;
}

.player {
	position: absolute;
	top: 500px;
	left: 500px;
	margin-top: -7px;
	margin-left: -10px;
}

#version {
	visibility: visible;
	position: fixed;
	bottom: 10px;
	left: 10px;
	font-family: Garamond;
	font-size: 11px;
	color: white;
}

#version a{ color: lightgrey; }
#version a:visited{ color: lightgrey; }

.dead
{
	color: red;
}

.playerColor {

	color: white;
}

.admin {
	color: cyan;
}

.pro {
	color: gold;
}


.menu{
	position: fixed;
	
	right: 10px;
	border-radius: 20px;
	border: 2px #1A1A1A solid;
	background: rgba(232, 232, 232, 0.2);
	padding-right: 20px;
	padding-left: 20px;
	text-align: center;
	font-size: 30px;
	line-height: 30px;
	color: white !important;
}

#playerListonoff
{
	visibility: visible;
	position: fixed;
	top: 90px;
	right: 15px;
	font-family: Garamond;
	font-size: 25px;
	color: white;
	text-align: right;
}
/* The switch - the box around the slider */
.switch {
  right: 20px;
  top: 128px;
  position: fixed;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}
/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;

}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

#connect {
	top: 10px;
}

#disconnect{
	top: 50px;
	right: 15px;
}

#disconnect button{
	color: white !important;
	cursor: pointer;
}

#disconnect button i{
	font-size: initial;
}

#loading {
	width: 80px;
	height: 80px;
	visibility: visible;
	position: absolute;
	top: 50%;
	left: 50%;
	margin-left: -40px;
	margin-top: -40px;
	background-color: #FFF;

	-webkit-animation: sk-rotateplane 1.2s infinite ease-in-out;
	animation: sk-rotateplane 1.2s infinite ease-in-out;
}

@-webkit-keyframes sk-rotateplane {
	0% { -webkit-transform: perspective(120px) }
	50% { -webkit-transform: perspective(120px) rotateY(180deg) }
	100% { -webkit-transform: perspective(120px) rotateY(180deg)  rotateX(180deg) }
}

@keyframes sk-rotateplane {
	0% { 
		transform: perspective(120px) rotateX(0deg) rotateY(0deg);
		-webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg) 
	} 50% { 
		transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);
		-webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg) 
	} 100% { 
		transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
		-webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);
	}
}

.bnt{
	border: none;
	background: none;
}