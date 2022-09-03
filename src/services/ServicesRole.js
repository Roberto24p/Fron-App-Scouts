const ServicesRole = {
    all: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/role`, {
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