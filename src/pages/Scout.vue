<template>
    <div class="q-pa-md">
        <q-btn label="Agregar" color="primary" class="q-ma-md" @click="dialog = true; bttForm=true"></q-btn>
        <q-table title="Beneficiarios Scouts" :rows="rowScouts" :columns="columns" row-key="name">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn color="yellow" icon="mode_edit" class="q-mx-sm" @click="onEdit(props.row)"></q-btn>
                    <q-btn color="red" icon="delete" @click="onDelete(props.row)"></q-btn>
                </q-td>
            </template>

        </q-table>
    </div>
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
                <div class="text-h6">Nuevo Beneficiario Scout</div>
            </q-card-section>

            <q-card-section class="col q-pt-none">
                <q-form class="q-gutter-md row">
                    <q-input class="col-4" filled v-model="scout.name" label="Nombre"></q-input>
                    <q-input class="col-4" filled v-model="scout.lastName" label="Apellido"></q-input>
                    <q-input class="col-4" filled v-model="scout.dni" label="Cedula"></q-input>
                    <q-input class="col-4" filled v-model="scout.phone" label="Telefono"></q-input>
                    <q-input class="col-4" filled v-model="scout.email" label="Email"></q-input>
                    <q-select class="col-4" filled :options="bloodType" v-model="scout.typeBlood"
                        label="Tipo de Sangre"></q-select>
                    <q-select class="col-4" emit-value map-options v-model="scout.gender" :options="typeGender"
                        label="Genero"></q-select>
                    <q-input class="col-4" filled v-model="scout.bornDate" mask="date" :rules="['date']">
                        <template v-slot:append>
                            <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy>
                                    <q-date v-model="scout.bornDate"></q-date>
                                </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>

                    <q-select class="col-4" emit-value map-options v-model="scout.groupId" :options="groupsSelect"
                        option-value="id" option-label="name" @input="onChangeGroup" label="Selecciona un Grupo" />
                    <q-select class="col-4" emit-value map-options v-model="scout.unitId" :options="unitsSelect"
                        option-value="id" option-label="name" label="Selecciona una unidad" />
                    <q-input class="col-4" filled v-model="scout.nacionality" label="Nacionalidad"></q-input>
                </q-form>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Guardar" @click="createScout" v-show="bttForm"></q-btn>
                <q-btn flat label="Actualizar" @click="updateScout" v-show="!bttForm"></q-btn>
            </q-card-actions>
            {{ scout }}
        </q-card>
    </q-dialog>

</template>

<script setup>
import { watch } from 'vue';
import ServicesGroup from 'src/services/ServicesGroup';
import ServicesScout from 'src/services/ServicesScout';
import ServicesUnit from 'src/services/ServicesUnit';
import { onBeforeMount, reactive, ref } from 'vue'
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
    { name: 'age', align: 'left', label: 'Edad', field: 'age', sortable: true },
    { name: 'group', align: 'left', label: 'Grupo', field: ({ group }) => group.name, sortable: true },
    { name: 'unit', align: 'center', label: 'Unidad', field: ({ unit }) => unit.name, sortable: true },
    { name: 'actions', label: 'Acciones', align: 'center' },
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
const bttForm = ref(false)
const typeGender = [
    '1',
    '0'
]
const rowScouts = ref([])
const groupsSelect = ref([])
const unitsSelect = ref([])
const dialog = ref(false)
const scout = reactive({
    name: '',
    unitId: '',
    lastName: '',
    dni: '',
    bornDate: '',
    typeBlood: '',
    phone: '',
    email: '',
    image: '',
    nacionality: '',
    groupId: '',
    gender: '',
    id: ''
})

const onChangeGroup = async (groupId) => {
    const unitsFetch = await ServicesUnit.getUnitByGroup(groupId)
    unitsSelect.value = unitsFetch
}

const createScout = async () => {
    const response = await ServicesScout.store(scout)
    if (response.success) {
        dialog.value = false
        getScouts()
    }
}

const updateScout = async () => {
    const message = await ServicesScout.put(scout.id, scout)
    if(message.success){
        getScouts()
        dialog.value = false
    }
}

const getScouts = async () => {
    const scoutsFech = await ServicesScout.getScouts()
    rowScouts.value = scoutsFech.data
}

const onEdit = data => {
    console.log(data.unit_id)
    dialog.value = true
    scout.unitId = data.unit_id
    scout.name = data.name
    scout.lastName = data.last_name
    scout.dni = data.dni
    scout.bornDate = data.born_date
    scout.typeBlood = data.type_blood
    scout.phone = data.phone
    scout.email = data.email
    scout.image = data.image
    scout.nacionality = data.nacionality
    scout.groupId = data.group_id
    scout.gender = data.gender
    scout.id = data.id
    bttForm.value = false
}

const getGroups = async () => {
    const groupsFech = await ServicesGroup.getGroups()
    groupsSelect.value = groupsFech
}

watch(() => scout.groupId, onChangeGroup)
onBeforeMount(() => {
    getScouts()
    getGroups()
})
</script>