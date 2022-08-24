const ServicesAdvancePlan = {
    get: async () => {
        const response = await fetch('http://192.168.100.39:8000/api/advancePlan')
        const data = await response.json()
        return data
    },
    advancePlanDetails: async (id) => {
        const response = await fetch(`http://192.168.100.39:8000/api/advancePlan/${id}`)
        const data = await response.json()
        return data
    },
    put: async (data) => {
        console.log(data)
        const response = await fetch(`http://192.168.100.39:8000/api/advancePlanUpdate/`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        const respJson = await response.json()
        return respJson
    },
    getChecks: async scoutId => {
        const response = await fetch(`http://192.168.100.39:8000/api/advancePlanChecks/${scoutId}`)
        const data = await response.json()
        return data
    }
}

export default ServicesAdvancePlan