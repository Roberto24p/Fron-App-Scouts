const ServicesScout = {
    getScouts: async () => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${process.env.BASE_API}/scout`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    store: async scout => {
        const scoutJson = {
            last_name: scout.lastName,
            name: scout.name,
            group_id: scout.groupId,
            unit_id: scout.unitId,
            gender: scout.gender,
            type_blood: scout.typeBlood,
            born_date: scout.bornDate,
            phone: scout.phone,
            email: scout.email,
            image: scout.image,
            nacionality: scout.nacionality,
            dni: scout.dni,
            user_id: ''
        }
        const response = await fetch(`${process.env.BASE_API}/scout`,
            {
                method: 'POST',
                body: new URLSearchParams(scoutJson),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        const data = await response.json()
        return data
    },
    put: async (id, scout) => {
        const scoutJson = {
            last_name: scout.lastName,
            name: scout.name,
            group_id: scout.groupId,
            unit_id: scout.unitId,
            gender: scout.gender,
            type_blood: scout.typeBlood,
            born_date: scout.bornDate,
            phone: scout.phone,
            email: scout.email,
            image: scout.image,
            nacionality: scout.nacionality,
            dni: scout.dni,
        }

        const response = await fetch(`${process.env.BASE_API}/scout/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(scoutJson)
        })
        const data = await response.json()
        return data
    },
    getByGroup: async groupId => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${process.env.BASE_API}/scout/group/${groupId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await response.json()
        return data
    },
    validateHasTeam: async scout => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/scout/validate/${scout}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await response.json()
        return data
    },
    getByUnit: async unit => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/scout/unit/${unit}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await response.json()
        return data
    },
    getScoutData: async scout_id => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/scout/info/${scout_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await response.json()
        return data
    },
    getByDirecting: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/scoutsbydirectings`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await response.json()
        return data
    },
    getTeamUnit: async (scoutId) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/scout/team/unit/${scoutId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await response.json()
        console.log(data)
        return data
    }
}

export default ServicesScout