import express from 'express';
import routerProd from './routes/product.routes.js';
import routerCart from './routes/cart.routes.js';
import { __dirname } from './path.js'
import path from 'path';

const app = express()
const PORT = 8080

//middlewares
app.use(express.json())
app.use(express.urlencoded ({extended: true}))

//Routes
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/api/product', routerProd)
app.use('/api/carts', routerCart)
app.get('/', (req,res)=> {
  res.send("Bienvenido a la Pre-entrega 1")
})

//Server
app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}, http://localhost:${PORT}/`)
})

