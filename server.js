const express =  require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express() 

// application server variable
let port = 3000

// Application middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// routes
app.get('/healthcheck', (req, res) => {
    res.send('Hello Node API')
})

// create product record server handler
app.post('/create', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error) {
        console.log(error.message);
        console.log(500).json({message: error.message});
    }
})

// fetch all product records handler
app.get('/products', async(req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products); 

    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// fetch single product record server handler 
app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message)
        res.status(200).json({message: error.mesage});
    }
})

// update existing product properties server handler
app.patch('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: 'cannot find any product with ID ${id'})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete product server handler
app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);

        if(!product){
            return res.status(404).json({message: 'cannot find any product with id ${:id}'})
        }
        res.status(200).json({message: 'product successfully deleted'})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// Initialize database connection
mongoose.connect('mongodb+srv://admin:lXwqOCMnKwXDzO1L@mngjs.mw5flxh.mongodb.net/firstNODEJS?retryWrites=true&w=majority')
.then(() => {
    // Start application server
    app.listen(port, ()=> {
        console.log('Node API app is listening on port ' + port)
    })
    console.log('connected to MongoDB ')
}).catch(() => {
    console.log(error)
})
