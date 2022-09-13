const ServicesAuth = {
    auth: async (loginData) => {
        const loginJson = {
            email: loginData.username,
            password: loginData.password
        }
        const response = await fetch(`${process.env.BASE_API}/login`, {
            method: 'POST',
            body: new URLSearchParams(loginJson),
        })
        const data = await response.json()
        return data
    },
    signOut: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/signOut`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },

        })
    },
    register: async (userData) => {
        const response = await fetch(`${process.env.BASE_API}/singIn`, {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        const data = await response.json()
        return data
    },
    validateEmail: async (email) => {
        const response = await fetch(`${process.env.BASE_API}/emailvalidate/${email}`)
        const data = await response.json()
        return data
    },
    validateCode: async (code) => {
        const response = await fetch(`${process.env.BASE_API}/codevalidate/${code}`)
        const data = await response.json()
        return data
    },
    changePassword: async (passwords) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${process.env.BASE_API}/changepassword/`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(passwords)
        })
        const data = await response.json()
        return data
    }
}

export default ServicesAuth