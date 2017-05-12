<?php
	namespace App\Controllers;
	use App\Models\PesquisaModel as Pesquisa;
	
	class PesquisaController extends Controller
	{
		public function estabelecimento(){
			$pesquisa = new Pesquisa($this->db);
			
			$estabelecimento = get('estabelecimento', FILTER_SANITIZE_STRING);
			$resposta = $pesquisa->estabelecimento($estabelecimento);
			
			echo json_encode($resposta);
		}
		
		public function produto(){
			$pesquisa = new Pesquisa($this->db);
			
			$estabelecimento = get('estabelecimento', FILTER_SANITIZE_NUMBER_INT);
			$produto = get('produto', FILTER_SANITIZE_STRING);
			$resposta = $pesquisa->produto($estabelecimento, $produto);
			
			echo json_encode($resposta);
		}
	}