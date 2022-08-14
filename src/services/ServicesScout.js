const ServicesScout = {
    getScouts: async () => {
        const token = localStorage.getItem('token')

        const response = await fetch('http://127.0.0.1:8000/api/scout',  {
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
        const response = await fetch('http://127.0.0.1:8000/api/scout',
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

        const response = await fetch(`http://127.0.0.1:8000/api/scout/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(scoutJson)
        })
        const data = await response.json()
        return data
    }
}

export default ServicesScout