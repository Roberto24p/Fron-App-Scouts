<template>
    <div class="q-pa-md ">
        <q-btn label="Agregar" color="primary" class="q-ma-md" @click="openDialogCreate" />

        <q-table title="Equipos" :rows="teams" :columns="columns" row-key="name" :loading="loading">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn color="yellow" icon="mode_edit" class="q-mx-sm" @click="onEdit(props.row)"></q-btn>
                    <q-btn color="red" icon="delete" @click="onDelete(props.row)"></q-btn>
                </q-td>
            </template>
            <template v-slot:body-cell-img="props">
                <q-td :props="props">
                    <q-avatar rounded>
                        <img :src="props.row.image == null ? 'https://i.imgur.com/wKV0Jmy.png' : props.row.image"
                            alt="No Tiene Imagen" size="100px">
                    </q-avatar>
                </q-td>
            </template>
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>
        </q-table>
    </div>
    <q-dialog v-model="dialog">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">Crea un nuevo Equipo</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-form class="q-gutter-md row justify-center q-mt-sm">
                    <div class="col-md-4 col-sm-12">
                        <q-input filled class="col-8" v-model="team.name" label="Nombre del Equipo" lazy-rules
                            :rules="[val => val && val.length > 0 || 'Obligatorio']" />
                        <q-select style="text-transform: capitalize" class="col-4" v-model="group"
                            @input="onChangeFocus" label="Selecciona Grupo" :options="groups" emit-value map-options
                            option-label="name" option-value="id">
                        </q-select>
                        <q-select style="text-transform: capitalize" class="col-4 q-mt-md" option-label="name"
                            v-model="team.unitId" emit-value map-options option-value="id" label="Selecciona Unidad"
                            :options="units">
                        </q-select>
                    </div>
                </q-form>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Guardar" @click="saveTeam" v-show="bttForm" />
                <q-btn flat label="Actualizar" @click="updateTeam" v-show="!bttForm"></q-btn>

            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="deleteDialog">
        <q-card style="width: 300px">
            <q-card-section>
                <div class="text-h6">Alerta</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                ¿Desea eliminar el equipo seleccionado?
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Si" v-close-popup color="red" @click="deleteUnit" />
                <q-btn flat label="No" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup>
import ServicesTeam from 'src/services/ServicesTeam';
import ServicesGroup from 'src/services/ServicesGroup';
import ServicesUnit from 'src/services/ServicesUnit';
import { ref, reactive, watch } from 'vue'
import { useUsersStore } from '../store/user-store'
const store = useUsersStore()
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
    { name: 'unidad', align: 'left', label: 'Unidad', field: row => row.unit.name, sortable: true },
    { name: 'grupo', align: 'left', label: 'Grupo', field: row => row.unit.group.name, sortable: true },
    { name: 'actions', label: 'Acciones' }
]
const teams = ref([])
const dialog = ref(false)
const groups = ref([])
const units = ref([])
const group = ref('')
const bttForm = ref(false)

const deleteDialog = ref(false)
const team = reactive({
    id: '',
    name: '',
    unitId: ''
})

ServicesGroup.getGroups()
    .then(response => {
        groups.value = response
        console.log(response)
    })

const onChangeFocus = () => {
    console.log(group.value)
    team.unitId = ''
    ServicesUnit.getUnitByGroup(group.value)
        .then(response => {
            units.value = response
            console.log(response)
        })
}

const saveTeam = () => {
    ServicesTeam.post(team)
        .then(response => {
            if (response.success == 1) {
                getTeams()
            }


        })
}
const openDialogCreate = () => {
    dialog.value = true
    bttForm.value = true
}

const onEdit = (row) => {
    bttForm.value = false
    dialog.value = true
    team.name = row.name
    team.id = row.id
    group.value = row.unit.group.id
    ServicesUnit.getUnitByGroup(group.value)
        .then(response => {
            units.value = response
            team.unitId = row.unit.id

        })
    console.log(row.unit.id)
}

const onDelete = (row) => {
    team.id = row.id
    deleteDialog.value = true
}

const deleteUnit = () => {
    ServicesTeam.delete(team.id)
        .then(response => {
            console.log(response)
            getTeams()
        })
}
const getTeams = () => {
    if (store.role == 1) {
        ServicesTeam.getTeams()
            .then(response => {
                teams.value = response.teams
                console.log(response)
            })
    }else if(store.role == 5){
        ServicesTeam.teamsDirecting()
            .then(response => {
                teams.value = response.teams
                console.log(response)
            })
    }
}

const updateTeam = () => {
    ServicesTeam.update(team)
        .then(response => {
            getTeams()
            dialog.value = false
            console.log(response)
        })
}
getTeams()
watch(() => group.value, onChangeFocus)
</script>
<style >
</style>