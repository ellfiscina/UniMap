<?php

/**
* Schedule class
*/
class Schedule
{
	
	private $id;
	private $day;
	private $regular;
	private $discipline;
	private $teacher;


	public function get($attr){
		return $this->$attr;
	}
	public function set($attr, $value){
		$this->$attr = $value;
	}
}

?>