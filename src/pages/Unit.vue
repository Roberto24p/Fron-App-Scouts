<template>
    <div class="q-pa-md">
        <q-btn label="Agregar" color="primary" class="q-ma-md" @click="dialog = true"></q-btn>
        <q-table title="Beneficiarios Scouts" :rows="rowUnits" :columns="columns" row-key="name">
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
                <div class="text-h6">Nueva Unidad</div>
            </q-card-section>

            <q-card-section class="col q-pt-none">
                <q-form class="q-gutter-md row">
                    <q-input class="col-4" filled v-model="unit.name" label="Nombre"></q-input>
                    <q-select class="col-4" emit-value map-options v-model="unit.groupId" :options="groupsSelect"
                        option-value="id" option-label="name" label="Selecciona un Grupo" />
                </q-form>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Guardar" @click="postUnit"></q-btn>
            </q-card-actions>
            {{ scout }}
        </q-card>
    </q-dialog>

</template>

<script setup>
import ServicesGroup from 'src/services/ServicesGroup'
import ServicesUnit from 'src/services/ServicesUnit';
import { onBeforeMount, reactive, ref } from 'vue';

const columns = [
    {
        namel: 'name',
        required: true,
        label: 'Nombre',
        align: 'left',
        field: row => row.name,
        format: val => `${val}`,
        sortable: true
    },
    { name: 'group', align: 'center', label: 'Grupo', field: ({ group }) => group.name },
    { name: 'actions', label: 'Acciones', align: 'center' }
]
const rowUnits = ref([])
const groupsSelect = ref([])
const dialog = ref(false)
const unit = reactive({
    name: '',
    groupId: '',
    img_url: '1'
})

const postUnit = async () => {
    const message = await ServicesUnit.create({
        name: unit.name,
        group_id: unit.groupId
    })
    dialog.value = false
    console.log(message)
    getUnits()
}
const getGroups = async () => {
    const groupsFech = await ServicesGroup.getGroups()
    groupsSelect.value = groupsFech
}

const getUnits = async () => {
    const unitsFetch = await ServicesUnit.getUnits()
    rowUnits.value = unitsFetch
}
onBeforeMount(() => {
    getGroups()
    getUnits()
})
</script>