<?php

/**
* Classe Database
* Responsavel por toda comunicação com banco de dados
*/
class Database
{
	static private $host;
	static private $user;
	static private $password;
	static private $database;
	static private $db;
	static public function connect($host, $user, $password, $database)
	{
		Database::$host = $host;
		Database::$user = $user;
		Database::$password = $password;
		Database::$database = $database;
		$dsn = "mysql:dbname=".Database::$database.";host=".Database::$host;
		try{
			Database::$db = new PDO($dsn, Database::$user, Database::$password, array('charset'=>'utf8'));
		} catch(PDOException $e){
			echo 'Falha de conexão: <br>'.$e->getMessage();
		}
	}
	static public function get($property){
		return Database::$$property;
	}
	static public function set($property, $value){
		Database::$$property = $value;
	}

	static public function insert($table, $data){
		$query = "INSERT INTO ".$table." ";
		$fields = "(";
		$values = "(";
		foreach ($data as $key => $value) {
			$fields .= $key.", ";
			$values .= "\"".$value."\", ";
		}
		$fields = rtrim($fields, ", ").")";
		$values = rtrim($values, ", ").")";
		$query .= $fields." VALUES ".$values.";";
		return Database::$db->exec($query);
	}

	static public function select($data, $from, $where){
		$query = "SELECT ".implode(", ", $data)." FROM ".implode(", ", $from)." WHERE ".$where.";";
		return Database::$db->query($query)?Database::$db->query($query)->fetchAll(PDO::FETCH_ASSOC):Database::$db->query($query);
	}

	static public function update($table, $data, $where){
		$query = "UPDATE ".$table." SET ";
		foreach ($data as $key => $value) {
			$query .= $key."=\"".$value."\", ";
		}
		$query = rtrim($query, ", ");
		$query .= " WHERE ".$where.";";
		return Database::$db->exec($query);
	}

	static public function delete($table, $where){
		$query = "DELETE FROM ".$table." WHERE ".$where.";";
		return Database::$db->exec($query);
	}
}

?>