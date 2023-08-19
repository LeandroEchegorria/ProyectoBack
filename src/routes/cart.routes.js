import { Router } from 'express';
import { CartManager } from '../controllers/cartManager.js';

const cartManager = new CartManager('./src/models/cart.json', './src/models/productos.json');

const routerCart = Router();

routerCart.post('/', async (req, res) => {
    const newCart = await cartManager.createCart();
    res.status(201).json(newCart);
});

routerCart.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();
    (carts.length === 0) ? res.status(404).send("No carts found") : res.status(200).json(carts)
});


routerCart.get('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartManager.getCartById(cid);
    (cart) ? res.status(200).json(cart) : res.status(404).send("Cart not found");
});

routerCart.delete('/:cid', async (req, res) => {
    const cid = req.params.cid;
    const confirmation = await cartManager.deleteCart(cid);
    (confirmation) ? res.status(200).send("Cart deleted") : res.status(404).send("Cart not found");
  });

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const {cid, pid} = req.params;
    const {quantity} = req.body;
    const success = await cartManager.addProductToCart(cid, pid, quantity);
    
    (success) ? res.status(200).send("Product added to cart") : res.status(404).send("Cart not found");
    
});

export default routerCart;