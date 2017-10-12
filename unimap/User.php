<?php

/**
* 
*/
class User
{
	private $id;
	private $name;
	private $cpf;
	private $email;
	private $type;
	// function __construct($name, $email, $cpf, $type)
	// {
	// 	$this->name = $name;
	// 	$this->email = $email;
	// 	$this->cpf = $cpf;
	// 	$this->type = $type;
	// }
	public function get($property){
		return $this->$property;
	}
	public function set($property, $value){
		$this->$property = $value;
	}

	static private function checkCPF($cpf){
		// Verifica se um número foi informado
	    if(empty($cpf)) {
	        return false;
	    }
	 
	    // Elimina possivel mascara
	    $cpf = preg_replace('[^0-9]', '', $cpf);
	    $cpf = str_pad($cpf, 11, '0', STR_PAD_LEFT);
	     
	    // Verifica se o numero de digitos informados é igual a 11 
	    if (strlen($cpf) != 11) {
	        return false;
	    }
	    // Verifica se nenhuma das sequências invalidas abaixo 
	    // foi digitada. Caso afirmativo, retorna falso
	    else if ($cpf == '00000000000' || 
	        $cpf == '11111111111' || 
	        $cpf == '22222222222' || 
	        $cpf == '33333333333' || 
	        $cpf == '44444444444' || 
	        $cpf == '55555555555' || 
	        $cpf == '66666666666' || 
	        $cpf == '77777777777' || 
	        $cpf == '88888888888' || 
	        $cpf == '99999999999') {
	        return false;
	     // Calcula os digitos verificadores para verificar se o
	     // CPF é v&aacute;lido
	     } else {   
	         
	        for ($t = 9; $t < 11; $t++) {
	             
	            for ($d = 0, $c = 0; $c < $t; $c++) {
	                $d += $cpf{$c} * (($t + 1) - $c);
	            }
	            $d = ((10 * $d) % 11) % 10;
	            if ($cpf{$c} != $d) {
	                return false;
	            }
	        }
	 
	        return true;
	    }
	}

	static private function checkEmail($email){
		if((strpos($email, "@") != strrpos($email, "@")) || !strpos($email, "@")){
			return FALSE;
		} else {
			if(strpos(substr($email, strpos($email, "@")), ".") === FALSE){
				return FALSE;
			} else
				return TRUE;
		}
	}

	public function signUp($pass, $passConf){
		if(!@User::checkCPF($this->get("cpf"))){
			return array("cod" => 1, "msg" => "CPF inv&aacute;lido!");
		} else {
			if(!User::checkEmail($this->get("email")))
				return array("cod" => 2, "msg" => "E-mail inv&aacute;lido!");
			else{
				if(!$this->get("name") || !$pass) 
					return array("cod" => 3, "Todos os campos deve mser preenchidos!");
				else if($pass != $passConf) 
					return array("cod" => 4, "msg" => "Senha e confirma&ccedil;&atilde;o de senha n&atilde;o conferem!");
				else 
					if(count(Database::select(array("email"), array("users"), "email = \"".$this->get("email")."\"")))
						return array("cod" => 5, "msg" => "E-mail j&aacute; cadastrado!");
				else 
					if(count(Database::select(array("cpf"), array("users"), "cpf = ".$this->get("cpf"))))
						return array("cod" => 6, "msg" => "CPF j&aacute; cadastrado!");
					else{
						$data = array(
							"name" => $this->get("name"),
							"cpf" => $this->get("cpf"),
							"email" => $this->get("email"),
							"password" => md5($pass),
							"type" => $this->get("type")
						);
						$rows = Database::insert("users", $data);
						if($rows) return array("cod" => 0, "msg"=>"Usu&aacute;rio cadastrado com sucesso!");
						else return array("cod" => 7, "msg"=> "Ocorreu um erro no registro, por favor, entre em contato com a administra&ccedil;&atilde;o.");
					}
			}
		}
	}
	public function edit($pass, $passConf){
		if(!User::checkCPF($this->get("cpf"))){
			return array("cod" => 1, "msg" => "CPF inv&aacute;lido!");
		} else {
			if(!User::checkEmail($this->get("email")))
				return array("cod" => 2, "msg" => "E-mail inv&aacute;lido!");
			else{
				if(!$this->get("name") || !$pass) 
					return array("cod" => 3, "Todos os campos deve mser preenchidos!");
				else if($pass != $passConf) 
					return array("cod" => 4, "msg" => "Senha e confirma&ccedil;&atilde;o de senha n&atilde;o conferem!");
				else 
					if(count(Database::select(array("email"), array("users"), "email = \"".$this->get("email")."\" AND cpf <> \"".$this->get("cpf")."\"")))
						return array("cod" => 5, "E-mail j&aacute; cadastrado!");
					else{
						$data = array(
							"name" => $this->get("name"),
							"cpf" => $this->get("cpf"),
							"email" => $this->get("email"),
							"password" => md5($pass),
							"type" => $this->get("type")
						);
						$rows = Database::update("users", $data, "cpf = \"".$this->get("cpf")."\"");
						if($rows) return array("cod" => 0, "msg" => "Edi&ccedil;&atilde;o realizada com sucesso");
						else return array("cod" => 7, "msg" => "Ocorreu um erro no registro, por favor, entre em contato com a administra&ccedil;&atilde;o.");
					}
			}
		}
	}


	public function answerNotification($room){
		return Database::delete("notifications", "room = ".$room);
	}

	public function reserveRoom($data){
		if(isset($data["weekDay"])){
			$weekDay = $data["weekDay"];
			foreach ($weekDay as $key => $value) {
				$data["weekDay"] = $value;
				$where = "(weekDay = \"".$data["weekDay"]."\")AND room = \"".$data["room"]."\" AND ((initialTime < ".$data["finalTime"]." AND finalTime > ".$data["initialTime"].") OR (initialTime > ".$data["initialTime"]." AND initialTime < ".$data["finalTime"].") OR (finalTime > ".$data["initialTime"]." AND finalTime < ".$data["finalTime"].") OR (initialTime > ".$data["initialTime"]." AND finalTime < ".$data["finalTime"]."))";
				$reservations = Database::select(array("*"), array("reservations"), $where);

				if($reservations){
					$return = array("cod" => 1, "msg" => "Houve choque de hor&aacute;rio, por favor, tente em outro hor&aacute;rio."); break;
				} else {
					$data["teacher"] = $this->get("cpf");
					if(Database::insert("reservations", $data))
						$return = array("cod" => 0, "msg" => "Reserva efetuada com sucesso!");
					else{
						$return = array("cod" => 2, "msg" => "Ocorreu um erro com o registro, por favor, entre em contato com a administra&ccedil;&atilde;o."); break;
					}
				}
			}
		} else {
			$weekDay = date('l', strtotime($data["date"]));

			$where = "(date = \"".$data["date"]."\" OR weekDay = \"".$weekDay."\")AND room = \"".$data["room"]."\" AND ((initialTime < ".$data["finalTime"]." AND finalTime > ".$data["initialTime"].") OR (initialTime > ".$data["initialTime"]." AND initialTime < ".$data["finalTime"].") OR (finalTime > ".$data["initialTime"]." AND finalTime < ".$data["finalTime"].") OR (initialTime > ".$data["initialTime"]." AND finalTime < ".$data["finalTime"]."))";
			$reservations = Database::select(array("*"), array("reservations"), $where);
				
				if($reservations){
					$return = array("cod" => 1, "msg" => "Houve choque de hor&aacute;rio, por favor, tente em outro hor&aacute;rio.");
				} else {
					$data["teacher"] = $this->get("cpf");
					if(Database::insert("reservations", $data))
						$return = array("cod" => 0, "msg" => "Reserva efetuada com sucesso!");
					else
						$return = array("cod" => 2, "msg" => "Ocorreu um erro com o registro, por favor, entre em contato com a administra&ccedil;&atilde;o.");
				}
			
		}
		return $return;
		
	}

	public function askRoom($room){
		if(Database::insert("notifications", array("room" => $room, "user" => $this->get("cpf"))))
			return array("cod" => 0, "msg" => "Notifica&ccedil;&atilde;o enviada com sucesso!");
		return array("cod" => 1, "msg" => "Ocorreu um erro na solicita&ccedil;&atilde;o, por favor, entre em contato com a administra&ccedil;&atilde;o.");
	}

	public function grantAccess($user, $room){
		$auth = Database::select(array("*"), array("authorizations"), "user = \"".$user."\" AND room = ".$room);
		if($auth){
			return array("cod"=>1, "msg" => "Usu&aacute;rio j&aacute; tem acesso à sala.");
		}
		if(Database::insert("authorizations", array("user" => $user, "room" => $room)))
			return array("cod" => 0, "msg" => "Autoriza&ccedil;&atilde;o concedida!");
		return array("cod" => 2, "msg" => "Ocorreu um erro com o registro, por favor, entre em contato com a administra&ccedil;&atilde;o.");
	}

	public function remove(){
		$conf = Database::delete("users", "cpf = \"".$this->get("cpf")."\"");
		if($conf) return array("cod" => 0, "msg" => "Usu&aacute;rio removido com sucesso!");
		return array("cod" => 1, "msg" => "Ocorreu um erro com a remo&ccedil;&atilde;o do registro, por favor, procure a administra&ccedil;&atilde;o.");
	}

	public function revokeAccess($user, $room){
		$auth = Database::select(array("*"), array("authorizations"), "user = \"".$user."\" AND room = ".$room);
		if(!$auth){
			return array("cod"=>1, "msg" => "Usu&aacute;rio n&atilde;o tem acesso à sala.");
		}
		if(Database::delete("authorizations", "cpf = \"".$user."\" AND room = ".$room ))
			return array("cod" => 0, "msg" => "Autoriza&ccedil;&atilde;o revogada!");
		return array("cod" => 2, "msg" => "Ocorreu um erro com o registro, por favor, entre em contato com a administra&ccedil;&atilde;o.");
	}

	public function validateUser($cpf, $pass){
		$results = Database::select(array("*"), array("users"), "cpf = \"".$cpf."\" AND password = \"".md5($pass)."\"");
		if(!$results) return FALSE;
		$results = $results[0];
		$this->set("id", $results["id"]);
		$this->set("name", $results["name"]);
		$this->set("email", $results["email"]);
		$this->set("type", $results["type"]);
		$this->set("cpf", $results["cpf"]);
		return TRUE;
	}
	public function getUser($cpf){
		$results = Database::select(array("*"), array("users"), "cpf = \"".$cpf."\" OR id = ".$cpf);
		if(!$results) return FALSE;
		$results = $results[0];
		$this->set("id", $results["id"]);
		$this->set("name", $results["name"]);
		$this->set("email", $results["email"]);
		$this->set("type", $results["type"]);
		$this->set("cpf", $results["cpf"]);
		return TRUE;
	}
}

?>