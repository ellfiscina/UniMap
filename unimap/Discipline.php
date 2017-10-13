<?php 

/**
* Class Discipline
*/
class Discipline
{
	
	private $id;
	private $name;
	private $department;
	public function get($attr){
		return $this->$attr;
	}
	public function set($attr, $value){
		$this->$attr = $value;
	}

	public function getDiscipline($id){
		$discipline = Database::select(array("cod_disc", "name", "department"), array("disciplines"), "cod_disc = '".$id."'")[0];
		if(!$discipline) return FALSE;
		$this->set("id", $discipline["cod_disc"]);
		$this->set("name", $discipline["name"]);
		$this->set("department", $discipline["department"]);
		return TRUE;

	}

	public function create(){
		if(!preg_match("/\w{4}\d{4}/", $this->get("id")))
			return array("cod" => 1, "msg" => "Código de disciplina inválido.");
		$disciplines = Database::select(array("*"), array("disciplines"), "cod_disc = \"".$this->get("id")."\"");
		if($disciplines)
			return array("cod" => 2, "msg" => "Disciplina já cadastrada, verifique o código.");
		if(Database::insert("disciplines", array("cod_disc" => $this->get("id"), "name" => $this->get("name"), "department" => $this->get("department"))))
			return array("cod" => 0, "msg" => "Disciplina cadastrada com sucesso!");
		return array("cod" => 3, "msg" => "Ocorreu um erro com o registro, por favor, contate a administração.");
	}
}

 ?>