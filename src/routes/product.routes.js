import { Router } from "express"
/* import { ProductManager } from "../controllers/productManager.js" */
import { productModel } from "../models/products.model.js"

/* const productManager = new ProductManager ('src/models/product.json') */
const routerProd = Router()

routerProd.get('/', async(req,res) => {
    try {
        const prods = await productModel.find()
        const limit = req.query.limit
        const products = prods.slice(0, limit)
        res.status(200).json(products)
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred while processing your request.' })
    }
})

routerProd.get('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        if (!Number.isInteger(pid)) {
            res.status(400).send("Invalid product ID")
            return
        }
        
        const prod = await productModel.getProductsById(pid)
        if (prod) {
            res.status(200).json(prod)
        } else {
            res.status(404).send("Product does not exist")
        }
        

    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred while processing your request.' })
    }
})

routerProd.post('/', async (req, res) => {
    try {
        console.log("Producto a agregar:", req.body)
        const { nombre, apellido, edad, password, email } = req.body
        const confirmacion = await productModel.create({
            nombre, apellido, edad, password, email
            
        })
        if (confirmacion) {
            res.status(200).send("Product created")
        } else {
            res.status(404).send("Product already exists")
        }
    
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred while processing your request.' })
    }
});


routerProd.put('/:pid', async (req, res) => {
    try {
        console.log("Producto a modificar:", req.body)
        const pid = parseInt(req.params.pid)
        
        if (!Number.isInteger(pid)) {
            res.status(400).send("Invalid product ID")
            return;
        }
        const confirmacion = await productModel.updateProduct(pid, req.body)

        if (confirmacion) {
            res.status(200).send("Product updated")
        } else {
            res.status(404).send("Product not found")
        }

        

    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred while processing your request.' })
    }
});


routerProd.delete('/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        console.log("pid", pid)

        if (!Number.isInteger(pid)) {
            res.status(400).send("Invalid product ID")
            return
        }
        const confirmacion = await productModel.deleteProduct(pid)
        if (confirmacion) {
            res.status(200).send("Product deleted")
        } else {
            res.status(404).send("Product not found")
        }
    
    } catch (error) {
        console.error('Error:', error)
        res.status(500).json({ error: 'An error occurred while processing your request.' })
    }
});

export default routerProd

























/* 

//Ruta products:
routerProd.get("/api/products", (req, res) => {
    const products = fs.readFileSync("products.json", "utf-8")
    res.json(products)
})

routerProd.get("/api/products/:pid", (req, res) => {
    const product = fs.readFileSync(`products/${req.params.pid}.json`, "utf-8")
    res.json(product)
});

routerProd.post("/api/products", (req, res) => {
    const product = req.body
    // Autogenerate the product ID
    product.id = Math.random().toString(36).substring(7)
    fs.writeFileSync(`products/${product.id}.json`, JSON.stringify(product, null, 2))
    res.json(product)
});

routerProd.put("/api/products/:pid", (req, res) => {
    const product = req.body
    fs.writeFileSync(`products/${product.id}.json`, JSON.stringify(product, null, 2))
    res.json(product)
});

routerProd.delete("/api/products/:pid", (req, res) => {
    fs.unlinkSync(`products/${req.params.pid}.json`)
    res.json({ message: "Product deleted successfully" })
}) */