<?php

/**
* Schedule class
*/
class Schedule
{
	
	private $date;
	private $discipline;
	private $teacher;
	private $room;
	private $initialTime;
	private $finalTime;
	private $weekDay;


	public function get($attr){
		return $this->$attr;
	}
	public function set($attr, $value){
		$this->$attr = $value;
	}

	public function getSchedule($room, $date, $time){
		$where = "(date = \"".$date."\" OR weekDay = \"".date("l", strtotime($date))."\") AND room = ".$room." AND initialTime <= ".$time." AND finalTime > ".$time.";";
		$results = Database::select(array("*"), array("reservations"), $where);
		if($results){
			$results = $results[0];
			$this->set("date", $results["date"]);
			$this->set("discipline", $results["discipline"]);
			$this->set("teacher", $results["teacher"]);
			$this->set("room", $results["room"]);
			$this->set("initialTime", $results["initialTime"]);
			$this->set("finalTime", $results["finalTime"]);
			$this->set("weekDay", $results["weekDay"]);
			return TRUE;
		} else return FALSE;
	}
	public function getScheduleByDiscipline($discipline, $date, $time){
		$where = "(date = \"".$date."\" OR weekDay = \"".date("l", strtotime($date))."\") AND discipline = '".$discipline."' AND initialTime <= ".$time." AND finalTime > ".$time.";";
		$results = Database::select(array("*"), array("reservations"), $where);
		if($results){
			$results = $results[0];
			$this->set("date", $results["date"]);
			$this->set("discipline", $results["discipline"]);
			$this->set("teacher", $results["teacher"]);
			$this->set("room", $results["room"]);
			$this->set("initialTime", $results["initialTime"]);
			$this->set("finalTime", $results["finalTime"]);
			$this->set("weekDay", $results["weekDay"]);
			return TRUE;
		} else return FALSE;
	}
	public function getScheduleByTeacher($teacher, $date, $time){
		$where = "(date = \"".$date."\" OR weekDay = \"".date("l", strtotime($date))."\") AND teacher = ".$teacher." AND initialTime <= ".$time." AND finalTime > ".$time.";";
		$results = Database::select(array("*"), array("reservations"), $where);
		if($results){
			$results = $results[0];
			$this->set("date", $results["date"]);
			$this->set("discipline", $results["discipline"]);
			$this->set("teacher", $results["teacher"]);
			$this->set("room", $results["room"]);
			$this->set("initialTime", $results["initialTime"]);
			$this->set("finalTime", $results["finalTime"]);
			$this->set("weekDay", $results["weekDay"]);
			return TRUE;
		} else return FALSE;
	}
}

?>