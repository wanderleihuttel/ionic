<?php
	namespace App\Controllers;
	use App\Models\PesquisaModel as Pesquisa;
	
	class PesquisaController extends Controller
	{
		public function pesquisa(){
			$pesquisa = new Pesquisa($this->db);
			
			$nome = post('nome', FILTER_SANITIZE_STRING);
			$resposta = $pesquisa->pesquisa($nome);
			
			echo json_encode($resposta);
		}
	}