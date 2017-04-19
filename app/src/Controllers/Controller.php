<?php
	namespace App\Controllers;
	use DRouter\Container;
	
	abstract class Controller
	{
		protected $container;
		
		public function __construct(Container $container){
			$this->container = $container;
		}
		
		public function __get($key){
			if ($this->container->{$key}) {
				return $this->container->{$key};
			}
			return null;
		}
	}