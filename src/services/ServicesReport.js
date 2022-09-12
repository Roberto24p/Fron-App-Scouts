import axios from "axios"
const ServicesReport = {
    reporteAdvancePlan: async () => {
        const token = localStorage.getItem('token')

        const response = await axios.get(`${process.env.BASE_API}/pdf/advancePlan/scout/`, {
            responseType: "blob",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
        return url
    },
    reportDirectingsByGroups: async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${process.env.BASE_API}/pdf/directings/registers`, {
            responseType: "blob",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
        return url
    },
    reportScoutsInscribedByUnit: async () => {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${process.env.BASE_API}/pdf/inscriptions/unit/`, {
            responseType: "blob",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))
        window.open(url, '_blank')
        return url
    }
}

export default ServicesReport