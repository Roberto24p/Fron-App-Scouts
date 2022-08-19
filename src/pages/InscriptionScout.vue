<template>
    <q-dialog v-model="modalObservation">
        <q-card>
            <q-card-section>
                <div class="text-h6">Observaciones</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                {{ profile.observations }}
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <div class="q-pa-md ">
        <div class="row q-col-gutter-md">
            <div class="col-12">
                <q-card class="my-card ">
                    <q-item>
                        <q-item-section>
                            <p>
                                Tus Datos de Inscripción
                            </p>
                        </q-item-section>
                        <q-item-section>
                            <p>
                                Periodo: {{ period.start }} - {{ period.end }}
                            </p>
                        </q-item-section>
                        <q-item-section>
                            <q-btn color="primary" label="Perfil" flat @click="redirect('/profile')" />
                        </q-item-section>
                    </q-item>
                </q-card>
            </div>
            <div class="col-8">
                <q-card class="my-card  q-py-sm" v-if="inscriptionExist">



                    <q-separator />
                    <q-separator />
                    <div class="row q-pa-md">
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Estado: </strong>
                                {{ profile.status }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Nombre: </strong>
                                {{ profile.name }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Apellido: </strong>
                                {{ profile.lastName }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Cédula: </strong>
                                {{ profile.dni }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Nacimiento: </strong>

                                {{ profile.bornDate }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Tipo de Sangre: </strong>
                                {{ profile.typeBlood }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Nacionalidad: </strong>
                                {{ profile.nacionality }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <template v-if="profile.gender == 1"><strong>Género: </strong> Hombre</template>
                                <template v-else><strong>Género: </strong> Mujer</template>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <template v-if="profile.gender == 1"><strong>Género: </strong> Hombre</template>
                                <template v-else><strong>Género: </strong> Mujer</template>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Teléfono: </strong>
                                {{ profile.phone }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6 row">
                                <strong class="col-3">Grupo: </strong>
                                {{ profile.group }}
                            </div>
                        </div>
                    </div>

                </q-card>
                <q-card class="my-card  q-pa-sm" v-else>
                    <q-item>
                        <q-item-section>
                            <q-btn color="primary" label="Enviar Inscripción" flat @click="inscribir" />
                        </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-separator />
                    <div class="row q-pa-md">
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Estado: </strong>
                                {{ profile.status }}
                            </div>

                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Nombre: </strong>
                                {{ profile.name }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Apellido: </strong>
                                {{ profile.lastName }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Cédula: </strong>
                                {{ profile.dni }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Nacimiento: </strong>

                                {{ profile.bornDate }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Tipo de Sangre: </strong>
                                {{ profile.typeBlood }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Nacionalidad: </strong>
                                {{ profile.nacionality }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <template v-if="profile.gender == 1"><strong>Género: </strong> Hombre</template>
                                <template v-else><strong>Género: </strong> Mujer</template>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <template v-if="profile.gender == 1"><strong>Género: </strong> Hombre</template>
                                <template v-else><strong>Género: </strong> Mujer</template>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6">
                                <strong>Teléfono: </strong>
                                {{ profile.phone }}
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6 row">
                                <strong class="col-3">Grupo: </strong>
                                <q-select v-model="profile.group" class="col-8" option-value="id" emit-value map-options
                                    :options="groups" label="Grupo" option-label="name" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="text-h6 row">
                                <q-btn @click="modalObservation = true">Observaciones</q-btn>
                            </div>
                        </div>
                    </div>
                </q-card>
            </div>
            <div class="col-4">
                <q-card class="my-card  q-pa-md ">
                    <q-select :options="optionsDocuments" v-model="optionDocument" class="q-mb-sm" style="max-width: 300px" ></q-select>
                    <q-uploader @uploaded="fileComplete" :factory="factoryPermissions"  style="max-width: 300px" field-name="image" v-show="optionDocument == 'Permiso'"
                        :hide-upload-btn="inscriptionExist"  label="Permiso"  />
                    <q-uploader @uploaded="fileComplete" :factory="factoryPay" style="max-width: 300px" field-name="image" 
                        :hide-upload-btn="inscriptionExist" color="amber" v-show="optionDocument == 'Fotos'"
                        label="Fotos" />
                    <q-uploader @uploaded="fileComplete" :factory="factoryPay" style="max-width: 300px" field-name="image" v-show="optionDocument == 'Paga'"
                        :hide-upload-btn="inscriptionExist"  color="amber"
                        label="Pago" />

                </q-card>
            </div>
            <div class="col-4">
                <q-card class="my-card  q-pa-sm">
                    <q-img :src="profile.imagePermission" no-native-menu>
                        <div class="absolute-top text-center">
                            Permisos
                        </div>
                    </q-img>

                </q-card>
            </div>
            <div class="col-4">
                <q-card class="my-card  q-pa-sm">
                    <q-img :src="profile.imagePay" no-native-menu>
                        <div class="absolute-top text-center">
                            Paga
                        </div>
                    </q-img>
                </q-card>
            </div>
            <div class="col-4">
                <q-card class="my-card  q-pa-sm">
                    <q-img :src="profile.imagePhoto" no-native-menu>
                        <div class="absolute-top text-center">
                            Foto
                        </div>
                    </q-img>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import ServicesProfile from 'src/services/ServicesProfile'
import ServicesGroup from 'src/services/ServicesGroup'
import ServicesInscription from 'src/services/ServicesInscription'
import ServicesPeriod from 'src/services/ServicesPeriod'
import { useRouter } from "vue-router"
import { useQuasar, QSpinnerGears } from 'quasar'
const optionDocument = ref('Selecciona un documento')
const optionsDocuments = [
    'Paga',
    'Fotos',
    'Permiso'
]
const modalObservation = ref(false)
const router = useRouter()
const profile = reactive({
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
    group: 'Selecciona un Grupo',
    status: 'No enviada',
    imagePay: '',
    imagePermission: '',
    imagePhoto: '',
    observations: 'No hay ninguna observación'
})
const period = reactive({
    start: '',
    end: ''
})

const $q = useQuasar()

const inscriptionExist = ref(false)
const updateInscriptionInfo = () => {
    ServicesProfile.getInscriptionInfo()
        .then(data => {

            inscriptionExist.value = data.statusInscription == null ? false : true
            if (data.statusInscription != null) {
                console.log(data.statusInscription)
                inscriptionExist.value = data.statusInscription.state_inscription == 'denegado' ? false : true
                profile.status = data.statusInscription.state_inscription
                profile.group = data.statusInscription.group_id
                profile.observations = data.statusInscription.observations
                console.log(data.statusInscription.group_id)
            }
            profile.name = data.personalInfo.name
            profile.lastName = data.personalInfo.last_name
            profile.nacionality = data.personalInfo.nacionality
            profile.typeBlood = data.personalInfo.type_blood
            profile.bornDate = data.personalInfo.born_date
            profile.dni = data.personalInfo.dni
            profile.phone = data.personalInfo.phone
            profile.gender = data.personalInfo.gender
            profile.email = data.personalInfo.user.email
            profile.imagePay = data.personalInfo.scout.image_pay
            profile.imagePermission = data.personalInfo.scout.image_permissions
        })
}


const groups = ref([])
ServicesGroup.getGroups()
    .then(data => {
        console.log(data)
        groups.value = data
    })
const inscribir = () => {

    ServicesInscription.registerInscription(profile.group)
        .then(data => {
            inscriptionExist.value = true
            console.log(data.success == 1)
            if (data.success == 1) {
                $q.notify({
                    type: 'positive',
                    message: 'Inscripcion enviada correctamente'
                })
            } else {
                $q.notify({
                    type: 'negative',
                    message: 'Error enviando Inscripcion'
                })
            }
        })
        .catch(e => {

        })
}
const redirect = (ruta) => {
    router.push(ruta)
}

const factoryPermissions = (file) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        resolve({
            url: 'http://127.0.0.1:8000/api/file',
            method: 'POST',
            headers: [
                { name: 'Authorization', value: `Bearer ${token}` },
            ],
        })
    })
}
const factoryPay = (file) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        resolve({
            url: 'http://127.0.0.1:8000/api/filePay',
            method: 'POST',
            headers: [
                { name: 'Authorization', value: `Bearer ${token}` },
            ],
        })
    })
}

const getPeriod = () => {
    ServicesPeriod.getPeriod()
        .then(response => {
            console.log('Dentro de periodo')
            const getYearStart = new Date(response.response.date_start)
            const getYearEnd = new Date(response.response.date_end)
            period.start = getYearStart.getFullYear()
            period.end = getYearEnd.getFullYear()
            console.log(response)
        })
}
 
const fileComplete = (info) => {
    if(optionDocument.value == 'Permiso')
        profile.imagePermission = info.xhr.response 
    else if(optionDocument.value == 'Paga')
        profile.imagePay = info.xhr.response
    else
        profile.imagePhoto= info.xhr.response
    console.log( info.xhr.response)
}
getPeriod()
updateInscriptionInfo()
</script>

<style scoped>
p {
    font-size: 20px;
    margin-top: 10px;
    float: center;
}
</style>