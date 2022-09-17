<template>
    <div class="q-pa-md">
        <div class="row q-col-gutter-md q-mb-md">
            <div class="col-md-12 col-xs-12">
                <q-card class="my-card q-pa-lg ">
                    <p style="font-size: 20px;" class="text-left">Busca por nombre, cédula, grupo o
                        unidad</p>
                    <q-select v-model="periodSelect" :options="periods" option-label="description" option-value="id"
                        emit-value label="Selecciona un periodo" map-options />
                </q-card>
            </div>
        </div>
        <q-table title="Inscripciones" :rows="row" :columns="columns" row-key="name" :filter="filter">

            <template v-slot:top-left>
                <p style="font-size: 20px;">Reporte de inscripciones</p>

                <q-btn color="primary" icon-right="archive" label="Export to csv" no-caps @click="exportTable" />
            </template>
            <template v-slot:top-right>

                <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar...">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>


            </template>
            <template v-slot:body-cell-state_inscription="props">
                <q-td :props="props">
                    <q-btn
                        :color="props.row.state_inscription == 'confirmado' ? 'green' :
                        props.row.state_inscription == 'espera' ? 'warning' : props.row.state_inscription == 'denegado' ? 'negative' : 'nada'"
                        class="q-mx-sm">{{ props.row.state_inscription }}</q-btn>
                </q-td>
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn class="q-mx-sm" @click="onEdit(props.row)">Actualizar</q-btn>
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
                    <div class="q-gutter-md row justify-center">
                        <div class="col-4">
                            <div class="text-h5">
                                <strong> Nombre:</strong> {{ inscriptionData.name }}
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-h5">
                                <strong> Apellido:</strong> {{ inscriptionData.name }}
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-h5">
                                <strong> Unidad:</strong> {{ inscriptionData.type }}
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-h5">
                                <strong> Grupo:</strong> {{ inscriptionData.group }}
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-h5">
                                <strong> Fecha de Nacimiento:</strong> {{ inscriptionData.born_date }}
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-h5">
                                <strong> Género:</strong> {{ inscriptionData.gender == 1? 'Hombre': 'Mujer' }}
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-h5">
                                <strong> Tipo de Sangre:</strong> {{ inscriptionData.type_blood }}
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-h5">
                                <strong> Teléfono:</strong> {{ inscriptionData.phone }}
                            </div>
                        </div>
                        <div class="col-4">
                            <div class="text-h5">
                                <strong> Cédula:</strong> {{ inscriptionData.dni }}
                            </div>
                        </div>
                        <q-select style="text-transform: capitalize" class="col-4"
                            v-model="inscriptionData.state_inscription" :options="status">
                        </q-select>

                        <q-btn class="col-6" @click="showDialog(inscriptionData.image_permissions)">Ver Permiso
                        </q-btn>
                        <q-btn class="col-6" @click="showDialog(inscriptionData.image_pay)">Ver Pago</q-btn>
                        <q-btn class="col-6" @click="showDialog(inscriptionData.image_photo)">Ver Foto</q-btn>
                        <input type="hidden" v-model="inscriptionData.id">
                        <q-input class="col-8" v-model="inscriptionData.observations" filled type="textarea" autogrow
                            label="Ingresa una observación" />
                    </div>
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
import { reactive, ref, watch } from 'vue'
import ServicesInscription from 'src/services/ServicesInscription';
import ServicesPeriod from 'src/services/ServicesPeriod';
import { exportFile } from 'quasar'

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
    { name: 'dni', align: 'center', label: 'Cédula', field: row => row.dni },
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
    gender: '',
    born_date: '',
    image_pay: '',
    image_photo: '',
    type_blood: '',
    phone: '',
    dno: ''

})
const filter = ref('')
const imageDialog = ref(false)
const status = ['confirmado', 'espera', 'denegado']
const dialog = ref(false)
const image = ref('')
const row = ref([])
const periods = ref([])
const periodSelect = ref('')
const onEdit = (row) => {
    dialog.value = true
    inscriptionData.name = row.name
    inscriptionData.group = row.group
    inscriptionData.type = row.type
    inscriptionData.state_inscription = row.state_inscription
    inscriptionData.id = row.id
    inscriptionData.image_permissions = row.image_permission
    inscriptionData.image_pay = row.image_pay
    inscriptionData.image_photo = row.image_photo
    inscriptionData.born_date = row.born_date
    inscriptionData.type = row.type
    inscriptionData.gender = row.gender
    inscriptionData.type_blood = row.type_blood
    inscriptionData.phone = row.phone
    inscriptionData.dni = row.dni
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
    ServicesInscription.getAllInscriptions(periodSelect.value)
        .then(data => {
            row.value = data.data
        })
}

const showDialog = (img) => {
    console.log(img)
    image.value = img
    imageDialog.value = true
}

const getAllPeriods = async () => {
    const response = await ServicesPeriod.all()
    periods.value = response.data
    if (response.data[0] != null) {
        periodSelect.value = response.data[0].id
    }
    console.log(response)
}

const onChangePeriod = async () => {
    loadTable()
}

function wrapCsvValue(val, formatFn, row) {
    let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
}

const exportTable = () => {
    // naive encoding to csv format
    const content = [columns.map(col => wrapCsvValue(col.label))].concat(
        row.value.map(rw => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
                ? col.field(rw)
                : rw[col.field === void 0 ? col.name : col.field],
            col.format,
            rw
        )).join(','))
    ).join('\r\n')
    const status = exportFile(
        'table-export.csv',
        content,
        'text/csv'
    )
}
watch(() => periodSelect.value, onChangePeriod)
getAllPeriods()
// loadTable()
</script>