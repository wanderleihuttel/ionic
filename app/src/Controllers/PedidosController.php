<?php
	namespace App\Controllers;
	use App\Models\PedidosModel as Pedidos;
	
	class PedidosController extends Controller
	{
		public function pedidos(){
			$pedidos = new Pedidos($this->db);
			
			$cliente = post('cliente', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $pedidos->pedidos($cliente);
			
			echo json_encode($dados);
		}
		
		public function detalhes(){
			$detalhes = new Pedidos($this->db);
			
			$loja = post('loja', FILTER_SANITIZE_NUMBER_INT);
			$pedido = post('pedido', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $detalhes->detalhes($loja, $pedido);
			
			echo json_encode($dados);
		}
	}