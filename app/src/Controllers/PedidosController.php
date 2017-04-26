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
		
		public function detalhes(){
			$detalhes = new Pedidos($this->db);
			
			$id = post('id_pedido', FILTER_SANITIZE_NUMBER_INT);
			$loja = post('id_loja', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $detalhes->detalhes($id, $loja);
			
			echo json_encode($dados);
		}
	}