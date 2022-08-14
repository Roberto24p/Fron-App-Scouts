<template>
  <div class="q-pa-md">
    <q-btn label="Agregar" color="primary" class="q-ma-md" @click="dialog = true; bttForm = true" />
    <q-table title="Dirigentes" :rows="directings" :columns="columns" row-key="name" :loading="loading">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn color="yellow" icon="mode_edit" class="q-mx-sm" @click="onEdit(props.row)"></q-btn>
          <q-btn color="red" icon="delete" @click="onDelete(props.row)"></q-btn>
        </q-td>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
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
        <div class="text-h6">Nuevo Dirigente</div>
      </q-card-section>

      <q-card-section class="col q-pt-none">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md row">
          <q-input v-model="directing.id" v-show="false" />
          <q-input class="col-4" filled v-model="directing.name" label="Nombre" lazy-rules
            :rules="[val => val && val.length > 0 || 'Obligatorio']" />
          <q-input class="col-4" filled v-model="directing.lastName" label="Apellido" lazy-rules
            :rules="[val => val && val.length > 0 || 'Obligatorio']" />
          <q-input class="col-4" filled v-model="directing.dni" label="Cedula"></q-input>
          <q-select class="col-4" filled :options="bloodType" v-model="directing.typeBlood" label="Tipo de Sangre">
          </q-select>
          <q-select class="col-4" filled :options="genderType" v-model="directing.gender" label="Genero">
          </q-select>
          <q-input class="col-4" filled v-model="directing.phone" label="Telefono"></q-input>
          <q-input class="col-4" filled v-model="directing.email" label="Email"></q-input>
          <q-input class="col-4" filled v-model="directing.nacionality" label="Nacionalidad"></q-input>
          <q-input class="col-4" filled v-model="directing.bornDate" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date v-model="directing.bornDate"></q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
          <q-select class="col-4" emit-value map-options v-model="directing.groupId" :options="groups" option-value="id" option-label="name"
            @input="onChangeFocus" label="Elige Grupo" />
          <q-select class="col-4" emit-value map-options v-model="directing.unitId" :options="units" option-value="id"
            option-label="name" label="Elige Unidad" />
        </q-form>
      </q-card-section>
      {{ directing }}
      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Guardar" v-close-popup v-on:click="sendData" v-show="bttForm" />
        <q-btn flat label="Actualizar" v-close-popup v-on:click="updateData" v-show="!bttForm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { reactive, ref, onBeforeMount, watch } from "vue"
import ServicesDirecting from '../services/ServicesDirecting'
import ServicesGroup from '../services/ServicesGroup'
import ServicesUnit from '../services/ServicesUnit'
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
  { name: 'last_Name', align: 'left', label: 'Apellido', field: 'last_name', sortable: true },
  { name: 'age', align: 'left', label: 'Edad', field: 'age', sortable: true },
  { name: 'actions', label: 'Acctiones' }
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
const genderType = [
  '1',
  '0'
]
const bttForm = ref(true)
const loading = ref(false)
const directings = ref([])
const groups = ref([])
const units = ref([])
const directing = reactive({
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



async function onChangeFocus() {
  const data = await ServicesUnit.getUnitByGroup(directing.groupId)
  units.value = data

}

const onEdit = async data => {
  console.log(data)
  dialog.value = true
  directing.unitId = data.unit_id
  directing.name = data.name
  directing.lastName = data.last_name
  directing.dni = data.dni
  directing.bornDate = data.born_date
  directing.typeBlood = data.type_blood
  directing.phone = data.phone
  directing.email = data.email
  directing.image = data.image
  directing.nacionality = data.nacionality
  directing.groupId = data.group_id
  directing.gender = data.gender
  directing.id = data.id
  bttForm.value = false

}

async function sendData() {

  const dataCreate = await ServicesDirecting.create(directing)
  console.log(dataCreate)
  getDirectings()

}

async function updateData() {
  const directingJson = {
    name: directing.name,
    last_name: directing.last_name,
    age: directing.age,
    user_id: 1,
    group_id: selectedGroup.value.id,
    unit_id: selectedUnit.value.id
  }
  const message = await ServicesDirecting.update(directing.id, directingJson)
  console.log(message)
  selected.value = []
  getDirectings()
}

const getGroups = async () => {
  const groupsFech = await ServicesGroup.getGroups()
  groups.value = groupsFech
  console.log(groupsFech)
}


async function getDirectings() {
  const dataDirectings = await ServicesDirecting.getDirectings()
  directings.value = dataDirectings
}


onBeforeMount( () => {
  getDirectings()
  getGroups()
})
watch(() => directing.groupId, onChangeFocus)

const dialog = ref(false)
</script>