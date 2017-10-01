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
			$return[$value->get("id")] = $value->get("status");
		}
		return json_encode($return);
	}

	public function showRoomSchedule($id){
		$room = new Room();
		$room->getRoom($id);
		
	}


}
 ?>