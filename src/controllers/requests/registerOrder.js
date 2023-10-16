import pool from "../../database/pdv.js";
import { transporter } from '../../mail.js';

export const registerOrder = async (req, res) => {
    try {
        const { cliente_id, observacao, pedido_produtos } = req.body;

        const existingClient = await pool.query(`select id from clientes where id = $1`, [cliente_id]);

        if (existingClient.rows.length === 0) {
            return res.status(400).json({error: 'Non-existing client.'});
        }

        let valor_total = 0;

        for(let i = 0; i < pedido_produtos.length; i++){
            const produto_id = pedido_produtos[i].produto_id;
            const quantidade_produto = pedido_produtos[i].quantidade_produto;
            
            const existingProduct = await pool.query(`select id, quantidade_estoque, valor from produtos where id = $1`, [produto_id]);

            if (existingProduct.rows.length === 0) {
                return res.status(400).json({message: 'Non-existing product.'});
            }

            const productData = existingProduct.rows[0];
            
            if (productData.quantidade_estoque < quantidade_produto) {
                return res.status(400).json({message: 'Not enough products in stock for this order'});
            }

            const subtotal = productData.valor * quantidade_produto;
            valor_total += subtotal;

            const updatedStock = productData.quantidade_estoque - quantidade_produto;
            await pool.query(`update produtos set quantidade_estoque = $1 where id = $2`, [updatedStock, produto_id]);
        };

        const query = `insert into pedidos (cliente_id, observacao, valor_total) values ($1, $2, $3) returning *`;
        const values = [cliente_id, observacao, valor_total];
        const newRequest = await pool.query(query, values);
        
        const client = await pool.query(`select nome, email from clientes where id = $1`, [cliente_id]);
        
        transporter.sendMail({
            from: `${process.env.MAIL_NAME} <${process.env.MAIL_FROM}>`,
            to: `${client.nome} <${client.email}>`,
            subject: 'Order confirmation',
            text: 'Order rigistered successfully'
        });

        return res.status(201).json(newRequest.rows[0]);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error.' })
    }
}