<?php
	namespace App\Models;
	use PDO;
	
	class CadastroModel extends Model
	{
        public function cadastro($nome, $sobrenome, $email, $senha){			
			$senha_criptografada = password_hash($senha, PASSWORD_BCRYPT, ['cost' => 12]);
			
			$nome_completo = $nome.' '.$sobrenome;			
			$peaces = explode(' ', $nome_completo);
			$codigo = $peaces[0][0].''.$peaces[count($peaces) - 1][0];
			$codigo.str_pad(rand(0,9999), 4, 0, STR_PAD_LEFT);
			
			$stmt = $this->db->prepare("SELECT `email` FROM `loja_clientes` WHERE `email` = :email");
			$stmt->bindValue(':email', $email, PDO::PARAM_STR);
			$stmt->execute();
			$conta = $stmt->fetchAll(PDO::FETCH_ASSOC);
			if (count($conta) > 0) {
				$retorno = array('resposta' => 'email_existente');
			} else {
				$stmt = $this->db->prepare("INSERT INTO `loja_clientes` (`codigo`, `nome`, `sobrenome`, `email`, `senha`, `lixeira`) VALUES (:codigo, :nome, :sobrenome, :email, :senha, :lixeira)");
				$stmt->bindValue(':codigo', $codigo, PDO::PARAM_STR);
				$stmt->bindValue(':nome', $nome, PDO::PARAM_STR);
				$stmt->bindValue(':sobrenome', $sobrenome, PDO::PARAM_STR);
				$stmt->bindValue(':email', $email, PDO::PARAM_STR);
				$stmt->bindValue(':senha', $senha_criptografada, PDO::PARAM_STR);
				$stmt->bindValue(':lixeira', 0, PDO::PARAM_INT);
				if ($stmt->execute()) {
					$retorno = array('resposta' => 'cadastrou');
				}
			}
			return $retorno;
		}
	}