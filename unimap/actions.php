<?php
session_start();
spl_autoload_register(function ($class_name) {
	    include $class_name . '.php';
	});

	Database::connect("localhost", "root", "", "unimap_teste");
	$interface = new IFace();
	switch($_GET["action"]){
		case "login":
			echo $interface->login($_POST["cpf"], $_POST["pass"]);
			break;
		case "showRooms":
			echo $interface->showRooms();
			break;
		case "showSessionInfo":
			echo $interface->showSessionInfo();
			break;
		case "showRoomSchedule":
			echo $interface->showRoomSchedule($_GET["room"]);
			break;
		case "logout":
			$interface->logout();
			break;
		case "search":
			ECHO $interface->search($_GET["term"]);
			break;	
	}
?>