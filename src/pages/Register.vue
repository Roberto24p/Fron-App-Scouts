<template>
    <div class="row">
        <div class="col-7">
            <q-img height="649px" src="https://c1.wallpaperflare.com/preview/688/239/658/boy-scout-scouting-asia.jpg">
            </q-img>
        </div>
        <div class="col-lg-5 col-md-5 col-xs-12 q-pa-md">
            <div class="text-h5 text-center ">Registrate</div>
            <div class="q-pa-sm col-sm-12">
                <q-form @submit.prevent="validateCode">
                    <q-input class="q-ma-xs" filled v-model="scout.name" label="Nombre"
                        :rules="[val=>val&&val.length>0 || 'Este campo no puede estar vacío']" />
                    <q-input class="q-ma-xs" filled v-model="scout.lastName" label="Apellido"
                        :rules="[val=>val&&val.length>0 || 'Este campo no puede estar vacío']" />
                    <q-input class="q-ma-xs" filled v-model="scout.dni" label="Cedula"
                        :rules="[val=>val&&val.length==10 || 'La cédula tiene 10 digitos']" />
                    <q-input class="q-ma-xs" filled v-model="scout.email" label="Email" type="email"
                        :rules="[val=>val&&val.length>0 || 'Este campo no puede estar vacío']" />

                    <q-select class="q-ma-xs" emit-value map-options v-model="scout.gender" :options="typeGender"
                        option-label="name" option-value="id" label="Genero"
                        :rules="[val=>val|| 'Debes de seleccionar']">
                    </q-select>
                    <q-input class="q-ma-xs" filled label="Fecha de Nacimiento" v-model="scout.bornDate" mask="date"
                        :rules="['date']">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy>
                                    <q-date v-model="scout.bornDate"></q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
                    <div class="q-pa-sm ">
                        <a class="float-left" style="text-decoration: none; color: green; cursor:pointer" @click="redirectLogin"
                            >Inicia Sesión</a>
                    </div>
                    <q-btn label="Registrate" style="width: 100%;" type="submit" color="primary"
                        @click="register" />
                </q-form>
            </div>
        </div>
    </div>
    <q-dialog v-model="persistent" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-teal text-white" style="width: 300px">
            <q-card-section>
                <div class="text-h6">Ingresa el codigo de validación</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-input class="q-ma-xs" filled v-model="codeValidate" label="Codigo de validación"></q-input>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="validar" @click="validateCode" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import ServicesAuth from 'src/services/ServicesAuth';
import { useRouter } from "vue-router"
import { useQuasar } from 'quasar'
const $q = useQuasar()
const route = useRouter()
const scout = reactive({
    name: '',
    lastName: '',
    dni: '',
    bornDate: '',
    typeBlood: '',
    phone: '',
    email: '',
    image: '',
    nacionality: '',
    gender: '',
})
const codeValidate = ref('')
const persistent = ref(false)
const typeGender = [
    {
        name: 'Hombre',
        id: 1,
    },
    {
        name: 'Mujer',
        id: 2
    }
]

const redirectLogin = () => {
    route.push('/login')
}
const validateCode = () => { //PRODUCCION
    if (codeValidate.value != '') {
        ServicesAuth.validateCode(codeValidate.value)
            .then(response => {
                if (response.success == true) {
                    ServicesAuth.register(scout)
                        .then(res => {
                            if (res.success) {
                                $q.dialog({
                                    dark: true,
                                    title: 'Registro completado con éxtio',
                                    message: 'Redirigiendo...'
                                })
                                setTimeout(() => {
                                    route.push('/login')

                                }, 2000)

                            }
                            else
                                persistent.value = false
                        })
                }
            })
    }
}

const pruebasRegister = () => { // DESARROLLO
    ServicesAuth.register(scout)
        .then(res => {
            if (res.success) {
                $q.dialog({
                    dark: true,
                    title: 'Registro completado con éxtio',
                    message: 'Redirigiendo...'
                })
                setTimeout(() => {
                    route.push('/login')

                }, 2000)
            }
            else {
                persistent.value = false
            }
        })
}
const register = () => {
    $q.loading.show()

    ServicesAuth.validateEmail(scout.email)
        .then(response => {
            $q.loading.hide()

            if (true) {
                persistent.value = true
            }
            console.log(response)
        })
    // ServicesAuth.register(scout)
}
</script>