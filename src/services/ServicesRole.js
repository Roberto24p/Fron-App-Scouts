const ServicesRole = {
    all: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://192.168.100.39:8000/api/role', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    }
}

export default ServicesRole