import { defineStore } from "pinia"
import { ref, reactive } from 'vue'

export const useUsersStore = defineStore('userStore', () => {
    const token = ref("")
    const name = ref("")
    const email = ref("")
    const role = ref("")
    const avatar = ref("")
    const access = async (loginData) => {
        try {
            const loginJson = {
                email: loginData.username,
                password: loginData.password
            }
            const response = await fetch('http://192.168.100.39:8000/api/login', {
                method: 'POST',
                body: JSON.stringify(loginJson),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                }
            })
            const data = await response.json()
            token.value = data.token.token
            localStorage.setItem('token', token.value)
            name.value = data.user.name
            email.value = data.user.email
            role.value = data.role
            console.log(name.value, email.value, role.value)
            return true
            // return data
        } catch (error) {
            console.log(error)
        }
    }

    const validateToken = async () => {
        try {
            const tokenAcceso = localStorage.getItem('token')
            const response = await fetch('http://192.168.100.39:8000/api/validate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${tokenAcceso}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: tokenAcceso
                })
            })
            const data = await response.json()
            token.value = data.token
            console.log(tokenAcceso)
            name.value = data.user.name
            email.value = data.user.email
            role.value = data.user.role
            avatar.value = data.user.avatar

            return true
        } catch (error) {
            console.log(error)
        }
    }
    const reset = ()=>{
        token.value = ""
        name.value = ""
        email.value = ""
        role.value = ""
        avatar.value = ""
    }


    // const closeSession = () => {
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }

    return {
        avatar,
        reset,
        validateToken,
        email,
        name,
        access,
        token,
        role
    }
})