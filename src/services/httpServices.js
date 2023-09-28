const httpservices =  {
    login:(data) =>{
       return fetch("http://localhost:3333/login",
        {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                /* "Authorization": localStorage.getItem('token') */
            },
            body: JSON.stringify(data)

        })
    },
    createUser:()=>{
        
    },
    getShoppingCard: ()=>{
        return fetch("http://localhost:3333/api/shoppingCard",
        {
            method: "GET",
            headers: {
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem('token')
            },
        })
    },
    deleteItemCard: (itemId) =>{
        return fetch(`http://localhost:3333/api/shoppingCard/${itemId}`,{
            method: "DELETE",
            headers:{
                "Content-Type":"application/json",
                "Authorization": localStorage.getItem('token')
            }
        })
    }
}
export default httpservices