<?php 

/**
* Classe Interface
* Responsavel pelo intermedio de toda comunicação entre usuario e sistema.
*/
class IFace
{
	public function showRoomSchedule($id){
		$room = new Room();
		$room->getRoom($id);
		
	}


}

 ?>