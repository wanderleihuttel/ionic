<?php
	namespace App\Controllers;
	use App\Models\DetalhesModel as Detalhes;
	
	class DetalhesController extends Controller
	{		
		public function pedido(){
			$detalhes = new Detalhes($this->db);
			
			$estabelecimento = get('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$pedido = get('pedido', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $detalhes->pedido($estabelecimento, $pedido);
			
			echo json_encode($dados);
		}
		
		public function produto(){
			$detalhes = new Detalhes($this->db);
			
			$estabelecimento = get('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$produto = get('produto', FILTER_SANITIZE_NUMBER_INT);
			
			$dados = $detalhes->produto($estabelecimento, $produto);
			
			echo json_encode($dados);
		}
	}