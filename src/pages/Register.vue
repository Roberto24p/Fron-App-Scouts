<template>
    <div class="row">
        <div class="col-7">
            <q-img height="649px" src="https://c1.wallpaperflare.com/preview/688/239/658/boy-scout-scouting-asia.jpg">
            </q-img>
        </div>
        <div class="col-lg-5 col-md-5 col-xs-12 q-pa-md">
            <div class="text-h5 text-center ">Registrate</div>
            <div class="q-pa-sm col-sm-12">
                <q-input class="q-ma-xs" filled v-model="scout.name" label="Nombre"></q-input>
                <q-input class="q-ma-xs" filled v-model="scout.lastName" label="Apellido"></q-input>
                <q-input class="q-ma-xs" filled v-model="scout.dni" label="Cedula"></q-input>
                <q-input class="q-ma-xs" filled v-model="scout.phone" label="Telefono"></q-input>
                <q-input class="q-ma-xs" filled v-model="scout.email" label="Email"></q-input>
                <q-select class="q-ma-xs" filled :options="bloodType" v-model="scout.typeBlood" label="Tipo de Sangre">
                </q-select>
                <q-select class="q-ma-xs" emit-value map-options v-model="scout.gender" :options="typeGender"
                    label="Genero">
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
                <q-btn label="Registrate" style="width: 100%;" type="submit" color="primary"  @click="register" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import ServicesAuth from 'src/services/ServicesAuth';
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
const typeGender = [
    '1',
    '0'
]
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

const register = ()=>{
    ServicesAuth.register(scout)
}
</script>