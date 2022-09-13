<template>
    <div class="q-pa-md">
        <q-btn label="Nueva" color="primary" class="q-ma-md" @click="dialog = true; bttForm = true" />
        <q-table title="Periodos" :rows="inscirptionsRow" :columns="columns" row-key="name" :loading="loading">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn color="yellow" icon="mode_edit" class="q-mx-sm" @click="onEdit(props.row)"></q-btn>
                    <q-btn color="blue" label="Activar" v-show="props.row.state != 'Activo'" class="q-mx-sm"
                        @click="onActivate(props.row)"></q-btn>
                    <q-btn color="green" icon="done_all" label="Activo" v-show="props.row.state == 'Activo'"
                        class="q-mx-sm"></q-btn>
                </q-td>
            </template>
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>
        </q-table>
    </div>
  
    <q-dialog v-model="dialog" transition-show="slide-up" transition-hide="slide-down">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-bar class="bg-warning q-pa-lg">
                <q-toolbar-title>Asociación de Scouts del Guayas</q-toolbar-title>
                <q-space />
                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>

            <q-card-section>
                <div class="text-h6">Nueva Inscripcion</div>
            </q-card-section>

            <q-card-section class="col q-pt-none">
                <q-form class="q-gutter-md ">
                    <input type="hidden" v-model="inscription.id">
                    <div class="row justify-around">
                        <q-input class="col-4" filled label="Inicio" v-model="inscription.dateStart" mask="date"
                            :rules="['date']">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy>
                                        <q-date v-model="inscription.dateStart"></q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                        <q-input class="col-4" filled v-model="inscription.dateEnd" label="Final" mask="date"
                            :rules="['date']">
                            <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy>
                                        <q-date v-model="inscription.dateEnd"></q-date>
                                    </q-popup-proxy>
                                </q-icon>
                            </template>
                        </q-input>
                        <q-input class="col-8 q-ml-lg" v-model="inscription.description" filled label="Descripción">
                        </q-input>
                        {{ inscription }}
                    </div>
                </q-form>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Guardar" @click="postInscription" v-show="bttForm"></q-btn>
                <q-btn flat label="Actualizar" @click="putInscription" v-show="!bttForm"></q-btn>
            </q-card-actions>

        </q-card>
    </q-dialog>
    <q-dialog v-model="small">
        <q-card style="width: 300px">
            <q-card-section>
                <div class="text-h6">Advertencia</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                ¿Estas seguro que deseas activar este periodo? <br>
                Recuerda que solo puedes tener un periodo activo

            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Activar" @click="activate" v-close-popup />
                <q-btn flat label="No" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>

</template>
<script setup>
import ServicesPeriod from 'src/services/ServicesPeriod';
import { reactive, ref } from 'vue'
import ServicesInscription from '../services/ServicesInscription';
const columns = [
    {
        namel: 'name',
        required: true,
        label: 'Descripción',
        align: 'left',
        field: row => row.description,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'date_start', align: 'center', label: 'Fecha de Inicio', field: 'date_start', },
    { name: 'date_end', label: 'Fecha de Finalización', align: 'center', field: 'date_end' },
    { name: 'actions', lable: 'Acctiones' }
]
const bttForm = ref(false)
const dialog = ref(false)
const inscirptionsRow = ref([])
const small = ref(false)
const inscription = reactive({
    dateStart: '',
    dateEnd: '',
    description: '',
    id: ''
})

const postInscription = async () => {
    const data = ServicesInscription.store(inscription)
    console.log(data)
    getInscriptions()
}

const onEdit = (row) => {
    dialog.value = true
    inscription.dateEnd = row.date_end
    inscription.dateStart = row.date_start
    inscription.description = row.description
    inscription.id = row.id
    bttForm.value = false

}

const putInscription = () => {
    ServicesInscription.put(inscription.id, inscription)
        .then(response => {
            dialog.value = false
            console.log(response)
            getInscriptions()
        })
}
const getInscriptions = () => {
    ServicesInscription.get()
        .then(response => inscirptionsRow.value = response.data)
}

const onActivate = (row) => {
    inscription.id =  row.id
    small.value = true
}

const activate = async () => {
    const response = await ServicesPeriod.activate(inscription.id)
    if(response.success){
        getInscriptions()
    }

}

getInscriptions()
</script>