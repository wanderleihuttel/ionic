<?php
	namespace App\Models;
	use PDO;
	
	class PedidosModel extends Model
	{
        public function pedidos($id){
			try {
				$stmt = $this->db->prepare("
					SELECT
						`loja_pedidos`.`id` as id_pedido,
						`loja_pedidos`.`status`,
						`loja_produtos`.`nome`,
						`loja_produtos`.`foto`
							FROM `loja_produtos_pedidos`
								INNER JOIN `loja_pedidos` ON (`loja_pedidos`.`id` = `loja_produtos_pedidos`.`id_pedido`)
								INNER JOIN `loja_produtos` ON (`loja_produtos`.`id` = `loja_produtos_pedidos`.`id_produto`)

							WHERE `loja_pedidos`.`id_cliente` = :cliente
				");
				
				$stmt->bindValue(':cliente', $id, PDO::PARAM_INT);
				$stmt->execute();
				return $stmt->fetchAll(PDO::FETCH_ASSOC);
			} catch(PDOException $e) {
				die($e->getMessage());
			}
        }
		
		/*public function detalhes($id){
			try {
				$stmt = $this->db->prepare("SELECT `loja_pedidos`.`id` as id_pedido, `loja_pedidos`.`pontos`, `loja_pedidos`.`status`, `loja_pedidos`.`data`, `loja_produtos`.`nome` as nome_produto, `loja_clientes`.`id` as id_cliente, `loja_clientes`.`nome` as nome_cliente, `loja_clientes`.`sobrenome` FROM `loja_produtos_pedidos` INNER JOIN `loja_pedidos` ON (`loja_pedidos`.`id` = `loja_produtos_pedidos`.`id_pedido`) INNER JOIN `loja_clientes` ON (`loja_clientes`.`id` = `loja_pedidos`.`id_cliente`) INNER JOIN `loja_produtos` ON (`loja_produtos`.`id` = `loja_produtos_pedidos`.`id_produto`) WHERE `loja_pedidos`.`id_loja` = :loja AND `loja_pedidos`.`id` = :id");
				$stmt->bindValue(':loja', 2, PDO::PARAM_INT);
				$stmt->bindValue(':id', $id, PDO::PARAM_INT);
				$stmt->execute();
				return $stmt->fetchAll(PDO::FETCH_ASSOC);
			} catch(PDOException $e) {
				die($e->getMessage());
			}
		}*/
	}