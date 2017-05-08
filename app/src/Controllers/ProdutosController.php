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
		
		public function produtos_categoria(){
			$produtos = new Produtos($this->db);
			
			$loja = post('loja', FILTER_SANITIZE_NUMBER_INT);
			$categoria = post('categoria', FILTER_SANITIZE_NUMBER_INT);
			$resposta = $produtos->produtos($loja, $categoria);
			
			echo json_encode($resposta);
		}
		
		public function carregar_mais(){
			$produtos = new Produtos($this->db);
			
			$loja = post('loja', FILTER_SANITIZE_NUMBER_INT);
			$quantidade = post('quantidade', FILTER_SANITIZE_NUMBER_INT);
			$resposta = $produtos->carregar_mais($loja, $quantidade);
			
			echo json_encode($resposta);
		}
	}