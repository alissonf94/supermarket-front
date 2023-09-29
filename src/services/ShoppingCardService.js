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

module.exports = {
    addItem
}