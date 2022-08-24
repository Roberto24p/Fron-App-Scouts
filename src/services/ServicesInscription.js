const ServicesInscription = {
    store: async inscription => {
        const token = localStorage.getItem('token')

        const jsonInscription = {
            description: inscription.description,
            date_start: inscription.dateStart,
            date_end: inscription.dateEnd
        }
        const response = await fetch('http://127.0.0.1:8000/api/period',
            {
                method: 'POST',
                body: new URLSearchParams(jsonInscription),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        const data = await response.json()
        return data
    },
    get: async () => {

        const token = localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:8000/api/period', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    put: async (id, inscription) => {
        console.log(inscription)
        const token = localStorage.getItem('token')

        const jsonInscription = {
            description: inscription.description,
            date_start: inscription.dateStart,
            date_end: inscription.dateEnd
        }
        const response = await fetch(`http://127.0.0.1:8000/api/period/${id}`,
            {
                method: 'PUT',
                body: new URLSearchParams(jsonInscription),
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            })
        const data = await response.json()
        return data
    },
    registerInscription: async (inscription) => {
        
        const token = localStorage.getItem('token')
        try {
            const response = await fetch('http://127.0.0.1:8000/api/inscription/register', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    group_id: inscription.group,
                    imagePermission: inscription.imagePermission,
                    imagePhoto: inscription.imagePhoto,
                    imagePay: inscription.imagePay
                }),
                method: 'POST'
            })
            const data = await response.json()
            return data
        }catch(e){
            console.log(e)
            return e
        }

        
    },

    getStatusInscription: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:8000/api/inscription/group', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },

    getAllInscriptions: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:8000/api/inscription', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },

    putInscription: async (inscription) => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://127.0.0.1:8000/api/updateInscription', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(inscription)
        })
        const data = await response.json()
        return data
    }
}

export default ServicesInscription