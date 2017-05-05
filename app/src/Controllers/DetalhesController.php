<?php
	namespace App\Controllers;
	use App\Models\DetalhesModel as Detalhes;
	
	class DetalhesController extends Controller
	{		
		public function pedido(){
			$detalhes = new Detalhes($this->db);
			
			$loja = post('loja', FILTER_SANITIZE_NUMBER_INT);
			$pedido = post('pedido', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $detalhes->pedido($loja, $pedido);
			
			echo json_encode($dados);
		}
		
		public function produto(){
			$detalhes = new Detalhes($this->db);
			
			$loja = post('loja', FILTER_SANITIZE_NUMBER_INT);
			$produto = post('produto', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $detalhes->produto($loja, $produto);
			
			echo json_encode($dados);
		}
	}