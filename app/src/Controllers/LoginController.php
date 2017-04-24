<?php
	namespace App\Controllers;
	use App\Models\EmailModel as Email;
	use App\Models\LoginModel as Login;
	
	class LoginController extends Controller
	{
		public function login(){
			$login = new Login($this->db);
			
			$email = post('email', FILTER_SANITIZE_EMAIL);
			$senha = post('senha', FILTER_SANITIZE_STRING);
			$resposta = $login->login($email, $senha);
			
			echo json_encode($resposta);
		}
		
		public function esqueci_senha($dados){
			$email = new Email($this->db);
			$resposta = $email->esqueci_senha($dados);
			echo json_encode($resposta);
		}
	}