<?php
	namespace View;
	abstract class view{
		public function render(){
			require_once('html/'.$this->html.'.php');
		}
	}
?>