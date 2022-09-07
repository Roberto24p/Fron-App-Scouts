import { defineStore } from "pinia"
import { ref } from 'vue'

export const useUsersStore = defineStore('userStore', () => {
    const token = ref("")
    const name = ref("")
    const email = ref("")
    const role = ref("")
    const avatar = ref("")
    const nameRole = ref("")
    const access = async (loginData) => {

        const loginJson = {
            email: loginData.username,
            password: loginData.password
        }
        const response = await fetch(`${process.env.BASE_API}/login`, {
            method: 'POST',
            body: JSON.stringify(loginJson),
            headers: {
                'Content-type': 'application/json'
            }
        })
        const data = await response.json()
        if (data.success) {
            token.value = data.token.token
            localStorage.setItem('token', token.value)
            name.value = data.user.name
            email.value = data.user.email
            role.value = data.role
            nameRole.value = data.nameRole
        }
        return data



    }

    const validateToken = async () => {
        try {
            const tokenAcceso = localStorage.getItem('token')

            const response = await fetch(`${process.env.BASE_API}/validate`, {
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
            nameRole.value = data.user.nameRole

            return true
        } catch (error) {
            console.log(error)
        }
    }
    const reset = () => {
        token.value = ""
        name.value = ""
        email.value = ""
        role.value = ""
        avatar.value = "",
        nameRole.value = ""
    }


    // const closeSession = () => {
    //     try {

    //     } catch (error) {

    //     }
    // }

    return {
        nameRole,
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