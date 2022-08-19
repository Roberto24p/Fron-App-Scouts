const ServicesPeriod = {
    getPeriod: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://192.168.100.39:8000/api/nowperiod', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },

        })
        const data = await response.json()
        console.log(response)
        return data
    }
}

export default ServicesPeriod