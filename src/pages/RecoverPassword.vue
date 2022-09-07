<template>
    <div class="row ">
        <div class="col-lg-7 col-md-7 col-md-7">
            <q-img height="649px" src="https://c1.wallpaperflare.com/preview/688/239/658/boy-scout-scouting-asia.jpg">
            </q-img>
        </div>

        <div class="col-lg-5 col-md-5 col-xs-12 q-pa-md">
            <q-form v-show="!codeValidate">
                <div class="text-center">
                    <img src="../assets/logo.png" style="height: 300px; width: 300px" alt="">
                </div>
                <div class="col-8">
                    Recupera tu contraseña
                </div>
                <div class="q-pa-sm col-sm-12 q-mb-md">
                    <q-input filled v-model="loginForm.username" label="Correo" hint="" lazy-rules />
                    <q-input filled v-model="code" v-show="validateButton" label="Validar codigo" hint="" lazy-rules />
                </div>
                <q-btn label="Enviar" class="q-mt-md" v-show="!validateButton" style="width: 100%;" type="submit"
                    color="primary" @click="sendCodeToMail" />
                <q-btn label="Validar codigo" v-show="validateButton" class="q-mt-md" style="width: 100%;" type="submit"
                    color="primary" @click="validateCode" />
            </q-form>
            <q-form v-show="codeValidate">
                <div class="text-center">
                    <img src="../assets/logo.png" style="height: 300px; width: 300px" alt="">
                </div>
                <div class="col-8">
                    Ingresa tu nueva contraseña
                </div>
                <div class="q-pa-sm col-sm-12 q-mb-md">
                    <q-input filled v-model="newPassword" label="password" hint="" lazy-rules type="password"
                        />
                    <q-input filled v-model="confirmNewPassword" label="password" hint="" lazy-rules type="password"
                        :rules="[val=>val==newPassword|| 'No son iguales las contraseñas']" />
                </div>
                <q-btn label="Actualizar " class="q-mt-md" style="width: 100%;" type="submit" color="primary"
                    @click="updatePassword" />
            </q-form>
        </div>
    </div>
    <q-dialog v-model="dialogSuccess">
        <q-card style="width: 300px">
            <q-card-section>
                <div class="text-h6" style="color:green">Actualización correcta</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                Redirigiendo...
            </q-card-section>
        </q-card>
    </q-dialog>

    <q-dialog v-model="dialogVerifyMail">
        <q-card style="width: 300px">
            <q-card-section>
                <div class="text-h6" style="color:green">Verifica tu correo</div>
            </q-card-section>
            <q-card-section class="q-pt-none">
                Hemos enviado un código para validar tu correo electrónico
            </q-card-section>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { useQuasar } from 'quasar'
const $q = useQuasar()

const router = useRouter()
const loginForm = reactive({
    username: '',
    codValidate: ''
})
const code = ref('')
const dialogSuccess = ref(false)
const codeValidate = ref(false)
const dialogVerifyMail = ref(false)
const newPassword = ref('')
const confirmNewPassword = ref('')
const validateButton = ref(false)
const sendCodeToMail = async () => {
    $q.loading.show()
    const response = await fetch(`${process.env.BASE_API}/recover/password/validateemail/${loginForm.username}`)
    const data = await response.json()
    if (data.success) {
        dialogVerifyMail.value = true
        validateButton.value = true
        console.log(validateButton.value)
    } else {
        $q.notify({
            type: 'negative',
            message: data.message,
            timeout: 2000
        })
    }
    $q.loading.hide()

}

const validateCode = async () => {
    $q.loading.show()
    if (code.value == '') {
        $q.notify({
            type: 'negative',
            message: 'Ingrese un codigo',
            timeout: 2000
        })
        $q.loading.hide()

        return 0
    }
    const response = await fetch(`${process.env.BASE_API}/recover/password/validateCode/${code.value}`)
    const data = await response.json()
    if (data.success) {
        codeValidate.value = true
        $q.notify({
            type: 'positive',
            message: 'Codigo correcto',
            timeout: 2000
        })
    } else {
        $q.notify({
            type: 'negative',
            message: 'Codigo incorrecto',
            timeout: 2000
        })
    }
    $q.loading.hide()

}

const updatePassword = async () => {
    if (newPassword.value == confirmNewPassword.value && (newPassword.value!='' && confirmNewPassword.value !='')) {
        const response = await fetch(`${process.env.BASE_API}/recover/password/recover/`, {
            body: JSON.stringify({
                code: code.value,
                password: newPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })
        const data = await response.json()
        if (data.success) {
            setTimeout(() => {
                router.push('/login')
            }, 2000)
            dialogSuccess.value = true

        }
    }else{
        $q.notify({
            type: 'negative',
            message: 'Las contraseñas deben de coincidir',
            timeout: 2000
        })
    }

}
</script>