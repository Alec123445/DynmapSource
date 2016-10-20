//Request na server
var firstRun = true;
var xmultiplicator, zmultiplicator;
var oldTop = {}, oldLeft = {}, oldRotation = {}, animateOldRotation = "";
var animatePlayerCSteamID = "", animateTop = "", animateLeft = "", animateRotation = "";
var skipAnimate = false;
var admin = 0;
var resize = false;
var naturalHeight, naturalWidth, offsetHeight, offsetWidth;


$(function() {

	$(document).keydown(function(event) {
		if (event.ctrlKey==true && (event.which == "61" || event.which == "107" || event.which == "173" || event.which == "109"  || event.which == "187"  || event.which == "189"  ) ) {
			event.preventDefault();
		}
	});

	$(window).bind("mousewheel DOMMouseScroll", function (event) {
		if (event.ctrlKey == true) {
			event.preventDefault();
		}
	});

	var ms_ie = false;
	var ua = window.navigator.userAgent;
	var old_ie = ua.indexOf("MSIE ");
	var new_ie = ua.indexOf("Trident/");
	var edge = ua.indexOf("Edge/");

	if ((old_ie > -1) || (new_ie > -1) || (edge > -1)) {
		ms_ie = true;
	}

	if ( ms_ie ) {
		document.body.innerHTML = document.body.innerHTML + '<div style="position: fixed; background: #8B0000; width: 600px; top: 10px; left: 50%; margin-left: -320px; font-size: 30px; padding-left: 20px; padding-right: 20px; color: red; border: 2px solid black; z-index: 99999999999; border-radius: 20px; text-align: center">You are using browser, that is not supported!</div>';
	}

	sendRequest();
	$("#mainImage").load(function() {if(firstRun==true){init();firstRun=false;sendRequest();};});
	$(window).resize(function(){resize = true; init()});
	var interval = setInterval(sendRequest, syncinterval);
});
function init() {
	if (document.body.offsetHeight > document.body.offsetWidth) {
		//Pozice obrázku
		$("#mainImage").css({
			'height': '',
			'width': '100%',
			'position': 'absolute',
			'top': '50%',
			'marginTop': Number((mainImage.offsetHeight/2)*-1)+'px'
		});
		$("#positionFrame").css({
			'top': '50%',
			'marginTop': Number((mainImage.offsetHeight/2)*-1)+'px'
		});
	} else {
		$("#mainImage").css({
			'height': '100%',
			'width': '',
			'position': 'static',
			'top': '',
			'margin': '0 auto',
			'marginTop': ''
		});

		$("#positionFrame").css({
			'top': '',
			'marginTop': ''
		}); 
	}

	$("*").css("visibility", "visible");
	$("#loading").css("visibility", "hidden");
	$("#positionFrame").css({
		'height': $("#mainImage").height() + 'px',
		'width': $("#mainImage").width() + 'px',
		'marginLeft': Number(($("#mainImage").width() / 2) * -1) + 'px'
	});

	//Vypočítání poměru velikosti obrázku a skutečného rozlišení obrázku
	
	/*
	naturalHeight = $("#mainImage").get(0).naturalHeight;
	naturalWidth = $("#mainImage").get(0).naturalWidth;
	offsetHeight = $("#mainImage").get(0).offsetHeight;
	offsetWidth = $("#mainImage").get(0).offsetWidth;

	xmultiplicator =  Number(offsetWidth) / Number(naturalWidth);
	zmultiplicator = Number(offsetHeight) / Number(naturalHeight);
	*/
	sendRequest();
}

function sendRequest() {
	admin = 0;
	var conn;
	if(window.XMLHttpRequest) {
		conn = new XMLHttpRequest();
	} else {
		conn = new ActiveXObject("Microsoft.XMLHTTP");
	}
	conn.open("GET", "core.php?user=client", false);
	conn.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	conn.send();

	var data = conn.responseText;
	var data = data.split("]");

	var players = Number(data.length) - 2;
	if (players != 1) {s = "s"} else {s = ""};

	//Zjisštění aktuální mapy
	var map = data[0].substring(1);
	var map = map.split("=");
	var map = map[1];
	/*var playernamesdata = data[i].substring(1);
	var playernames = playernamesdata.split(";");
	var playernames = playernames[0];
	var playernames = playernames.split("=");
	var playernames = playernames[1];*/
	$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br>");
	$("#mainImage").attr("src", ".maps/"+map+".png");
	
	naturalHeight = $("#mainImage").get(0).naturalHeight;
	naturalWidth = $("#mainImage").get(0).naturalWidth;
	offsetHeight = $("#mainImage").get(0).offsetHeight;
	offsetWidth = $("#mainImage").get(0).offsetWidth;

	xmultiplicator =  Number(offsetWidth) / Number(naturalWidth);
	zmultiplicator = Number(offsetHeight) / Number(naturalHeight);	

	//Vypsání hráčů
	if (firstRun == false) {
		$("#positionFrameWrap").html("");
		for (var i = 1; i < data.length; i++) {
			if (data[i] != "") {
				player = data[i].substring(1);

				//Jméno hráče
				var playerName = player.split(";");
				var playerName = playerName[0];
				var playerName = playerName.split("=");
				var playerName = playerName[1];
				//CSteamID hráče
				var playerCSteamID = player.split(";");
				var playerCSteamID = playerCSteamID[1];
				var playerCSteamID = playerCSteamID.split("=");
				var playerCSteamID = playerCSteamID[1];

				//Pozice hráče
				var playerPosition = player.split(";");
				var playerPosition = playerPosition[2];
				var playerPosition = playerPosition.split("=");
				var playerPosition = playerPosition[1];
				var playerPosition = playerPosition.substring(1);
				var playerPosition = playerPosition.substring(0, playerPosition.length -1);

				//Pozice x
				var x = playerPosition.split(",");
				var x = x[0];

				//Pozice z
				var z = playerPosition.split(",");
				var z = z[2];

				//Rotace
				var rotation = player.split(";");
				var rotation = rotation[3];
				var rotation = rotation.split("=");
				var rotation = rotation[1];

				//PlayerStatus
				var playerStatus = player.split(";");
				var playerStatus = playerStatus[4];
				var playerStatus = playerStatus.split("=");
				var playerStatus = playerStatus[1];
				
				//Death

				var playerDeath = player.split(";");
				var playerDeath = playerDeath[5];
				var playerDeath = playerDeath.split("=");
				var playerDeath = playerDeath[1];

				//Vehicle

				var playerVehicle = player.split(";");
				var playerVehicle = playerVehicle[6];
				var playerVehicle = playerVehicle.split("=");
				var playerVehicle = playerVehicle[1];

				/*var currentVehicle = player.split(";")
				var currentVehicle = currentVehicle[7];
				var currentVehicle = currentVehicle.split("=");
				var currentVehicle = currentVehicle[1]; */

				
				if (playerVehicle == "True")
				{
					playerVehicle = true;
				}
				else 
				{
					playerVehicle = false;
				}
				if (playerDeath == "True")
				{
					playerDeath = true;
					playerStatus = "dead";
				}
				if (playerVehicle == "False")
				{
					playerDeath = false;
				}
				if (playerStatus == "player") {
					playerStatus = "playerColor";
				};
				if (playerStatus == "admin") {
					admin++;
				};

				var coeff;
				//Přepočítání pozice x na hodnotu left
				if ($("#mainImage").get(0).naturalHeight == "1024") {
					coeff = 512;
				} else if($("#mainImage").get(0).naturalHeight == "2048") {
					coeff = 1024;
				} else if($("#mainImage").get(0).naturalHeight == "512") {
					coeff = 256;
				} 

				else if($("#mainImage").get(0).naturalHeight == "4096") {
					coeff = 2048;
				}					if (Number(x) < 0) {
					var left = Number(x)*-1;
					//var left = Number(left)/1.93630573;
					var left = coeff - Number(left);
					var left = Number(left) * Number(xmultiplicator);
					var left = Number(left) - 10;
				} else {
					var left = Number(x);
					//var left = Number(left)/1.93630573;
					var left = Number(left) + coeff;
					var left = Number(left) * Number(xmultiplicator);
					var left = Number(left) + 25;
				}

				//Přepočítání hodnoty x na hodnotu top
				if (Number(z) < 0) {
					var top = Number(z);
					//var top = Number(top)/1.93630573;
					var top = coeff - Number(top);
					var top = Number(top) * Number(zmultiplicator);
					var top = Number(top) + 10;
				} else {
					var top = Number(z)*-1;
					//var top = Number(top)/1.93630573;
					var top = Number(top) + coeff;
					var top = Number(top) * Number(zmultiplicator);
					var top = Number(top) - 20;
				}
// really clumsy way of doing player list
// try var playernames = new array(data[1,2]) or []
	//var slider = $("input:checked").html;
	var playerListToggle = true;
	//var playerListToggle = $(".switch").html()
	//$("input").html("checked");
	//$("switch").html("<input type='checkbox' checked>");

	$("#playerListonoff").html("Player list toggle");





	if(players >= 1 && playerListToggle == true)
	{

		
		
	//if (data[])


	if(players == 1)
	{

			var player1 = data[1].substring(1).split
			var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1]).sort();

		$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0]);

				 

	}

	if(players == 2)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1]).sort();

				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1]);
	}
	if(players == 3)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1]).sort();

				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2]);
	}
	if(players == 4)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1]).sort();


				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3]);
	}
	if(players == 5)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1]).sort();

				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]);
	}
	if(players == 6)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1]).sort();


				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5]);
	}
	if(players == 7)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1]).sort();

				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6]);
	}
	if(players == 8)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1]).sort();


				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7]);

	}
	if(players == 9)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1]).sort();

				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8]);

	}
	if(players == 10)
	{
				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1]).sort();



				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]);
	}
	if(players == 11)
	{
				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1]).sort();

				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10]);

	}
	if(players == 12)
	{
				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1]).sort();


				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11]);
	}
	if(players == 13)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1]).sort();


				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12]);
	}
	if(players == 14)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1]).sort();

				$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames[0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13]);
				
	}
	if(players == 15)
	{


				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1]).sort();

								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]);
	}
	if(players == 16)
	{


				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1],
				data[16].substring(1).split(";")[0].split("=")[1]).sort();


								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] +  "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]
				+ "<br>" + playernames [15]);
	}
	if(players == 17)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1],
				data[16].substring(1).split(";")[0].split("=")[1], 
				data[17].substring(1).split(";")[0].split("=")[1]).sort();

								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]
				+ "<br>" + playernames [15] + "<br>" + playernames [16]);
	}
	if(players == 18)
	{


				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1],
				data[16].substring(1).split(";")[0].split("=")[1], 
				data[17].substring(1).split(";")[0].split("=")[1], 
				data[18].substring(1).split(";")[0].split("=")[1]).sort();

								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]
				+ "<br>" + playernames [15] + "<br>" + playernames [16] + "<br>" + playernames [17]);
	}
	if(players == 19)
	{


				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1],
				data[16].substring(1).split(";")[0].split("=")[1], 
				data[17].substring(1).split(";")[0].split("=")[1], 
				data[18].substring(1).split(";")[0].split("=")[1], 
				data[19].substring(1).split(";")[0].split("=")[1]).sort();

								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]
				+ "<br>" + playernames [15] + "<br>" + playernames [16] + "<br>" + playernames [17] + "<br>" + playernames [18]);
	}
	if(players == 20)
	{


				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1],
				data[16].substring(1).split(";")[0].split("=")[1], 
				data[17].substring(1).split(";")[0].split("=")[1], 
				data[18].substring(1).split(";")[0].split("=")[1], 
				data[19].substring(1).split(";")[0].split("=")[1], 
				data[20].substring(1).split(";")[0].split("=")[1]).sort();

								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]
				+ "<br>" + playernames [15] + "<br>" + playernames [16] + "<br>" + playernames [17] + "<br>" + playernames [18] + "<br>" + playernames [19]);
	}
	if(players == 21)
	{


				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1],
				data[16].substring(1).split(";")[0].split("=")[1], 
				data[17].substring(1).split(";")[0].split("=")[1], 
				data[18].substring(1).split(";")[0].split("=")[1], 
				data[19].substring(1).split(";")[0].split("=")[1], 
				data[20].substring(1).split(";")[0].split("=")[1], 
				data[21].substring(1).split(";")[0].split("=")[1]).sort();

								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]
				+ "<br>" + playernames [15] + "<br>" + playernames [16] + "<br>" + playernames [17] + "<br>" + playernames [18] + "<br>" + playernames [19]
				+ "<br>" + playernames [20]);
	}
	if(players == 22)
	{


				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1],
				data[16].substring(1).split(";")[0].split("=")[1], 
				data[17].substring(1).split(";")[0].split("=")[1], 
				data[18].substring(1).split(";")[0].split("=")[1], 
				data[19].substring(1).split(";")[0].split("=")[1], 
				data[20].substring(1).split(";")[0].split("=")[1], 
				data[21].substring(1).split(";")[0].split("=")[1], 
				data[22].substring(1).split(";")[0].split("=")[1]).sort();

								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]
				+ "<br>" + playernames [15] + "<br>" + playernames [16] + "<br>" + playernames [17] + "<br>" + playernames [18] + "<br>" + playernames [19]
				+ "<br>" + playernames [20] + "<br>" + playernames [21]);
	}
	if(players == 23)
	{

				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1],
				data[16].substring(1).split(";")[0].split("=")[1], 
				data[17].substring(1).split(";")[0].split("=")[1], 
				data[18].substring(1).split(";")[0].split("=")[1], 
				data[19].substring(1).split(";")[0].split("=")[1], 
				data[20].substring(1).split(";")[0].split("=")[1], 
				data[21].substring(1).split(";")[0].split("=")[1], 
				data[22].substring(1).split(";")[0].split("=")[1], 
				data[23].substring(1).split(";")[0].split("=")[1]).sort();


								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]
				+ "<br>" + playernames [15] + "<br>" + playernames [16] + "<br>" + playernames [17] + "<br>" + playernames [18] + "<br>" + playernames [19]
				+ "<br>" + playernames [20] + "<br>" + playernames [21] + "<br>" + playernames [22]);
	}
	if(players == 24)
	{


				var playernames = new Array(data[1].substring(1).split(";")[0].split("=")[1], data[2].substring(1).split(";")[0].split("=")[1], 
				data[3].substring(1).split(";")[0].split("=")[1], data[4].substring(1).split(";")[0].split("=")[1], data[5].substring(1).split(";")[0].split("=")[1],
				data[6].substring(1).split(";")[0].split("=")[1], data[7].substring(1).split(";")[0].split("=")[1], 
				data[8].substring(1).split(";")[0].split("=")[1], 
				data[9].substring(1).split(";")[0].split("=")[1], 
				data[10].substring(1).split(";")[0].split("=")[1],
				data[11].substring(1).split(";")[0].split("=")[1], 
				data[12].substring(1).split(";")[0].split("=")[1], 
				data[13].substring(1).split(";")[0].split("=")[1], 
				data[14].substring(1).split(";")[0].split("=")[1], 
				data[15].substring(1).split(";")[0].split("=")[1],
				data[16].substring(1).split(";")[0].split("=")[1], 
				data[17].substring(1).split(";")[0].split("=")[1], 
				data[18].substring(1).split(";")[0].split("=")[1], 
				data[19].substring(1).split(";")[0].split("=")[1], 
				data[20].substring(1).split(";")[0].split("=")[1], 
				data[21].substring(1).split(";")[0].split("=")[1], 
				data[22].substring(1).split(";")[0].split("=")[1], 
				data[23].substring(1).split(";")[0].split("=")[1],
				data[24].substring(1).split(";")[0].split("=")[1]).sort();

								$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online" + "<br> Player list: <br><br>"
	 			+ playernames [0] + "<br>" + playernames [1] + "<br>" + playernames [2] + "<br>" + playernames [3] + "<br>" + playernames [4]
		 		+ "<br>" + playernames [5] + "<br>" + playernames [6] + "<br>" + playernames [7] + "<br>" + playernames [8] + "<br>" + playernames [9]
				+ "<br>" + playernames [10] + "<br>" + playernames [11] + "<br>" + playernames [12] + "<br>" + playernames [13] + "<br>" + playernames [14]
				+ "<br>" + playernames [15] + "<br>" + playernames [16] + "<br>" + playernames [17] + "<br>" + playernames [18] + "<br>" + playernames [19]
				+ "<br>" + playernames [20] + "<br>" + playernames [21] + "<br>" + playernames [22] + "<br>" + playernames [23]);
	}

				

// done


}

else 

{
	$("#info").html("Current map: " + map + "<br>Currently " + players + " player" + s + " online");
}
}
				
if (playerVehicle == true)
{
	
	var adding = $("#positionFrameWrap").html() + '\
				<div style="visibility: visible" class="player" id="' + playerCSteamID + '"> \
					<img style="visibility: visible" class="playerImage" id="' + playerCSteamID +'_cursor" src="vehicle.png"> \
					<div style="visibility: visible" class="playerInfo '+ playerStatus + '"> \
						'+ playerName + '\
					</div> \
				</div>';

}

if (playerVehicle != true)
{
	if (playerDeath == true)
{

				var adding = $("#positionFrameWrap").html() + '\
				<div style="visibility: visible" class="player" id="' + playerCSteamID + '"> \
					<img style="visibility: visible" class="playerImage" id="' + playerCSteamID +'_cursor" src="dead.png"> \
					<div style="visibility: visible" class="playerInfo '+ playerStatus + '"> \
						'+ playerName + '\
					</div> \
				</div>';
}

if (playerDeath != true)
{
					var adding = $("#positionFrameWrap").html() + '\
				<div style="visibility: visible" class="player" id="' + playerCSteamID + '"> \
					<img style="visibility: visible" class="playerImage" id="' + playerCSteamID +'_cursor" src="cursor.png"> \
					<div style="visibility: visible" class="playerInfo '+ playerStatus + '"> \
						'+ playerName + '\
					</div> \
				</div>';
}
}




				$("#positionFrameWrap").html(adding);
				if (oldTop[playerCSteamID] != undefined && resize != true) {	
					var topDiference = oldTop[playerCSteamID] - top;
					var leftDiference = oldLeft[playerCSteamID] - left;
					if (topDiference > 100 || topDiference < -100 || leftDiference > 100 || leftDiference < -100) {skipAnimate = true};
					$("#"+playerCSteamID).css({
						'top': oldTop[playerCSteamID] + 'px',
						'left': oldLeft[playerCSteamID] + 'px'
					});
					$("#"+playerCSteamID+"_cursor").css({
						'transform': 'rotate('+oldRotation[playerCSteamID]+'deg)',
						'msTransform': 'rotate('+oldRotation[playerCSteamID]+'deg)',
						'webkitTransform': 'rotate('+oldRotation[playerCSteamID]+'deg)'
					});
				} else {
					$("#"+playerCSteamID).css({
						'top': top + 'px',
						'left': left + 'px'
					});

					$("#"+playerCSteamID+"_cursor").css({
						'transform': 'rotate('+rotation+'deg)',
						'msTransform': 'rotate('+rotation+'deg)',
						'webkitTransform': 'rotate('+rotation+'deg)'
					});
				}
				if (skipAnimate == false || resize == true) {
					animatePlayerCSteamID = animatePlayerCSteamID + ";" + playerCSteamID;
					animateTop = animateTop + ";" + top;
					animateLeft = animateLeft + ";" + left;
					if (oldRotation[playerCSteamID] != undefined) {
						cache = Number(rotation) - Number(oldRotation[playerCSteamID]);
						animateRotation = animateRotation + ";" + cache;
					} else {
						animateRotation = animateRotation + ";" + rotation;
					}
					animateOldRotation = animateOldRotation + ";" + oldRotation[playerCSteamID];
				} else {
					skipAnimate = false;
					$("#"+playerCSteamID).css({
						'top': top + 'px',
						'left': left + 'px'
					});
					$("#"+playerCSteamID+"_cursor").css({
						'transform': 'rotate('+rotation+'deg)',
						'msTransform': 'rotate('+rotation+'deg)',
						'webkitTransform': 'rotate('+rotation+'deg)'
					});
				}
					
				oldTop[playerCSteamID] = top;
				oldLeft[playerCSteamID] = left;
				oldRotation[playerCSteamID] = rotation;
			}
		}

		if(resize != true) {animate()};
		if (admin <= 1) {
			admins = "";
		} else {
			admins = "s";
		}
		var infos = $("#info").html() + '<br><br>Currently ' + admin + ' admin' + admins + ' online';
		$("#info").html(infos);
		resize = false;
	};

function animate() {
	animatePlayerCSteamID = animatePlayerCSteamID.split(";");
	animateTop = animateTop.split(";");
	animateLeft = animateLeft.split(";");
	animateRotation = animateRotation.split(";");
	animateOldRotation = animateOldRotation.split(";");
	for (var i = 0; i < animatePlayerCSteamID.length; i++) {
		$("#" + animatePlayerCSteamID[i]).animate({top: animateTop[i], left: animateLeft[i]}, {duration: syncinterval, easing:"linear", queue: false});
		AnimateRotate(animateRotation[i], animateOldRotation[i], animatePlayerCSteamID[i]);
	};
	animatePlayerCSteamID = "";
	animateTop = "";
	animateLeft = "";
	animateRotation = "";
	animateOldRotation = "";

	checkArray();
}

function AnimateRotate(d, old, id){
	$({deg: 0}).animate({deg: d}, {
		duration: syncinterval,
		step: function(now, fx){
			rotationLevel = Number(now) + Number(old);
			$("#" + id + "cursor").css({
				transform: "rotate(" + rotationLevel + "deg)"
			});
		}
	});
}

function checkArray() {
	var inputs = document.getElementsByClassName("player");
	var shownPlayers = []
	var array = Object.keys(oldTop);
	for (var i = 0; i < inputs.length; i++) {
		shownPlayers.push(inputs[i].id);
	}

	for (var i = 0; i < array.length; i++) {
		if(shownPlayers.indexOf(array[i]) == -1) {
			delete oldLeft[array[i]];
			delete oldTop[array[i]];
		}
	};
}