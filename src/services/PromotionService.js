function getPromotions(){
    return fetch("http://localhost:3333/api/promotions",
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem('token')
        }
    })
}
function deletePromotion (id){
    return fetch(`http://localhost:3333/api/promotion/${id}`,
    {
        method: "DELETE",
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem('token')
        }
    })
}

function createPromotion(nameProduct, price){
    return fetch("http://localhost:3333/api/promotions",
    {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify({
            "nameProduct": nameProduct, 
            "valueProduct": price
        })
    })
}
module.exports = {getPromotions, deletePromotion, createPromotion}