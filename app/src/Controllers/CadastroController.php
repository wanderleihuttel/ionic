<?php
	namespace App\Controllers;
	use App\Models\CadastroModel as Cadastro;
	
	class CadastroController extends Controller
	{
		public function cadastro(){
			/*$postdata = file_get_contents("php://input");
			
			if (isset($postdata)) {
				$cadastro = new Cadastro($this->db);
				
				$request = json_decode($postdata);
				
				$nome = filter_var($request->nome, FILTER_SANITIZE_STRING);
				$sobrenome = filter_var($request->sobrenome, FILTER_SANITIZE_STRING);
				$email = filter_var($request->email, FILTER_SANITIZE_EMAIL);
				$senha = filter_var($request->senha, FILTER_SANITIZE_STRING);*/
				
				$nome = post('nome', FILTER_SANITIZE_STRING);
				$sobrenome = post('sobrenome', FILTER_SANITIZE_STRING);
				$email = post('email', FILTER_SANITIZE_EMAIL);
				$senha = post('senha', FILTER_SANITIZE_STRING);
				
				$resposta = $cadastro->cadastro($nome, $sobrenome, $email, $senha);
				
				echo json_encode($resposta);
			//}
		}
	}