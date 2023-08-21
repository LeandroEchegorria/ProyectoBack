import express from 'express';
import routerProd from './routes/product.routes.js';
import routerCart from './routes/cart.routes.js';
import { __dirname } from './path.js'
import path from 'path';
import { engine } from 'express-handlebars';

const app = express()
const PORT = 8080

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
  res.send("Bienvenido a la Pre-entrega 1")
})
//HBS
app.get('/static', (req,res) => {
  const user = {
    nombre: "Leandro",
    cargo : "tutor"
  }
  const cursos = [
    {numCurso: "124", dia: "LyM", horario: "Noche"},
    {numCurso: "787", dia: "MyJ", horario: "Tarde"},
    {numCurso: "471", dia: "S", horario: "Mañana"}
  ]
  res.render('users', {
    titulo : "Users",
    usuario: user,
    rutaCSS : "users.css",
    isTutor : user.cargo == "tutor",
    cursos : cursos
  })
})

//Server
app.listen(PORT, ()=> {
    console.log(`Server on port ${PORT}, http://localhost:${PORT}/`)
})

