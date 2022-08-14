const ServicesUnit = {
    getUnitByGroup: async (idGroup) => {
        const response = await fetch(`http://127.0.0.1:8000/api/unit/group/${idGroup}`)
        const data = await response.json()
        return data
    },
    getUnits: async () => {
        const token = localStorage.getItem('token')

        const response = await fetch(`http://127.0.0.1:8000/api/unit`,   {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    create: async unit => {
        const response = await fetch('http://127.0.0.1:8000/api/unit',
            {
                method: 'POST',
                body: new URLSearchParams(unit),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        const data = await response.json()
        return data
    }
}

export default ServicesUnit
