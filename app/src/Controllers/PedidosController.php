<?php
	namespace App\Controllers;
	use App\Models\PedidosModel as Pedidos;
	
	class PedidosController extends Controller
	{
		public function pedidos($id){
			var_dump($id);
			$pedidos = new Pedidos($this->db);
			$dados = $pedidos->pedidos($id);
			echo json_encode($dados);
		}
	}