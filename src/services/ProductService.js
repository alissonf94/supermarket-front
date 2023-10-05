function findAllProducts(){
    return fetch("http://localhost:3333/api/products",{
        method: "GET",
        headers: {
            "Content-Type":"application/json",
           
        },
        
    })
}

function createProduct(productName, productPrice, descriptionProduct, typeProduct, validityProduct, quantityProduct){
    productPrice = parseInt(productPrice)
    quantityProduct = parseInt(quantityProduct)

    return fetch("http://localhost:3333/api/products", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem("token")
        },
        body: JSON.stringify({
            "nameProduct": productName,
            "typeProduct": typeProduct,
            "price": productPrice,
            "description": descriptionProduct,
            "validity": validityProduct,
            "quantityProduct": quantityProduct
        })
    })
}

function deleteProduct(productId){
    return fetch(`http://localhost:3333/api/product/${productId}`,{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem("token")
        },
    })
}

module.exports = {findAllProducts, createProduct, deleteProduct}