import express from 'express';
import routerProd from './routes/product.routes.js';
import routerCart from './routes/cart.routes.js';
import { __dirname } from './path.js'
import path from 'path';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io'
import { ProductManager } from './controllers/productManager.js';

const app = express()
const PORT = 8080

//Server
const server = app.listen(PORT, ()=> {
  console.log(`Server on port ${PORT}, http://localhost:${PORT}/`)
})
const io = new Server(server)

//middlewares
app.use(express.json())
app.use(express.urlencoded ({extended: true}))

app.engine('handlebars', engine()) //def trabajo con hbs
app.set('view engine', 'handlebars') //no hace falta explicitar el .handlebars en los archivos
app.set('views', path.resolve(__dirname, './views'))

//Routes
app.use('/static', express.static(path.join(__dirname, '/public')))
app.use('/api/product', routerProd)
app.use('/api/carts', routerCart)
app.get('/', (req,res)=> {
  res.send("Bienvenido")
})
//HBS
app.get('/static', (req,res) => {
  res.render('realTimeProducts', {
    titulo: "Real Time Products",
    rutaCSS : "realTimeProducts",
    rutaJS: "realTimeProducts",

  })
})

//Product Manager
const ProductManagerSocket = new ProductManager('./src/models/product.json')

//Conexion de Socket.io
io.on("connection", (socket) => {
  console.log("Conexion con Socket.io")

  socket.on('mensaje', info => {
      console.log(info)
      socket.emit('respuesta', false)
  })

  socket.on('juego', (infoJuego) => {
      if (infoJuego == "poker")
          console.log("Conexion a Poker")
      else
          console.log("Conexion a Truco")
  })

  socket.on('nuevoProducto', (prod) => {
      console.log(prod)
      //Deberia agregarse al txt o json mediante addProduct
      ProductManagerSocket.addProduct(prod)

      socket.emit("mensajeProductoCreado", "El producto se creo correctamente")
  })
})



