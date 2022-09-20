<template>
    <div class="row ">
        <div class="row" style="width: 100%; position: float; height: 100%; margin: 10px; border-color: #DFF6FE; border-style: solid;">
            <div class="col-lg-7 col-md-7 col-md-7">
                <q-img height="100%"
                    src="https://c1.wallpaperflare.com/preview/688/239/658/boy-scout-scouting-asia.jpg">
                </q-img>
            </div>
            <div class="col-lg-5 col-md-5 col-xs-12 q-pa-md">
                <q-form>
                    <div class="text-center">
                        <img src="../assets/logo.png" style="height: 300px; width: 300px" alt="">
                    </div>
                    <div class="q-pa-sm col-sm-12 q-mb-md">
                        <q-input filled v-model="loginForm.username" label="Correo" hint="" lazy-rules />
                        <q-input filled v-model="loginForm.password" label="Contraseña" hint="" lazy-rules
                            type="password" />
                        <p style="position:absolute; color:red" v-show="messageError">{{ messageError }}</p>
                    </div>
                    <div class="q-pa-sm ">
                        <a class="float-left" style="text-decoration: none; color: green; cursor:pointer"
                            @click="redirectRecoverPassword">¿Perdiste tu contraseña?</a>
                        <a class="float-right" style="text-decoration: none; color: green; cursor:pointer"
                            @click="redirect">¡Registrate!</a>
                    </div>
                    <q-btn label="Login" class="q-mt-md" style="width: 100%;" type="submit" color="primary"
                        @click="login" />
                </q-form>
            </div>
        </div>
    </div>
    <q-dialog v-model="dialogSuccess">
        <q-card style="width: 300px">
            <q-card-section>
                <div class="text-h6" style="color:green">Autentitación Correcta</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                Redirigiendo...
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useUsersStore } from '../store/user-store'
import { onMounted } from "vue";
const store = useUsersStore()
const router = useRouter()
const loginForm = reactive({
    username: '',
    password: ''
})
const response = ref(null)
const messageError = ref('')
const dialogSuccess = ref(false)
const login = async () => {
    response.value = await store.access(loginForm)
    console.log(response.value)
    if (response.value.success) {
        setTimeout(() => {
            router.go('/profile')
        }, 1000)
        dialogSuccess.value = true
    } else {
        messageError.value = response.value.error
    }
}

const redirect = () => {
    router.push('/register')
}
const redirectRecoverPassword = () => {
    router.push('/recoverpassword')
}

</script>