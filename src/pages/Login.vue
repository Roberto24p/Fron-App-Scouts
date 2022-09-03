<template>
    <div class="row">
        <div class="col-lg-7 col-md-7 col-md-7">
            <q-img height="649px" src="https://c1.wallpaperflare.com/preview/688/239/658/boy-scout-scouting-asia.jpg">
            </q-img>
        </div>
        <div class="col-lg-5 col-md-5 col-xs-12 q-pa-md">
            <q-form>
                <div class="text-h5 text-center q-pt-xl q-mt-xl">Login</div>
                <div class="q-pa-sm col-sm-12">
                    <q-input filled v-model="loginForm.username" label="Usuario" hint="" lazy-rules />
                    <q-input filled v-model="loginForm.password" label="Contraseña" hint="" lazy-rules type="password" />
                </div>
                <div class="q-pa-sm">
                    <a  class="float-right" style="text-decoration: none;" @click="redirect">¡Registrate!</a>

                </div>
                <q-btn label="Login" style="width: 100%;" type="submit" color="primary" @click="login" />
        {{ response }}
            </q-form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUsersStore } from '../store/user-store'

const store = useUsersStore()
const router = useRouter()
const loginForm = reactive({
    username: '',
    password: ''
})
const response = ref(null)
const login =  async () => {
    if(await store.access(loginForm))
         router.push('/profile')
    else
        alert('Error')
}
const redirect = () => {
    router.push('/register')
}
// const login = async function (e) {
//     e.preventDefault()
//     const response = await ServicesAuth.auth(loginForm)
//     console.log(response)
//     if (response.success && response.token != null) {
//         localStorage.setItem('token', response.token.token)
//         store.$patch({
//             user: {
//                 name: response.user.name,
//                 email: response.user.email
//             }
//         })
//         router.push('/')
//     } else {
//         alert('Error')
//     }
//     response.value = response
//     console.log(response)
// }
</script>