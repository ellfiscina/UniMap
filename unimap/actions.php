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
		case "showDisciplineSchedule":
			echo $interface->showDisciplineSchedule($_GET["discipline"]);
			break;
		case "showTeacherSchedule":
			echo $interface->showTeacherSchedule($_GET["teacher"]);
			break;
		case "logout":
			$interface->logout();
			break;
		case "search":
			ECHO $interface->search($_GET["term"]);
			break;	
		case "signUp":
			echo $interface->signUpUser();
			break;	
		case "editUser":
			echo $interface->editUser();
			break;	
		case "reserve":
			echo $interface->reserve();
			break;	
		case "askRoom":
			echo $interface->askRoom();
			break;	
		case "grantAccess":
			echo $interface->grantAccess();
			break;	
		case "removeUser":
			echo $interface->removeUser();
			break;	
		case "createDiscipline":
			echo $interface->createDiscipline();
			break;	
		case "revokeAccess":
			echo $interface->revokeAccess();
			break;
		case "showNotification":
			echo $interface->showNotification();
			break;
		case "answerNotification":
			echo $interface->answerNotification();
			break;
		case "showDisciplines":
			echo $interface->showDisciplines();
			break;
		case "showTeachers":
			echo $interface->showTeachers();
			break;
	}
?>