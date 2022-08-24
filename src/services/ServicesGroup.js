const ServicesGroup = {
    getGroups: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch('http://192.168.100.39:8000/api/group', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },

        })
        const data = await response.json()
        console.log(data)

        return data
    },
    post: async (group) => {
        const token = localStorage.getItem('token')

        const response = await fetch('http://192.168.100.39:8000/api/group', {
            method: 'POST',
            body: JSON.stringify(group),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    put: async (id, group) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://192.168.100.39:8000/api/group/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(group),
        })
        const data = await response.json()
        return data
    },
    delete: async (id) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`http://192.168.100.39:8000/api/group/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = response.json()
        return data
    },
    validate: async (codigo) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`http://192.168.100.39:8000/api/group/validate/${codigo}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },

        }
        )
        const data = response.json()
        return data
    },

}

export default ServicesGroup