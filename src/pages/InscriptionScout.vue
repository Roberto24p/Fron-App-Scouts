<template>
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
                            <q-btn color="primary" label="Perfil" flat @click="redirect('/profile')" />
                        </q-item-section>
                    </q-item>
                </q-card>
            </div>
            <div class="col-8">
                <q-card class="my-card  q-py-sm">

                    <q-item >
                        <q-item-section>
                            <q-btn color="primary" label="Enviar Inscripción" flat @click="inscribir" />
                        </q-item-section>
                    </q-item>
                   
                    <q-separator />
                    <q-separator />
                    <q-item>

                        <div class="text-h5">
                            <strong>Nombre: </strong>
                            {{ profile.name }}
                        </div>
                    </q-item>
                    <q-item>
                        <div class="text-h5">
                            <strong>Apellido: </strong>
                            {{ profile.lastName }}
                        </div>
                    </q-item>
                    <q-item>
                        <div class="text-h5">
                            <strong>Cédula: </strong>
                            {{ profile.dni }}
                        </div>
                    </q-item>
                    <q-item>
                        <div class="text-h5">
                            <strong>Fecha de Nacimiento: </strong>

                            {{ profile.bornDate }}
                        </div>
                    </q-item>
                    <q-item>
                        <div class="text-h5">
                            <strong>Tipo de Sangre: </strong>
                            {{ profile.typeBlood }}
                        </div>
                    </q-item>
                    <q-item>
                        <div class="text-h5">
                            <strong>Nacionalidad: </strong>
                            {{ profile.nacionality }}
                        </div>
                    </q-item>
                    <q-item>
                        <div class="text-h5">
                            <strong>Teléfono: </strong>
                            {{ profile.phone }}
                        </div>
                    </q-item>
                    <q-item>
                        <div class="text-h5">
                            <template v-if="profile.gender == 1"><strong>Género: </strong> Hombre</template>
                            <template v-else><strong>Género: </strong> Mujer</template>
                        </div>
                    </q-item>
                    <q-item>
                        <div class="text-h5">
                            <template v-if="profile.group == ''"><strong>Grupo: </strong> NO SELECIONADO</template>
                            <template v-else><strong>Grupo: </strong> {{ profile.group }}</template>
                        </div>
                    </q-item>
                    <q-item v-show="profile.group == ''">
                        <div class="text-h5">
                            <q-input label="Codigo Grupo" lb outlined v-model="groupId" />
                        </div>
                        <q-btn color="warning" label="Validar Codigo" flat @click="validateGroup" />
                    </q-item>
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
import { useRouter } from "vue-router"

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
    group: '',
    status: ''
})
const groupId = ref('')
const scout_id = ref('')
ServicesProfile.getInscriptionInfo()
    .then(data => {
        console.log(data)
        profile.name = data.personalInfo.name
        profile.lastName = data.personalInfo.last_name
        profile.nacionality = data.personalInfo.nacionality
        profile.typeBlood = data.personalInfo.type_blood
        profile.bornDate = data.personalInfo.born_date
        profile.dni = data.personalInfo.dni
        profile.phone = data.personalInfo.phone
        profile.gender = data.personalInfo.gender
        profile.email = data.personalInfo.user.email

        // if (data.statusInscription != null) {
        //     profile.group = data.statusInscription.name
        // }
        // console.log(data.statusInscription.name)
        console.log(data)
    })

const validateGroup = () => {
    ServicesGroup.validate(groupId.value)
        .then(data => {
            console.log(data)
            profile.group = data.group[0].name
            scout_id.value = data.group[0].id
        })
}

const inscribir = () => {
    ServicesInscription.registerInscription(scout_id.value)
        .then(data => console.log(data))
}
const redirect = (ruta) => {
    router.push(ruta)
}
</script>

<style scoped>
p {
    font-size: 20px;
    margin-top: 10px;
    float: center;
}
</style>