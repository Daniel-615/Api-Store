const {Router}= require('express');
const router= Router();
const { getProducts,UpdateStock,getCatego,time}=require('./controllers')
router.get('/api/productos',getProducts); //Get data products
router.get('/api/cat',getCatego);
router.put('/api/update',UpdateStock);
router.post('api/post',time)
module.exports=router;