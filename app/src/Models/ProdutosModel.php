<?php
	namespace App\Models;
	use PDO;
	
	class ProdutosModel extends Model
	{
		public function produtos($estabelecimento){
			$retorno['resposta'] = 'erro';
			
			$stmt = $this->db->prepare("SELECT `id`, `id_loja`, `foto`, `nome`, `descricao`, `preco`, `estoque` FROM `loja_produtos` WHERE `id_loja` = :loja LIMIT 2");
			$stmt->bindValue(':loja', $estabelecimento, PDO::PARAM_INT);
			$stmt->execute();
			
			$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if (count($produtos) > 0) {
				$retorno = array('produtos' => $produtos);
			}
			return $retorno;
		}
		
		public function produtos_categoria($estabelecimento, $categoria){
			$retorno['resposta'] = 'erro';
			
			$stmt = $this->db->prepare("SELECT `id`, `id_loja`, `foto`, `nome`, `descricao`, `preco`, `estoque` FROM `loja_produtos` WHERE `id_loja` = :loja AND `categoria` = :categoria");
			$stmt->bindValue(':loja', $estabelecimento, PDO::PARAM_INT);
			$stmt->bindValue(':categoria', $categoria, PDO::PARAM_INT);
			$stmt->execute();
			
			$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if (count($produtos) > 0) {
				$retorno = array('produtos' => $produtos);
			}
			return $retorno;
		}
		
		public function carregar_mais($estabelecimento, $quantidade){
			$retorno['resposta'] = 'erro';
			
			$stmt = $this->db->prepare("
				SELECT `id`, `id_loja`, `foto`, `nome`, `descricao`, `preco`, `estoque`
				FROM `loja_produtos` WHERE `id_loja` = :loja LIMIT 2
			");
			$stmt->bindValue(':loja', $estabelecimento, PDO::PARAM_INT);
			$stmt->bindValue(':quantidade', $quantidade, PDO::PARAM_INT);
			$stmt->execute();
			
			$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
			
			if (count($produtos) > 0) {
				$retorno = array('produtos' => $produtos);
			}
			return $retorno;
		}
	}