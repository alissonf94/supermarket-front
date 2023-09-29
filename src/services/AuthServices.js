function loginService(data){
    return fetch("http://localhost:3333/login",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                
            },
            body: JSON.stringify(data)
 
        })
}

module.exports = {
    loginService
}