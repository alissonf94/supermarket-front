function updateClient(data){
    return fetch("http://localhost:3333/api/client", {
        method: "PUT",
        
        headers:{
            "Content-Type": "Application/json",
            "Authorization": localStorage.getItem("token")
        },

        body: JSON.stringify(data)
    })
}

module.exports = {
    updateClient
}