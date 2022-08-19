<template>
    <div class="q-pa-md">
        <q-table title="Inscripciones" :rows="row" :columns="columns" row-key="name">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn
                        :color="props.row.state_inscription == 'confirmado' ? 'green' :
                        props.row.state_inscription == 'espera' ? 'warning' : props.row.state_inscription == 'denegado' ? 'negative' : 'nada'"
                        class="q-mx-sm" @click="onEdit(props.row)">{{ props.row.state_inscription }}</q-btn>
                </q-td>
            </template>
        </q-table>
        <q-dialog v-model="dialog" persistent :maximized="true" transition-show="slide-up" transition-hide="slide-down">
            <q-card class="bg-white text-primary">
                <q-bar>
                    <q-toolbar-title>Asociación de Scouts del Guayas</q-toolbar-title>
                    <q-space />
                    <q-btn dense flat icon="close" v-close-popup>
                        <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                    </q-btn>
                </q-bar>

                <q-card-section>
                    <div class="text-h6">Información de Inscirpion</div>
                </q-card-section>

                <q-card-section class="col q-pt-none">
                    <q-form class="q-gutter-md row justify-center">
                        <q-input class="col-4" filled v-model="inscriptionData.name" label="Nombre"></q-input>
                        <q-select class="col-4" v-model="inscriptionData.state_inscription" :options="status">
                        </q-select>
                        <q-input class="col-4" filled v-model="inscriptionData.type" label="Unidad"></q-input>
                        <q-input class="col-4" filled v-model="inscriptionData.group" label="Grupo"></q-input>
                        <q-btn class="col-6" @click="showDialog(inscriptionData.image_permissions)">Ver Permiso</q-btn>
                        <q-btn class="col-6" @click="showDialog(inscriptionData.image_pay)">Ver Pago</q-btn>
                        <input type="hidden" v-model="inscriptionData.id">
                        <q-input class="col-8" v-model="inscriptionData.observations" filled type="textarea" />
                        {{ inscriptionData.observations }}
                    </q-form>
                </q-card-section>
                <q-card-actions align="right" class="bg-white text-teal">
                    <q-btn flat label="Guardar" @click="updateInscription"></q-btn>
                </q-card-actions>
                {{ scout }}
            </q-card>
            <q-dialog v-model="imageDialog">
                <q-card style="width: 700px; max-width: 80vw;">
                    <q-card-section>
                        <div class="text-h6">Imagen</div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                        <q-img :src="image" no-native-menu>
                            <div class="absolute-top text-center">
                                Paga
                            </div>
                        </q-img>
                    </q-card-section>
                </q-card>
            </q-dialog>
        </q-dialog>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import ServicesInscription from 'src/services/ServicesInscription';
const columns = [
    {
        name: 'name',
        required: true,
        label: 'Nombre',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'group', align: 'center', label: 'Grupo', field: row => row.group
    },
    { name: 'type', label: 'Unidad', align: 'center', field: row => row.type },
    { name: 'state_inscription', label: 'Estado', align: 'center', field: row => row.state_inscription },
    { name: 'actions', label: 'Acciones', align: 'center', sortable: true }
]
const inscriptionData = reactive({
    name: '',
    group: '',
    type: '',
    state_inscription: '',
    observations: '',
    id: '',
    image_permissions: '',
    image_pay: ''

})
const imageDialog = ref(false)
const status = ['confirmado', 'espera', 'denegado']
const dialog = ref(false)
const image = ref('')
const row = ref([])


const onEdit = (row) => {
    dialog.value = true
    inscriptionData.name = row.name
    inscriptionData.group = row.group
    inscriptionData.type = row.type
    inscriptionData.state_inscription = row.state_inscription
    inscriptionData.id = row.id
    inscriptionData.image_permissions = row.image_permissions
    inscriptionData.image_pay = row.image_pay
}
const updateInscription = () => {
    ServicesInscription.putInscription({
        id: inscriptionData.id,
        state_inscription: inscriptionData.state_inscription,
        observations: inscriptionData.observations
    })
        .then(data => {
            console.log(data)
            loadTable()
            dialog.value = false
        })
}

const loadTable = () => {
    ServicesInscription.getAllInscriptions()
        .then(data => {
            console.log(data.data[0].state_inscription)
            console.log(data.data)
            row.value = data.data
            console.log(row)
        })
}

const showDialog = (img) => {
    console.log(img)
    image.value = img
    imageDialog.value = true
}
loadTable()
</script>