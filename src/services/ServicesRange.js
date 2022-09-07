const ServicesRange = {
    showAll:async ()=>{
        const response = await fetch(`${process.env.BASE_API}/range`, {

        }) ;
        const data = await response.json()
        return data
    },
    post: async (range) =>{
        const response = await fetch(`${process.env.BASE_API}/range`, {
            method: 'POST',
            body: JSON.stringify(range),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await response.json()
        return data
    }
}
export default ServicesRange