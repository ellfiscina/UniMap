<?php  

	/**
	* class Room
	*/
	class Room
	{
		
		private $id;
		private $name;
		private $status;

		public function get($attr){
			return $this->$attr;
		}
		public function set($attr, $value){
			$this->$attr = $value;
		}

		public function getRoom($id){
			$room = Database::select(array("cod_sala", "name"), array("rooms"), "cod_sala = ".$id)[0];
			$this->set("id", $room["cod_sala"]);
			$this->set("name", $room["name"]);
			$status = Database::select(array("*"), array("reservations"), "(date = \"".."\" OR weekDay = \"".."\") AND initialTime < ".." AND finalTime > ".);
			$this->set("status", $status?FALSE:TRUE);
		}
	}

?>