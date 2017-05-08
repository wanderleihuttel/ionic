<?php
	namespace App\Controllers;
	use App\Models\PesquisaModel as Pesquisa;
	
	class PesquisaController extends Controller
	{
		public function loja(){
			$pesquisa = new Pesquisa($this->db);
			
			$loja = post('loja', FILTER_SANITIZE_STRING);
			$resposta = $pesquisa->loja($loja);
			
			echo json_encode($resposta);
		}
		
		public function produto(){
			$pesquisa = new Pesquisa($this->db);
			
			$loja = post('loja', FILTER_SANITIZE_NUMBER_INT);
			$produto = post('produto', FILTER_SANITIZE_STRING);
			$resposta = $pesquisa->produto($loja, $produto);
			
			echo json_encode($resposta);
		}
	}