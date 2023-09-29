function addItem(id, quantity){
    return fetch(`http://localhost:3333/api/shoppingCard/${id}`,
    { 
        method: "PUT",
        headers:{ 
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem('token')
        },
        body: JSON.stringify({
            "quantity": quantity
          })
    })
}

function deleteItem(itemId){
    return fetch(`http://localhost:3333/api/shoppingCard/${itemId}`,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem('token')
            }
    })
}

function getShoppingCard (){
    return fetch("http://localhost:3333/api/shoppingCard",
    {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem('token')
        },
    })
}
module.exports = {
    addItem,
    deleteItem,
    getShoppingCard
}