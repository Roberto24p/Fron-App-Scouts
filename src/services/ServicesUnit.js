const ServicesUnit = {
    getUnitByGroup: async (idGroup) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://192.168.100.39:8000/api/unit/group/${idGroup}`, {
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

        const response = await fetch(`http://192.168.100.39:8000/api/unit`, {
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
        const response = await fetch('http://192.168.100.39:8000/api/unit',
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
        const response = await fetch(`http://192.168.100.39:8000/api/unit/${unit.id}`, {
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
        const response = await fetch(`http://192.168.100.39:8000/api/unit/scout/${scout_id}`, {
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
        const response = await fetch(`http://192.168.100.39:8000/api/unit/${unit_id}`, {
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
        const response = await fetch(`http://192.168.100.39:8000/api/unit/directing`, {
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
        const response = await fetch(`http://192.168.100.39:8000/api/unit/activate/${unitId}`, {
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
