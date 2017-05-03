<?php
	namespace App\Controllers;
	use App\Models\PesquisaModel as Pesquisa;
	
	class PesquisaController extends Controller
	{
		public function pesquisa(){
			$pesquisa = new Pesquisa($this->db);
			
			$loja = post('loja', FILTER_SANITIZE_STRING);
			$resposta = $pesquisa->pesquisa($loja);
			
			echo json_encode($resposta);
		}
	}