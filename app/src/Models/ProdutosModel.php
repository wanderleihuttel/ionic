<?php
	namespace App\Models;
	use PDO;
	
	class ProdutosModel extends Model
	{
		public function produtos(){
            $args = func_get_args();
			$retorno['resposta'] = 'erro';
			$estabelecimento = $args[0]['estabelecimento'];

            if (count($args) == 0) {				
				$stmt = $this->db->prepare("SELECT `id`, `id_loja`, `foto`, `nome`, `descricao`, `preco`, `estoque` FROM `loja_produtos` WHERE `id_loja` = :loja ORDER BY `id` DESC");
				$stmt->bindValue(':loja', $estabelecimento, PDO::PARAM_INT);
				$stmt->execute();
				$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
				
            } elseif(count($args) == 1 && is_array($args[0])) {
                $limite = $args[0]['limite'];
                $pular = $args[0]['pular'];
				
				$stmt = $this->db->prepare("SELECT `id`, `id_loja`, `foto`, `nome`, `descricao`, `preco`, `estoque` FROM `loja_produtos` WHERE `id_loja` = :loja ORDER BY `id` DESC LIMIT :limite, :pular");
				$stmt->bindValue(':loja', $estabelecimento, PDO::PARAM_INT);
				$stmt->bindValue(':limite', $limite, PDO::PARAM_INT);
				$stmt->bindValue(':pular', $pular, PDO::PARAM_INT);
				$stmt->execute();
				$produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
            }
			
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