let productList=[];
let total=0;
let carrito= [];

function add(productId, price){
    const product=productList.find(p => p.id=== productId); 
    debugger;
    product.stock--;
    console.log(productId,price);
    carrito.push(productId);
    total=total+price;
    console.log(productId,price)
    document.getElementById("checkout").innerHTML= `Pagar $${total}`
    displayProducts();
};
async function pay(){
    try {
        const productList=await(await fetch("/api/pay",{
            method: "post",
            body: JSON.stringify(carrito),
            headers:{
                "Content-type": "application/json"
            }
        })).json();
    }
    catch{
        window.alert("Sin Stock"); 
    }
    carrito=[];
    total=0;  
    await fetchProducts();
    document.getElementById("checkout").innerHTML= `Pagar $${total}`
}
//-----
function displayProducts(){
    let productsHTML='';
    productList.forEach(p => {
        let buttonHtml=`<button class="button-add" onclick="add(${p.id},${p.price})">Agregar</button>`;
        if(p.stock<=0){
            buttonHtml=`<button disabled class="button-add disabled" onclick="add(${p.id},${p.price})">Sin Stock</button>`;
        }
        productsHTML+=
        `<div class="product-container">
            <h3>${p.name}</h3>
            <img src="${p.image}"/>
            <h1>$${p.price}</h1>
           ${buttonHtml}
        </div>`
    });
    document.getElementById('page-content').innerHTML=productsHTML;
};
async function fetchProducts(){
    productList=await(await fetch("/api/products")).json();
    displayProducts();
}
window.onload= async()=>{
    await fetchProducts();
}