let express = require('express');
let app = express();
let products = [];
let id = 1;

app.use(express.json());
app.use(express.static('public'));

app.get('/products', (req, res) => {
    res.send(products);
})

app.post('/products', (req, res) => {
    let newProduct = req.body;
    newProduct.id = id;
    id++;
    products.push(newProduct);
    res.send('Created');
})

app.put('/products/:id', (req, res) => {
    let productId = +req.params.id;
    let productForUpdate;
    for (let i=0; i<products.length; i++){
        if(products[i].id === productId)
        {
            productForUpdate = products[i];
            break;
        }
    }
    if(productForUpdate) {
        productForUpdate.price = req.body.price;
        res.send('Updated');
    } else {
        res.send('Rejected');
    }
})

app.delete('/products/:id', (req, res) => {
    let productId = +req.params.id;
    for (let i=0; i<products.length; i++){
        if(products[i].id === productId)
        {
            products.splice(i, 1);
            res.send('Deleted');
            return;
        }
    }
    res.send('Rejected');
})

let port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening ${port}...`));