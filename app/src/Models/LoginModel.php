<?php
	namespace App\Models;
	use PDO;
	
	class LoginModel extends Model
	{
		public function login($email, $senha){
			$retorno['resposta'] = 'login_invalido';
			
			$stmt = $this->db->prepare("SELECT `id`, `codigo`, `nome`, `sobrenome`, `email`, `senha` FROM `loja_clientes` WHERE `email` = :email");
			$stmt->bindValue(':email', $email, PDO::PARAM_STR);
			$stmt->execute();
			$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($dados) == 1) {
				if (password_verify($senha, $dados[0]['senha'])) {					
					$retorno = array('resposta' => 'logou', 'id' => $dados[0]['id'], 'codigo' => $dados[0]['codigo'], 'nome' => $dados[0]['nome'], 'sobrenome' => $dados[0]['sobrenome']);
				}
			}
			return $retorno;
		}
	}