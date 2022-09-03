const ServicesTeam = {
    getTeams: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/team`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    },
    post: async (team) => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/team`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(team)
        })
        const data = await response.json()
        console.log(response)
        return data
    },
    delete: async id => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/team/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        })
        const data = await response.json()
        console.log(response)
        return data
    },
    update: async team => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/team/${team.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(team)
        })
        const data = await response.json()
        console.log(response)
        return data
    },
    teamsByUnit: async unit => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/team/unit/${unit}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'

            },
        })
        const data = await response.json()
        return data
    },
    addTeamScout: async teamScout => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/team/scout`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(teamScout)
        })
        const data = await response.json()
        return data
    },
    teamsDirecting: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/teams/directing`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    }
}

export default ServicesTeam