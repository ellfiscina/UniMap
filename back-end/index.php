<?php
spl_autoload_register(function ($class_name) {
	    include $class_name . '.php';
	});

	Database::connect("localhost", "root", "", "unimap_teste");
	$interface = new IFace();
	$interface->showRoomSchedule(1);	

if(isset($_POST["room"])){

	spl_autoload_register(function ($class_name) {
	    include $class_name . '.php';
	});

	Database::connect("localhost", "root", "", "unimap_teste");
	$user = new User("João Pedro", "joaopedrofn", "08799757419", "A");
	$data = array(
		"room" => $_POST["room"],
		"discipline" => $_POST["discipline"],
		"initialTime" => $_POST["initialTime"],
		"finalTime" => $_POST["finalTime"],
	);
	if(isset($_POST["date"]))
		$data["date"] = $_POST["date"];
	else
		$data["weekDay"] = $_POST["weekDay"];
	$result = $user->reserveRoom($data);
	var_dump($result);
}

?>


<!DOCTYPE html>
<html>
<head>
	<title>Teste</title>
</head>
<body>
	<form method="POST">
		<input type="text" name="room"><br>
		<input type="text" name="discipline"><br>
		<input type="text" name="initialTime"><br>
		<input type="text" name="finalTime"><br>
		<input type="text" name="weekDay"><br>
		<input type="date" name="date"><br>
		<input type="submit" value="Cadastrar">
	</form>
</body>
</html>