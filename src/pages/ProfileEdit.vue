<template>
    <div class="q-pa-md">
        <div class="row q-col-gutter-md">
            <div class="col-12">
                <q-card class="my-card ">
                   <q-item>
                        <q-item-section>
                            <p>
                                Actualiza tus datos de inscripción
                            </p>
                        </q-item-section>
                        <q-item-section>
                            <q-btn color="primary" label="Perfil" flat @click="redirect('/profile')"/>
                        </q-item-section>
                    </q-item>
                </q-card>
            </div>
            <div class="col-6">
                <q-card class="my-card  q-py-sm">
                    <q-item>

                        <q-input label="Nombre" v-model="profile.name" outlined />
                    </q-item>
                    <q-item>
                        <q-input label="Apellido" v-model="profile.lastName" outlined />
                    </q-item>
                    <q-item>
                        <q-input label="Fecha de Nacimiento" v-model="profile.bornDate" outlined />
                    </q-item>
                    <q-item>
                        <q-input label="Tipo de Sangre" v-model="profile.typeBlood" outlined />
                    </q-item>
                    <q-item>
                        <q-input label="Nacionalidad" v-model="profile.nacionality" outlined />
                    </q-item>
                </q-card>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import ServicesProfile from 'src/services/ServicesProfile'
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
})

ServicesProfile.getProfile()
    .then(data => {
        profile.name = data.name
        profile.lastName = data.last_name
        profile.nacionality = data.nacionality
        profile.typeBlood = data.type_blood
        profile.bornDate = data.born_date
        console.log(data.user.last_name)
        profile.email = data.user.email
        if (data.scout.type == '')
            profile.type = 'NO INSCRITO'
        console.log(data)
    })

const redirect = (ruta) => {
  router.push(ruta)
}
</script>

<style scoped>
    p{
        font-size: 20px;
        margin-top: 10px;
        float: center;
    }
</style>