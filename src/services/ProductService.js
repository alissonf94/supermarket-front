function findAllProducts(){
    return fetch("http://localhost:3333/api/products",{
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem('token')
        },
        
    })
}

module.exports = {findAllProducts}