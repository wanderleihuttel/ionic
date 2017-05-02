<?php
	namespace App\Models;
	use PDO;
	
	class PesquisaModel extends Model
	{
		public function pesquisa($nome){
			$retorno['resposta'] = 'erro';
			
			$stmt = $this->db->prepare("SELECT `id`, `nome` FROM `admin_lojas` WHERE `nome` LIKE :nome LIMIT 5");
			$stmt->bindValue(':nome', '%'.$nome.'%', PDO::PARAM_STR);
			$stmt->execute();
			
			$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if (count($dados) > 0) {
				$retorno = array('loja' => $dados);
			}
			return $retorno;
		}
	}