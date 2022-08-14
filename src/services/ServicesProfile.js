const ServicesProfile = {
    getProfile: async () => {
        const token = localStorage.getItem('token')

        const response = await fetch('http://127.0.0.1:8000/api/profile', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    },
    getInscriptionInfo: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:8000/api/inscription/scout', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    }
}

export default ServicesProfile