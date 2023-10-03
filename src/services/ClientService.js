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

function createClient (data){
    return fetch("http://localhost:3333/api/clients",{
        method: "POST",
        
        headers: {
            "Content-Type" : "Application/json",
            "Authorization" : localStorage.getItem("token")
        },

        body: JSON.stringify(data)
    })
}

module.exports = {
    updateClient,
    createClient
}