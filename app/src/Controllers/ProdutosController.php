<?php
	namespace App\Controllers;
	use App\Models\ProdutosModel as Produtos;
	
	class ProdutosController extends Controller
	{
		public function produtos(){
			$produtos = new Produtos($this->db);
			
			$estabelecimento = post('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$resposta = $produtos->produtos($estabelecimento);
			
			echo json_encode($resposta);
		}
		
		public function produtos_categoria(){
			$produtos = new Produtos($this->db);
			
			$estabelecimento = post('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$categoria = post('categoria', FILTER_SANITIZE_NUMBER_INT);
			$resposta = $produtos->produtos($estabelecimento, $categoria);
			
			echo json_encode($resposta);
		}
		
		public function carregar_mais(){
			$produtos = new Produtos($this->db);
			
			$estabelecimento = post('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$quantidade = post('quantidade', FILTER_SANITIZE_NUMBER_INT);
			$resposta = $produtos->carregar_mais($estabelecimento, $quantidade);
			
			echo json_encode($resposta);
		}
	}