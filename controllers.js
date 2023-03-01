const { Pool }= require('pg');
const pool= new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'angel1234',
    database: 'Api Store',
    port: 5432
});
/*async function read(){
    const response=await pool.query('SELECT *FROM Products_Table');
    const rows=response.data;
    const products= rows.map((row)=>({ //Selecciona todos los alumnos de la tabla alumnos
        id:row[0],
        name:row[1],
        price:row[2],
        image:row[3],
        stock:row[4], 
        description:row[5],
        category_id:row[6],
    }));
    console.log(products)
};
read();*/

//GET THE PRODUCTS
const getProducts= async(req,res)=>{
    const selection=await pool.query('SELECT *FROM Products_Table');
    res.status(200).json((selection.rows));
}
//TRY TO UPDATE THE STOCK
const UpdateStock= async(req,res)=>{
    const {stockfinal,productId}=await pool.query(`UPDATE Products_Table SET stock=stock-${stockfinal} WHERE id_pro=${productId} `); //Actualiza el stock
    console.log(stockfinal);
    console.log(productId);
}
//SELECT All CATEGORIES
const getCatego= async(req,res)=>{
    const selection= await pool.query('SELECT *FROM Products_Cat');
    res.status(200).json((selection.rows));
}
//GET TIME
const time= async(req,res)=>{
    const timesel=await pool.query(`INSERT INTO Ord_Table (id_ord,customer_id,total,created_at) Values($1,$2,$3,to_timestamp(${Date.now()}/1000.00))`,[id,customer,total]);
}


module.exports={
    UpdateStock,
    getProducts,
    getCatego,
    time
}