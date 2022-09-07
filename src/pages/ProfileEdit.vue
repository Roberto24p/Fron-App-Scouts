<template>
    <div class="q-pa-md">
        <div class="row q-col-gutter-md">
            <div class="col-12">
                <q-card class="my-card ">
                    <q-item>
                        <q-item-section>
                            <p>
                                Actualiza tus datos personales
                            </p>
                        </q-item-section>
                        <q-item-section>
                            <q-btn color="primary" label="Perfil" flat @click="redirect('/profile')" />
                        </q-item-section>
                    </q-item>
                </q-card>
            </div>
            <div class="col-12">
                <q-card class="my-card  q-py-lg q-px-sm">
                    <q-form @submit.prevent="update">
                        <div class="row justify-center">
                            <div class="col-5 q-my-sm q-mx-sm">
                                <q-input label="Nombre" class="q-mb-sm" v-model="profile.name" outlined
                                    :rules="[val=>val&&val.length>0 || 'Es necesaria un nombre']" />
                                <q-input label="Apellido" class="q-mb-sm" v-model="profile.lastName" outlined
                                    :rules="[val=>val&&val.length>0 || 'Es necesaria un apellido']" />
                                <q-input class="q-ma-xs" label="Fecha de Nacimiento" v-model="profile.bornDate" outlined
                                    mask="date" :rules="['date']">
                                    <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                            <q-popup-proxy>
                                                <q-date v-model="scout.bornDate"></q-date>
                                            </q-popup-proxy>
                                        </q-icon>
                                    </template>
                                </q-input>
                                <q-input class="q-mb-xs" label="Telefono" outlined v-model="profile.phone"
                                    :rules="[val=>val&&val.length==10 || 'El número de teléfono debe de tener 10 dígitos']" />
                            </div>
                            <div class="col-5 q-my-sm q-mx-sm">

                                <q-select label="Tipo de Sangre" class="q-mb-sm" v-model="profile.type_blood" outlined
                                    :options="bloodType" :rules="[val=>val&&val.length>0 || 'Elige un tipo de sangre']">
                                </q-select>
                                <q-input label="Nacionalidad" class="q-mb-sm" v-model="profile.nacionality" outlined
                                    :rules="[val=>val&&val.length>0 || 'Es necesaria la nacionalidad']" />
                                <q-select class="q-ma-xs" option-label="name" option-value="id" outlined
                                    v-model="profile.gender" label="Género" :options="typeGender" emit-value map-options
                                    :rules="[val=>val|| 'Seleccion un género']">
                                </q-select>
                                <q-input class="q-ma-xs" label="Cedula" v-model="profile.dni" outlined
                                    :rules="[val=>val&&val.length==10 || 'La cédula tiene 10 digitos']" />
                            </div>
                            <div class="col-10">
                                <q-btn label="Actualizar Datos" style="width: 100%;" type="submit" color="primary" />

                            </div>
                        </div>
                        {{ profile.gender }}
                        {{ typeGender }}
                        <q-item>
                            <!-- <q-uploader @uploaded="fileComplete" :factory="upload" style="max-width: 300px"
                                field-name="image" /> -->
                        </q-item>

                    </q-form>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
import ServicesProfile from 'src/services/ServicesProfile'
import { useRouter } from "vue-router"
import { useUsersStore } from '../store/user-store'
import { useQuasar } from 'quasar'
const $q = useQuasar()

const storeUser = useUsersStore()

const router = useRouter()
const profile = reactive({
    name: '',
    lastName: '',
    dni: '',
    bornDate: '',
    type_blood: '',
    phone: '',
    email: '',
    image: '',
    nacionality: '',
    gender: '',
})
const avatar = ref('')
const typeGender = ref([
    {
        name: 'Hombre',
        id: 1,
    },
    {
        name: 'Mujer',
        id: 2
    }
])
const bloodType = [
    '+O',
    '-O',
    '+A',
    '-A',
    '-B',
    '+B',
    '-AB',
    '+AB'
]

ServicesProfile.getProfile()
    .then(data => {
        console.log(data)
        profile.dni = data.dni
        profile.phone = data.phone
        profile.type_blood = data.type_blood
        profile.name = data.name
        profile.lastName = data.last_name
        profile.nacionality = data.nacionality
        profile.bornDate = data.born_date
        profile.gender = data.gender
        console.log(data.user.last_name)
        console.log(data)
    })
const update = () => {
    $q.loading.show()
    ServicesProfile.updateProfile(profile)
        .then(response => {
            if(response.success == 1){
                $q.notify({
                    type: 'positive',
                    message: 'Datos actualizados con éxito',
                    timeout: 2000
                })
            }else{
                $q.notify({
                    type: 'negative',
                    message: response.profile,
                    timeout: 2000
                })
            }
            $q.loading.hide()

            console.log(response)
        })
}
const redirect = (ruta) => {
    router.push(ruta)
}

const upload = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        resolve({
            url: 'http://127.0.0.1:8000/api/fileAvatar',
            method: 'POST',
            headers: [
                { name: 'Authorization', value: `Bearer ${token}` },
            ]
        })
    })
}

const fileComplete = (info) => {
    console.log(info.xhr.response)
storeUser.avatar = info.xhr.response
}


</script>

<style scoped>
p {
    font-size: 20px;
    margin-top: 10px;
    float: center;
}
</style>