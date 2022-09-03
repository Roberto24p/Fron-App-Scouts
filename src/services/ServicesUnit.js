const ServicesUnit = {
    getUnitByGroup: async (idGroup) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/unit/group/${idGroup}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    getUnits: async () => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${process.env.BASE_API}/unit`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    create: async unit => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/unit`,
            {
                method: 'POST',
                body: JSON.stringify(unit),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
        const data = await response.json()
        return data
    },
    update: async unit => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/unit/${unit.id}`, {
            method: 'PUT',
            body: JSON.stringify(unit),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    getByScout: async scout_id => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/unit/scout/${scout_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    delete: async unit_id => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/unit/${unit_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    getUnitsDirecting: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/unit/directing`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    activate: async unitId => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/unit/activate/${unitId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    }
}

export default ServicesUnit
