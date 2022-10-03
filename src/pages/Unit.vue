<template>
    <div class="q-pa-md">
        <q-btn label="Agregar" color="primary" class="q-ma-md" @click="showDialog"></q-btn>
        <q-table title="Unidades Scouts" :rows="rowUnits" :columns="columns" row-key="name" :filter="filter">
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Buscar...">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn color="blue" icon="info" @click="showDetailUnitDirecting(props.row)"></q-btn>
                    <q-btn color="yellow" icon="mode_edit" class="q-mx-sm" @click="onEdit(props.row)"></q-btn>
                    <!-- <q-btn color="blue" icon="group" class="q-mx-sm" @click="redirect(props.row.id)"></q-btn> -->
                    <q-btn color="red" icon="delete" @click="onDelete(props.row)" v-show="props.row.state == 'A'">
                    </q-btn>
                    <q-btn color="green" @click="activate(props.row)" v-show="props.row.state != 'A'">
                        Activar
                    </q-btn>

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
        </q-table>
    </div>
    <q-dialog v-model="deleteDialog">
        <q-card style="width: 300px">
            <q-card-section>
                <div class="text-h6">Alerta</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                ¿Desea eliminar el grupo seleccionado?
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Si" v-close-popup color="red" @click="deleteUnit" />
                <q-btn flat label="No" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="dialog" transition-show="slide-up" transition-hide="slide-down">
        <q-card style="width: 900px; max-width: 80vw;">
            <q-bar>
                <q-toolbar-title>Nuevo Unidad</q-toolbar-title>
                <q-space />
                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>



            <q-card-section class="col q-pt-none">
                <q-form class="q-gutter-md row q-pa-sm justify-center ">
                    <div class="col-md-5 col-sm-12 ">
                        <q-input class="col-12" filled v-model="unit.name" label="Nombre"></q-input>
                        <q-select class="col-12 q-mt-sm" filled emit-value map-options v-model="unit.groupId"
                            :disable="store.role == 4" :options="groupsSelect" option-value="id" option-label="name"
                            label="Selecciona un Grupo" />
                        <q-select filled class="q-mt-sm" option-value="name" v-model="unit.type" :options="unitsSelect"
                            emit-value map-options option-label="name" />
                        <q-uploader class="q-mt-sm" :max-files="1" @finish="fileUpload" @uploaded="fileComplete"
                            :factory="factory" style="max-width: 300px" field-name="image" color="amber" label="Logo" />
                        <q-btn class="q-mt-sm" @click="addTeam" v-show="bttForm">Agregar Equipo</q-btn>
                    </div>
                    <div class="col-md-4 col-sm-12" v-show="bttForm">
                        <q-img :src="unit.img_url == '' ? 'https://i.imgur.com/wKV0Jmy.png' : unit.img_url"
                            spinner-color="white" style="height: 140px; max-width: 150px; border: yellow 5px solid;" />
                        <div v-for="team in unit.teams" v-bind:key="team.id" class="row">
                            <q-input class="col-12" filled v-model="team.name" label="Equipo">
                                <template v-slot:append>
                                    <q-icon name="close" class="cursor-pointer" @click="deleteTeam(team, unit.teams)" />
                                </template>
                            </q-input>
                        </div>
                    </div>
                </q-form>
            </q-card-section>
            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="Guardar" @click="postUnit" v-show="bttForm"></q-btn>
                <q-btn flat label="Actualizar" @click="updateUnit" v-show="!bttForm"></q-btn>
            </q-card-actions>
            {{ scout }}
        </q-card>
    </q-dialog>
    <q-dialog v-model="modalDetailDirecting">
        <q-card style="width: 700px; max-width: 80vw;">
            <q-card-section>
                <div class="text-h6">Dirigentes de la Unidad</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                <q-list bordered v-if="directings.length>0">
                    <q-item clickable v-for="direct in directings" v-bind:key="direct.id">
                        <q-item-section avatar>
                            <q-avatar>
                                <q-img
                                    :src="direct.person.image == '' || direct.person.image == null ? 'https://png.pngtree.com/png-vector/20190116/ourlarge/pngtree-vector-avatar-icon-png-image_322275.jpg': direct.profile.image">
                                </q-img>
                            </q-avatar>
                        </q-item-section>

                        <q-item-section>{{ direct.person.name }} {{ direct.person.last_name }} </q-item-section>
                        <q-item-section>{{ direct.person.user.roles[0].nombre }}</q-item-section>
                        <q-item-section>
                            <q-select v-model="direct.unit.id" :options="unitsByGroup" emit-value map-options
                                option-value="id" option-label="name"></q-select>
                        </q-item-section>
                        <q-item-section>
                            <q-btn @click="updateDirectingUnit(direct.unit.id, direct.id)">Actualizar</q-btn>
                        </q-item-section>

                    </q-item>
                </q-list>
                <q-list bordered v-else>
                    <q-item-section>
                        No hay dirigentes en esta unidad
                    </q-item-section>
                </q-list>
            </q-card-section>

            <q-card-actions align="right" class="bg-white text-teal">
                <q-btn flat label="OK" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>


</template>

<script setup>
import ServicesGroup from 'src/services/ServicesGroup'
import ServicesUnit from 'src/services/ServicesUnit';
import { onBeforeMount, reactive, ref, watch } from 'vue';
import { useRouter } from "vue-router"
import { useUsersStore } from '../store/user-store'
import { useQuasar } from 'quasar'
import ServicesRange from 'src/services/ServicesRange';
import ServicesDirecting from 'src/services/ServicesDirecting';
const unitsByGroup = ref([])
const unitSelect = ref('')

const $q = useQuasar()
const store = useUsersStore()
const router = useRouter()
const deleteDialog = ref(false)
const modalDetailDirecting = ref(false)
const columns = [
    { name: 'img', label: 'Logo' },

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
const bttForm = ref(false)
const filter = ref('')
const directings = ref([])
// const unitsSelect = [
//     'Manada',
//     'Tropa',
//     'Clan'
// ]
const unitsSelect = ref([])
const unit = reactive({
    id: '',
    name: '',
    groupId: '',
    img_url: '',
    type: '',
    teams: []
})
const onDelete = (row) => {
    deleteDialog.value = true
    unit.id = row.id
}

const deleteUnit = () => {
    ServicesUnit.delete(unit.id)
        .then(response => {
            if (response.success == 1) {
                $q.notify({
                    type: 'success',
                    message: response.message,
                    timeout: 2000
                })
                console.log(response)
                getUnits()
            } else {
                $q.notify({
                    type: 'negative',
                    message: response.message,
                    timeout: 2000
                })
            }

        })
}

const onEdit = (row) => {
    bttForm.value = false
    dialog.value = true
    console.log(row)
    unit.name = row.name
    unit.img_url = row.image
    let index = groupsSelect.value.find(obj => obj.id == row.group_id)
    unit.groupId = index.id
    unit.type = row.type
    unit.id = row.id
}
const postUnit = async () => {
    const message = await ServicesUnit.create({
        name: unit.name,
        group_id: unit.groupId,
        equipos: unit.teams,
        image: unit.img_url
    })
    dialog.value = false
    console.log(message)
    getUnits()
}
const getGroups = async () => {
    const groupsFech = await ServicesGroup.getGroups()
    groupsSelect.value = groupsFech
    if (store.role == 4) {
        const response = await ServicesDirecting.getProfileDirecting()
        unit.groupId = response.profile.group_id
        console.log(unit)
        console.log(response)
    }
}

const getUnits = async () => {
    let unitsFetch;
    $q.loading.show()

    if (store.role == 1) {
        unitsFetch = await ServicesUnit.getUnits()
    } else {
        unitsFetch = await ServicesUnit.getUnitsDirecting()

    }
    $q.loading.hide()
    rowUnits.value = unitsFetch
}

const factory = (file) => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token')
        resolve({
            url: 'http://127.0.0.1:8000/api/fileUnit',
            method: 'POST',
            headers: [
                { name: 'Authorization', value: `Bearer ${token}` },
            ],
        })
    })
}
const deleteTeam = (teamId, teams) => {
    const indice = teams.map(obj => obj.id).indexOf(teamId.id)
    if (indice != -1)
        teams.splice(indice, 1)
}

const fileComplete = (info) => {
    unit.img_url = info.xhr.response
    console.log(info.xhr.response)

}
const addTeam = () => {
    const newTeam = reactive({
        name: ''
    })
    unit.teams.push(newTeam)
}

const showDialog = () => {
    dialog.value = true
    bttForm.value = true
    unit.name = ''
    unit.type = ''
    unit.img_url = ''
    unit.teams = []
    if (store.role != 4)
        unit.groupId = ''
}

const updateUnit = () => {
    const unitJson = {
        name: unit.name,
        group_id: unit.groupId,
        type: unit.type,
        image: unit.img_url,
        id: unit.id
    }
    ServicesUnit.update(unitJson)
        .then(response => {
            showDialog()
            dialog.value = false
            getUnits()
            console.log(response)
        })
}

const activate = (row) => {
    ServicesUnit.activate(row.id)
        .then(response => {
            if (response.success == 1) {
                getUnits()
            }
        })
}

const redirect = (unit_id) => {
    router.push({ name: 'teamScouts', params: { unitId: unit_id } })
}

const showDetailUnitDirecting = async (row) => {
    console.log(row)
    modalDetailDirecting.value = true
    const response = await ServicesDirecting.getDirectingsByUnit(row.id)
    directings.value = response.directings
    unitsByGroup.value = response.units
    console.log(response)
}

const getRanges = async () => {
    const response = await ServicesRange.showAll()
    unitsSelect.value = response.ranges
    console.log(response)
}

const updateDirectingUnit = async (unitId, directId) => {
    console.log(unitId)
    console.log(directId)
    const response = await ServicesDirecting.setUnitDirecting(unitId, directId)
    if (response.success) {
        modalDetailDirecting.value = false
        $q.notify({
            type: 'success',
            message: response.message,
            timeout: 2000
        })
    }
    console.log(response)
}

onBeforeMount(() => {
    getRanges()
    getGroups()
    getUnits()
})
</script>