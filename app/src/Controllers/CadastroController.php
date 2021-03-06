<?php
	namespace App\Controllers;
	use App\Models\CadastroModel as Cadastro;
	
	class CadastroController extends Controller
	{
		public function cadastro(){
			$cadastro = new Cadastro($this->db);
			
			$nome = post('nome', FILTER_SANITIZE_STRING);
			$sobrenome = post('sobrenome', FILTER_SANITIZE_STRING);
			$email = post('email', FILTER_SANITIZE_EMAIL);
			$senha = post('senha', FILTER_SANITIZE_STRING);
			
			$resposta = $cadastro->cadastro($nome, $sobrenome, $email, $senha);
			
			echo json_encode($resposta);
		}
	}