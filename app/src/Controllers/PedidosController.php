<?php
	namespace App\Controllers;
	use App\Models\PedidosModel as Pedidos;
	
	class PedidosController extends Controller
	{
		public function pedidos(){
			$pedidos = new Pedidos($this->db);
			
			$id = post('id_usuario', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $pedidos->pedidos($id);
			
			echo json_encode($dados);
		}
	}