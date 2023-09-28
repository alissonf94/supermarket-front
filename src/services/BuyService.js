function registerBuy(){
    const result = fetch("http://localhost:3333/api/buys", {
        method: "POST",
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem('token')
        }
    })
}

function getBuysByIdClient(){
    return fetch("http://localhost:3333/api/buys", 
    {
        method: "GET",
        headers: {
            "Content-Type":"application/json",
            "Authorization": localStorage.getItem('token')
        },
    })
}

module.exports = {
    registerBuy,
    getBuysByIdClient
}