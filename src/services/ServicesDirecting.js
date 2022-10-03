const ServicesDirecting = {
    getDirectings: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/directing`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    create: async (user) => {
        const directingJson = {
            last_name: user.lastName,
            name: user.name,
            group_id: user.groupId,
            unit_id: user.unitId,
            gender: user.gender,
            type_blood: user.typeBlood,
            born_date: user.bornDate,
            phone: user.phone,
            email: user.email,
            image: user.image,
            nacionality: user.nacionality,
            dni: user.dni,
            user_id: ''
        }
        const response = await fetch(`${process.env.BASE_API}/directing`,
            {
                method: 'POST',
                body: new URLSearchParams(directingJson),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            })
        const data = await response.json()
        return data
    },
    update: async (id, directing) => {
        const response = await fetch(`${process.env.BASE_API}/directing/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(directing),
        })
        const data = response.json()
        return data
    },
    getProfileDirecting: async () => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${process.env.BASE_API}/directingprofile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    deleteDirecting: async (directingId) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/directing/${directingId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'DELETE'
        })
        const data = await response.json()
        return data
    },
    activateDirecting: async (directingId) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/directing/activate/${directingId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        const data = await response.json()
        return data
    },
    getDirectingsByUnit: async (unitId) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/directings/unit/${unitId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        const data = await response.json()
        return data
    },
    setUnitDirecting: async (unitId, directingId) => {
        const bodyData = {
            "unitId": unitId,
            "directingId": directingId
        }
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/directing/unit`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData),
            method: 'POST'
        })
        const data = await response.json()
        return data
    },
    showDirectingsByGroup: async (groupId) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/directings/group/${groupId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        const data = await response.json()
        return data
    },
}

export default ServicesDirecting