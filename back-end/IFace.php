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
			for($j = 7; $j < 22; $j++){
				$schedule = new Schedule();
				$schedule->getSchedule($room->get("id"), $date, $j);
				if($schedule->get("room") != NULL){
					$return[date("l", strtotime($date))][$j]["discipline"]["id"] = $schedule->get("discipline");
					$return[date("l", strtotime($date))][$j]["discipline"]["name"] = Database::select(array("name"), array("disciplines"), "cod_disc = ".$schedule->get("discipline"))[0]["name"];
					$return[date("l", strtotime($date))][$j]["teacher"]["name"] = utf8_encode(Database::select(array("name"), array("users"), "cpf = ".$schedule->get("teacher"))[0]["name"]);
				}
			}
		}
		echo json_encode($return);
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
			for($j = 7; $j < 22; $j++){
				$schedule = new Schedule();
				$schedule->getScheduleByDiscipline($discipline->get("id"), $date, $j);
				if($schedule->get("room") != NULL){
					$return[date("l", strtotime($date))][$j]["discipline"]["id"] = $schedule->get("discipline");
					$return[date("l", strtotime($date))][$j]["discipline"]["name"] = Database::select(array("name"), array("disciplines"), "cod_disc = ".$schedule->get("discipline"))[0]["name"];
					$return[date("l", strtotime($date))][$j]["teacher"]["name"] = utf8_encode(Database::select(array("name"), array("users"), "cpf = ".$schedule->get("teacher"))[0]["name"]);
					$return[date("l", strtotime($date))][$j]["room"]["id"] = $schedule->get("room");
					$return[date("l", strtotime($date))][$j]["room"]["name"] = Database::select(array("name"), array("rooms"), "cod_sala = ".$schedule->get("room"))[0]["name"];
				}
			}
		}
		echo json_encode($return);
		return json_encode($return);
	}
	public function showTeacherSchedule($id){
		$teacher = new User();
		$teacher->getTeacher($id);
		$weekDay = date("w");
		for($i = 0; $i <7; $i++){
			$date = new DateTime();
			date_add($date, date_interval_create_from_date_string($i-$weekDay." days"));
			$date = $date->format("Y-m-d");
			for($j = 7; $j < 22; $j++){
				$schedule = new Schedule();
				$schedule->getScheduleByTeacher($teacher->get("id"), $date, $j);
				if($schedule->get("room") != NULL){
					$return[date("l", strtotime($date))][$j]["discipline"]["id"] = $schedule->get("discipline");
					$return[date("l", strtotime($date))][$j]["discipline"]["name"] = Database::select(array("name"), array("disciplines"), "cod_disc = ".$schedule->get("discipline"))[0]["name"];
					$return[date("l", strtotime($date))][$j]["room"]["id"] = $schedule->get("room");
					$return[date("l", strtotime($date))][$j]["room"]["name"] = Database::select(array("name"), array("rooms"), "cod_sala = ".$schedule->get("room"))[0]["name"];
					$return[date("l", strtotime($date))][$j]["teacher"]["name"] = utf8_encode(Database::select(array("name"), array("users"), "cpf = ".$schedule->get("teacher"))[0]["name"]);
				}
			}
		}
		echo json_encode($return);
		return json_encode($return);
	}

	public function login($cpf, $pass){
		$user = new User();
		if($user->validateUser($cpf, $pass)){
			$_SESSION["user"]["name"] = $user->get("name");
			$_SESSION["user"]["email"] = $user->get("email");
			$_SESSION["user"]["type"] = $user->get("type");
		} else {
			return array("cod"=>1, "msg"=>"Combinação de CPF e senha inválidos, por favor, verifique o CPF e a senha ou contate a administração.");
		}
	}

	public function logout(){
		session_destroy();
	}

	public function showSessionInfo(){
		if(isset($_SESSION["user"]))
			return json_encode($_SESSION["user"]);
		return json_encode(FALSE);
	}

	public function signUpUser(){
		$user = new User();
		$user->set("cpf", $_POST["cpf"]);
		$user->set("name", $_POST["name"]);
		$user->set("email", $_POST["email"]);
		$user->set("type", $_POST["type"]);
		$result = $user->signUp($_POST["pass"], $_POST["passConf"]);
		if($result["cod"] != 0)
			return json_encode($result);
		else{
			$this->login($user->get("cpf"), $_POST["pass"]);
		}
	}

	public function showNotification(){
		$results = Database::select(array("*"), array("notifications"), "TRUE");
		if($results){
			$room = new Room();
			$room->getRoom($results[0]["room"]);
			$user = Database::select(array("name"), array("users"), "cpf = \"".$results[0]."\"")[0]["name"];
			return json_encode(array("user" => $user, "room" => $room));
		} else{
			return json_encode(FALSE);
		}
	}

	public function createDiscipline(){
		$discpline = new Discipline();
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


}
 ?>