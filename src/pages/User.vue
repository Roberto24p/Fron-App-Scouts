<script setup>
import { ref, reactive, watch } from 'vue'
import ServicesUser from 'src/services/ServicesUser'
import ServicesRole from 'src/services/ServicesRole'
import ServicesGroup from 'src/services/ServicesGroup'
import ServicesUnit from 'src/services/ServicesUnit';
//Data
const user = reactive({
    group_id: '',
    name: '',
    last_name: '',
    email: '',
    dni: '',
    date_born: '',
    phone: '',
    nacionality: '',
    gender: '',
    role: '',
    password: '',
    id: ''
})
const users = ref([])
const roles = ref([])
const groups = ref([])
const units = ref([])
const bttForm = ref(true)
const columns = [
    { name: 'name', label: 'Nombre', field: row => row.name, align: 'center' },
    { name: 'email', label: 'Correo Electronico', field: row => row.email, align: 'center' },
    { name: 'dni', label: 'Cédula', field: row => row.person.dni, align: 'center' },
    { name: 'rol', label: 'Rol', field: row => row.roles[0].nombre, align: 'center' },
    {
        name: 'age', label: 'Edad', field: row => {
            const born = new Date(row.person.born_date).getFullYear();
            const now = new Date().getFullYear()
            return now - born
        }, align: 'center'
    },
    { name: 'actions', label: 'Actión', align: 'center' }
]
const dialogCreate = ref(false)
const gender = [
    {
        name: 'Hombre',
        id: 1,
    },
    {
        name: 'Mujer',
        id: 2
    }
]
//Metodos
const openDialog = () => {
    user.id = ''
    user.name = ''
    user.last_name = ''
    user.dni = ''
    user.nacionality = ''
    user.gender = ''
    user.email = ''
    user.date_born = ''
    user.role = ''
    user.phone = ''
    user.password = ''
    user.group_id = ''
    user.unit_id = ''
    bttForm.value = true
    dialogCreate.value = true
}
const save = () => {
    ServicesUser.create(user)
        .then(response => {
            if (response.success) {
                loadUsers()
                dialogCreate.value = false
            }
            console.log(response)
        })
}

const update = () => {
    ServicesUser.update(user)
        .then(response => {
            if (response.success) {

                loadUsers()
                dialogCreate.value = false
            }
            console.log(response)
        })
}
const loadUsers = () => {
    ServicesUser.all()
        .then(data => {
            console.log(data)
            users.value = data
        })
}

const onEdit = (row) => {
    console.log(row)
    user.id = row.id
    user.name = row.person.name
    user.last_name = row.person.last_name
    user.dni = row.person.dni
    user.nacionality = row.person.nacionality
    user.gender = parseInt(row.person.gender)
    user.email = row.email
    user.date_born = row.person.born_date
    user.role = row.roles[0].id
    user.phone = row.person.phone
    bttForm.value = false
    dialogCreate.value = true
}
ServicesRole.all()
    .then(data => {
        roles.value = data
        console.log(data)
    })
ServicesGroup.getGroups()
    .then(response => {
        console.log(response)
        groups.value = response
    })
const onChangeFocus = () => {
    ServicesUnit.getUnitByGroup(user.group_id)
        .then(response => {
            units.value = response
        })
}

watch(() => user.group_id, onChangeFocus)

loadUsers()
</script>

<template>
    <div class="q-pa-md">
        <q-btn label="Crear usuario" color="primary" class="q-ma-md" @click="openDialog" />
        <q-table title="Usuarios" :columns="columns" :rows="users">
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn color="yellow" icon="mode_edit" class="q-mx-sm" @click="onEdit(props.row)"></q-btn>
                    <q-btn color="red" icon="delete" @click="onDelete(props.row)"></q-btn>
                </q-td>
            </template>
        </q-table>
    </div>
    <q-dialog v-model="dialogCreate" transition-show="slide-up" transition-hide="slide-down">
        <q-card style="width: 900px; max-width: 80vw;">
            <q-bar>
                <q-toolbar-title>Crea un nuevo usuario</q-toolbar-title>
                <q-space />
                <q-btn dense flat icon="close" v-close-popup>
                    <q-tooltip class="bg-white text-primary">Close</q-tooltip>
                </q-btn>
            </q-bar>
            <q-card-section class="col q-pt-none q-mt-sm">
                <div class="col-6 text-center">
                    <q-form class="q-gutter-md row justify-center q-mt-sm">
                        <q-input v-model="user.name" class="col-sm-12 col-md-5" label="Nombre" />
                        <q-input v-model="user.last_name" class="col-sm-12 col-md-5" label="Apellido" />
                        <q-input v-model="user.email" class="col-sm-12 col-md-5" label="Correo electrónico" />
                        <q-input v-model="user.dni" class="col-sm-12 col-md-5" label="Dni" />
                        <q-input v-model="user.date_born" class="col-sm-12 col-md-5" label="Fecha de Nacimiento" />
                        <q-input v-model="user.phone" class="col-sm-12 col-md-5" label="Teléfono" />
                        <q-input v-model="user.nacionality" class="col-sm-12 col-md-5" label="Nacionalidad" />
                        <q-select v-model="user.gender" option-label="name" :options="gender" emit-value map-options
                            option-value="id" class="col-sm-12 col-md-5" label="Género" />
                        <q-select v-model="user.role" class="col-sm-12 col-md-5" :options="roles"
                            label="Selecciona un rol" option-label="nombre" emit-value map-options option-value="id" />
                        <q-input v-model="user.password" class="col-sm-12 col-md-5" label="Contraseña" />
                        <q-select v-show="user.role == 4 || user.role == 5 " v-model="user.group_id" class="col-sm-12 col-md-5" :options="groups"
                            label="Selecciona un grupo" option-label="name" emit-value map-options option-value="id" />
                        <q-select v-show="user.group_id != '' " v-model="user.unit_id" class="col-sm-12 col-md-5" :options="units"
                            label="Selecciona una unidad" option-label="name" emit-value map-options option-value="id" />
                        <q-btn class="col-md-10" color="amber" v-show="bttForm" @click="save">Enviar</q-btn>
                        <q-btn class="col-md-10" color="amber" v-show="!bttForm" @click="update">Actualizar</q-btn>
                    </q-form>
                </div>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>