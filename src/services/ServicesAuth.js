const ServicesAuth = {
    auth: async (loginData) =>{
        const loginJson = {
            email: loginData.username,
            password: loginData.password
        }
        const response = await fetch('http://192.168.100.39:8000/api/login', {
            method: 'POST',
            body: new URLSearchParams(loginJson),
        })
        const data = await response.json()
        return data
    },
    signOut: async()=> {
        const token = localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:8000/api/signOut', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },

        })
    },
    register: async (userData) => {
        const response = await fetch('http://192.168.100.39:8000/api/singIn',{
            method: 'POST',
            body:JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        const data = await response.json()
        return data
    }
}

export default ServicesAuth