<template>
    <div class="q-pa-md row items-start q-gutter-md">
        <div class="col-12">
            <q-btn @click="openModal">Agregar</q-btn>
        </div>
        <div class="col-3" v-for="r in ranges" v-bind:key="r.id">
            <q-card class="my-card">
                <img src="https://cdn.quasar.dev/img/mountains.jpg">
                <q-card-section>
                    <div class="text-h6">{{ r.name }}</div>
                </q-card-section>
            </q-card>
        </div>
    </div>
    <q-dialog v-model="medium">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <div>
                    <q-input filled v-model="range.name" label="Nombre" hint="Name and surname" lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Please type something']" />
                    <div class="row justify-around">
                        <div class="col-5">
                            <q-input filled type="number" v-model="range.max" label="Mínimo de Edad" lazy-rules :rules="[
                              val => val !== null && val !== '' || 'Please type your age',
                              val => val > 0 && val < 100 || 'Please type a real age'
                            ]" />
                        </div>
                        <div class="col-5">
                            <q-input filled type="number" v-model="range.min" label="Máximo de Edad" lazy-rules :rules="[
                              val => val !== null && val !== '' || 'Please type your age',
                              val => val > 0 && val < 100 || 'Please type a real age'
                            ]" />
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Guardar" @click="store" />
            </q-card-actions>
        </q-card>
    </q-dialog>

</template>
<script setup>
import ServicesRange from 'src/services/ServicesRange';
import { ref, reactive } from 'vue'
const medium = ref(false)
const ranges = ref([])
const range = reactive({
    name: '',
    min: '',
    max: ''
})

const store = () => {
    ServicesRange.post(range)
        .then(response => {
            if(response.success){
                loadRanges()
            }
            console.log(response)
        })
}
const openModal = () => {
    medium.value = true
}
const loadRanges = () => {
    ServicesRange.showAll()
        .then(response => {
            console.log(response)
            if(response.success){
                medium.value = false
                ranges.value = response.ranges
            }
    })
}
loadRanges()

</script>

<style >
</style>