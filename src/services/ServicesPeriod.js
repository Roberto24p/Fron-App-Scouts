const ServicesPeriod = {
    getPeriod: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/nowperiod`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },

        })
        const data = await response.json()
        console.log(response)
        return data
    },
    activate: async (perioId) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/period/activate/${perioId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },

        })
        const data = await response.json()
        console.log(response)
        return data
    },
    all: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/period`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    }
}

export default ServicesPeriod