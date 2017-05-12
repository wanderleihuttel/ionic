<?php
	namespace App\Controllers;
	use App\Models\ProdutosModel as Produtos;
	
	class ProdutosController extends Controller
	{
		public function produtos(){
			$produtos = new Produtos($this->db);
			
			$estabelecimento = get('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$limite = get('limite', FILTER_SANITIZE_NUMBER_INT);
			$pular = get('pular', FILTER_SANITIZE_NUMBER_INT);
			$resposta = $produtos->produtos(['limite' => $limite, 'pular' => $pular, 'estabelecimento' => $estabelecimento]);
			
			echo json_encode($resposta);
		}
		
		public function produtos_categoria(){
			$produtos = new Produtos($this->db);
			
			$estabelecimento = get('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$categoria = get('categoria', FILTER_SANITIZE_NUMBER_INT);
			$resposta = $produtos->produtos($estabelecimento, $categoria);
			
			echo json_encode($resposta);
		}
		
		public function carregar_mais(){
			$produtos = new Produtos($this->db);
			
			$estabelecimento = get('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$quantidade = get('quantidade', FILTER_SANITIZE_NUMBER_INT);
			$resposta = $produtos->carregar_mais($estabelecimento, $quantidade);
			
			echo json_encode($resposta);
		}
	}