<?php
	namespace App\Models;
	use PDO;
	
	class ProdutosModel extends Model
	{
		public function produtos($loja){
			$retorno['resposta'] = 'erro';
			
			$stmt = $this->db->prepare("SELECT `id`, `nome` FROM `loja_produtos` WHERE `id_loja` = :loja");
			$stmt->bindValue(':loja', $loja, PDO::PARAM_INT);
			$stmt->execute();
			
			$dados = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if (count($dados) > 0) {
				$retorno = array('resposta' => 'ok', 'resposta' => $dados);
			}
			return $retorno;
		}
	}