const express= require('express');
const app= express();
const port=3000;

//db
const { Pool }= require('pg');
const pool= new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'angel1234',
    database: 'Api Store',
    port: 5432
});
//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true}));

app.use(require('./routes'));
let products=[
    {
        id:1,
        name:"iPhone",
        price:1000,
        image:"images/iphone.jpg",
        stock: 5, 
        description: "iPhone ",
        category_id: 503  
    },
    {
        id:2,
        name:"Mouse",
        price:50,
        image:"images/mouse.jpg",
        stock: 10,
        description: "Mouse gamer",
        category_id: 504
    },
    {
        id:3,
        name:"Tv",
        price:400,
        image:"images/tv.jpg",
        stock: 8,
        description: "Smart Tv",
        category_id: 505
    },
];
let categorias=[
    {
        category_id:503,
        nombre: "Smartphones"
    },
    {
        category_id:504,
        nombre: "Mouse's"
    },
    {
        category_id:505,
        nombre: "Tv's"
    },
];
let Ordenes=[
  
];
// for(let i=0; i<products.length;i++){
//     if(products[i].id==`${productoId}`){
//         Ordenes[i]={
//             id: 2023+i,
//             customer_id: "client"+i,
//             total: 500,
//             created_at: "2023-02-17",
//         }
//     }
// }
// for(let i=0; i<Ordenes.length;i++){
//     console.log(Ordenes[i]);
// }


//route to return a json with the products
app.get('/api/products', (req,res)=>{
    res.send(products);
});
app.post('/api/pay', (req,res)=>{
    const ids=req.body;
    const prodCopy= products.map(p =>({...p})); //Make a copy from the products array 
    ids.forEach(id => {
        const product=prodCopy.find(p => p.id === id); //look for the first item that has same identity ===
        if(product.stock> 0){
            product.stock--; //reduce the stock
        }
        else{
            throw("Sin stock"); //Shows an error with the message without stock
        }
    });
    products= prodCopy; //the copy transfer the items to the original.
    res.send(products);
});
pool.connect()
app.post("/create_order", async(req,res) =>{
    let key = Object.keys(req.body)[0]; //toma el valor de la primera llave de un JSON para usarla luego, no se si asi se mandan arrays normalmente. Ejemplo: { "products" : [1, 2, 3] }
    let ids = req.body[key];
    let total = 0;
    
    for (let i in ids) {
        let id = ids[i];
        pool.query(`SELECT price FROM Products_Table WHERE id_pro=$1`, [id], (err, re) =>{
            var price = ((parseInt(re.rows[0]["price"])));
            total += price;

            if(i === String((ids.length -1))){
                pool.query(`INSERT INTO Ord_Table(id_ord,customer_id,total,created_at) VALUES($1,$2,$3,to_timestamp(${Date.now()} / 1000.0))`, [1214,2000,total]);
                console.log("orden creada con exito");
                res.json({ "total" : total});
                pool.end;
            }
        });
    }
});
//call the folder frontend
app.use('/',express.static('frontend'));
//open the server
app.listen(port, () =>{
    console.log(`App Listening on port: ${port}`)
});