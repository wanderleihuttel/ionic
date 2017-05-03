<?php
	namespace App\Controllers;
	use App\Models\ProdutosModel as Produtos;
	
	class ProdutosController extends Controller
	{
		public function produtos(){
			$produtos = new Produtos($this->db);
			
			$loja = post('loja', FILTER_SANITIZE_NUMBER_INT);
			$resposta = $produtos->produtos($loja);
			
			echo json_encode($resposta);
		}
	}