const ServicesUser = {
    all: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    create: async user => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            method: 'POST'
        })
        const data = await response.json()
        return data
    },
    update: async user => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/user/${user.id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user),
            method: 'PUT'
        })
        const data = await response.json()
        return data
    }
}

export default ServicesUser