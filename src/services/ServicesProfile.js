const ServicesProfile = {
    getProfile: async () => {
        const token = localStorage.getItem('token')

        const response = await fetch(`${process.env.BASE_API}/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    },
    getInscriptionInfo: async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${process.env.BASE_API}/inscription/scout`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
    },
    updateProfile: async (profile) => {
        try{
            const token = localStorage.getItem('token')
            const response = await fetch(`${process.env.BASE_API}/profile/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(profile),
                method: 'POST' 
            })
            const data = await response.json()
            return data
    
        }catch(e){
            console.log(e)
        }
        
    }
}

export default ServicesProfile