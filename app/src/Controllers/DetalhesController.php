<?php
	namespace App\Controllers;
	use App\Models\DetalhesModel as Detalhes;
	
	class DetalhesController extends Controller
	{		
		public function pedido(){
			$detalhes = new Detalhes($this->db);
			
			$estabelecimento = post('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$pedido = post('pedido', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $detalhes->pedido($estabelecimento, $pedido);
			
			echo json_encode($dados);
		}
		
		public function produto(){
			$detalhes = new Detalhes($this->db);
			
			$estabelecimento = post('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$produto = post('produto', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $detalhes->produto($estabelecimento, $produto);
			
			echo json_encode($dados);
		}
	}