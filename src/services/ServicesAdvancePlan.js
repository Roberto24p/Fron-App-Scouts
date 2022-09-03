const ServicesAdvancePlan = {
    get: async () => {
        const response = await fetch(`${process.env.BASE_API}/advancePlan`)
        const data = await response.json()
        return data
    },
    advancePlanItems: async (id) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${process.env.BASE_API}/advancePlan/scout/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    },
    advancePlanDetails: async (id) => {
        const response = await fetch(`${process.env.BASE_API}/advancePlan/scout/${id}`)
        const data = await response.json()
        return data
    },
    put: async (data) => {
        console.log(data)
        const response = await fetch(`${process.env.BASE_API}/advancePlanUpdate/`, {
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
        const response = await fetch(`${process.env.BASE_API}/advancePlanChecks/${scoutId}`)
        const data = await response.json()
        return data
    },
    getPercent: async scoutId => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${process.env.BASE_API}/advanceplan/percent/${scoutId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    },
    getRecognitionsComplete: async (scoutId) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/advanceplan/countrecognitions/${scoutId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    },

}

export default ServicesAdvancePlan