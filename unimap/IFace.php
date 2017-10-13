<?php 

/**
* Classe Interface
* Responsavel pelo intermedio de toda comunicação entre usuario e sistema.
*/
class IFace
{

	public function showRooms(){
		$rooms = Database::select(array("cod_sala"), array("rooms"), "1=1");
		foreach ($rooms as $key => $value) {
			$room = new Room();
			$room->getRoom($value["cod_sala"]);
			$rooms[$key] = $room;
		}
		$return = array();
		foreach ($rooms as $key => $value) {
			$return[intval($value->get("id"))] = $value->get("status");
		}
		return json_encode($return);
	}

	public function showRoomSchedule($id){
		$room = new Room();
		$room->getRoom($id);
		$weekDay = date("w");
		for($i = 0; $i <7; $i++){
			$date = new DateTime();
			date_add($date, date_interval_create_from_date_string($i-$weekDay." days"));
			$date = $date->format("Y-m-d");
			for($j = 7; $j <= 22; $j++){
				$schedule = new Schedule();
				$schedule->getSchedule($room->get("id"), $date, $j);
				if($schedule->get("room") != NULL){
					$return[date("l", strtotime($date))][$j]["discipline"]["id"] = $schedule->get("discipline");
					$return[date("l", strtotime($date))][$j]["discipline"]["name"] = Database::select(array("name"), array("disciplines"), "cod_disc = '".$schedule->get("discipline")."'")[0]["name"];
					$return[date("l", strtotime($date))][$j]["teacher"]["name"] = utf8_encode(Database::select(array("name"), array("users"), "cpf = ".$schedule->get("teacher"))[0]["name"]);
				} else {
					$return[date("l", strtotime($date))][$j]["discipline"]["id"] = NULL;
					$return[date("l", strtotime($date))][$j]["discipline"]["name"] = NULL;
					$return[date("l", strtotime($date))][$j]["teacher"]["name"] = NULL;
				}
			}
		}
		return json_encode($return);
	}

	public function showDisciplineSchedule($id){
		$discipline = new Discipline();
		$discipline->getDiscipline($id);
		$weekDay = date("w");
		for($i = 0; $i <7; $i++){
			$date = new DateTime();
			date_add($date, date_interval_create_from_date_string($i-$weekDay." days"));
			$date = $date->format("Y-m-d");
			for($j = 7; $j <= 22; $j++){
				$schedule = new Schedule();
				$schedule->getScheduleByDiscipline($discipline->get("id"), $date, $j);
					$return[date("l", strtotime($date))][$j]["discipline"]["id"] = $schedule->get("discipline");
					$return[date("l", strtotime($date))][$j]["discipline"]["name"] = Database::select(array("name"), array("disciplines"), "cod_disc = ".$schedule->get("discipline"))[0]["name"];
					$return[date("l", strtotime($date))][$j]["teacher"]["name"] = utf8_encode(Database::select(array("name"), array("users"), "cpf = ".$schedule->get("teacher"))[0]["name"]);
					$return[date("l", strtotime($date))][$j]["room"]["id"] = $schedule->get("room");
					$return[date("l", strtotime($date))][$j]["room"]["name"] = Database::select(array("name"), array("rooms"), "cod_sala = ".$schedule->get("room"))[0]["name"];
			}
		}
		return json_encode($return);
	}
	public function showTeacherSchedule($id){
		$teacher = new User();
		$teacher->getUser($id);
		$weekDay = date("w");
		for($i = 0; $i <7; $i++){
			$date = new DateTime();
			date_add($date, date_interval_create_from_date_string($i-$weekDay." days"));
			$date = $date->format("Y-m-d");
			for($j = 7; $j <= 22; $j++){
				$schedule = new Schedule();
				$schedule->getScheduleByTeacher($teacher->get("cpf"), $date, $j);
					$return[date("l", strtotime($date))][$j]["discipline"]["id"] = $schedule->get("discipline");
					$return[date("l", strtotime($date))][$j]["discipline"]["name"] = Database::select(array("name"), array("disciplines"), "cod_disc = ".$schedule->get("discipline"))[0]["name"];
					$return[date("l", strtotime($date))][$j]["room"]["id"] = $schedule->get("room");
					$return[date("l", strtotime($date))][$j]["room"]["name"] = Database::select(array("name"), array("rooms"), "cod_sala = ".$schedule->get("room"))[0]["name"];
					$return[date("l", strtotime($date))][$j]["teacher"]["name"] = utf8_encode(Database::select(array("name"), array("users"), "cpf = ".$schedule->get("teacher"))[0]["name"]);
			
			}
		}
		return json_encode($return);
	}

	public function login($cpf, $pass){
		$user = new User();
		if($user->validateUser($cpf, $pass)){
			$_SESSION["user"]["cpf"] = $user->get("cpf");
			$_SESSION["user"]["name"] = $user->get("name");
			$_SESSION["user"]["email"] = $user->get("email");
			$_SESSION["user"]["type"] = $user->get("type");
			return json_encode(array("cod" => 0, "msg" => "YAY"));
		} else {
			return json_encode(array("cod"=>1, "msg"=>utf8_encode("Combina&ccedil;&atilde;o de CPF e senha inv&aacute;lidos, por favor, verifique o CPF e a senha ou contate a administra&ccedil;&atilde;o.")));
		}
	}

	public function logout(){
		session_destroy();
	}

	public function showSessionInfo(){
		if(isset($_SESSION["user"])){
			foreach ($_SESSION["user"] as $key => $value) {
				$_SESSION["user"][$key] = utf8_encode($value);
			}
			return json_encode($_SESSION["user"]);
		}
		return json_encode(FALSE);
	}

	public function signUpUser(){
		$user = new User();
		$user->set("cpf", $_POST["cpf"]);
		$user->set("name", $_POST["name"]);
		$user->set("email", $_POST["email"]);
		$user->set("type", $_POST["type"]);
		$result = $user->signUp($_POST["pass"], $_POST["passConf"]);
		if($result["cod"] == 0)
			$this->login($user->get("cpf"), $_POST["pass"]);
		return json_encode($result);
	}

	public function editUser(){
		$user = new User();
		$user->set("cpf", $_POST["cpf"]);
		$user->set("name", $_POST["name"]);
		$user->set("email", $_POST["email"]);
		//$user->set("type", $_POST["type"]);
		$result = $user->edit($_POST["pass"], $_POST["passConf"]);
		if($result["cod"] == 0)
			$this->login($user->get("cpf"), $_POST["pass"]);
		return json_encode($result);
	}

	public function showNotification(){
		$results = Database::select(array("*"), array("notifications"), "TRUE");
		if($results){
			$room = new Room();
			$room->getRoom($results[0]["room"]);
			$user = Database::select(array("name"), array("users"), "cpf = \"".$results[0]["user"]."\"")[0]["name"];
			return json_encode(array("user" => $user, "room" => array("name"=>$room->get("name"), "cod_sala" => $room->get("id"))));
		} else{
			return json_encode(FALSE);
		}
	}

	public function createDiscipline(){
		$discpline = new Discipline();
		$discpline->set("id", $_POST["cod_disc"]);
		$discpline->set("name", $_POST["name"]);
		$discpline->set("department", $_POST["department"]);
		$result = $discpline->create();
		return json_encode($result);
	}

	public function search($term){
		$teacherResults = Database::select(array("id","name", "email"), array("users"), "name LIKE \"%".$term."%\"");
		$disciplineResults = Database::select(array("cod_disc", "name", "department"), array("disciplines"), "name LIKE \"%".$term."%\"");
		$results = array("teachers" => $teacherResults, "disciplines" => $disciplineResults);
		return json_encode($results);
	}

	public function reserve(){
		$user = new User();
		$user->getUser($_POST["teacher"]);
		return json_encode($user->reserveRoom($_POST));
	}

	public function askRoom(){
		$user = new User();
		$user->getUser($_SESSION["user"]["cpf"]);
		return json_encode($user->askRoom($_POST["room"]));
	}

	public function grantAccess(){
		$user = new User();
		$cpfs = explode(";", str_replace(" ", "", $_POST["cpf"]));
		$erro = null;
		foreach ($cpfs as $key => $value) {
			$result = $user->grantAccess($value, $_POST["room"]);	
			if($result["cod"] != 0){
				$erro[] = $value;
			}
		}
		if($erro == NULL)
			return json_encode($result);
		else{
			return json_encode(array("cod" => 4, "Ocorreu um erro na autoriza&ccedil;&atilde;o dos seguintes CPF's: <br>".implode(", ", $erro)));
		}
	}

	public function revokeAccess(){
		$user = new User();
		return json_encode($user->revokeAccess($_POST["user"], $_POST["room"]));
	}
	public function removeUser(){
		$user = new User();
		$user->getUser($_POST["user"]);
		return json_encode($user->remove());
	}

	public function answerNotification(){
		$user = new User();
		return json_encode($user->answerNotification($_GET["room"]));
	}
	public function showDisciplines(){
		$disciplines = Database::select(array("name", "cod_disc"), array("disciplines"), "1=1");
		return json_encode($disciplines);
	}
	public function showTeachers(){
		$teachers = Database::select(array("name", "id"), array("users"), "1=1");
		return json_encode($teachers);
	}
}
 ?>